import { CalendarPlus } from "lucide-react";
import { downloadICS, googleCalendarUrl } from "../../lib/calendar";
import { useLang } from "../../i18n/LangContext";

// One event: a small "Add to calendar: Google | Apple / Outlook" line.
export function EventCalendarLinks({ event }) {
  const { t } = useLang();
  if (!event.startISO) return null;
  return (
    <p className="cal">
      <CalendarPlus size={16} strokeWidth={1.5} aria-hidden="true" />
      <span>{t("Add to calendar")}</span>
      <a href={googleCalendarUrl(event)} target="_blank" rel="noopener noreferrer">Google</a>
      <button type="button" onClick={() => downloadICS([event], `${event.id}.ics`)}>{t("Apple / Outlook")}</button>
    </p>
  );
}

// All the events a guest is invited to, in one .ics file.
export function AllEventsButton({ events }) {
  const { t } = useLang();
  return (
    <button type="button" className="btn btn--solid" onClick={() => downloadICS(events, "wedding-events.ics")}>
      <CalendarPlus size={17} strokeWidth={1.6} aria-hidden="true" /> {t("Add all events to my calendar")}
    </button>
  );
}
