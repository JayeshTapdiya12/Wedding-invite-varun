import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function EnvelopeIntro({ isOpen, onOpen }) {
    return (
        <AnimatePresence>
            {!isOpen && (
                <motion.div
                    exit={{ opacity: 0, scale: 1.08 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#2A060D] text-[#FAF6F0] px-4 overflow-hidden"
                >
                    {/* Decorative Corner Gold Frames */}
                    <div className="absolute inset-4 sm:inset-8 border border-[#D4AF37]/40 pointer-events-none" />
                    <div className="absolute inset-6 sm:inset-10 border border-[#D4AF37]/20 pointer-events-none" />

                    {/* Subtle Radial Glow */}
                    <div className="absolute w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 flex flex-col items-center text-center max-w-md"
                    >
                        <p className="font-serif text-lg sm:text-xl tracking-widest text-[#F3E5AB] mb-3">
                            {weddingData.blessingQuote}
                        </p>

                        <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] mb-8">
                            Royal Wedding Invitation
                        </span>

                        {/* Royal Envelope Card */}
                        <div className="relative w-72 sm:w-80 h-48 bg-gradient-to-br from-[#4A0E17] to-[#2E070D] border-2 border-[#D4AF37]/70 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-col items-center justify-center p-6 mb-8">
                            {/* Envelope Flap Lines */}
                            <div
                                className="absolute inset-x-0 top-0 h-24 border-b border-[#D4AF37]/40"
                                style={{
                                    clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                                    background: "rgba(212, 175, 55, 0.08)",
                                }}
                            />

                            <p className="font-royal text-2xl sm:text-3xl gold-gradient-text tracking-wider mt-6">
                                V &amp; R
                            </p>
                            <p className="font-serif italic text-sm text-[#F3E5AB]/80 mt-1">
                                {weddingData.hashtag}
                            </p>

                            {/* Interactive Wax Seal Button */}
                            <motion.button
                                onClick={onOpen}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.94 }}
                                className="mt-4 group relative w-16 h-16 rounded-full bg-gradient-to-br from-[#B91C1C] via-[#991B1B] to-[#7F1D1D] border-2 border-[#F3E5AB] shadow-[0_0_25px_rgba(212,175,55,0.5)] flex items-center justify-center cursor-pointer"
                                aria-label="Open Royal Invitation"
                            >
                                <span className="absolute inset-1 rounded-full border border-[#F3E5AB]/50" />
                                <span className="font-royal text-sm font-bold text-[#F3E5AB] tracking-tighter">
                                    V•R
                                </span>
                            </motion.button>
                        </div>

                        <button
                            onClick={onOpen}
                            className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#F3E5AB] hover:text-[#D4AF37] transition-colors cursor-pointer"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                            Tap the Royal Seal to Open
                            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}