"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        const initialTheme: Theme =
        savedTheme === "dark" ? "dark" : "light";
        
        document.documentElement.dataset.theme = initialTheme;

        const timeout = window.setTimeout(() => {
        setTheme(initialTheme);
        setMounted(true);
    }, 0);

    return () => window.clearTimeout(timeout);

    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === "light" ? "dark" : "light";

        setTheme(nextTheme);
        document.documentElement.dataset.theme = nextTheme;
        localStorage.setItem("theme", nextTheme);
    };

    return (
        <button
            type="button"
            className={styles.toggle}
            onClick={toggleTheme}
            disabled={!mounted}
            aria-label={
                theme === "light" ? "Switch to dark theme" : "Switch to light theme"
            }
            title={
                theme === "light" ? "Dark theme" : "Light theme"
            }
        >
            {mounted ? (theme === "light" ? "🌙" : "☀️") : "◐"}
        </button>
    );
}