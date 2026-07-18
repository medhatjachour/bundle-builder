import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BundleData = Record<string, Record<string, number | Record<string, number>>>;

export type BundleState = {
  bundle: BundleData;
  addItem: (
    category: string,
    productId: string,
    variantId: string | null,
    qty: number
  ) => void;
};

const initialBundle: BundleData = {
  cameras: {},
  sensors: { 'motion-sensor': 1 },
  accessories: { 'sd-card': 1 },
  plan: { 'cam-unlimited': 1 },
};

export const useBundleStore = create<BundleState>()(
  persist(
    (set) => ({
      bundle: initialBundle,
      addItem: (category, productId, variantId, qty) =>
        set((state) => {
          const updated = { ...state.bundle };
          const categoryBundle = { ...(updated[category] ?? {}) };

          if (variantId) {
            const productBundle = { ...((categoryBundle[productId] as Record<string, number>) ?? {}) };
            productBundle[variantId] = qty;
            categoryBundle[productId] = productBundle;
          } else {
            categoryBundle[productId] = qty;
          }

          updated[category] = categoryBundle;
          return { bundle: updated };
        }),
    }),
    {
      name: 'bundle-storage',
      partialize: (state) => ({ bundle: state.bundle }),
    }
  )
);
