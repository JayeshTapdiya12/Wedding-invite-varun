import { useState } from "react";
import { Crown, Heart, Send } from "lucide-react";
import { weddingData } from "../data/weddingData";

const fieldClassName =
    "w-full rounded-xl border border-[#C6A46A]/35 bg-white px-4 py-3 text-sm text-[#242522] placeholder:text-[#596355]/75 focus:border-[#1D463A] focus:outline-none focus:ring-2 focus:ring-[#1D463A]/15";

export default function RoyalDarbar() {
    const [guestName, setGuestName] = useState("");
    const [phone, setPhone] = useState("");
    const [attendance, setAttendance] = useState("Attending");
    const [guestCount, setGuestCount] = useState("1");
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [mealPreference, setMealPreference] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState({ kind: "idle", message: "" });
    const [submitting, setSubmitting] = useState(false);

    const endpointUrl = weddingData.rsvpConfig.endpointUrl.trim();
    const whatsappNumber = weddingData.rsvpPhone.replace(/\D/g, "");
    const hasValidWhatsappNumber = /^\d{8,15}$/.test(whatsappNumber);
    const isConnected = Boolean(endpointUrl || hasValidWhatsappNumber);

    const toggleEvent = (eventId) => {
        setSelectedEvents((events) => events.includes(eventId)
            ? events.filter((id) => id !== eventId)
            : [...events, eventId]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isConnected || submitting) return;
        const submission = {
            name: guestName.trim(),
            phone: phone.trim(),
            attendance,
            guestCount: attendance === "Attending" ? Number(guestCount) : 0,
            events: attendance === "Attending" ? selectedEvents : [],
            mealPreference: attendance === "Attending" ? mealPreference : "",
            message: message.trim(),
        };

        if (endpointUrl) {
            setSubmitting(true);
            setStatus({ kind: "idle", message: "" });
            try {
                const endpoint = new URL(endpointUrl, window.location.origin);
                const isLocalEndpoint = endpoint.hostname === "localhost" || endpoint.hostname === "127.0.0.1";
                if (endpoint.protocol !== "https:" && !isLocalEndpoint) {
                    throw new Error("The RSVP endpoint must use HTTPS.");
                }
                const response = await fetch(endpointUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(submission),
                });
                if (!response.ok) {
                    throw new Error(`The RSVP service returned status ${response.status}.`);
                }
                setStatus({ kind: "success", message: "Thank you. Your RSVP has been received." });
                setGuestName("");
                setPhone("");
                setSelectedEvents([]);
                setMealPreference("");
                setMessage("");
            } catch (error) {
                setStatus({
                    kind: "error",
                    message: error instanceof Error ? error.message : "We could not submit your RSVP. Please try again.",
                });
            } finally {
                setSubmitting(false);
            }
            return;
        }

        const reply = [
            `Wedding RSVP for ${weddingData.groom.firstName} & ${weddingData.bride.firstName}`,
            `Name: ${submission.name}`,
            `Phone: ${submission.phone}`,
            `Response: ${attendance}`,
            attendance === "Attending" ? `Guests: ${guestCount}` : "",
            submission.events.length ? `Events: ${submission.events.map((id) => weddingData.events.find((item) => item.id === id)?.title).filter(Boolean).join(", ")}` : "",
            submission.mealPreference ? `Meal preference: ${submission.mealPreference}` : "",
            submission.message ? `Message: ${submission.message}` : "",
        ].filter(Boolean).join("\n");
        window.location.assign(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(reply)}`);
    };

    return (
        <section id="rsvp" className="rsvp-section px-5 py-20 sm:px-8 sm:py-28">
            <div className="mx-auto max-w-7xl">
                <header className="mb-12 text-center">
                    <Crown className="mx-auto mb-4 h-6 w-6 text-[#A77C45]" aria-hidden="true" />
                    <p className="section-eyebrow">Your love and blessings mean everything</p>
                    <h2 className="section-title mt-3">Be part of our celebration</h2>
                    <p className="mx-auto mt-4 max-w-2xl font-serif text-lg text-[#4C5549] sm:text-xl">
                        Kindly reply so the families can welcome you with care.
                    </p>
                </header>

                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
                    <aside className="host-panel">
                        <p className="text-[10px] uppercase tracking-[0.25em] text-[#D8C49E]">With warm regards</p>
                        <h3 className="mt-3 font-serif text-3xl text-[#F8F3E9]">The Kabra &amp; Rathi families</h3>
                        <p className="mt-3 font-serif text-lg leading-relaxed text-[#E9DCC5]/80">
                            We would be honoured to celebrate these special days with you.
                        </p>
                        <div className="mt-8 space-y-4">
                            {weddingData.familyHosts.slice(0, 2).map((host) => (
                                <div key={host.role} className="host-family">
                                    <Heart className="mt-1 h-4 w-4 shrink-0 text-[#C6A46A]" aria-hidden="true" />
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#D8C49E]">{host.role}</p>
                                        <p className="mt-1 font-serif text-xl text-[#F8F3E9]">{host.names}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="mt-8 border-t border-[#C6A46A]/30 pt-5 text-xs uppercase tracking-[0.18em] text-[#E9DCC5]/70">
                            {weddingData.dateRange} · {weddingData.city}
                        </p>
                    </aside>

                    <div className="rsvp-form-panel">
                        <h3 className="font-serif text-3xl text-[#102D27]">Kindly reply</h3>
                        <p className="mt-2 text-sm text-[#596355]">Please share your response for the celebrations.</p>
                        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="block">
                                    <span className="form-label">Guest name *</span>
                                    <input type="text" autoComplete="name" value={guestName} onChange={(event) => setGuestName(event.target.value)} className={fieldClassName} required maxLength={100} />
                                </label>
                                <label className="block">
                                    <span className="form-label">Phone number *</span>
                                    <input type="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className={fieldClassName} required maxLength={30} pattern="[0-9+() .-]{7,30}" title="Enter a phone number using digits and common phone symbols." />
                                </label>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="block">
                                    <span className="form-label">Attendance *</span>
                                    <select value={attendance} onChange={(event) => setAttendance(event.target.value)} className={fieldClassName}>
                                        <option value="Attending">Joyfully attending</option>
                                        <option value="Unable to attend">Unable to attend</option>
                                    </select>
                                </label>
                                {attendance === "Attending" && (
                                    <label className="block">
                                        <span className="form-label">Number of guests *</span>
                                        <select value={guestCount} onChange={(event) => setGuestCount(event.target.value)} className={fieldClassName}>
                                            {[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count} {count === 1 ? "guest" : "guests"}</option>)}
                                        </select>
                                    </label>
                                )}
                            </div>

                            {attendance === "Attending" && (
                                <>
                                    <fieldset>
                                        <legend className="form-label mb-2">Events you plan to attend</legend>
                                        <div className="grid gap-2 sm:grid-cols-2">
                                            {weddingData.events.map((item) => (
                                                <label key={item.id} className="event-choice">
                                                    <input type="checkbox" checked={selectedEvents.includes(item.id)} onChange={() => toggleEvent(item.id)} />
                                                    <span>{item.title}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </fieldset>
                                    <label className="block">
                                        <span className="form-label">Meal preference (optional)</span>
                                        <select value={mealPreference} onChange={(event) => setMealPreference(event.target.value)} className={fieldClassName}>
                                            <option value="">Select a preference</option>
                                            <option value="Vegetarian">Vegetarian</option>
                                            <option value="Vegan">Vegan</option>
                                            <option value="Other / please contact me">Other / please contact me</option>
                                        </select>
                                    </label>
                                </>
                            )}
                            <label className="block">
                                <span className="form-label">A wish for the couple (optional)</span>
                                <textarea rows="3" value={message} onChange={(event) => setMessage(event.target.value)} className={fieldClassName} maxLength={500} />
                            </label>

                            {status.message && (
                                <p role={status.kind === "error" ? "alert" : "status"} className={`rsvp-status rsvp-status-${status.kind}`}>
                                    {status.message}
                                </p>
                            )}
                            <button type="submit" disabled={!isConnected || submitting} className="rsvp-submit">
                                <Send className="h-4 w-4" />
                                {submitting ? "Sending your RSVP…" : endpointUrl ? "Send RSVP" : whatsappNumber ? "Continue to WhatsApp" : "RSVP is not connected yet"}
                            </button>
                            <p className="text-xs leading-relaxed text-[#596355]">
                                {endpointUrl
                                    ? "Your RSVP will be sent securely to the configured wedding service."
                                    : whatsappNumber
                                        ? "WhatsApp will open with your response for you to review and send."
                                        : "This form is ready to connect. Set an RSVP API URL or the family’s WhatsApp number in src/data/weddingData.js before collecting responses."}
                            </p>
                        </form>
                    </div>
                    <aside className="guest-wishes-note lg:col-start-2 lg:row-start-2">
                        <Heart className="h-4 w-4 text-[#A77C45]" aria-hidden="true" />
                        <div>
                            <h3 className="font-serif text-xl text-[#102D27]">A wall of good wishes</h3>
                            <p className="mt-1 text-xs leading-relaxed text-[#596355]">
                                Guests’ notes will be shared here only after the family has reviewed them and an approved wishes service is connected.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
}
