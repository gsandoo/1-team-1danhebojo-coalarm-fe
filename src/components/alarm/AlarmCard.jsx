import React from 'react';
import ToggleSwitch from "./ToggleSwitch.jsx";
import coin from "../../assets/images/alarm/coin.png";

const AlarmCard = () => {

    return (
        <div className="w-[540px] h-[432px] p-[30px] bg-[#081159] rounded-[20px]">
            <div className="flex items-center gap-2 mb-6">
                <img src={coin}  className="w-[24px] h-[24px]" alt={"img"}/>
                <span className="text-white text-[20px]">비트코인</span>
                <span className="text-gray-300 text-[14px]">BTC/KRW</span>

                <div className="ml-auto">
                    <ToggleSwitch />
                </div>
            </div>

            <div className="mb-[32px] w-[480px]">
                <div className="text-white-300 mb-2 border-b-[1px]">제목</div>
                <div className="bg-[#2B347A] p-4 rounded-[10px] min-h-[40px]">
                    비트코인 올라라라라라
                </div>
            </div>

            <div className="mb-6">
                <div className="text-white-300 mb-2 border-b-[1px]">알람 정보</div>
                <div className="bg-[#2B347A] p-4 mb-[40px] rounded-[10px] min-h-[75px]">
                    <p className="text-white text-sm">지정가 설정</p>
                    <p className="text-gray-400 text-sm mt-1">코인 가격이 5% 하락했을 때 (120,000,000원) 일 때 알림을 받습니다.</p>
                </div>
            </div>

            <div className="mb-6 flex items-center justify-center">
                <button
                    className="w-[179px] h-[48px] rounded-[100px] bg-[#0D1D98] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.10)]">
                    삭제하기
                </button>
            </div>
        </div>
    );
};

export default AlarmCard;