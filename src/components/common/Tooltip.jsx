import React from 'react';

function Tooltip({ children, visible }) {
  const tooltipStyle = `
    .custom-tooltip {
      position: absolute;
      right: 0;
      width: 320px;
      background-color: #1a1f36;
      color: white;
      padding: 20px;
      border-radius: 8px;
      z-index: 10;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
      line-height: 1.7;
    }
    
    .custom-tooltip p {
      margin-bottom: 5px;
      font-size: 16px;
    }
    
    .custom-tooltip p:last-child {
      margin-bottom: 0;
    }
    
    .custom-tooltip strong {
      font-weight: 600;
    }
  `;
  
  if (!visible) return null;
  
  return (
    <>
      <style>{tooltipStyle}</style>
      <div className="custom-tooltip">
        {children}
      </div>
    </>
  );
}

export default Tooltip;