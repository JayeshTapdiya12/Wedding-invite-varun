import { Play } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function Film() {
    return (
        <section id="film" className="film-section px-5 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-6xl">
                <header className="mb-9 text-center">
                    <p className="section-eyebrow">A moving memory</p>
                    <h2 className="section-title mt-3">Their story, in motion</h2>
                </header>
                <div className="film-frame">
                    {weddingData.filmUrl ? (
                        <video controls preload="metadata" playsInline className="film-video">
                            <source src={weddingData.filmUrl} />
                            Your browser does not support video playback.
                        </video>
                    ) : (
                        <div className="film-placeholder">
                            <img src={weddingData.filmPoster} alt="" loading="lazy" />
                            <div className="film-placeholder-copy">
                                <span className="film-play-icon" aria-hidden="true"><Play className="h-5 w-5 fill-current" /></span>
                                <p className="font-serif text-2xl text-[#F8F3E9] sm:text-3xl">A place for their wedding film</p>
                                <p className="mt-2 text-sm text-[#E9DCC5]/75">Add a family-approved video URL in the wedding details to make it playable.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
