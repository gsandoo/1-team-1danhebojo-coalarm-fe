// src/components/alarm/CoinItem.jsx
import React from 'react';

const CoinItem = ({ coin, selected, onSelect }) => {
    return (
        <div
            key={coin.coinId}
            className={`w-[147px] h-[44px] px-[16px] py-[10px] cursor-pointer text-center rounded-[100px] mr-[16px] ${
                selected
                    ? 'border border-[#B7BFFF] bg-[#2B347A] bg-[linear-gradient(0deg,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.20)_100%)]'
                    : 'bg-[#2b347a] border border-[#B7BFFF]'
            }`}
            onClick={() => onSelect(coin)}
        >
            {coin.symbol}
        </div>
    );
};

export default CoinItem;