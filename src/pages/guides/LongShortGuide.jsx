// src/pages/guides/LongShortGuide.jsx
import React from 'react';
import GuideLayout from '../../components/layouts/GuideLayout';

function LongShortGuide() {
  return (
    <div className="flex min-h-screen pt-[80px] pl-[300px]">
    <GuideLayout title="공매수/공매도 지수 (Long/Short Ratio)">
      <div className="text-white">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">공매수/공매도 지수란?</h2>
          <p className="mb-4">
            공매수/공매도 지수(Long/Short Ratio)는 시장에서 진행 중인 롱 포지션(매수)과 숏 포지션(매도)의 비율을 나타내는 지표입니다. 
            이 지수는 시장 참여자들의 전반적인 포지션 성향을 보여주며, 시장 방향성을 예측하는 데 도움이 됩니다.
          </p>
          <p>
            일반적으로 Long%와 Short%로 표시되며, 두 값의 합은 100%가 됩니다.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">공매수/공매도 지수 해석</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-950 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-medium mb-2">롱 포지션 우세 (Long &gt; 50%)</h3>
              <p className="text-sm">
                시장 참여자들이 가격 상승을 예상하고 있으며, 매수 포지션이 더 많습니다. 일반적으로 시장의 상승 추세를 시사합니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-medium mb-2">숏 포지션 우세 (Short &gt; 50%)</h3>
              <p className="text-sm">
                시장 참여자들이 가격 하락을 예상하고 있으며, 매도 포지션이 더 많습니다. 일반적으로 시장의 하락 추세를 시사합니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-medium mb-2">극단적인 롱 포지션 (Long &gt; 70%)</h3>
              <p className="text-sm">
                매수 포지션이 매우 우세한 상태로, 과매수 상태일 수 있습니다. 이는 조정이 발생할 가능성을 시사할 수 있습니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-medium mb-2">극단적인 숏 포지션 (Short &gt; 70%)</h3>
              <p className="text-sm">
                매도 포지션이 매우 우세한 상태로, 과매도 상태일 수 있습니다. 이는 반등이 발생할 가능성을 시사할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">공매수/공매도 지수 활용 전략</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 역추세 전략 (Contrarian Approach)</h3>
            <p className="mb-2">
              극단적인 롱/숏 비율은 종종 시장의 조정 시그널이 될 수 있습니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>롱 포지션이 매우 높을 때(70% 이상): 조정 가능성 고려, 이익 실현 기회</li>
              <li>숏 포지션이 매우 높을 때(70% 이상): 반등 가능성 고려, 매수 기회</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 추세 확인 도구</h3>
            <p className="mb-2">
              롱/숏 비율의 변화 추이를 통해 시장의 흐름을 확인할 수 있습니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>롱 포지션 비율이 증가하는 추세: 상승 모멘텀 강화</li>
              <li>숏 포지션 비율이 증가하는 추세: 하락 모멘텀 강화</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 시장 심리 분석</h3>
            <p className="mb-2">
              롱/숏 비율은 시장 참여자들의 심리를 반영합니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>롱 포지션 증가: 낙관적 심리, 상승 기대감</li>
              <li>숏 포지션 증가: 비관적 심리, 하락 기대감</li>
            </ul>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">주요 거래소별 공매수/공매도 지수</h2>
          <p className="mb-4">
            주요 암호화폐 거래소들은 각자의 방식으로 공매수/공매도 지수를 제공합니다:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-950 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">바이낸스(Binance)</h3>
              <p className="text-sm">
                계약 수량을 기준으로 롱/숏 비율을 계산합니다. 가장 널리 참조되는 지표 중 하나입니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">바이빗(Bybit)</h3>
              <p className="text-sm">
                계약 수량 및 열린 포지션을 기준으로 롱/숏 비율을 계산합니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">OKX</h3>
              <p className="text-sm">
                롱/숏 포지션의 총 가치를 기준으로 비율을 계산합니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">코인글래스(CoinGlass)</h3>
              <p className="text-sm">
                여러 거래소의 롱/숏 데이터를 종합하여 전체 시장의 롱/숏 비율을 제공합니다.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-950 p-4 rounded-lg border border-blue-700">
          <h3 className="text-lg font-medium mb-2">주의사항</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>롱/숏 비율은 추세가 바뀌는 정확한 시점을 예측하기보다는 전반적인 시장 분위기를 파악하는 데 더 유용합니다.</li>
            <li>극단적인 비율은 종종 의미 있는 신호를 제공하지만, 절대적인 지표로 사용하기보다는 다른 지표와 함께 사용하는 것이 좋습니다.</li>
            <li>거래소마다 롱/숏 비율 계산 방식이 다르므로, 여러 거래소의 데이터를 비교 분석하는 것이 좋습니다.</li>
            <li>대형 투자자(고래)의 포지션은 전체 비율에 큰 영향을 미칠 수 있으므로, 개별 거래자의 행동만으로 시장 방향을 예측하는 것은 위험할 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </GuideLayout>
    </div>
  );
}

export default LongShortGuide;