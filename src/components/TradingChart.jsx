// components/TradingChart.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { binanceService } from '../services/binanceService';

const TradingChart = ({ activeMarket, timeFrame = '1d', chartType = 'Candle' }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });

  // 1. Detect Screen Size for data density
  const isMobile = dimensions.width < 640;
  const candleLimit = isMobile ? 30 : 60; // Show fewer candles on mobile

  const { data: candleData, isLoading, error } = useQuery({
    queryKey: ['candleData', activeMarket, timeFrame, candleLimit],
    queryFn: () => binanceService.getKlines(activeMarket, timeFrame, candleLimit),
    refetchInterval: 30000,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        // Adjust height based on aspect ratio for mobile
        const dynamicHeight = window.innerWidth < 640 ? 300 : 450;
        setDimensions({ width, height: dynamicHeight });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (isLoading || error || !candleData) return <ChartPlaceholder state={isLoading ? 'loading' : 'error'} />;

  // 2. Responsive Margins
  // We shrink the side margins on mobile to give the chart more room
  const margin = { 
    top: 20, 
    right: isMobile ? 45 : 65, 
    bottom: 25, 
    left: isMobile ? 10 : 20 
  };
  
  const { width, height } = dimensions;
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const prices = candleData.flatMap(c => [c.high, c.low]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = (maxPrice - minPrice) || 1;

  const xScale = (i) => margin.left + (i / (candleData.length - 1)) * chartWidth;
  const yScale = (p) => margin.top + chartHeight - ((p - minPrice) / priceRange) * chartHeight;

  // 3. Elements rendering
  let chartElements = [];
  if (chartType === 'Candle') {
    const candleWidth = (chartWidth / candleData.length) * 0.7;
    chartElements = candleData.map((candle, i) => {
      const x = xScale(i);
      const isUp = candle.close >= candle.open;
      const color = isUp ? '#10B981' : '#EF4444';
      return (
        <g key={i}>
          <line x1={x} y1={yScale(candle.high)} x2={x} y2={yScale(candle.low)} stroke={color} strokeWidth="1" />
          <rect
            x={x - candleWidth/2}
            y={Math.min(yScale(candle.open), yScale(candle.close))}
            width={candleWidth}
            height={Math.max(Math.abs(yScale(candle.close) - yScale(candle.open)), 1)}
            fill={color}
          />
        </g>
      );
    });
  } else {
    // Area/Line implementation (same logic as before but using the new scales)
    const points = candleData.map((c, i) => `${xScale(i)},${yScale(c.close)}`).join(' ');
    chartElements.push(<polyline key="line" points={points} fill="none" stroke="#8B5CF6" strokeWidth="2" />);
  }

  const lastPrice = candleData[candleData.length - 1].close;
  const lastY = yScale(lastPrice);

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="relative p-2 md:p-6" ref={containerRef}>
        <svg width={width} height={height} className="overflow-visible">
          {/* Grid Lines (Fewer lines on mobile) */}
          {[0, 1, 2, 3, 4].map((i) => {
            const y = margin.top + (i / 4) * chartHeight;
            const price = maxPrice - (i / 4) * priceRange;
            return (
              <g key={i}>
                <line x1={margin.left} y1={y} x2={width - margin.right} y2={y} stroke="#F1F5F9" />
                <text 
                  x={width - margin.right + 5} 
                  y={y} 
                  fill="#94A3B8" 
                  fontSize={isMobile ? "10" : "12"} 
                  alignmentBaseline="middle"
                >
                  {price.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                </text>
              </g>
            );
          })}

          {chartElements}

          {/* Current Price Tracker */}
          <line x1={margin.left} y1={lastY} x2={width - margin.right} y2={lastY} stroke="#10B981" strokeDasharray="4,2" />
          <g transform={`translate(${width - margin.right}, ${lastY - 10})`}>
            <rect width={isMobile ? "42" : "55"} height="20" fill="#10B981" rx="4" />
            <text x={isMobile ? "21" : "27"} y="10" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">
              {lastPrice.toFixed(isMobile ? 1 : 2)}
            </text>
          </g>
        </svg>

        {/* Floating Indicator */}
        <div className="absolute top-4 left-4 pointer-events-none">
          <div className="bg-white/80 backdrop-blur shadow-sm border border-slate-100 px-2 py-1 rounded-lg flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse bg-[#10B981]`} />
            <span className="text-[10px] font-bold text-slate-600 uppercase">Live {activeMarket}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChartPlaceholder = ({ state }) => (
  <div className="bg-white rounded-3xl border border-slate-100 h-75 md:h-112.5 flex items-center justify-center">
    <p className="text-slate-400 text-sm">{state === 'loading' ? 'Fetching market data...' : 'Chart currently unavailable'}</p>
  </div>
);

export default TradingChart;