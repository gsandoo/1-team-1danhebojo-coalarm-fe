// src/pages/guides/MacdGuide.jsx
import React from 'react';
import GuideLayout from '../../components/layouts/GuideLayout';

function MacdGuide() {
  return (
    <GuideLayout title="MACD (Moving Average Convergence Divergence)">
      <div className="text-white">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">MACD란 무엇인가요?</h2>
          <p className="mb-4">
            MACD(Moving Average Convergence Divergence)는 이동평균선의 수렴과 발산을 이용한 지표로, 
            단기 이동평균선과 장기 이동평균선의 차이를 통해 추세의 방향과 강도를 파악하는 데 사용됩니다.
          </p>
          <p>
            MACD는 기술적 분석에서 가장 많이 사용되는 지표 중 하나로, 
            주가의 추세 전환 시점을 포착하는 데 효과적입니다.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">MACD의 구성 요소</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-950 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">MACD 라인</h3>
              <p className="text-sm">
                단기 이동평균선(보통 12일)에서 장기 이동평균선(보통 26일)을 뺀 값입니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">시그널 라인</h3>
              <p className="text-sm">
                MACD 라인의 9일 이동평균선으로, MACD의 추세 변화를 부드럽게 보여줍니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">히스토그램</h3>
              <p className="text-sm">
                MACD 라인과 시그널 라인의 차이를 막대 그래프로 표시한 것입니다.
              </p>
            </div>
          </div>
          
          <p className="text-sm text-gray-300 mb-4">
            일반적으로 MACD는 (12, 26, 9) 설정을 사용합니다. 이는 12일 단기 이동평균, 26일 장기 이동평균, 9일 시그널 라인을 의미합니다.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">MACD 해석 방법</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 골든 크로스 (매수 신호)</h3>
            <p className="mb-2">
              MACD 라인이 시그널 라인을 아래에서 위로 돌파할 때 발생합니다.
            </p>
            <div className="bg-blue-950 p-3 rounded-lg border-l-4 border-green-500">
              <p className="text-sm">
                이는 단기적인 상승 모멘텀이 강해지고 있다는 신호로, 매수 기회를 나타냅니다.
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 데드 크로스 (매도 신호)</h3>
            <p className="mb-2">
              MACD 라인이 시그널 라인을 위에서 아래로 돌파할 때 발생합니다.
            </p>
            <div className="bg-blue-950 p-3 rounded-lg border-l-4 border-red-500">
              <p className="text-sm">
                이는 단기적인 하락 모멘텀이 강해지고 있다는 신호로, 매도 기회를 나타냅니다.
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 중심선 돌파</h3>
            <p className="mb-2">
              MACD 라인이 0선을 돌파하는 것도 중요한 신호입니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>0선 위로 돌파: 상승 추세 확인</li>
              <li>0선 아래로 돌파: 하락 추세 확인</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 다이버전스 (Divergence)</h3>
            <p className="mb-2">
              가격과 MACD의 움직임이 서로 다른 방향으로 움직일 때 발생합니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>불리시 다이버전스: 가격은 하락하지만 MACD는 상승 (반등 신호)</li>
              <li>베어리시 다이버전스: 가격은 상승하지만 MACD는 하락 (조정 신호)</li>
            </ul>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">MACD 활용 전략</h2>
          
          <ol className="space-y-4">
            <li className="flex items-start">
              <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">1</span>
              <div>
                <h3 className="text-lg font-medium">추세 확인</h3>
                <p className="text-sm">
                  MACD가 0선 위에 있으면 상승 추세, 아래에 있으면 하락 추세로 판단합니다.
                </p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">2</span>
              <div>
                <h3 className="text-lg font-medium">매수/매도 시점 결정</h3>
                <p className="text-sm">
                  골든 크로스와 데드 크로스를 이용하여 매수/매도 시점을 결정합니다.
                </p>
              </div>
            </li>
            
            <li className="flex items-start">
              <span className="bg-blue-800 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">3</span>
              <div>
                <h3 className="text-lg font-medium">다이버전스 활용</h3>
                <p className="text-sm">
                  다이버전스는 추세 전환의 강력한 신호가 될 수 있으므로, 이를 이용한 전략을 구사합니다.
                </p>
              </div>
            </li>
          </ol>
        </div>
        
        <div className="bg-blue-950 p-4 rounded-lg border border-blue-700">
          <h3 className="text-lg font-medium mb-2">주의사항</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>MACD는 지연 지표이므로, 시장이 빠르게 움직일 때는 신호가 늦게 나타날 수 있습니다.</li>
            <li>횡보 장세에서는 잘못된 신호가а 자주 발생할 수 있으니 주의가 필요합니다.</li>
            <li>다른 기술적 지표와 함께 사용하면 더 정확한 분석이 가능합니다.</li>
            <li>단기적인 변동성이 크면 MACD 신호가 자주 바뀔 수 있으므로 장기 투자자는 더 긴 기간 설정을 고려할 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </GuideLayout>
  );
}

export default MacdGuide;