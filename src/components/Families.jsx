import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { weddingData } from "../data/weddingData";

function FamilyStory({ story, index }) {
    return (
        <motion.article
            id={story.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className={`family-story-card ${index % 2 ? "family-story-reverse" : ""}`}
        >
            <div className="family-story-copy">
                <p className="section-eyebrow">{story.eyebrow}</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight text-[#102D27] sm:text-4xl">{story.heading}</h3>
                <p className="mt-4 max-w-xl font-serif text-lg leading-relaxed text-[#4C5549]">{story.note}</p>
            </div>
            <div className="family-portraits">
                {story.portraits.map((portrait) => (
                    <figure key={portrait.label} className="family-portrait">
                        <img src={portrait.image} alt={portrait.imageAlt} loading="lazy" />
                        <figcaption>
                            <span>{portrait.label}</span>
                            <small>{portrait.name}</small>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </motion.article>
    );
}

export default function Families() {
    return (
        <section id="families" className="family-section px-5 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-7xl">
                <header className="mx-auto mb-14 max-w-3xl text-center">
                    <Sparkles className="mx-auto mb-4 h-6 w-6 text-[#A77C45]" aria-hidden="true" />
                    <p className="section-eyebrow">The people who made us</p>
                    <h2 className="section-title mt-3">Two families. One beautiful beginning.</h2>
                    <p className="mt-4 font-serif text-xl text-[#4C5549]">A celebration of the love, laughter, and traditions that brought everyone here.</p>
                </header>

                <div className="family-union mb-16 grid overflow-hidden rounded-2xl border border-[#C6A46A]/45 bg-[#102D27] md:grid-cols-2">
                    {weddingData.familyHosts.slice(0, 2).map((host) => (
                        <article key={host.role} className="family-union-side">
                            <img src={host.image} alt={host.imageAlt} loading="lazy" />
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.25em] text-[#D8C49E]">{host.role}</p>
                                <h3 className="mt-2 font-serif text-2xl text-[#F8F3E9]">{host.names}</h3>
                                <p className="mt-2 font-serif italic text-[#E9DCC5]/75">{host.title}</p>
                            </div>
                        </article>
                    ))}
                    <div className="family-union-caption md:col-span-2">
                        <Heart className="h-4 w-4 text-[#C6A46A]" aria-hidden="true" />
                        <p className="font-serif text-xl italic text-[#F8F3E9]">Two families, one celebration, endless love.</p>
                    </div>
                </div>

                <div className="space-y-12 sm:space-y-16">
                    {weddingData.familyStories.map((story, index) => (
                        <FamilyStory key={story.id} story={story} index={index} />
                    ))}
                </div>
                <p className="mt-10 text-center text-xs text-[#596355]">
                    Family names, stories, and photographs are editable placeholders until the families approve them.
                </p>
            </div>
        </section>
    );
}
