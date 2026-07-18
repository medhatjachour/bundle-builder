'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useBundleStore } from '../store/bundleStore';
import { formatCurrency, getReviewItems } from '../utils/bundle';
import QuantityStepper from './QuantityStepper';

const categoryOrder = ['Cameras', 'Sensors', 'Accessories', 'Plan'] as const;

export default function ReviewPanel() {
  const { bundle, addItem } = useBundleStore();
  const [saved, setSaved] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const reviewItems = useMemo(() => getReviewItems(bundle), [bundle]);
  const groupedItems = useMemo(() => {
    return categoryOrder.reduce<Record<string, typeof reviewItems>>((acc, category) => {
      acc[category] = reviewItems.filter((item) => item.categoryLabel === category);
      return acc;
    }, {} as Record<string, typeof reviewItems>);
  }, [reviewItems]);

  const subtotal = reviewItems.reduce((sum, item) => sum + item.compareAtTotal, 0);
  const total = reviewItems.reduce((sum, item) => sum + item.total, 0);
  const savings = subtotal - total;

  return (
    <aside className="rounded-[32px] border border-[#E6EAF2] bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#64748B]">Your bundle</p>
          <h2 className="text-2xl font-semibold text-[#0F172A]">Your security system</h2>
        </div>
        <div className="rounded-full border border-[#D1FAE5] bg-[#ECFDF3] px-3 py-1 text-sm font-semibold text-[#047857]">
          In stock
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {categoryOrder.map((category) => {
          const items = groupedItems[category];
          if (!items.length) return null;

          return (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#64748B]">{category}</h3>
              <div className="mt-3 space-y-3">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.variantId ?? 'base'}`} className="flex items-center gap-3 rounded-[18px] border border-[#EEF2F7] bg-[#FCFDFF] p-3">
                    <Image src={item.image} alt={item.title} width={48} height={48} className="h-12 w-12 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#0F172A]">{item.title}</p>
                      <div className="mt-1 flex items-center gap-2 text-sm text-[#64748B]">
                        <span>{formatCurrency(item.total)}</span>
                        <span className="text-xs">•</span>
                        <span>{item.quantity} selected</span>
                      </div>
                    </div>
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(nextValue) => {
                        if (item.product.variants?.length && item.variantId) {
                          addItem(item.product.category, item.product.id, item.variantId, nextValue);
                        } else {
                          addItem(item.product.category, item.product.id, null, nextValue);
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-[24px] border border-[#EEF2F7] bg-[#F8FAFC] p-4 text-sm text-[#334155]">
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span className="font-semibold text-[#0F172A]">Free</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-semibold text-[#047857]">30-day satisfaction guarantee</span>
          <span className="font-semibold text-[#0F172A]">Included</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[#64748B]">
          <span>0% financing for 24 months</span>
          <span className="font-medium text-[#0F172A]">Available</span>
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-[#F5D0FE] bg-[#FEF7FF] p-4">
        <div className="flex items-center justify-between text-sm text-[#7C3AED]">
          <span>Estimated total</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#A78BFA] line-through">{formatCurrency(subtotal)}</span>
            <span className="text-xl font-semibold text-[#6D28D9]">{formatCurrency(total)}</span>
          </div>
        </div>
        <div className="mt-3 rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#7C3AED]">
          You save {formatCurrency(savings)} with your bundle
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={() => setCheckoutMessage('Checkout is ready for review in this prototype.')}
          className="w-full rounded-full bg-[#4A6CF6] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3452c9]"
        >
          Checkout
        </button>
        <button
          type="button"
          onClick={() => {
            setSaved(true);
            setCheckoutMessage('Your system is saved locally for your next visit.');
          }}
          className="w-full text-sm font-semibold text-[#4A6CF6] hover:underline"
        >
          {saved ? 'Saved locally ✓' : 'Save my system for later'}
        </button>
        {checkoutMessage ? <p className="text-center text-sm text-[#64748B]">{checkoutMessage}</p> : null}
      </div>
    </aside>
  );
}
