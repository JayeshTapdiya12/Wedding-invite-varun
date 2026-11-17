import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Sparkles, ArrowDown } from "lucide-react";
import { weddingData } from "../data/weddingData";

const weddingTimestamp = Date.parse(weddingData.weddingDateISO);

export default function Hero() {
    const calculateTimeLeft = (now) => {
        const difference = weddingTimestamp - now;
        if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            isComplete: false,
        };
    };

    const [now, setNow] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeLeft = now === null ? null : calculateTimeLeft(now);

    return (
        <section id="home" className="hero-section relative min-h-[92svh] w-full flex flex-col items-center justify-center text-[#FAF6F0] px-4 pt-28 pb-14 overflow-hidden">
            <div className="hero-backdrop absolute inset-0" aria-hidden="true" />
            <div className="hero-grain absolute inset-0 pointer-events-none" aria-hidden="true" />
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative z-10 max-w-4xl w-full text-center"
            >
                <p className="font-serif text-lg sm:text-xl text-[#F3E5AB] tracking-widest mb-4">
                    {weddingData.blessingQuote}
                </p>

                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#F3E5AB] text-xs sm:text-sm tracking-[0.2em] mb-6">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{weddingData.hashtag}</span>
                </div>

                <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#F3E5AB]/90 mb-5">
                    Together with their families
                </p>

                <div className="my-5">
                    <h1 className="font-royal text-5xl sm:text-7xl md:text-8xl font-medium gold-gradient-text tracking-wide leading-[1.05]">
                        <span className="block">{weddingData.groom.firstName}</span>
                        <span className="my-1 block font-serif text-3xl font-normal italic text-[#E9DCC5] sm:text-4xl">&amp;</span>
                        <span className="block">{weddingData.bride.firstName}</span>
                    </h1>
                    <p className="font-serif text-sm sm:text-lg text-[#FAF6F0]/85 tracking-[0.28em] uppercase mt-4">
                        {weddingData.groom.lastName} &amp; {weddingData.bride.lastName}
                    </p>
                </div>

                <p className="font-serif italic text-base sm:text-xl text-[#FAF6F0]/90 max-w-2xl mx-auto leading-relaxed mt-6">
                    {weddingData.inviteMessage}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm sm:text-base text-[#F3E5AB] mt-8">
                    <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#D4AF37]" />
                        {weddingData.dateRange}
                    </span>
                    <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                        {weddingData.city}
                    </span>
                </div>

                <p className="text-[10px] uppercase tracking-[0.3em] text-[#F3E5AB]/75 mt-9">
                    {timeLeft?.isComplete ? "The wedding day is here" : "The wedding day begins in"}
                </p>
                <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-lg mx-auto mt-3">
                    {[
                        { label: "Days", value: timeLeft?.days },
                        { label: "Hours", value: timeLeft?.hours },
                        { label: "Mins", value: timeLeft?.minutes },
                        { label: "Secs", value: timeLeft?.seconds },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="countdown-tile rounded-xl border border-[#D4AF37]/45 bg-[#24040A]/60 backdrop-blur-sm py-3 px-2"
                        >
                            <div className="font-royal text-xl sm:text-3xl font-medium text-[#F3E5AB]">
                                {item.value === undefined ? "--" : String(item.value).padStart(2, "0")}
                            </div>
                            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#D4AF37] mt-1">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
                <a href="#story" className="inline-flex items-center gap-2 mt-9 text-xs uppercase tracking-[0.25em] text-[#F3E5AB] hover:text-white transition-colors">
                    Explore the invitation <ArrowDown className="w-4 h-4" />
                </a>
            </motion.div>
        </section>
    );
}