// src/pages/guides/KimchiPremiumGuide.jsx
import React from 'react';
import GuideLayout from '../../components/layouts/GuideLayout';

function KimchiPremiumGuide() {
  return (
    <div className="flex min-h-screen pt-[80px] pl-[300px]">
    <GuideLayout title="김치 프리미엄 (Kimchi Premium)">
      <div className="text-white">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">김치 프리미엄이란?</h2>
          <p className="mb-4">
            김치 프리미엄이란 한국의 암호화폐 거래소에서 거래되는 코인 가격이 해외 거래소보다 더 높게 형성되는 현상을 말합니다.
            즉, 같은 코인이 한국 시장에서 더 비싸게 거래되는 것을 의미합니다.
          </p>
          <p>
            이 용어는 한국의 대표적인 음식인 '김치'와 가격 차이를 의미하는 '프리미엄'을 합친 것으로, 
            국제 암호화폐 시장에서 널리 사용되는 용어가 되었습니다.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">김치 프리미엄의 원인</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-950 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">자본 통제</h3>
              <p className="text-sm">
                한국에서는 외환 거래에 대한 규제가 있어, 대규모 자금의 해외 송금이 제한적입니다. 
                이로 인해 차익 거래가 어렵기 때문에 프리미엄이 유지됩니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">높은 시장 수요</h3>
              <p className="text-sm">
                한국은 암호화폐에 대한 관심과 거래량이 높은 나라 중 하나입니다. 
                높은 수요는 가격 상승 압력을 만들어 프리미엄을 형성합니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">시장 분리</h3>
              <p className="text-sm">
                한국 거래소와 해외 거래소 간의 유동성이 완전히 연결되어 있지 않아 
                가격 차이가 자연스럽게 발생합니다.
              </p>
            </div>
            
            <div className="bg-blue-950 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">규제 환경</h3>
              <p className="text-sm">
                한국의 암호화폐 규제 환경이 다른 국가와 다르기 때문에 시장 움직임에 차이가 발생합니다.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">김치 프리미엄 계산 방법</h2>
          
          <div className="bg-blue-950 p-4 rounded-lg mb-4">
            <div className="text-center">
              <span className="text-lg font-mono">김치 프리미엄(%) = ((한국 거래소 가격 / 해외 거래소 가격) - 1) × 100</span>
            </div>
          </div>
          
          <p className="mb-4">
            예를 들어, 비트코인이 해외 거래소에서 50,000 달러에 거래되고, 한국 거래소에서 5,650만원(약 52,500 달러)에 거래된다면:
          </p>
          
          <div className="bg-blue-950 p-4 rounded-lg mb-4">
            <div className="text-center">
              <span className="text-lg font-mono">김치 프리미엄 = ((52,500 / 50,000) - 1) × 100 = 5%</span>
            </div>
          </div>
          
          <p>
            이 경우 김치 프리미엄은 5%입니다. 즉, 한국에서는 같은 비트코인을 사기 위해 5% 더 비싼 가격을 지불해야 합니다.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">김치 프리미엄의 의미와 활용</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 시장 심리 지표</h3>
            <p className="mb-2">
              김치 프리미엄은 한국 시장의 투자 심리를 보여주는 지표로 활용됩니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>높은 프리미엄: 한국 투자자들의 강한 매수세를 의미</li>
              <li>낮은 프리미엄: 한국 시장의 냉각 또는 하락 추세를 시사</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 투자 신호</h3>
            <p className="mb-2">
              김치 프리미엄의 변화는 종종 시장 방향성에 대한 선행 지표가 될 수 있습니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>프리미엄 상승: 한국 시장의 강한 매수세, 상승 추세 가능성</li>
              <li>프리미엄 하락: 한국 시장의 열기 감소, 하락 조정 가능성</li>
              <li>마이너스 프리미엄: 매우 비관적인 시장 상황, 가능한 반등 신호</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">• 글로벌 시장과의 비교</h3>
            <p className="mb-2">
              김치 프리미엄은 한국 시장과 글로벌 시장 간의 관계를 분석하는 도구입니다.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>한국 시장이 글로벌 시장보다 더 강세인지 약세인지 판단 가능</li>
              <li>시장 이상 현상이나 불균형을 감지하는 데 도움</li>
            </ul>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">김치 프리미엄의 역사적 변화</h2>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">• 2017-2018년 불장</h3>
            <p className="text-sm">
              2017년 말부터 2018년 초까지의 불장 기간 동안, 김치 프리미엄은 최대 50%까지 치솟았습니다.
              이는 한국 투자자들의 극도의 열광적인 참여를 반영했습니다.
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">• 2021년 불장</h3>
            <p className="text-sm">
              2021년 불장 중에도 김치 프리미엄은 다시 20%를 넘어섰으며, 
              한국 시장의 활발한 참여를 보여주었습니다.
            </p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">• 곰장 시기</h3>
            <p className="text-sm">
              시장이 하락하는 곰장 시기에는 김치 프리미엄이 크게 축소되거나 때로는 마이너스 프리미엄(한국 가격이 해외보다 낮은 현상)이 발생하기도 합니다.
            </p>
          </div>
        </div>
        
        <div className="bg-blue-950 p-4 rounded-lg border border-blue-700">
          <h3 className="text-lg font-medium mb-2">코알람의 김치 프리미엄 활용 방법</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-bold">추세 변화 감지</span>: 김치 프리미엄의 증가 또는 감소 추세를 통해 시장 방향성의 변화를 조기에 감지할 수 있습니다.
            </li>
            <li>
              <span className="font-bold">극단적 상황 인식</span>: 김치 프리미엄이 매우 높거나 낮을 때는 시장의 과열 또는 과매도 상태를 인식하는 데 도움이 됩니다.
            </li>
            <li>
              <span className="font-bold">코인별 차이 분석</span>: 코인마다 김치 프리미엄의 차이를 분석하여 특정 코인에 대한 한국 시장의 관심도를 파악할 수 있습니다.
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-300">
            김치 프리미엄은 단독으로 사용하기보다는 다른 기술적, 기본적 분석 도구와 함께 사용하는 것이 효과적입니다.
          </p>
        </div>
      </div>
    </GuideLayout>
    </div>
  );
}

export default KimchiPremiumGuide;