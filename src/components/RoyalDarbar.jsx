import { useState } from "react";
import { Heart, Send, Crown } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function RoyalDarbar() {
    const [guestName, setGuestName] = useState("");
    const [attending, setAttending] = useState("Joyfully Attending");
    const [message, setMessage] = useState("");
    const [blessings, setBlessings] = useState([
        {
            name: "Kabra & Rathi Cousins",
            status: "Joyfully Attending",
            text: "Counting down the days to dance at #jabVmetR! Wishing Varun Bhaiya and Radhika Bhabhi a lifetime of royal happiness.",
        },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!guestName.trim() || !message.trim()) return;
        setBlessings([{ name: guestName, status: attending, text: message }, ...blessings]);
        setGuestName("");
        setMessage("");
    };

    return (
        <section className="py-20 px-4 bg-[#2A060D] text-[#FAF6F0] border-t-2 border-[#D4AF37]/50">
            <div className="max-w-4xl mx-auto">
                {/* Family Hosts */}
                <div className="text-center mb-16">
                    <Crown className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
                    <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">
                        With Warm Regards
                    </span>
                    <h2 className="font-royal text-3xl sm:text-4xl font-bold gold-gradient-text mt-2">
                        The Royal Hosts
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                        {weddingData.familyHosts.map((host) => (
                            <div
                                key={host.role}
                                className="rounded-2xl border border-[#D4AF37]/40 bg-[#3D0A14]/70 p-6 text-center"
                            >
                                <p className="text-xs uppercase tracking-widest text-[#D4AF37] mb-2">
                                    {host.role}
                                </p>
                                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F3E5AB]">
                                    {host.names}
                                </h3>
                                <p className="font-serif italic text-sm text-[#FAF6F0]/75 mt-1">
                                    {host.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RSVP & Royal Blessings Form */}
                <div className="rounded-3xl border-2 border-[#D4AF37]/50 bg-[#360811] p-6 sm:p-10 shadow-2xl">
                    <div className="text-center mb-8">
                        <h3 className="font-royal text-2xl sm:text-3xl text-[#F3E5AB]">
                            RSVP &amp; Royal Blessings
                        </h3>
                        <p className="font-serif italic text-lg text-[#FAF6F0]/80 mt-1">
                            Confirm your presence &amp; leave a heartfelt wish for Varun &amp; Radhika
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Your Full Name"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                required
                                className="w-full rounded-xl bg-[#24040A] border border-[#D4AF37]/40 px-4 py-3 text-sm text-[#FAF6F0] placeholder-[#FAF6F0]/40 focus:outline-none focus:border-[#D4AF37]"
                            />
                            <select
                                value={attending}
                                onChange={(e) => setAttending(e.target.value)}
                                className="w-full rounded-xl bg-[#24040A] border border-[#D4AF37]/40 px-4 py-3 text-sm text-[#FAF6F0] focus:outline-none focus:border-[#D4AF37]"
                            >
                                <option value="Joyfully Attending">Joyfully Attending</option>
                                <option value="Attending with Family">Attending with Family</option>
                                <option value="Sending Blessings from Afar">Sending Blessings from Afar</option>
                            </select>
                        </div>

                        <textarea
                            rows="3"
                            placeholder="Write your blessings for Varun & Radhika..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            className="w-full rounded-xl bg-[#24040A] border border-[#D4AF37]/40 px-4 py-3 text-sm text-[#FAF6F0] placeholder-[#FAF6F0]/40 focus:outline-none focus:border-[#D4AF37]"
                        />

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-[#2A060D] font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:brightness-110 transition cursor-pointer"
                        >
                            <Send className="w-4 h-4" />
                            Send Royal Blessing &amp; RSVP
                        </button>
                    </form>

                    {/* Posted Blessings Wall */}
                    <div className="mt-10 space-y-4 max-w-xl mx-auto">
                        {blessings.map((item, idx) => (
                            <div
                                key={idx}
                                className="rounded-2xl border border-[#D4AF37]/30 bg-[#24040A]/80 p-4"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-serif font-bold text-lg text-[#F3E5AB] flex items-center gap-1.5">
                                        <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                                        {item.name}
                                    </span>
                                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37]">
                                        {item.status}
                                    </span>
                                </div>
                                <p className="font-serif italic text-base text-[#FAF6F0]/85">
                                    “{item.text}”
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}