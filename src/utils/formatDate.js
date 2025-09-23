// utils/formatDate.js
export function formatDate(isoString) {
    if (!isoString) return "";

    const date = new Date(isoString);

    // Example: "Sep 23, 2025, 06:05 AM"
    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}
