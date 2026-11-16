import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Navigation, Sparkles } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function Events() {
    const [selectedDay, setSelectedDay] = useState("all");

    const filteredEvents =
        selectedDay === "all"
            ? weddingData.events
            : weddingData.events.filter((e) => e.date.includes(selectedDay));

    return (
        <section className="py-20 px-4 silk-pattern">
            <div className="max-w-5xl mx-auto">
                {/* Section Heading */}
                <div className="text-center mb-12">
                    <span className="text-xs uppercase tracking-[0.35em] text-[#8B1E2F] font-semibold">
                        Royal Itinerary
                    </span>
                    <h2 className="font-royal text-3xl sm:text-5xl font-bold text-[#3D0A14] mt-2">
                        Wedding Celebrations
                    </h2>
                    <p className="font-serif italic text-lg sm:text-xl text-[#5C3A2E] mt-2">
                        Two days of love, music, traditions, and royal festivities
                    </p>

                    {/* Day Filter Tabs */}
                    <div className="inline-flex rounded-full border border-[#D4AF37] bg-white/90 p-1 mt-8 shadow-sm">
                        {[
                            { id: "all", label: "All Ceremonies" },
                            { id: "13", label: "13 Dec" },
                            { id: "14", label: "14 Dec" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedDay(tab.id)}
                                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${selectedDay === tab.id
                                        ? "bg-[#3D0A14] text-[#F3E5AB] shadow"
                                        : "text-[#3D0A14] hover:bg-[#FAF6F0]"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Jharokha Event Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredEvents.map((event, index) => {
                        const isNight = event.theme === "night";
                        return (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`jharokha-arch border-2 border-[#D4AF37]/70 pt-14 pb-8 px-6 sm:px-10 text-center shadow-xl transition-transform hover:-translate-y-1 ${isNight
                                        ? "bg-gradient-to-b from-[#3D0A14] to-[#26050B] text-[#FAF6F0]"
                                        : "bg-gradient-to-b from-white to-[#FDF8EE] text-[#2C1810]"
                                    }`}
                            >
                                <span
                                    className={`inline-block text-xs uppercase tracking-[0.25em] font-semibold mb-2 ${isNight ? "text-[#D4AF37]" : "text-[#8B1E2F]"
                                        }`}
                                >
                                    {event.day} • {event.date}
                                </span>

                                <h3
                                    className={`font-royal text-2xl sm:text-3xl font-bold mb-4 ${isNight ? "gold-gradient-text" : "text-[#3D0A14]"
                                        }`}
                                >
                                    {event.title}
                                </h3>

                                {/* Time & Venue */}
                                <div className="space-y-2 font-serif text-lg mb-6">
                                    <p className="flex items-center justify-center gap-2">
                                        <Clock className="w-4 h-4 text-[#D4AF37]" />
                                        <span>{event.time}</span>
                                    </p>
                                    <p className="flex items-center justify-center gap-2 font-semibold">
                                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                                        <span>{event.venue}</span>
                                    </p>
                                    <p
                                        className={`text-sm ${isNight ? "text-[#FAF6F0]/75" : "text-[#5C3A2E]"
                                            }`}
                                    >
                                        {event.address}
                                    </p>
                                </div>

                                {/* Dress Code & Interactive Color Swatches */}
                                <div
                                    className={`rounded-2xl p-4 mb-6 border ${isNight
                                            ? "bg-black/25 border-[#D4AF37]/30"
                                            : "bg-[#FAF6F0] border-[#D4AF37]/40"
                                        }`}
                                >
                                    <p className="text-xs uppercase tracking-widest text-[#D4AF37] flex items-center justify-center gap-1.5 mb-1">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        Royal Dress Code
                                    </p>
                                    <p className="font-serif italic text-base mb-3">
                                        {event.dressCode}
                                    </p>
                                    <div className="flex items-center justify-center gap-3">
                                        {event.swatches.map((swatch) => (
                                            <div key={swatch.name} className="flex flex-col items-center">
                                                <span
                                                    className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                                                    style={{ backgroundColor: swatch.hex }}
                                                    title={swatch.name}
                                                />
                                                <span className="text-[10px] mt-1 opacity-80">
                                                    {swatch.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigate Button */}
                                <a
                                    href={event.mapLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-[#2A060D] font-semibold text-xs uppercase tracking-widest shadow-md hover:brightness-110 transition"
                                >
                                    <Navigation className="w-3.5 h-3.5" />
                                    View Venue Location
                                </a>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}