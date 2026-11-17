import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { weddingData } from "../data/weddingData";

const messages = [
    { sender: "Friend 1", text: "Guys, I have BIG news..." },
    { sender: "Friend 2", text: "Spill ittt!" },
    { sender: "Friend 3", text: "Wait... WHAT?!" },
    { sender: "Friend 1", text: `${weddingData.groom.firstName} & ${weddingData.bride.firstName} are getting married! 🥹` },
];

export default function EnvelopeIntro({ isOpen, onOpen }) {
    const [messageCount, setMessageCount] = useState(0);
    const [announcement, setAnnouncement] = useState(false);
    const [soundOn, setSoundOn] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const audioContextRef = useRef(null);
    const openTimerRef = useRef(null);

    const handleOpen = useCallback(() => {
        if (isOpening) return;
        setIsOpening(true);
        openTimerRef.current = window.setTimeout(onOpen, 820);
    }, [isOpening, onOpen]);

    useEffect(() => {
        if (isOpen || announcement) return undefined;
        const timer = window.setInterval(() => {
            setMessageCount((count) => {
                if (count >= messages.length) {
                    window.clearInterval(timer);
                    return count;
                }
                return count + 1;
            });
        }, 1350);
        return () => window.clearInterval(timer);
    }, [isOpen, announcement]);

    useEffect(() => {
        if (messageCount < messages.length || isOpen) return undefined;
        const timer = window.setTimeout(() => setAnnouncement(true), 900);
        return () => window.clearTimeout(timer);
    }, [messageCount, isOpen]);

    useEffect(() => {
        if (!announcement || isOpen || isOpening) return undefined;
        const timer = window.setTimeout(handleOpen, 5000);
        return () => window.clearTimeout(timer);
    }, [announcement, isOpen, isOpening, handleOpen]);

    useEffect(() => {
        if (!soundOn || messageCount === 0 || isOpen) return undefined;
        const AudioContext = window.AudioContext;
        if (!AudioContext) return undefined;

        const context = audioContextRef.current ?? new AudioContext();
        audioContextRef.current = context;
        if (context.state === "suspended") void context.resume();
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = 660;
        gain.gain.setValueAtTime(0.06, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.12);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.12);
        return undefined;
    }, [messageCount, soundOn, isOpen]);

    useEffect(() => () => {
        if (audioContextRef.current) void audioContextRef.current.close();
    }, []);

    useEffect(() => () => window.clearTimeout(openTimerRef.current), []);

    useEffect(() => {
        if (isOpen) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    const introMessages = messages.slice(0, messageCount);

    return (
        <AnimatePresence>
            {!isOpen && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.035 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="intro-screen fixed inset-0 z-50 flex min-h-svh items-center justify-center overflow-y-auto px-4 py-8 text-white"
                >
                    <div className="intro-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className={`intro-curtain pointer-events-none absolute inset-0 z-20 ${isOpening ? "intro-curtain-opening" : ""}`} aria-hidden="true">
                        <span className="intro-curtain-panel intro-curtain-left" />
                        <span className="intro-curtain-panel intro-curtain-right" />
                    </div>
                    <div className="absolute right-5 top-5 z-20 flex items-center gap-2 sm:right-8 sm:top-8">
                        <button
                            type="button"
                            onClick={() => setSoundOn((enabled) => !enabled)}
                            disabled={isOpening}
                            className="intro-utility-button"
                            aria-label={soundOn ? "Turn intro sound off" : "Turn intro sound on"}
                            aria-pressed={soundOn}
                        >
                            {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                            <span>{soundOn ? "Sound on" : "Sound off"}</span>
                        </button>
                        <button type="button" onClick={handleOpen} disabled={isOpening} className="intro-utility-button">
                            Skip intro <span aria-hidden="true">↗</span>
                        </button>
                    </div>

                    <div className="relative z-10 mx-auto w-full max-w-xl text-center">
                        <AnimatePresence mode="wait">
                            {!announcement ? (
                                <motion.div
                                    key="chat"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    className="intro-chat-card mx-auto max-w-lg overflow-hidden rounded-[1.7rem] text-left"
                                >
                                    <div className="intro-chat-header flex items-center gap-3 px-5 py-4">
                                        <div className="intro-avatar flex h-11 w-11 items-center justify-center rounded-full text-xl" aria-hidden="true">💍</div>
                                        <div>
                                            <p className="font-semibold text-[#F8F3E9]">Shaadi Squad 💍</p>
                                            <p className="text-xs text-[#D7DDCF]/75">friends &amp; family · the group chat</p>
                                        </div>
                                        <span className="ml-auto text-xs text-[#D7DDCF]/60">today</span>
                                    </div>
                                    <div className="space-y-3 px-4 py-6 sm:px-6" aria-live="polite" aria-label="Wedding announcement group chat">
                                        {introMessages.map((message, index) => (
                                            <motion.div
                                                key={`${message.sender}-${index}`}
                                                initial={{ opacity: 0, x: index % 2 ? 18 : -18, y: 5 }}
                                                animate={{ opacity: 1, x: 0, y: 0 }}
                                                transition={{ duration: 0.35 }}
                                                className={`max-w-[88%] ${index % 2 ? "ml-auto text-right" : ""}`}
                                            >
                                                <p className="mb-1 px-2 text-[10px] uppercase tracking-[0.16em] text-[#D7DDCF]/65">{message.sender}</p>
                                                <p className={`inline-block rounded-2xl px-4 py-3 text-left text-sm sm:text-base ${index % 2 ? "intro-bubble-outgoing" : "intro-bubble-incoming"}`}>
                                                    {message.text}
                                                </p>
                                            </motion.div>
                                        ))}
                                        {messageCount < messages.length && (
                                            <div className="flex items-center gap-2 px-2 pt-2 text-xs text-[#D7DDCF]/65" aria-label="Someone is typing">
                                                <span className="typing-dots" aria-hidden="true"><i /><i /><i /></span>
                                                Someone is typing…
                                            </div>
                                        )}
                                    </div>
                                    <div className="intro-chat-footer flex items-center justify-between gap-4 px-5 py-4">
                                        <span className="text-xs text-[#D7DDCF]/70">A little family-group-chat energy</span>
                                        <span className="text-xs font-medium text-[#E9DCC5]">{weddingData.hashtag}</span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="announcement"
                                    initial={{ opacity: 0, scale: 0.86, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ type: "spring", stiffness: 150, damping: 16 }}
                                    className="py-12"
                                >
                                    <p className="text-xs uppercase tracking-[0.35em] text-[#D5C39B]">The biggest news of the year</p>
                                    <h1 className="intro-announcement mt-5 text-5xl font-bold leading-[0.92] sm:text-7xl">
                                        We’re<br />getting married!
                                    </h1>
                                    <p className="mt-7 font-serif text-3xl text-[#E9DCC5] sm:text-4xl">
                                        {weddingData.bride.firstName}
                                        <span className="mx-3 text-[#C6A46A]">×</span>
                                        {weddingData.groom.firstName}
                                    </p>
                                    <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#E9DCC5]/75">{weddingData.dateRange}</p>
                                    <p className="mt-6 font-serif text-xl italic text-[#D7DDCF]">Two hearts. Two families. One beautiful forever.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="button"
                            onClick={handleOpen}
                            disabled={isOpening}
                            className="intro-enter-button mt-7 inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition hover:-translate-y-0.5"
                        >
                            Enter the celebration <span aria-hidden="true">→</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
