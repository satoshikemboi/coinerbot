// components/OrderBook.jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { binanceService } from '../services/binanceService';

const OrderBook = ({ activeMarket }) => {
  const { data: orderBook, isLoading } = useQuery({
    queryKey: ['orderBook', activeMarket],
    queryFn: () => binanceService.getOrderBook(activeMarket, 15), // Slightly more rows for mobile stack
    refetchInterval: 1000,
  });

  if (isLoading) return <OrderBookSkeleton />;

  const processOrders = (data, type) => {
    let totalAccumulator = 0;
    const items = data.slice(0, 10).map(item => {
      const price = parseFloat(item[0]);
      const amount = parseFloat(item[1]);
      totalAccumulator += amount;
      return { price, amount, total: totalAccumulator };
    });
    // For Asks (Sells), we want the lowest price at the bottom, near the middle
    return type === 'asks' ? items.reverse() : items;
  };

  const asks = processOrders(orderBook.asks, 'asks');
  const bids = processOrders(orderBook.bids, 'bids');

  const maxTotal = Math.max(
    ...asks.map(a => a.total),
    ...bids.map(b => b.total)
  );

  const spread = parseFloat(orderBook.asks[0][0]) - parseFloat(orderBook.bids[0][0]);
  const spreadPercent = (spread / parseFloat(orderBook.bids[0][0])) * 100;

  const Row = ({ order, type }) => (
    <div className="relative grid grid-cols-3 py-1 px-2 text-[11px] md:text-xs font-medium hover:bg-slate-50 transition-colors">
      {/* Depth Visualizer Background */}
      <div 
        className={`absolute inset-y-0 right-0 opacity-10 transition-all duration-500 ${type === 'ask' ? 'bg-red-500' : 'bg-emerald-500'}`}
        style={{ width: `${(order.total / maxTotal) * 100}%` }}
      />
      <div className={`z-10 ${type === 'ask' ? 'text-red-500' : 'text-emerald-500'}`}>
        {order.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </div>
      <div className="z-10 text-right text-slate-600">{order.amount.toFixed(4)}</div>
      <div className="z-10 text-right text-slate-400">{order.total.toFixed(2)}</div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-slate-50 flex items-center justify-between">
        <h3 className="text-sm md:text-base font-bold text-slate-800">Order Book</h3>
        <div className="text-[10px] md:text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">
          Spread: <span className="text-slate-600">${spread.toFixed(2)}</span>
        </div>
      </div>

      {/* Header Row */}
      <div className="grid grid-cols-3 px-2 py-2 border-b border-slate-50">
        <div className="text-[10px] font-bold text-slate-400 uppercase">Price</div>
        <div className="text-[10px] font-bold text-slate-400 uppercase text-right">Amount</div>
        <div className="text-[10px] font-bold text-slate-400 uppercase text-right">Total</div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Asks (Sells) */}
        <div className="flex flex-col-reverse">
          {asks.map((ask, i) => <Row key={`ask-${i}`} order={ask} type="ask" />)}
        </div>

        {/* Current Price / Mid Market */}
        <div className="bg-slate-50/50 py-2 px-2 border-y border-slate-100 my-1 flex justify-between items-center">
          <span className={`text-sm font-black ${spreadPercent > 0.5 ? 'text-orange-500' : 'text-slate-800'}`}>
            ${parseFloat(orderBook.bids[0][0]).toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-400">{spreadPercent.toFixed(3)}% Spread</span>
        </div>

        {/* Bids (Buys) */}
        <div className="flex flex-col">
          {bids.map((bid, i) => <Row key={`bid-${i}`} order={bid} type="bid" />)}
        </div>
      </div>
    </div>
  );
};

const OrderBookSkeleton = () => (
  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100 animate-pulse">
    <div className="h-4 bg-slate-100 rounded w-1/2 mb-6"></div>
    {[...Array(12)].map((_, i) => (
      <div key={i} className="h-4 bg-slate-50 rounded mb-2"></div>
    ))}
  </div>
);

export default OrderBook;