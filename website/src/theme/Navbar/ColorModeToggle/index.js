/**
 * Theme picker with the same three choices as the user menu of the AYON web app:
 * Dark, Light and System. Dark is the default, as in the app.
 *
 * Docusaurus only stores "dark" or "light" (key `theme`), which its inline script applies
 * before the first paint. The choice itself, including "system", is kept under its own key;
 * for "system" the resolved theme is stored too, so a reload paints the right theme at once.
 */
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useColorMode, useThemeConfig } from "@docusaurus/theme-common";
import styles from "./styles.module.css";

const PREFERENCE_KEY = "ayon-theme-preference";

const OPTIONS = [
    { value: "dark", label: "Dark", icon: "dark_mode" },
    { value: "light", label: "Light", icon: "light_mode" },
    { value: "system", label: "System", icon: "computer" },
];

const isPreference = (value) => OPTIONS.some((option) => option.value === value);

const lightQuery = () => window.matchMedia("(prefers-color-scheme: light)");

const resolve = (preference) =>
    preference === "system" ? (lightQuery().matches ? "light" : "dark") : preference;

function readPreference() {
    try {
        const stored = localStorage.getItem(PREFERENCE_KEY);
        return isPreference(stored) ? stored : null;
    } catch (e) {
        return null;
    }
}

function storePreference(preference) {
    try {
        localStorage.setItem(PREFERENCE_KEY, preference);
    } catch (e) {
        // private mode or blocked storage: the choice lasts for this page only
    }
}

export default function NavbarColorModeToggle({ className }) {
    const disabled = useThemeConfig().colorMode.disableSwitch;
    const { colorMode, setColorMode } = useColorMode();
    const [preference, setPreference] = useState(null);
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);

    // after hydration: the stored choice, or the theme Docusaurus applied
    useEffect(() => {
        setPreference(readPreference() ?? colorMode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // keep the page on the chosen theme. Docusaurus resets to the default mode when the
    // system theme changes, so the choice is applied again then too
    useEffect(() => {
        if (!preference) return undefined;
        const apply = () => setColorMode(resolve(preference));
        apply();
        const query = lightQuery();
        query.addEventListener("change", apply);
        return () => query.removeEventListener("change", apply);
    }, [preference, setColorMode]);

    useEffect(() => {
        if (!open) return undefined;
        const onPointerDown = (event) => {
            if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
        };
        const onKeyDown = (event) => {
            if (event.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    if (disabled) return null;

    const current = OPTIONS.find((option) => option.value === (preference ?? colorMode)) ?? OPTIONS[0];

    const choose = (value) => {
        storePreference(value);
        setPreference(value);
        setOpen(false);
    };

    return (
        <div ref={rootRef} className={clsx(styles.root, className)}>
            <button
                type="button"
                className={clsx("clean-btn", styles.toggle)}
                aria-haspopup="true"
                aria-expanded={open}
                aria-label={`Theme: ${current.label}`}
                title={`Theme: ${current.label}`}
                onClick={() => setOpen((value) => !value)}
            >
                <span className="material-symbols-outlined" aria-hidden="true">
                    {current.icon}
                </span>
            </button>
            {open && (
                <div className={styles.menu} role="radiogroup" aria-label="Theme">
                    {OPTIONS.map(({ value, label, icon }) => (
                        <button
                            key={value}
                            type="button"
                            role="radio"
                            aria-checked={value === current.value}
                            className={clsx("clean-btn", styles.option, value === current.value && styles.selected)}
                            onClick={() => choose(value)}
                        >
                            <span className="material-symbols-outlined" aria-hidden="true">
                                {icon}
                            </span>
                            {label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
