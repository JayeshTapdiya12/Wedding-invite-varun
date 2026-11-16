import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function Hero() {
    const calculateTimeLeft = () => {
        const difference = +new Date(weddingData.weddingDateISO) - +new Date();
        if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#3D0A14] via-[#4A0E17] to-[#2B060D] text-[#FAF6F0] px-4 py-16 overflow-hidden">
            {/* Subtle Mandala / Radial Halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] sm:w-[720px] sm:h-[720px] rounded-full border border-[#D4AF37]/15 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] rounded-full border border-dashed border-[#D4AF37]/20 pointer-events-none" />

            {/* Outer Palace Arch Frame */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative z-10 max-w-2xl w-full jharokha-arch border-2 border-[#D4AF37]/60 bg-[#32070F]/80 backdrop-blur-md px-6 sm:px-12 pt-16 pb-12 text-center shadow-[0_25px_70px_rgba(0,0,0,0.6)]"
            >
                {/* Sacred Invocation */}
                <p className="font-serif text-lg sm:text-xl text-[#F3E5AB] tracking-widest mb-2">
                    {weddingData.blessingQuote}
                </p>

                {/* Hashtag Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#F3E5AB] text-xs sm:text-sm tracking-[0.2em] mb-6">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{weddingData.hashtag}</span>
                </div>

                {/* Invitation Text */}
                <p className="font-serif italic text-base sm:text-xl text-[#FAF6F0]/85 max-w-lg mx-auto leading-relaxed mb-8">
                    {weddingData.inviteMessage}
                </p>

                {/* Groom & Bride Names */}
                <div className="my-6">
                    <h1 className="font-royal text-4xl sm:text-6xl font-bold gold-gradient-text tracking-wide leading-tight">
                        {weddingData.groom.firstName}
                    </h1>
                    <p className="font-serif text-lg sm:text-xl text-[#F3E5AB]/90 tracking-[0.25em] uppercase mt-1">
                        {weddingData.groom.lastName}
                    </p>

                    <div className="flex items-center justify-center gap-4 my-4">
                        <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                        <span className="font-royal text-2xl text-[#D4AF37]">&amp;</span>
                        <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                    </div>

                    <h1 className="font-royal text-4xl sm:text-6xl font-bold gold-gradient-text tracking-wide leading-tight">
                        {weddingData.bride.firstName}
                    </h1>
                    <p className="font-serif text-lg sm:text-xl text-[#F3E5AB]/90 tracking-[0.25em] uppercase mt-1">
                        {weddingData.bride.lastName}
                    </p>
                </div>

                {/* Date & City */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm sm:text-base text-[#F3E5AB] mt-8 pt-6 border-t border-[#D4AF37]/25">
                    <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#D4AF37]" />
                        {weddingData.dateRange}
                    </span>
                    <span className="hidden sm:inline text-[#D4AF37]">•</span>
                    <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                        {weddingData.city}
                    </span>
                </div>

                {/* Royal Countdown */}
                <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-md mx-auto mt-8">
                    {[
                        { label: "Days", value: timeLeft.days },
                        { label: "Hours", value: timeLeft.hours },
                        { label: "Mins", value: timeLeft.minutes },
                        { label: "Secs", value: timeLeft.seconds },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-xl border border-[#D4AF37]/40 bg-[#24040A]/90 py-3 px-2"
                        >
                            <div className="font-royal text-xl sm:text-3xl font-bold text-[#F3E5AB]">
                                {String(item.value).padStart(2, "0")}
                            </div>
                            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-[#D4AF37] mt-1">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}