import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { weddingData } from "../data/weddingData";

const categories = ["All memories", ...new Set(weddingData.gallery.map((photo) => photo.category))];

export default function Gallery() {
    const [category, setCategory] = useState(categories[0]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const touchStart = useRef(null);
    const dialogRef = useRef(null);
    const closeButtonRef = useRef(null);
    const photos = category === categories[0]
        ? weddingData.gallery
        : weddingData.gallery.filter((photo) => photo.category === category);
    const selectedImage = selectedIndex < 0 ? null : photos[selectedIndex];

    useEffect(() => {
        if (!selectedImage) return undefined;
        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const closeOnKey = (event) => {
            if (event.key === "Escape") setSelectedIndex(-1);
            if (event.key === "ArrowRight") setSelectedIndex((index) => (index + 1) % photos.length);
            if (event.key === "ArrowLeft") setSelectedIndex((index) => (index - 1 + photos.length) % photos.length);
            if (event.key === "Tab") {
                const controls = dialogRef.current?.querySelectorAll("button:not(:disabled)");
                if (!controls?.length) return;
                const first = controls[0];
                const last = controls[controls.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };
        closeButtonRef.current?.focus();
        window.addEventListener("keydown", closeOnKey);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", closeOnKey);
            if (previousFocus instanceof HTMLElement) previousFocus.focus();
        };
    }, [selectedImage, photos.length]);

    const moveImage = (direction) => {
        setSelectedIndex((index) => (index + direction + photos.length) % photos.length);
    };

    const handleTouchStart = (event) => {
        touchStart.current = event.changedTouches[0]?.clientX ?? null;
    };

    const handleTouchEnd = (event) => {
        if (touchStart.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(delta) > 55) moveImage(delta < 0 ? 1 : -1);
        touchStart.current = null;
    };

    return (
        <section id="gallery" className="gallery-section px-5 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-7xl">
                <header className="mb-10 text-center sm:mb-14">
                    <p className="section-eyebrow">Memories through the years</p>
                    <h2 className="section-title mt-3">A thousand memories, one beautiful celebration</h2>
                    <p className="mx-auto mt-4 max-w-2xl font-serif text-lg text-[#E9DCC5]/80 sm:text-xl">
                        Childhood, family, festivals, and the moments that made them who they are.
                    </p>
                    <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-[#E9DCC5]/60">
                        Photo frames are placeholders. Add family-approved photographs in <code>public/images</code> and update the gallery in <code>src/data/weddingData.js</code>.
                    </p>
                </header>

                <div className="gallery-filters mb-9" role="group" aria-label="Filter memories by category">
                    {categories.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => {
                                setCategory(item);
                                setSelectedIndex(-1);
                            }}
                            aria-pressed={category === item}
                            className={`gallery-filter ${category === item ? "gallery-filter-active" : ""}`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div className="gallery-grid">
                    {photos.map((item, index) => (
                        <motion.button
                            key={`${item.category}-${item.title}`}
                            type="button"
                            onClick={() => setSelectedIndex(index)}
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
                            className={`gallery-card gallery-card-${index + 1} group relative overflow-hidden rounded-sm text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C6A46A]`}
                            aria-label={`View ${item.category} memory placeholder: ${item.title}`}
                        >
                            <img src={item.image} alt={item.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                            <span className="gallery-caption absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                                <span>
                                    <span className="block text-[9px] uppercase tracking-[0.2em] text-[#E9DCC5]/75">{item.category}</span>
                                    <span className="mt-1 block font-serif text-xl text-white sm:text-2xl">{item.title}</span>
                                </span>
                                <span className="mb-1 text-sm text-[#E9DCC5]" aria-hidden="true">↗</span>
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="gallery-lightbox fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
                        onClick={() => setSelectedIndex(-1)}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="gallery-caption"
                        ref={dialogRef}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <button ref={closeButtonRef} type="button" onClick={() => setSelectedIndex(-1)} className="lightbox-control absolute right-4 top-4 sm:right-7 sm:top-7" aria-label="Close image viewer">
                            <X className="h-5 w-5" />
                        </button>
                        <button type="button" onClick={(event) => { event.stopPropagation(); moveImage(-1); }} className="lightbox-control absolute left-3 top-1/2 -translate-y-1/2 sm:left-8" aria-label="Previous image">
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <figure className="mx-12 max-h-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
                            <img src={selectedImage.image} alt={selectedImage.alt} className="max-h-[76vh] w-full object-contain" />
                            <figcaption id="gallery-caption" className="mt-4 text-center">
                                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#E9DCC5]/70">{selectedImage.category}</span>
                                <span className="mt-1 block font-serif text-xl text-[#F8F3E9]">{selectedImage.title}</span>
                            </figcaption>
                        </figure>
                        <button type="button" onClick={(event) => { event.stopPropagation(); moveImage(1); }} className="lightbox-control absolute right-3 top-1/2 -translate-y-1/2 sm:right-8" aria-label="Next image">
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
