// src/pages/AlarmPage.jsx
import Sidebar from "../../components/Sidebar.jsx";
import ToggleSwitch from "../../components/alarm/ToggleSwitch.jsx";
import {useState} from "react";
import AlarmCard from "../../components/alarm/AlarmCard.jsx";

const AlarmPage = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCoins, setSelectedCoins] = useState([]);
    const [sortOption, setSortOption] = useState('최신순');

    const sortOptions = ['최신순', '등록순']

    const coins = [
        '비트코인 BTC',
        '이더리움 ETH',
        '리플 XRP',
        '솔라나 SOL',
        '카르다노 ADA',
        '도지코인 DOGE'
    ];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const selectCoin = (coin) => {
        if (selectedCoins.includes(coin)) {
            // 이미 선택된 코인이면 제거
            setSelectedCoins(selectedCoins.filter((item) => item !== coin));
        } else {
            // 선택되지 않은 경우 추가
            setSelectedCoins([...selectedCoins, coin]);
        }
    };

    return (
        <div className="flex h-screen text-white overflow-y-auto">
            <Sidebar/>
            <div className="flex-1 px-[220px] py-[60px]">
                {/*알람 등록 버튼*/}
                <div className="flex justify-end mb-8">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-[100px] bg-[#1631FE] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)] w-[212px] h-[48px]">
                        알림 설정하기
                    </button>
                </div>

                <div className="bg-[#0a1537] rounded-[30px] py-[33px] px-[31px] mb-8 flex flex-col">
                    <div className="flex items-center justify-between">
                        {/* 드롭다운 버튼*/}
                        <div
                            className="border border-[rgba(183,191,255,0.30)] bg-[#2B347A] flex justify-between w-[176px] rounded-[20px]"
                            onClick={toggleDropdown}
                        >
                            <div className="text-white w-[176px] h-[60px] px-[22px] rounded-lg leading-[60px]">
                                코인
                            </div>
                            <div className="inset-y-0 flex items-center px-[22px]">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                        {/* 알람 활성화 토글 버튼*/}
                        <div className="flex items-center">
                            <span className="mr-[20px]">활성화된 알람만 보기</span>
                            <ToggleSwitch/>
                        </div>
                    </div>
                    {/* 드롭다운 메뉴*/}
                    {isDropdownOpen && (
                        <div className="border-t-[#rgba(150, 158, 221, 0.30)] border-t-[1px] mt-[20px] ">
                            <div className="flex py-2 mt-[20px]">
                                {coins.map((coin) => (
                                    <div
                                        key={coin}
                                        className={`w-[147px] h-[44px] px-[16px] py-[10px] cursor-pointer text-center rounded-[100px] mr-[16px] ${
                                            selectedCoins.includes(coin) ? 'border border-[#B7BFFF] bg-[#2B347A] bg-[linear-gradient(0deg,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.20)_100%)]' : 'bg-[#2b347a] border border-[#B7BFFF]'
                                        }`}
                                        onClick={() => selectCoin(coin)}
                                    >
                                        {coin}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* 알람 개수 & 정렬 기준 */}
                <header className="flex justify-between items-center border-b border-white-800">
                    <h1 className="text-lg font-medium">총 4개의 알림이 있어요.</h1>

                    {/* 정렬 기준 */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="appearance-none bg-transparent rounded py-2 px-4 pr-8 text-white cursor-pointer focus:outline-none"                            >
                                {sortOptions.map((option) => (
                                    <option
                                        key={option}
                                        value={option}
                                    >
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </header>

                {/* 알람 목록*/}
                <div className="mt-[44px] grid grid-cols-2 gap-[40px]">
                    <AlarmCard />
                    <AlarmCard />
                    <AlarmCard />
                    <AlarmCard />
                    <AlarmCard />
                </div>
            </div>
        </div>
    );
}

export default AlarmPage;