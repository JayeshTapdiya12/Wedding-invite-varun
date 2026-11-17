import { Sparkles } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function Closing() {
    return (
        <section className="closing-section px-5 py-20 text-center text-[#F8F3E9] sm:px-8 sm:py-28">
            <Sparkles className="mx-auto mb-7 h-6 w-6 text-[#C6A46A]" aria-hidden="true" />
            <div className="mx-auto max-w-3xl space-y-2 font-serif text-2xl leading-relaxed sm:text-3xl">
                {weddingData.closingMessage.map((line) => <p key={line}>{line}</p>)}
            </div>
            <div className="my-9 flex items-center justify-center gap-4 text-[#C6A46A]" aria-hidden="true">
                <span className="h-px w-14 bg-[#C6A46A]/55" />
                <span>✦</span>
                <span className="h-px w-14 bg-[#C6A46A]/55" />
            </div>
            <p className="font-serif text-4xl italic sm:text-6xl">
                {weddingData.bride.firstName} <span className="text-[#C6A46A]">&amp;</span> {weddingData.groom.firstName}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-[#E9DCC5]/75">{weddingData.dateRange} · {weddingData.city}</p>
        </section>
    );
}
