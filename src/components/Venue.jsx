import { ExternalLink, MapPin } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function Venue() {
    return (
        <section id="venue" className="venue-section px-5 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                    <MapPin className="mb-4 h-6 w-6 text-[#A77C45]" aria-hidden="true" />
                    <p className="section-eyebrow">We’ll save you a place</p>
                    <h2 className="section-title mt-3">Find your way to our celebration</h2>
                    <p className="mt-4 max-w-xl font-serif text-xl leading-relaxed text-[#4C5549]">
                        We look forward to welcoming you in {weddingData.city}. Select a celebration for its location and directions.
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-[#596355]">
                        Venue names and address details are editable draft content. Confirm the exact locations with the families before guests rely on these directions.
                    </p>
                    <div className="mt-8 space-y-3">
                        {weddingData.events.map((event) => (
                            <article key={event.id} className="venue-event">
                                <div>
                                    <h3 className="font-serif text-xl text-[#102D27]">{event.title}</h3>
                                    <p className="mt-1 text-sm text-[#596355]">{event.venue} · {event.address}</p>
                                </div>
                                <a href={event.mapLink} target="_blank" rel="noopener noreferrer" aria-label={`Directions for ${event.title}`} className="venue-directions">
                                    Directions <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                            </article>
                        ))}
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-[#596355]">
                        Map preview shows the city area. Please verify each venue’s exact address and map pin before sharing the invitation.
                    </p>
                </div>
                <div className="venue-map-wrap">
                    <iframe
                        title={`Map overview of ${weddingData.city}`}
                        src={weddingData.venueDetails.mapEmbedUrl}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="venue-map"
                    />
                    <p className="venue-map-label">A map overview of {weddingData.city}</p>
                </div>
            </div>
        </section>
    );
}
