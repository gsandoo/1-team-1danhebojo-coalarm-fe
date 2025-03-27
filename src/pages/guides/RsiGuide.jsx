// src/pages/guides/RsiGuide.jsx
import React from 'react';
import GuideLayout from '../../components/layouts/GuideLayout';

function RsiGuide() {
  return (
    <div className="flex min-h-screen pt-[80px] pl-[300px]">
    <GuideLayout title="RSI (Relative Strength Index)">
      <div className="text-white">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">RSI 계산 방법</h2>
          <div className="bg-blue-950 p-4 rounded-lg mb-4 inline-block">
            <div className="text-center">
              <span className="text-lg font-mono">RSI = 100 - (100 / (1 + RS))</span>
            </div>
          </div>
          <p className="mb-4">
            여기서, RSI(Relative Strength)는 특정 기간 동안의 평균 상승폭과 평균 하락폭을 비교한 지표입니다.
            일정한 기간 동안의 평균에 대해서지 않아도 됩니다. 대부분의 차트 서비스(트레이딩뷰 등) 에서는 지움으로 계산해 주기 때문에 RSI 수치만 잘 해석하면 됩니다.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">RSI 해석하는 법</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• RSI 70 이상 → 과매수 상태</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>가격이나 나쁜 뉴스 발표로 인해 하락할 가능성이 큽니다.</li>
              <li>초단기적 매도(이익 실현) 좋은 전략입니다.</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• RSI 30 이하 → 과매도 상태</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>가격이 너무 많이 하락했으므로 가능성이 큽니다.</li>
              <li>짧은 기간 상승이 될 수도 있으니 추가 하락을 기다리는 것이 안전합니다.</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-300 italic">
            하지만 RSI만 보고 매매를 결정하는 것은 권장하지 않습니다. 다른 기술적 분석 볼랜드와 같이 종합적으로 판단해야 합니다.
          </p>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">RSI를 활용한 투자 전략</h2>
          
          <ol className="space-y-6">
            <li>
              <h3 className="text-lg font-medium mb-2">1. 과매수/과매도 구간에서 신호위치 대응하기</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>RSI가 70 이상일 때 매도(이익 실현) 신호</li>
                <li>RSI가 30 이하일 때 매수(저점 매수) 신호</li>
              </ul>
            </li>
            
            <li>
              <h3 className="text-lg font-medium mb-2">2. 다이버전스(Divergence) 확인하기</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>가격은 오르는데 RSI는 떨어진다면 → 향후 가격하락 신호</li>
                <li>가격은 내리는데 RSI는 오르고 있다면 → 상승 가능성이 있음</li>
              </ul>
            </li>
          </ol>
        </div>
        
        <div className="bg-blue-950 p-4 rounded-lg border border-blue-700">
          <h3 className="text-lg font-medium mb-2">주요 포인트</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>RSI는 단기적인 가격 움직임을 예측하는 데 유용한 지표입니다.</li>
            <li>절대적인 신호가 아닌 참고용으로 사용해야 합니다.</li>
            <li>다른 기술적 지표와 함께 사용하면 투자 결정에 도움이 됩니다.</li>
            <li>RSI 지표는 변동성이 심한 시장에서 더 효과적입니다.</li>
          </ul>
        </div>
      </div>
    </GuideLayout>
    </div>
  );
}

export default RsiGuide;