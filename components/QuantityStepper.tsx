import { FiMinus, FiPlus } from 'react-icons/fi';

type Props = {
  value: number;
  onChange: (val: number) => void;
};

export default function QuantityStepper({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-2 py-1.5 shadow-sm">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value <= 0}
        className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-[#334155] transition hover:bg-[#F1F5F9] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FiMinus />
      </button>
      <span className="min-w-7 text-center text-sm font-semibold text-[#0F172A]">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-[#334155] transition hover:bg-[#F1F5F9]"
      >
        <FiPlus />
      </button>
    </div>
  );
}
