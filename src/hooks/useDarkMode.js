import { useEffect } from "react";

export function useDarkMode() {
    useEffect(() => {

        const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = (e) => {
            if (e.matches) document.documentElement.classList.add("dark");
            else document.documentElement.classList.remove("dark");
        };

        applyTheme(darkQuery);

        darkQuery.addEventListener("change", applyTheme);

        return () => darkQuery.removeEventListener("change", applyTheme);
    }, []);
}
