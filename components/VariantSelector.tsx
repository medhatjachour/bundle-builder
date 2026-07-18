import { ProductVariant } from "@/utils/bundle";

type Props = {
  variants: ProductVariant[];
  active: string | null;
  onSelect: (id: string) => void;
};

const swatchClasses: Record<string, string> = {
  white: 'bg-[#F8FAFC] ring-1 ring-[#CBD5E1]',
  grey: 'bg-[#94A3B8]',
  gray: 'bg-[#94A3B8]',
  black: 'bg-[#0F172A]',
};

export default function VariantSelector({ variants, active, onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 whitespace-nowrap">
      {variants.map((variant) => {
        const isActive = active === variant.id;
        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant.id)}
            className={`min-w-[100px] cursor-pointer flex items-center gap-2 rounded-md border px-1  py-.5 text-sm font-medium transition ${isActive ? 'border-[#4A6CF6] bg-[#EEF2FF] text-[#2E42B3]' : 'border-[#E2E8F0] bg-white text-[#334155]'}`}
          >
            {variant.image ? (
              <img src={variant.image} alt={variant.label} className="h-8 w-8 rounded-full object-cover" />
            ) : <span className="h-8 w-8 rounded-full bg-[#F8FAFC]"></span>}
            <span>{variant.label}</span>
          </button>
        );
      })}
    </div>
  );
}
