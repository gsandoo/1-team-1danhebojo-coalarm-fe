// src/pages/guides/WhaleTransactionsGuide.jsx
import React from 'react';
import GuideLayout from '../../components/layouts/GuideLayout';

function WhaleTransactionsGuide() {
  return (
    <GuideLayout title="고래 체결 내역 (Whale Transactions)">
      <div className="text-white">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">고래란 무엇인가요?</h2>
          <p className="mb-4">
            암호화폐 시장에서 '고래(Whale)'란 대량의 암호화폐를 보유하고 있는 개인 또는 기관 투자자를 지칭합니다.
            이들은 대규모 거래를 통해 시장 가격에 상당한 영향을 미칠 수 있는 능력을 가지고 있습니다.
          </p>
          <p>
            일반적으로 비트코인에서는 1,000 BTC 이상, 이더리움에서는 10,000 ETH 이상을 보유한 주소를 고래로 간주하지만,
            이 기준은 시장 상황과 자산에 따라 다를 수 있습니다.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">고래 체결 내역의 중요성</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-950 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">시장 영향력</h3>
              <p className="text-sm">
                고래의 대규모 거래는 단기적으로 가격 변동을 일으킬 수 있으며, 
                특히 유동성이 낮은 알트코인 시장에서는 그 영향이 더 큽니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">스마트 머니 동향</h3>
              <p className="text-sm">
                고래는 종종 시장에 대한 깊은 이해와 정보를 가진 '스마트 머니'로 간주됩니다.
                이들의 거래 패턴은 시장의 미래 방향성에 대한 통찰을 제공할 수 있습니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">시장 심리 지표</h3>
              <p className="text-sm">
                고래의 누적 행동은 기관 투자자들의 시장 심리를 반영하여,
                시장의 전반적인 분위기를 판단하는 데 도움이 됩니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">유동성 제공</h3>
              <p className="text-sm">
                고래의 거래는 시장에 상당한 유동성을 제공하며, 
                이는 시장의 효율성과 안정성에 기여합니다.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">고래 체결 내역 분석 방법</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 체결량 분석</h3>
            <p className="mb-2">
              고래의 대규모 거래는 일반적으로 높은 거래량을 동반합니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>일반 체결 대비 10배 이상의 체결량: 고래의 활동 가능성 높음</li>
              <li>연속적인 대규모 체결: 계획적인 매수/매도 행위 가능성</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 체결 방향 분석</h3>
            <p className="mb-2">
              고래의 누적 체결 방향은 시장 방향성을 예측하는 데 도움이 됩니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>대규모 매수 체결 누적: 가격 상승 가능성 시사</li>
              <li>대규모 매도 체결 누적: 가격 하락 가능성 시사</li>
              <li>다양한 가격대에서의 분할 매수: 장기적 누적 전략 시사</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 타이밍 분석</h3>
            <p className="mb-2">
              고래 거래의 타이밍은 종종 전략적인 판단을 기반으로 합니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>시장 급락 시 매수 체결: 저점 매수 전략 시사</li>
              <li>시장 급등 시 매도 체결: 고점 매도 전략 시사</li>
              <li>장 초반/후반 집중 체결: 전략적 포지션 형성 가능성</li>
            </ul>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">고래 체결 패턴</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 벽돌 쌓기 (Brick Stacking)</h3>
            <p className="mb-2">
              고래가 시장에 큰 영향을 주지 않기 위해 여러 작은 거래로 분할하여 매수/매도하는 전략입니다.
            </p>
            <div className="bg-blue-950 p-3 rounded-lg border-l-4 border-blue-500 text-sm mb-2">
              특징: 비슷한 크기의 거래가 일정 시간 간격으로 반복적으로 발생
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 벽 세우기 (Wall Building)</h3>
            <p className="mb-2">
              특정 가격대에 대규모 주문을 걸어 가격의 상승 또는 하락을 제한하는 전략입니다.
            </p>
            <div className="bg-blue-950 p-3 rounded-lg border-l-4 border-blue-500 text-sm mb-2">
              특징: 주문서(오더북)에 특정 가격대에 큰 벽이 형성됨
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 흔들기 (Shakeout)</h3>
            <p className="mb-2">
              대규모 매도로 가격을 급락시켜 스탑로스를 유발한 후, 낮은 가격에 다시 매수하는 전략입니다.
            </p>
            <div className="bg-blue-950 p-3 rounded-lg border-l-4 border-blue-500 text-sm mb-2">
              특징: 짧은 시간 내 대규모 매도 후 빠른 매수 체결 발생
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 분산 매수/매도 (Distribution)</h3>
            <p className="mb-2">
              시간을 두고 천천히 포지션을 쌓거나 줄이는 장기적 전략입니다.
            </p>
            <div className="bg-blue-950 p-3 rounded-lg border-l-4 border-blue-500 text-sm mb-2">
              특징: 일정 기간 동안 꾸준한 방향성을 가진 체결 패턴
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">고래 체결 내역 활용 전략</h2>
          
          <ol className="space-y-4">
            <li className="flex items-start">
              <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">1</span>
              <div>
                <h3 className="text-lg font-medium">추세 확인</h3>
                <p className="text-sm">
                  고래들의 누적 체결 방향을 분석하여 중장기 시장 방향성을 판단합니다.
                </p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">2</span>
              <div>
                <h3 className="text-lg font-medium">가격 지지/저항 레벨 식별</h3>
                <p className="text-sm">
                  고래들이 활발하게 거래하는 가격대는 중요한 지지/저항 레벨일 가능성이 높습니다.
                </p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">3</span>
              <div>
                <h3 className="text-lg font-medium">급등/급락 예측</h3>
                <p className="text-sm">
                  비정상적인 고래 체결 활동은 종종 큰 가격 움직임의 전조가 될 수 있습니다.
                </p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">4</span>
              <div>
                <h3 className="text-lg font-medium">특정 코인 관심도 파악</h3>
                <p className="text-sm">
                  고래들이 특정 코인에 관심을 보이는 경우, 해당 코인의 중장기 잠재력을 시사할 수 있습니다.
                </p>
              </div>
            </li>
          </ol>
        </div>
        
        <div className="bg-blue-950 p-4 rounded-lg border border-blue-700">
          <h3 className="text-lg font-medium mb-2">주의사항</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>고래 체결 내역만으로 투자 결정을 내리는 것은 위험할 수 있습니다. 항상 다른 지표와 함께 분석하세요.</li>
            <li>일부 고래는 시장을 조작하려는 의도를 가질 수 있으므로, 체결 패턴이 항상 진정한 시장 신호를 반영하지는 않습니다.</li>
            <li>거래소마다 '고래'의 기준이 다를 수 있으므로, 서로 다른 데이터 소스를 비교 분석하는 것이 좋습니다.</li>
            <li>암호화폐 자산 중 유동성이 낮은 코인에서는 소규모 '고래'도 시장에 큰 영향을 미칠 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </GuideLayout>
  );
}

export default WhaleTransactionsGuide;