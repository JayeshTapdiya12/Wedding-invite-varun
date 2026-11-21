// Google Maps helpers. Use an explicit link if one is set, otherwise build a search link.

export const mapsSearchUrl = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const eventDirectionsUrl = (event) =>
  event.mapLink && event.mapLink.trim()
    ? event.mapLink
    : mapsSearchUrl(`${event.venue}, ${event.address}`);

export const mapsEmbedUrl = (query) => `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
