import { EventSourcePolyfill } from 'event-source-polyfill';
import { toast } from 'sonner';
const alertSound = new Audio('/kuaa.mp3');

export const connectSSE = () => {
  // 쿠키에서 토큰 가져오기
  const getCookieValue = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };
  
  const authToken = getCookieValue('Authorization');
  console.log('토큰 존재 여부:', !!authToken);
  
  // SSE 연결 설정 (타임아웃 연장) 
  const eventSource = new EventSourcePolyfill(import.meta.env.VITE_BASE_URL+'/alerts/subscribe', {
    headers: {
      Authorization: authToken
    },
    withCredentials: true,
    heartbeatTimeout: 300000 // 5분(300,000ms)으로 타임아웃 연장
  });
  
  // 연결 성공 이벤트
  eventSource.onopen = (event) => {
    console.log('SSE 연결 성공', event);
  };
  
  // 일반 메시지 수신 이벤트 (이름이 없는 이벤트)
  eventSource.onmessage = (event) => {
    console.log('SSE 기본 메시지 데이터:', event.data);
  };
  
  // "alert" 이벤트 리스너 등록 (서버에서 명시적으로 지정한 이벤트 이름)
  eventSource.addEventListener('alert', (event) => {
    console.log('SSE alert 이벤트 데이터:', event.data);
    
    // JSON 파싱 시도
    try {
      const alertData = JSON.parse(event.data);
      console.log('파싱된 알림 데이터:', alertData);
      
      // 토스트 메시지 표시
      showAlertToast(alertData);
    } catch (error) {
      console.error('JSON 파싱 오류:', error);
    }
  });
  
  // 오류 이벤트
  eventSource.onerror = (error) => {
    console.log('SSE 연결 오류:', error);
  };
  
  return eventSource;
};

const playAlertSound = () => {
  try {    
    // 소리 재생 (이미 재생 중이면 처음부터 다시 재생)
    alertSound.pause();
    alertSound.currentTime = 0;
    
    // 사용자 인터랙션이 필요한 경우를 대비한 처리
    const playPromise = alertSound.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('알람 소리 재생 오류:', error);
      });
    }
  } catch (error) {
    console.error('알람 소리 재생 중 예외 발생:', error);
  }
};

// 알림 데이터를 토스트로 표시하는 함수
const showAlertToast = (alertData) => {
  let title = "알림";
  let message = "";
  
  // 알림 유형에 따라 다른 메시지 및 제목 설정
  if (alertData.targetPriceFlag) {
    title = "가격 알림";
    message = `${alertData.title}\n 목표 가격 ${alertData.targetPrice.price.toLocaleString()}에 도달했습니다 (${alertData.targetPrice.percentage}% 변동)`;
  } else if (alertData.goldenCrossFlag) {
    title = "골든 크로스 알림";
    message = `${alertData.title}\n 골든 크로스가 발생했습니다`;
  } else if (alertData.volumeSpikeFlag) {
    title = "거래량 급증 알림";
    message = `${alertData.title}\n 거래량이 급증했습니다`;
  } else {
    message = alertData.title || "새로운 알림이 도착했습니다";
  }

  playAlertSound();

  // 토스트 메시지 표시
  toast.info(
    <div className="flex flex-col gap-1">
      <div className="font-semibold">{title}</div>
      <div style={{ whiteSpace: "pre-line" }}>{message}</div>
      <div className="w-full h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full animate-progress"></div>
      </div>
    </div>
  );
};