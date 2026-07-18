import products from '../data/products.json';

export type ProductVariant = {
  id: string;
  label: string;
  image?: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  compareAt?: number;
  discount?: number;
  category: string;
  image: string;
  variants?: ProductVariant[];
};

export type ProductCatalog = {
  cameras: Product[];
  plan: Product[];
  sensors: Product[];
  accessories: Product[];
};

export type BundleData = Record<string, Record<string, number | Record<string, number>>>;

const catalog = products as ProductCatalog;

export function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}

export function getProductQuantity(
  bundle: BundleData,
  category: string,
  productId: string,
  variantId: string | null
) {
  const categoryBundle = bundle[category] ?? {};

  if (variantId) {
    const entry = categoryBundle[productId];
    if (typeof entry === 'object' && entry !== null) {
      return entry[variantId] ?? 0;
    }
    return 0;
  }

  const entry = categoryBundle[productId];
  return typeof entry === 'number' ? entry : 0;
}

export function getSelectedCount(bundle: BundleData, category: string) {
  const categoryBundle = bundle[category] ?? {};

  return Object.values(categoryBundle).filter((entry) => {
    if (typeof entry === 'number') {
      return entry > 0;
    }

    if (typeof entry === 'object' && entry !== null) {
      return Object.values(entry).some((value) => value > 0);
    }

    return false;
  }).length;
}

export function getReviewItems(bundle: BundleData) {
  const entries: Array<{
    categoryKey: keyof ProductCatalog;
    categoryLabel: string;
    product: Product;
    variantId?: string;
    variantLabel?: string;
    quantity: number;
    total: number;
    compareAtTotal: number;
    image: string;
    title: string;
  }> = [];

  const categoryOrder: Array<{ key: keyof ProductCatalog; label: string }> = [
    { key: 'cameras', label: 'Cameras' },
    { key: 'sensors', label: 'Sensors' },
    { key: 'accessories', label: 'Accessories' },
    { key: 'plan', label: 'Plan' },
  ];

  categoryOrder.forEach(({ key, label }) => {
    catalog[key].forEach((product) => {
      const categoryBundle = bundle[key] ?? {};

      if (product.variants?.length) {
        const variantMap =
          typeof categoryBundle[product.id] === 'object' && categoryBundle[product.id] !== null
            ? (categoryBundle[product.id] as Record<string, number>)
            : {};

        product.variants.forEach((variant) => {
          const quantity = variantMap[variant.id] ?? 0;
          if (quantity > 0) {
            entries.push({
              categoryKey: key,
              categoryLabel: label,
              product,
              variantId: variant.id,
              variantLabel: variant.label,
              quantity,
              total: product.price * quantity,
              compareAtTotal: (product.compareAt ?? product.price) * quantity,
              image: product.image,
              title: `${product.title} · ${variant.label}`,
            });
          }
        });
      } else {
        const quantityValue = categoryBundle[product.id];
        const quantity = typeof quantityValue === 'number' ? quantityValue : 0;
        if (quantity > 0) {
          entries.push({
            categoryKey: key,
            categoryLabel: label,
            product,
            quantity,
            total: product.price * quantity,
            compareAtTotal: (product.compareAt ?? product.price) * quantity,
            image: product.image,
            title: product.title,
          });
        }
      }
    });
  });

  return entries;
}
