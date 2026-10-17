// Read once at load, same as the original page.
export const RM = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
