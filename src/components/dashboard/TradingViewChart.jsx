import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function TradingViewChart({ symbol = 'BTCKRW', exchange = 'UPBIT', theme = 'dark', interval = '1', autosize = true }) {
  const containerRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = initializeWidget;
    document.head.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // symbol이 변경될 때마다 위젯 업데이트
  useEffect(() => {
    if (widgetRef.current) {

      containerRef.current.innerHTML = '';

      initializeWidget();
    }
  }, [symbol, exchange, interval]);

  const initializeWidget = () => {
    if (!containerRef.current || !window.TradingView) return;

    const formattedSymbol = `${exchange}:${symbol}`;

    widgetRef.current = new window.TradingView.widget({
      container_id: containerRef.current.id,
      symbol: formattedSymbol,
      interval: interval, 
      timezone: 'Asia/Seoul',
      theme: theme,
      style: '1',
      locale: 'kr',
      toolbar_bg: '#131722',
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      save_image: false,
      studies: [
        'MASimple@tv-basicstudies',
        'RSI@tv-basicstudies',
        'MACD@tv-basicstudies'
      ],
      show_popup_button: true,
      popup_width: '1000',
      popup_height: '650',
      autosize: autosize,
      height: '100%',
      width: '100%',
    });
  };

  return (
    <div className="tradingview-chart-container h-full w-full">
      <div 
        id={`tradingview_${symbol.toLowerCase()}`} 
        ref={containerRef} 
        className="h-full w-full"
      />
    </div>
  );
}

TradingViewChart.propTypes = {
  symbol: PropTypes.string,
  exchange: PropTypes.string,
  theme: PropTypes.string,
  interval: PropTypes.string,
  autosize: PropTypes.bool
};

export default TradingViewChart;