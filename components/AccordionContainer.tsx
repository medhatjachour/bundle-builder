'use client';

import { useMemo, useState } from 'react';
import AccordionStep from './AccordionStep';
import ProductCard from './ProductCard';
import products from '../data/products.json';
import { getSelectedCount } from '../utils/bundle';
import { useBundleStore } from '../store/bundleStore';

const steps = [
  { key: 'cameras', title: 'Choose your cameras', category: 'cameras', iconSrc: '/products/livestream.svg' },
  { key: 'plan', title: 'Choose your plan', category: 'plan', iconSrc: '/products/logo_hms_new%201.svg' },
  { key: 'sensors', title: 'Choose your sensors', category: 'sensors', iconSrc:'/products/Group%201417.png' },
  { key: 'accessories', title: 'Add extra protection', category: 'accessories', iconSrc: '/products/Frame%201419.png' },
] as const;

export default function AccordionContainer() {
  const [activeStep, setActiveStep] = useState(1);
  const { bundle } = useBundleStore();

  const selectedCounts = useMemo(
    () =>
      steps.reduce<Record<string, number>>((acc, step) => {
        acc[step.category] = getSelectedCount(bundle, step.category);
        return acc;
      }, {}),
    [bundle]
  );

  const toggleStep = (stepNumber: number) => {
    setActiveStep((current) => (current === stepNumber ? 0 : stepNumber));
  };

  return (
    <div className="space-y-4 ">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isOpen = activeStep === stepNumber;

        return (
          <AccordionStep
            key={step.key}
            stepNumber={stepNumber}
            title={step.title}
            iconSrc={step.iconSrc}
            isOpen={isOpen}
            selectedCount={selectedCounts[step.category] ?? 0}
            onToggle={() => toggleStep(stepNumber)}
            onNext={() => setActiveStep(stepNumber + 1)}
            nextLabel={stepNumber < steps.length ? `Next: ${steps[stepNumber].title}` : undefined}
          >
         <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 3xl:grid-cols-5">
              {products[step.category as keyof typeof products].map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </AccordionStep>
        );
      })}
    </div>
  );
}
