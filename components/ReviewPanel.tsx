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

  const subtotalLabel = formatCurrency(subtotal);
  const totalLabel = formatCurrency(total);
  const savingsLabel = formatCurrency(savings);

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
                        className="flex items-center gap-3 p-3 "
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
          <div className="mt-8 overflow-hidden rounded-[28px] border border-[#E6EAF2] bg-gradient-to-br from-[#4E2FD2] via-[#4A6CF6] to-[#4E2FD2] p-5 text-white shadow-[0_16px_48px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-[22px] bg-white/15 p-3 backdrop-blur-sm">
                <Image
                  src="/products/badge.png"
                  alt="Savings badge"
                  width={120}
                  height={120}
                  className="h-24 w-24 object-contain"
                />
                <div className="ml-4 flex-1">
                  <p className="text-[16px] font-semibold leading-6 text-white">
                    30-day hassle-free returns
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/80">
                    If you are not totally in love with the product, we will refund you 100%.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex rounded-full bg-white/15 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
                  As low as $19.19/mo
                </div>
                <div className="text-right">
                  <p className="text-[24px] font-semibold text-white">{totalLabel}</p>
                  <p className="text-sm text-white/70 line-through">{subtotalLabel}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[24px] border border-[#EDEFF5] bg-[#F8FAFC] p-4">
            <div className="flex items-center justify-between text-sm text-[#64748B]">
              <span>Shipping</span>
              <span className="font-semibold text-[#0F172A]">Free</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#047857]">
                30-day satisfaction guarantee
              </span>
              <span className="font-semibold text-[#0F172A]">Included</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-[#64748B]">
              <span>0% financing for 24 months</span>
              <span className="font-semibold text-[#0F172A]">Available</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-[#EDEFF5] pt-4">
              <div>
                <p className="text-sm text-[#64748B]">Bundle total</p>
                <p className="text-xs text-[#64748B]">You save {savingsLabel}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#94A3B8] line-through">{subtotalLabel}</p>
                <p className="text-xl font-semibold text-[#4E2FD2]">{totalLabel}</p>
              </div>
            </div>
          </div>

          <p className="mt-4 rounded-full border border-[#D1FAE5] bg-[#ECFDF3] px-4 py-2 text-center text-sm font-semibold text-[#047857]">
            Congrats! You’re saving {savingsLabel} on your security bundle!
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
