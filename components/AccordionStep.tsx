import { ReactNode } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

type Props = {
  stepNumber: number;
  title: string;
  iconSrc?: string;
  isOpen?: boolean;
  selectedCount?: number;
  children?: ReactNode;
  onToggle?: () => void;
  onNext?: () => void;
  nextLabel?: string;
};

export default function AccordionStep({
  stepNumber,
  title,
  iconSrc,
  isOpen = false,
  selectedCount = 0,
  children,
  onToggle,
  onNext,
  nextLabel,
}: Props) {
  return (
    <section className={`bg-[#EDF4FF] overflow-hidden rounded-[24px] border  shadow-sm transition ${isOpen ? 'border-[#4A6CF6]' : 'border-[#E6EAF2]'}`}>
      <button type="button" onClick={onToggle} className="cursor-pointer flex w-full items-center justify-between px-5 py-4 text-left">
        <div className="flex items-center gap-3">
         
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.24em] text-[#64748B]">Step {stepNumber} of 4</p>
            <div className="flex items-center gap-2">
              {iconSrc ? (
                <img src={iconSrc} alt="" aria-hidden="true" className="h-4 w-4 shrink-0 object-contain" />
              ) : null}
              <h2 className="text-lg font-semibold text-[#0F172A]">{title}</h2>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`rou nded-full px-3 py-1 text-sm font-medium ${isOpen ? 'bg-[#EFF6FF] text-[#2563EB]' : 'bg-[#F8FAFC] text-[#64748B]'}`}>
            {selectedCount} selected
          </span>
          <span className=" text-xl text-[#64748B]">
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </span>
        </div>
      </button>
      {isOpen && <div className="border-t  border-[#EEF2F7] px-5 py-5">
        <div className="space-y-4">{children}</div>
        {onNext && nextLabel && (
          <div className="mt-6 flex justify-center">
            <button type="button" onClick={onNext} className="rounded-md border border-[#4A6CF6] px-8 py-2.5 text-[18px] font-semibold leading-[24px] text-[#4A6CF6] transition hover:bg-white hover:text-[#4A6CF6] focus:outline-none focus:ring-2 focus:ring-[#4A6CF6] focus:ring-offset-2 cursor-pointer">
              {nextLabel}
            </button>
          </div>
        )}
      </div>}
    </section>
  );
}
