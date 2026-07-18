import AccordionContainer from "@/components/AccordionContainer";
import ReviewPanel from "../components/ReviewPanel";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#F5F7FB] px-4 py-6 md:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto grid gap-6 rounded-[36px] border border-[#E6EAF2] bg-[#FAFBFD] p-4 shadow-[0_24px_90px_rgba(15,23,42,0.08)] md:p-6 lg:p-8 xl:grid-cols-3 ultra:grid-cols-1">
        <div className="min-w-0 space-y-6 xl:col-span-2 ultra:col-span-1">
          <AccordionContainer />
        </div>

        <div className="w-full lg:sticky lg:top-6 lg:self-start xl:col-span-1 ultra:static ultra:col-span-1">
          <ReviewPanel />
        </div>
      </div>
    </main>
  );
}