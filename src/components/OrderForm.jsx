// components/OrderForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { binanceService } from '../services/binanceService';

const OrderForm = ({ activeMarket, onPlaceOrder }) => {
  const [side, setSide] = useState('buy');
  const [orderType, setOrderType] = useState('market');
  const [amount, setAmount] = useState('');
  
  const { data: priceData } = useQuery({
    queryKey: ['price', activeMarket],
    queryFn: () => binanceService.getTickerPrice(activeMarket),
    refetchInterval: 1000,
  });

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: { amount: '', limitPrice: '' },
  });

  const currentPrice = priceData ? parseFloat(priceData.price) : 0;

  const handlePercentage = (percentage) => {
    const balance = 10000; 
    const maxAmount = balance / (orderType === 'limit' && watch('limitPrice') ? watch('limitPrice') : currentPrice);
    const calculatedAmount = maxAmount * (percentage / 100);
    const formatted = calculatedAmount.toFixed(4);
    setAmount(formatted);
    setValue('amount', formatted);
  };

  const onSubmit = (data) => {
    const order = {
      side,
      type: orderType,
      market: activeMarket,
      amount: parseFloat(data.amount),
      price: orderType === 'limit' ? parseFloat(data.limitPrice) : currentPrice,
      timestamp: new Date().toISOString(),
    };
    onPlaceOrder(order);
    setAmount('');
    setValue('amount', '');
    setValue('limitPrice', '');
  };

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
      <div className="p-4 md:p-8 space-y-5 md:space-y-6">
        <h3 className="text-base md:text-lg font-bold text-slate-800">Place Order</h3>
        
        {/* Buy/Sell Toggle - Taller touch targets for mobile */}
        <div className="flex bg-slate-50 rounded-xl md:rounded-2xl p-1 md:p-1.5">
          <button
            type="button"
            onClick={() => setSide('buy')}
            className={`flex-1 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-all ${
              side === 'buy' ? 'bg-[#10B981] text-white shadow-sm' : 'text-slate-400'
            }`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => setSide('sell')}
            className={`flex-1 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-xs md:text-sm transition-all ${
              side === 'sell' ? 'bg-[#EF4444] text-white shadow-sm' : 'text-slate-400'
            }`}
          >
            Sell
          </button>
        </div>

        {/* Order Type Toggle */}
        <div className="flex bg-slate-50 rounded-xl md:rounded-2xl p-1 md:p-1.5">
          {['market', 'limit'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setOrderType(type)}
              className={`flex-1 py-2 md:py-2.5 rounded-lg md:rounded-xl font-bold text-xs md:text-sm capitalize transition-all ${
                orderType === type ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          {/* Price Input */}
          {orderType === 'limit' && (
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">
                Price (USDT)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  {...register('limitPrice', { required: orderType === 'limit' })}
                  placeholder={currentPrice.toFixed(2)}
                  className="w-full bg-slate-50 rounded-xl md:rounded-2xl py-3 px-4 md:px-5 font-bold text-sm md:text-base border-none focus:ring-2 focus:ring-emerald-100 outline-none"
                />
                <span className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 text-xs md:text-sm font-bold text-slate-300">USDT</span>
              </div>
            </div>
          )}

          {/* Amount Input */}
          <div className="space-y-1.5 md:space-y-2">
            <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider">
              Amount ({activeMarket})
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.0001"
                {...register('amount', { required: true })}
                value={amount}
                onChange={(e) => {
                   setAmount(e.target.value);
                   setValue('amount', e.target.value);
                }}
                placeholder="0.00"
                className="w-full bg-slate-50 rounded-xl md:rounded-2xl py-3 px-4 md:px-5 font-bold text-base md:text-lg border-none focus:ring-2 focus:ring-emerald-100 outline-none"
              />
              <span className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 text-xs md:text-sm font-bold text-slate-300">{activeMarket}</span>
            </div>
          </div>

          {/* Percentage Buttons - Taller for easier tapping */}
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {[25, 50, 75, 100].map((percentage) => (
              <button
                key={percentage}
                type="button"
                onClick={() => handlePercentage(percentage)}
                className="py-2 md:py-2.5 bg-slate-50 rounded-lg md:rounded-xl text-[10px] md:text-xs font-black text-slate-500 hover:bg-slate-100 transition-colors"
              >
                {percentage}%
              </button>
            ))}
          </div>

          {/* Balance & Info - Compressed for mobile */}
          <div className="space-y-1 text-xs md:text-sm pt-2 md:pt-0">
            <div className="flex justify-between items-center text-slate-400">
              <span>Available</span>
              <span className="font-bold text-slate-700">$10,000.00</span>
            </div>
            {amount > 0 && (
              <div className="flex justify-between items-center pt-2 mt-2 border-t border-slate-50">
                <span className="text-slate-400">Est. Total</span>
                <span className="font-black text-slate-900 text-sm md:text-base">
                  ${(parseFloat(amount) * (orderType === 'limit' ? watch('limitPrice') : currentPrice)).toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Submit Button - Large and prominent */}
          <button
            type="submit"
            className={`w-full py-3.5 md:py-4 rounded-xl md:rounded-2xl font-black text-white text-sm md:text-lg transition-all active:scale-[0.97] shadow-lg ${
              side === 'buy' ? 'bg-[#10B981] shadow-emerald-100' : 'bg-[#EF4444] shadow-red-100'
            }`}
          >
            {side === 'buy' ? `BUY ${activeMarket}` : `SELL ${activeMarket}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;