"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useBundleStore } from "../store/bundleStore";
import { formatCurrency, getReviewItems } from "../utils/bundle";
import QuantityStepper from "./QuantityStepper";

const categoryOrder = ["Cameras", "Sensors", "Accessories", "Plan"] as const;

export default function ReviewPanel() {
  const { bundle, addItem } = useBundleStore();
  const [saved, setSaved] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const reviewItems = useMemo(() => getReviewItems(bundle), [bundle]);
  const groupedItems = useMemo(() => {
    return categoryOrder.reduce<Record<string, typeof reviewItems>>(
      (acc, category) => {
        acc[category] = reviewItems.filter(
          (item) => item.categoryLabel === category,
        );
        return acc;
      },
      {} as Record<string, typeof reviewItems>,
    );
  }, [reviewItems]);

  const subtotal = reviewItems.reduce(
    (sum, item) => sum + item.compareAtTotal,
    0,
  );
  const total = reviewItems.reduce((sum, item) => sum + item.total, 0);
  const savings = subtotal - total;

  return (
    <aside className="rounded-[36px] border border-[#E6EAF2] bg-[#F8FAFF] p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:p-7">
      <div className="mt-6 grid grid-cols-1 gap-6 ultra:grid-cols-2">
        <div className="px-2 lg:px-8">
          <div className="flex items-start justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#64748B]">
                Review panel
              </p>
              <h2 className="mt-2 text-[28px] font-semibold text-[#0F172A]">
                Your security system
              </h2>
              <p className="mt-2 text-[16px] font-medium leading-[24px] text-[#1F1F1F]/75">
                Review your personalized protection system designed to keep what
                matters most safe.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-6">
            {categoryOrder.map((category) => {
              const items = groupedItems[category];
              if (!items.length) return null;

              return (
                <div key={category}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#64748B]">
                    {category}
                  </h3>
                  <div className="mt-3 space-y-3">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.variantId ?? "base"}`}
                        className="flex items-center gap-3 rounded-[20px] border border-[#EDEFF5] bg-white p-3 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-xl object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-[#0F172A]">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#64748B]">
                            {item.quantity} selected
                          </p>
                        </div>
                        <QuantityStepper
                          value={item.quantity}
                          onChange={(nextValue) => {
                            if (
                              item.product.variants?.length &&
                              item.variantId
                            ) {
                              addItem(
                                item.product.category,
                                item.product.id,
                                item.variantId,
                                nextValue,
                              );
                            } else {
                              addItem(
                                item.product.category,
                                item.product.id,
                                null,
                                nextValue,
                              );
                            }
                          }}
                        />
                        <div className="flex flex-col items-end gap-1 text-right">
                          {item.compareAtTotal > item.total ? (
                            <>
                              <span className="text-sm text-[#94A3B8] line-through">
                                {formatCurrency(item.compareAtTotal)}
                              </span>
                              <span className="font-semibold text-[#4E2FD2]">
                                {formatCurrency(item.total)}
                              </span>
                            </>
                          ) : (
                            <span className="font-semibold text-[#4E2FD2]">
                              {formatCurrency(item.total)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="mt-8 px-8 overflow-hidden rounded-[28px] borde p-5 text-white shadow-[0_16px_48px_rgba(15,23,42,0.08)]">
            <div className="items-center gap-8">
              <div className="  flex  pr-16 gap-16  justify-between rounded-[22px] bg-white/15 p-2 backdrop-blur-sm">
                <Image
                  src="/products/badge.png"
                  alt="Savings badge"
                  width={200}
                  height={200}
                  className=" min-w-[200px] h-full  object-contain"
                />
                  <div className="mt-6 flex flex-col items-baseline gap-2">
                  <span className="text-[24px] text-[#1F1F1F] font-semibold ">
                  30-day hassle-free returns
                  </span>
                  <span className="text-[24px] mt-6 text-[#1F1F1F] text-normal wrap">
                 If you a   re not totally in love with the product, we will refund you 100%.
                  </span>
                </div>
                
              </div>
              <div className="mt-3 flex flex-row  justify-between items-baseline gap-14">
                <div className="inline-flex mt-4 rounded-md bg-[#4E2FD2] px-3 py-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-white/90">
                  As low as $19.19/mo
                </div>
              
                <p className="mt-2">
                 
                 <span className="line-through text-gray-600 text-3xl">234.43</span>
                    <span className="text-[#4E2FD2] text-5xl font-semibold">  $199.22</span>
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 rounded-full border border-[#D1FAE5] bg-[#ECFDF3] px-4 py-2 text-center text-sm font-semibold text-[#047857]">
            Congrats! You’re saving $50.92 on your security bundle!
          </p>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() =>
                setCheckoutMessage(
                  "Checkout is ready for review in this prototype.",
                )
              }
              className="w-full rounded-md bg-[#4E2FD2] cursor-pointer px-4 py-5 text-lg font-semibold text-white transition  hover:bg-[#3452c9]"
            >
              Checkout
            </button>
            <button
              type="button"
              onClick={() => {
                setSaved(true);
                setCheckoutMessage(
                  "Your system is saved locally for your next visit.",
                );
              }}
              className="w-full text-[18px] font-normal italic tracking-[0.02em] text-[#484848] hover:underline"
            >
              {saved ? "Saved locally ✓" : "Save my system for later"}
            </button>
            {checkoutMessage ? (
              <p className="text-center text-sm text-[#64748B]">
                {checkoutMessage}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  );
}
