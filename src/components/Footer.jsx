import { weddingData } from "../data/weddingData";

export default function Footer() {
    return (
        <footer className="py-12 px-4 bg-[#1C0308] text-center text-[#FAF6F0] border-t border-[#D4AF37]/30">
            <p className="font-royal text-2xl sm:text-3xl gold-gradient-text tracking-widest">
                {weddingData.groom.firstName} &amp; {weddingData.bride.firstName}
            </p>
            <p className="font-serif italic text-lg text-[#F3E5AB]/80 mt-1">
                {weddingData.hashtag} • {weddingData.dateRange}
            </p>
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]/70 mt-6">
                Crafted with Love by the Groom’s Brother
            </p>
        </footer>
    );
}