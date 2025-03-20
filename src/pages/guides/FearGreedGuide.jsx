// src/pages/guides/FearGreedGuide.jsx
import React from 'react';
import GuideLayout from '../../components/layouts/GuideLayout';

function FearGreedGuide() {
  return (
    <GuideLayout title="공포/탐욕 지수 (Fear & Greed Index)">
      <div className="text-white">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">공포/탐욕 지수란?</h2>
          <p className="mb-4">
            공포/탐욕 지수는 시장의 심리 상태를 수치화한 지표로, 투자자들의 감정이 시장에 어떤 영향을 미치는지 파악하는 데 도움을 줍니다. 
            이 지수는 0에서 100 사이의 값을 가지며, 0에 가까울수록 극심한 공포를, 100에 가까울수록 극심한 탐욕을 의미합니다.
          </p>
          <p>
            코알람에서는 공격적 투자 성향(공격)과 방어적 투자 성향(방어)으로 구분하여 제공합니다.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">공포/탐욕 지수 구간</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-950 p-4 rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-medium mb-2">극심한 공포 (0-25)</h3>
              <p className="text-sm">
                투자자들이 매우 두려워하고 있으며, 시장에서 대부분이 매도 포지션을 취하고 있습니다. 이 때는 좋은 매수 기회일 수 있습니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-lg font-medium mb-2">공포 (26-45)</h3>
              <p className="text-sm">
                투자자들이 우려하는 상태이지만, 극도의 공포는 아닙니다. 시장은 하락 추세에 있을 가능성이 높습니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg border-l-4 border-yellow-500">
              <h3 className="text-lg font-medium mb-2">중립 (46-54)</h3>
              <p className="text-sm">
                시장이 특별한 추세 없이 균형을 이루고 있습니다. 투자자들은 관망하는 자세를 취하고 있습니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-medium mb-2">탐욕 (55-75)</h3>
              <p className="text-sm">
                투자자들이 낙관적이며, 시장은 상승 추세에 있을 가능성이 높습니다. 매수 포지션이 많아지고 있습니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg border-l-4 border-green-700">
              <h3 className="text-lg font-medium mb-2">극심한 탐욕 (76-100)</h3>
              <p className="text-sm">
                투자자들이 매우 낙관적이며, 과열된 시장 상태입니다. 이 때는 조정이 올 수 있으므로 매도 기회로 볼 수 있습니다.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">공격/방어 지수 활용 방법</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 역발상 투자 전략</h3>
            <p className="mb-2">
              "공포에 사고, 탐욕에 팔아라"라는 워렌 버핏의 명언처럼, 시장 심리와 반대로 움직이는 전략입니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>극심한 공포 구간(0-25): 매수 신호로 볼 수 있음</li>
              <li>극심한 탐욕 구간(76-100): 매도 신호로 볼 수 있음</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 추세 확인 도구</h3>
            <p className="mb-2">
              지수의 변화 추이를 통해 시장의 전반적인 흐름을 파악할 수 있습니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>지수가 상승하는 추세: 시장의 낙관론이 커지고 있음</li>
              <li>지수가 하락하는 추세: 시장의 비관론이 커지고 있음</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 위험 관리 전략</h3>
            <p className="mb-2">
              지수가 극단적인 값을 가질 때는 시장의 변동성이 커질 수 있으므로, 위험 관리에 주의해야 합니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>극심한 탐욕 구간: 포지션 크기 줄이기, 이익 실현, 스탑로스 설정</li>
              <li>극심한 공포 구간: 분할 매수, 장기 투자 관점으로 접근</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-blue-950 p-4 rounded-lg border border-blue-700">
          <h3 className="text-lg font-medium mb-2">코알람의 공격/방어 지수</h3>
          <p className="mb-4">
            코알람에서는 전통적인 공포/탐욕 지수를 <span className="font-bold">공격</span>과 <span className="font-bold">방어</span> 지수로 구분하여 제공합니다:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-bold">공격</span>: 적극적인 매수 전략을 취할 수 있는 정도를 나타냅니다. 값이 높을수록 공격적인 매수 전략이 유리할 수 있습니다.
            </li>
            <li>
              <span className="font-bold">방어</span>: 보수적인 투자 접근이 필요한 정도를 나타냅니다. 값이 높을수록 방어적인 포지션(현금 비중 확대, 위험자산 축소)이 유리할 수 있습니다.
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-300">
            두 지수를 함께 고려하여 투자 전략을 수립하는 것이 효과적입니다. 다른 기술적 지표와 함께 분석하면 더 정확한 판단이 가능합니다.
          </p>
        </div>
      </div>
    </GuideLayout>
  );
}

export default FearGreedGuide;