import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function Story() {
    return (
        <section id="story" className="story-section relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65 }}
                    className="relative mx-auto w-full max-w-md"
                >
                    <div className="story-photo overflow-hidden rounded-t-[48%] border border-[#C7A96B]/70 p-2">
                        <img
                            src={weddingData.story.image}
                            alt={weddingData.story.imageAlt}
                            className="h-[440px] w-full rounded-t-[48%] object-cover"
                            loading="lazy"
                        />
                    </div>
                    <div className="absolute -bottom-5 -right-2 rounded-full border border-[#C7A96B]/70 bg-[#F8F3E9] px-6 py-4 text-center shadow-lg sm:-right-8">
                        <p className="font-serif text-2xl italic text-[#1D463A]">Save the date</p>
                        <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#51453D]">{weddingData.dateRange}</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.65, delay: 0.12 }}
                    className="text-center md:text-left"
                >
                    <Sparkles className="mx-auto mb-4 h-6 w-6 text-[#A77C2D] md:mx-0" aria-hidden="true" />
                    <p className="section-eyebrow">{weddingData.story.eyebrow}</p>
                    <h2 className="section-title mt-3">{weddingData.story.heading}</h2>
                    <div className="ornamental-divider my-6" aria-hidden="true"><span>✦</span></div>
                    <p className="font-serif text-xl leading-relaxed text-[#4C5549] sm:text-2xl">
                        {weddingData.story.message}
                    </p>
                    <p className="mt-7 font-serif text-lg italic text-[#1D463A]">
                        {weddingData.groom.firstName} &amp; {weddingData.bride.firstName}
                    </p>
                </motion.div>
            </div>
            <div className="mx-auto mt-20 max-w-4xl">
                <h3 className="text-center font-serif text-3xl italic text-[#1D463A]">A story only they can tell</h3>
                <div className="story-timeline mt-9">
                    {weddingData.story.moments.map((moment, index) => (
                        <article key={moment.title} className="story-moment">
                            <span className="story-moment-number" aria-hidden="true">0{index + 1}</span>
                            <div>
                                <p className="section-eyebrow">{moment.year}</p>
                                <h4 className="mt-2 font-serif text-2xl text-[#102D27]">{moment.title}</h4>
                                <p className="mt-2 font-serif text-lg leading-relaxed text-[#4C5549]">{moment.text}</p>
                            </div>
                        </article>
                    ))}
                </div>
                <p className="mt-7 text-center text-xs text-[#596355]">Replace these prompts with Varun and Radhika’s real story.</p>
            </div>
        </section>
    );
}
