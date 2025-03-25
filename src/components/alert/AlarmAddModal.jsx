import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";

function AlarmAddModal({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [targetPercentage, setTargetPercentage] = useState(''); // 지정가 설정 입력 필드

  const [coinList, setCoinList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const maxChar = 50;
  const charCount = title.length;

  const [showPercentDropdown, setShowPercentDropdown] = useState(false);
  const percentInputRef = useRef(null);
  const percentDropdownRef = useRef(null);
  const coinInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const UpbitDashboard = () => {
    const [coins, setCoins] = useState([]);
    const marketInfoMap = useRef({});
    const ws = useRef(null);

    useEffect(() => {
      fetch('https://api.upbit.com/v1/market/all?isDetails=false')
          .then((res) => res.json())
          .then((data) => {
            const krwMarkets = data.filter((m) => m.market.startsWith('KRW-'));
            const map = {};
            krwMarkets.forEach((m) => {
              map[m.market] = m;
            });
            marketInfoMap.current = map;

            connectWebSocket(Object.keys(map));
          });
    }, []);

    const connectWebSocket = (markets) => {
      ws.current = new WebSocket('wss://api.upbit.com/websocket/v1');

      ws.current.onopen = () => {
        if (ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(
              JSON.stringify([
                { ticket: 'coin-list' },
                { type: 'ticker', codes: markets },
                { format: 'SIMPLE' },
              ])
          );
        } else {
          console.warn('WebSocket still connecting...');
        }
      };

      ws.current.onmessage = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result;
          const data = JSON.parse(text);
          const info = marketInfoMap.current[data.code];
          if (!info) return;

          const symbol = data.code.split('-')[1];

          setCoins((prev) => {
            const filtered = prev.filter((c) => c.coinId !== data.code);
            return [
              ...filtered,
              {
                coinId: data.code,
                name: info.korean_name,
                symbol: symbol,
                price: data.trade_price,
                volume: Math.round(data.acc_trade_price_24h / 1_000_000), // 백만 단위
              },
            ];
          });
        };
        reader.readAsText(e.data);
      };

      ws.current.onerror = (e) => {
        console.error('WebSocket error:', e);
      };

      ws.current.onclose = () => {
        console.warn('WebSocket closed');
      };
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-4">업비트 실시간 코인 정보</h2>
          <table className="w-full border-collapse text-sm">
            <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">코인명</th>
              <th className="p-2 text-center">현재가</th>
              <th className="p-2 text-right">거래대금 (백만)</th>
            </tr>
            </thead>
            <tbody>
            {coins
                .sort((a, b) => b.volume - a.volume)
                .map((coin) => (
                    <tr key={coin.coinId} className="border-b hover:bg-gray-50 cursor-pointer">
                      <td className="p-2 w-1/3 truncate">{coin.name} ({coin.symbol})</td>
                      <td className="p-2 text-center w-1/3">{coin.price?.toLocaleString() || '-'}</td>
                      <td className="p-2 text-right w-1/3">{coin.volume?.toLocaleString() || '-'} 백만</td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
    );
  };

  const marketInfoMap = useRef({});
  const ws = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      try {
        const res = await fetch('https://api.upbit.com/v1/market/all?isDetails=false');
        const markets = await res.json();
        const krwMarkets = markets.filter(m => m.market.startsWith('KRW-'));

        // 마켓 정보를 map에 저장
        krwMarkets.forEach(m => {
          marketInfoMap.current[m.market] = m;
        });

        // 웹소켓 연결
        ws.current = new WebSocket('wss://api.upbit.com/websocket/v1');

        ws.current.onopen = () => {
          if (ws.current.readyState === WebSocket.OPEN) {
            const subscribeMsg = [
              { ticket: 'coin-ticker' },
              { type: 'ticker', codes: krwMarkets.map(m => m.market) }
            ];
            ws.current.send(JSON.stringify(subscribeMsg));
          } else {
            console.warn('WebSocket still connecting...');
          }
        };

        ws.current.onmessage = async (event) => {
          try {
            const buffer = await event.data.arrayBuffer(); // <- 여기가 핵심
            const text = new TextDecoder('utf-8').decode(buffer);
            const data = JSON.parse(text);

            const info = marketInfoMap.current[data.code];
            if (!info || !isMounted) return;

            const symbol = data.code.split('-')[1];

            setCoinList((prevList) => {
              const updated = prevList.filter(c => c.coinId !== data.code);
              return [
                ...updated,
                {
                  coinId: data.code,
                  symbol,
                  name: info.korean_name,
                  englishName: info.english_name,
                  price: data.trade_price,
                  volume: Math.round(data.acc_trade_price_24h / 1_000_000), // 백만 단위
                },
              ];
            });
          } catch (err) {
            console.error('WebSocket parsing error:', err);
          }
        };

        ws.current.onerror = (e) => {
          console.error('WebSocket error:', e);
        };

        ws.current.onclose = () => {
          console.warn('WebSocket closed');
        };
      } catch (err) {
        console.error('Failed to init market info or WebSocket:', err);
      }
    };

    init();

    const handleClickOutside = (event) => {
      if (
          percentDropdownRef.current &&
          !percentDropdownRef.current.contains(event.target) &&
          !percentInputRef.current.contains(event.target)
      ) {
        setShowPercentDropdown(false);
      }

      if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          !coinInputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      isMounted = false;
      ws.current?.close();
    }
  }, []);

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxChar) {
      setTitle(value);
    }
  };

  const handleTypeSelect = (type) => {
    setSelectedType(prev => (prev === type ? '' : type));
  };

  const handleSave = async () => {
    if (!selectedCoin) {
      alert("코인을 선택해주세요!");
      return;
    }

    if (!selectedType) {
      alert("알람 유형을 선택해주세요!");
      return;
    }

    const baseData = {
      symbol: selectedCoin.coinId.split('-')[1],
      title: title,
    };

    let payload = {};

    if (selectedType === "지정가") {
      if (!targetPercentage.trim()) {
        alert("지정가 퍼센트를 입력해주세요!");
        return;
      }

      // 실시간 현재가 기반으로 타겟 가격 계산
      const currentPrice = selectedCoin.price;
      const percentage = parseFloat(targetPercentage);
      const targetPrice = Math.round(currentPrice * (1 + percentage / 100));

      payload = {
        ...baseData,
        type: "TARGET_PRICE",
        percentage: percentage,
        target_price: targetPrice,
      };
    } else if (selectedType === "골든 크로스") {
      payload = {
        ...baseData,
        type: "GOLDEN_CROSS",
      };
    } else if (selectedType === "급등 감지") {
      payload = {
        ...baseData,
        type: "VOLUME_SPIKE",
      };
    }

    try {
      await axios.post("https://localhost:8443/api/v1/alerts", payload, {
        withCredentials: true,
      });
      alert("알람이 저장되었습니다!");
      onSave(payload); // 콜백 전달
      onClose();       // 모달 닫기
    } catch (error) {
      console.error("알람 저장 실패:", error);
      alert("알람 저장에 실패했습니다.");
    }
  };

  //
  // const handleCoinSelect = (coin) => {
  //   setSelectedCoin(coin.name);
  //   setShowDropdown(false);
  // };

  // 색상 클래스 동적 지정
  const getPercentColor = () => {
    const value = parseFloat(targetPercentage);
    if (isNaN(value)) return 'text-gray-800';
    if (value > 0) return 'text-red-500';
    if (value < 0) return 'text-blue-500';
    return 'text-gray-800';
  };

  // 지정자, 골든 크로스, 급등 감지
  const renderTypeDetail = () => {
    switch (selectedType) {
      case "지정가":
        return (
            <div className="bg-[#EAE7FA] p-4 rounded-lg">
              <h3 className="text-[#2D2D2D] font-bold mb-1">지정가 설정</h3>
              <p className="text-[#4A3F7F] text-sm mb-3">
                설정한 가격에 도달하면 알림을 받습니다.
              </p>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-[#2D2D2D]">현재가 대비</span>

                {/* 드롭다운 포함한 relative wrapper */}
                <div className="relative w-[68px] h-[28px]">
                  <input
                      type="text"
                      ref={percentInputRef}
                      value={targetPercentage}
                      onClick={() => setShowPercentDropdown(!showPercentDropdown)}
                      readOnly
                      placeholder="0"
                      className={`
                                  w-full h-full pl-1 pr-5
                                  border border-gray-400 rounded-lg
                                  text-right text-sm text-[#2D2D2D]
                                  ${getPercentColor()} cursor-pointer
                                `}
                  />
                  <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs text-[#2D2D2D] pointer-events-none">%</span>

                  {/* 드롭다운을 input 안에 묶은 상대 위치로 이동 */}
                  {showPercentDropdown && (
                      <ul
                          ref={percentDropdownRef}
                          className="absolute left-0 top-[36px] w-20 bg-white text-black rounded-md border border-gray-300 shadow-lg z-50"
                      >
                        {['10%', '5%', '0%', '-5%', '-10%'].map((option) => {
                          const numericValue = parseFloat(option);
                          let colorClass = 'text-gray-800';

                          if (numericValue > 0) colorClass = 'text-red-500';
                          else if (numericValue < 0) colorClass = 'text-blue-500';

                          return (
                              <li
                                  key={option}
                                  onClick={() => {
                                    setTargetPercentage(option.replace('%', ''));
                                    setShowPercentDropdown(false);
                                  }}
                                  className={`px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm font-medium ${colorClass}`}
                              >
                                {option}
                              </li>
                          );
                        })}
                      </ul>
                  )}
                </div>

                <span className="text-xs text-gray-500">
                  ({selectedCoin?.price?.toLocaleString() || '0'} 원)
                </span>
              </div>
            </div>
        );
      case "골든 크로스":
        return (
            <div className="bg-[#EAE7FA] p-4 rounded-lg">
              <h3 className="text-[#2D2D2D] font-bold mb-1">골든 크로스</h3>
              <p className="text-[#4A3F7F] text-sm">
                단기 이동평균선(7일)이 장기 이동평균선(20일)을 상향 돌파할 때 알림을 받습니다.
              </p>
            </div>
        );
      case "급등 감지":
        return (
            <div className="bg-[#EAE7FA] p-4 rounded-lg">
              <h3 className="text-[#2D2D2D] font-bold mb-1">급등 감지</h3>
              <p className="text-[#4A3F7F] text-sm mb-2">
                업비트의 시장 경보 시스템을 기반으로 가격 급등락 또는 거래량 급등 발생 시 알람을 받습니다.
              </p>
              <ul className="list-disc list-inside text-[#4A3F7F] text-sm">
                <li>전일 종가 대비 50% 이상 가격 등락 발생 시 경보</li>
                <li>거래량 급등 발생 시 경보</li>
              </ul>
            </div>
        );
      default:
        return <div className="text-gray-400 p-4">알람 유형을 선택하세요.</div>;
    }
  };

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div className="relative">
          <div className="bg-[#343A7D] w-[540px] h-[677px] rounded-3xl text-white p-8 flex flex-col shadow-xl">
            {/* 헤더 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path
                      d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h2 className="text-[rgba(248,248,248,0.97)] font-inter text-xl font-extrabold leading-[150%] tracking-[-0.22px]">알람 생성</h2>
              </div>
              <button onClick={onClose} className="text-gray-300 hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* 코인 입력 */}
            <div className="mt-5 mb-6">
              <label className="block text-[rgba(248,248,248,0.97)] font-inter text-sm font-semibold mb-2">코인</label>
              <div className="border-t border-[#B7BFFF]/30 mt-2 mb-2"></div>

              {/* 선택된 코인이 있을 때 */}
              {selectedCoin ? (
                  <div className="bg-[#E8EAFF] px-4 py-3 rounded-xl flex justify-between items-center">
                    <div className="text-[#2D2D2D] text-sm font-medium flex flex-wrap gap-4">
        <span>
          코인명 : <strong>{selectedCoin.name}</strong> <span className="font-bold">{selectedCoin.symbol}</span>
        </span>
                      <span>현재가 : {selectedCoin.price?.toLocaleString() || '-'}</span>
                      <span>거래대금 : {selectedCoin.volume?.toLocaleString() || '-'} 백만</span>
                    </div>
                    <button
                        onClick={() => setSelectedCoin(null)}
                        className="text-[#0A1672] hover:text-red-600 ml-4"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18"
                              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
              ) : (
                  // 검색 인풋
                  <div className="relative">
                    <input
                        ref={coinInputRef}
                        type="text"
                        value={searchKeyword}
                        onChange={(e) => {
                          setSearchKeyword(e.target.value);
                          setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                        placeholder="코인명/심볼 검색"
                        className="w-full h-12 bg-[#E8EAFF] px-4 pr-12 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {showDropdown && coinList.length > 0 && (
                        <div
                            ref={dropdownRef}
                            className="absolute z-50 mt-2 w-full max-h-60 overflow-y-auto rounded-lg bg-[#E8EAFF] text-black shadow-lg border border-gray-300"
                        >
                          <div className="flex justify-between px-4 py-2 text-xs font-semibold text-gray-600 border-b border-gray-300">
                            <span className="w-1/3">코인명</span>
                            <span className="w-1/3 text-center">현재가</span>
                            <span className="w-1/3 text-right">거래대금</span>
                          </div>
                          {coinList
                              .filter((coin) => {
                                const search = searchKeyword.toLowerCase();
                                return (
                                    search === '' ||
                                    coin.name.toLowerCase().includes(search) ||
                                    coin.symbol.toLowerCase().includes(search)
                                );
                              })
                              .map((coin) => (
                                  <div
                                      key={coin.coinId}
                                      onClick={() => {
                                        setSelectedCoin(coin);
                                        setSearchKeyword('');
                                        setShowDropdown(false);
                                      }}
                                      className="flex justify-between items-center px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                                  >
                                    <span className="w-1/3 truncate">{coin.name} ({coin.symbol})</span>
                                    <span className="w-1/3 text-center">{coin.price?.toLocaleString() || '-'}</span>
                                    <span className="w-1/3 text-right">{coin.volume?.toLocaleString() || '-'} 백만</span>
                                  </div>
                              ))}
                        </div>
                    )}
                    <div className="absolute inset-y-0 right-3 flex items-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                            stroke="#0D1D98" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
              )}

              <p className="text-[#B7BFFF] text-right text-xs font-medium mt-1">
                *현재가는 yyyy.mm.dd, hh:mm:ss 기준의 데이터입니다.
              </p>
            </div>


            {/* 제목 */}
            <div className="mb-8">
              <label className="block text-[rgba(248,248,248,0.97)] text-sm font-semibold mb-2">알람 제목</label>
              <div className="border-t border-[#B7BFFF]/30 mt-2 mb-2"></div>
              <div className="relative">
                <input
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="내용을 입력해 주세요."
                    className="w-[480px] h-[40px] pl-[18px] pr-[72px] py-[10px] rounded-lg bg-[#E8EAFF] text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-400">
                  ({charCount}/{maxChar})
                </div>
              </div>
            </div>

            {/* 유형 선택 */}
            <div>
              <label className="block text-[rgba(248,248,248,0.97)] text-sm font-semibold mb-2">유형</label>
              <div className="border-t border-[#B7BFFF]/30 mt-2 mb-2"></div>
              <div className="flex">
                <div className="w-[184px] h-[111px]">
                  <div className="bg-[#E8EAFF] p-4 rounded-lg">
                    {['지정가', '골든 크로스', '급등 감지'].map((type) => (
                        <div key={type} className="flex justify-between items-center mb-4 last:mb-0">
                          <span className="text-[#2D2D2D]">{type}</span>
                          <button
                              className={`w-12 h-6 rounded-full p-1 transition-colors ${selectedType === type ? 'bg-[#0A1672]' : 'bg-[#B7BFFF]'}`}
                              onClick={() => handleTypeSelect(type)}
                          >
                            <div
                                className={`w-4 h-4 bg-white rounded-full transform transition-transform ${selectedType === type ? 'translate-x-6' : ''}`}>
                            </div>
                          </button>
                        </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 pl-2">
                  <div className="bg-[#293282] rounded-lg h-full">
                    {/* 동적 옵션 자리 */}
                    {renderTypeDetail()}
                  </div>
                </div>
              </div>
            </div>

            {/* 저장 버튼 */}
            <div className="flex flex-col h-full justify-end items-center">
              <button
                  onClick={handleSave}
                  className="bg-[#1631FE] hover:bg-[#1631FE]/90 text-white font-medium w-[180px] h-[56px] rounded-full transition-colors"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default AlarmAddModal;
