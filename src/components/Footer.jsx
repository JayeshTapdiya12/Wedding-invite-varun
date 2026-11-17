import { weddingData } from "../data/weddingData";

export default function Footer({ onReplay }) {
    return (
        <footer className="wedding-footer py-12 px-4 text-center text-[#F8F3E9] border-t border-[#C6A46A]/30">
            <p className="font-royal text-2xl sm:text-3xl gold-gradient-text tracking-widest">
                {weddingData.groom.firstName} &amp; {weddingData.bride.firstName}
            </p>
            <p className="font-serif italic text-lg text-[#E9DCC5]/80 mt-1">
                {weddingData.hashtag} • {weddingData.dateRange}
            </p>
            <p className="text-xs uppercase tracking-[0.25em] text-[#E9DCC5]/65 mt-6">
                Made with love, for a celebration of forever.
            </p>
            <button type="button" onClick={onReplay} className="footer-replay">Replay the opening</button>
        </footer>
    );
}