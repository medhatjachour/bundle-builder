'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useBundleStore } from '../store/bundleStore';
import QuantityStepper from './QuantityStepper';
import VariantSelector from './VariantSelector';
import type { Product } from '../utils/bundle';
import { formatCurrency, getProductQuantity } from '../utils/bundle';

export default function ProductCard({ product }: { product: Product }) {
  const { bundle, addItem } = useBundleStore();
  const [activeVariant, setActiveVariant] = useState<string | null>(product.variants?.[0]?.id ?? null);

  const quantity = getProductQuantity(bundle, product.category, product.id, activeVariant);

  const handleVariantSelect = (variantId: string) => {
    setActiveVariant(variantId);
  };

  const handleQuantityChange = (nextValue: number) => {
    addItem(product.category, product.id, activeVariant, nextValue);
  };

  const handleCardSelect = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardSelect();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleCardSelect}
      onKeyDown={handleCardKeyDown}
      className={`group relative overflow-hidden rounded-3xl border bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-xl cursor-pointer
        ${quantity > 0
          ? 'border-2 border-[#4A6CF6] shadow-[0_0_0_3px_rgba(74,108,246,0.1)]'
          : 'border-[#E6EAF2] hover:border-[#D1D9E8] '
        }`}
    >
      {/* Top Bar */}
      <div className="flex items-start justify-between mb-5">
        <div>
        {product.badge && (
          <div className="rounded-full bg-[#5B21B6] px-4 py-1 text-xs font-semibold text-white">
            {product.badge}
          </div>
        )}
        </div>
      
      </div>

      {/* Image Container */}
      <div className="mb-6 flex justify-center rounded-2xl p-6 border border-[#E8EEF8]">
        <div className="relative">
          <Image
            src={product.image}
            alt={product.title}
            width={280}
            height={280}
            className="h-56 w-full max-w-[260px] object-contain transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div>
          <h3 className="text-[18px] font-semibold leading-[24px] text-[#1F1F1F]">{product.title}</h3>
          <p className="mt-2 text-[14px] font-medium leading-[24px] text-[#1F1F1F]/75">
            {product.description}{' '}
            <a
              href="#"
              onClick={(event) => event.stopPropagation()}
              className="text-sm font-semibold text-[#4A6CF6] hover:underline"
            >
              Learn More
            </a>
          </p>
        </div>

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <VariantSelector
            variants={product.variants}
            active={activeVariant}
            onSelect={handleVariantSelect}
          />
        )}

        {/* Price + Quantity */}
        <div className="flex items-end justify-between pt-4 border-t border-[#EEF2F7]">
          <div>
            <div className="text-xs text-[#64748B]">Starting at</div>
            <div className="flex items-baseline gap-2">
              {product.compareAt && (
                <span className="text-sm line-through text-[#94A3B8]">
                  {formatCurrency(product.compareAt)}
                </span>
              )}
              <span className="text-2xl font-semibold text-[#0F172A]">
                {formatCurrency(product.price)}
              </span>
            </div>
          </div>

          <div onClick={(event) => event.stopPropagation()}>
            <QuantityStepper value={quantity} onChange={handleQuantityChange} />
          </div>
        </div>
      </div>
    </article>
  );
}