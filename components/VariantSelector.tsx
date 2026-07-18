type Variant = { id: string; label: string };

type Props = {
  variants: Variant[];
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
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => {
        const isActive = active === variant.id;
        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant.id)}
            className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition ${isActive ? 'border-[#4A6CF6] bg-[#EEF2FF] text-[#2E42B3]' : 'border-[#E2E8F0] bg-white text-[#334155]'}`}
          >
            <span className={`h-3.5 w-3.5 rounded-full ${swatchClasses[variant.id] ?? 'bg-[#CBD5E1]'}`} />
            <span>{variant.label}</span>
          </button>
        );
      })}
    </div>
  );
}
