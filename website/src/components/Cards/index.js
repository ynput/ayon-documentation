/**
 * Link cards for pages, available in every .md page without an import:
 *
 *   <Cards>
 *     <Card icon="cloud" title="Title" href="https://...">One or two lines of text.</Card>
 *   </Cards>
 *
 * - `icon`: a Material Symbols name, the icons of the AYON web app, or "ayon" or
 *   "ynput" for those logo symbols on black. The AYON symbol is also shown when
 *   `icon` is left out.
 * - `iconBackground`: the color of the icon circle instead of brand blue (black for
 *   the logo symbols). A brand swatch name, "mint", "blue", "black", "yellow", "red",
 *   "grey-20", "grey-40", "grey-60" or "grey-80", "white", or any CSS color.
 * - `variant`: "default" (icon and title on top, text below) or "compact" (icon on
 *   the left, title and text beside it). Set it on <Cards> for the whole group, or
 *   on one <Card>.
 * - External links open in a new tab and get an arrow after the title.
 */
import React, { createContext, useContext } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

const VariantContext = createContext("default");

// The "Y" with its dot from the AYON logo (static/img/AYON_whiteG_dot.svg).
function AyonSymbol() {
    return (
        <svg viewBox="214 -10 279 303" aria-hidden="true" className={styles.symbol}>
            <path d="M238.565 58.5691L331.559 112.26L316.914 137.624L223.921 83.9329L238.565 58.5691Z" fill="currentColor" />
            <path d="M467.958 58.568L482.603 83.9346L389.607 137.622L374.963 112.255L467.958 58.568Z" fill="currentColor" />
            <path d="M338.617 175.221H367.903V282.601H338.617V175.221Z" fill="currentColor" />
            <circle cx="353.273" cy="29.2854" r="29.2854" style={{ fill: "var(--card-accent, var(--ayon-brand-mint))" }} />
        </svg>
    );
}

// The four triangles of the Ynput symbol (static/img/yn_symbol_W_sa.svg), in its final
// coordinates, with the bottom one mint as in the Ynput logo. Both symbols use Ynput Mint
// from the brand swatch, not the slightly different #00D7A0 of the logo files.
function YnputSymbol() {
    return (
        <svg viewBox="200 236 618 709" aria-hidden="true" className={styles.symbol}>
            <path d="M509.2 236.4L372.8 472.6L236.4 236.4Z" fill="currentColor" />
            <path d="M782 236.4L645.6 472.6L509.2 236.4Z" fill="currentColor" />
            <path d="M645.6 472.6L509.2 708.9L372.8 472.6Z" fill="currentColor" />
            <path d="M509.2 708.9L372.8 945.1L236.4 708.9Z" style={{ fill: "var(--card-accent, var(--ayon-brand-mint))" }} />
        </svg>
    );
}

const SYMBOLS = { ayon: AyonSymbol, ynput: YnputSymbol };

// Brand swatch names for `iconBackground`, plus white for the logo variations; the light
// ones get a black icon, as on the swatch. The mint accent of the logo symbols turns
// white on mint, as in the logo variations.
const SWATCH = ["mint", "blue", "black", "white", "yellow", "red", "grey-20", "grey-40", "grey-60", "grey-80"];
const DARK_ICON = ["mint", "white", "yellow", "grey-20"];

function iconStyle(background) {
    if (!SWATCH.includes(background)) {
        return { background };
    }
    return {
        background: background === "white" ? "#fff" : `var(--ayon-brand-${background})`,
        color: DARK_ICON.includes(background) ? "#000" : "#fff",
        ...(background === "mint" && { "--card-accent": "#fff" }),
    };
}

export function Cards({ variant = "default", children }) {
    return (
        <VariantContext.Provider value={variant}>
            <div className={clsx(styles.cards, styles[`cards-${variant}`])}>{children}</div>
        </VariantContext.Provider>
    );
}

export function Card({ icon, iconBackground, title, href, variant, children }) {
    const groupVariant = useContext(VariantContext);
    const layout = variant || groupVariant;
    const Symbol = SYMBOLS[icon || "ayon"];
    const external = /^https?:\/\//i.test(href || "");
    const linkProps = external ? { href, target: "_blank", rel: "noopener noreferrer" } : { to: href };
    return (
        <Link {...linkProps} className={clsx(styles.card, styles[layout])}>
            <span
                className={clsx(styles.icon, Symbol && styles.iconLogo)}
                style={iconBackground ? iconStyle(iconBackground) : undefined}>
                {Symbol ? (
                    <Symbol />
                ) : (
                    <span className="material-symbols-outlined" aria-hidden="true">
                        {icon}
                    </span>
                )}
            </span>
            <span className={styles.title}>
                {title}
                {/* A no-break space keeps the arrow on the line of the last word. */}
                {external && " "}
                {external && (
                    <span className={clsx("material-symbols-outlined", styles.external)} aria-label="(opens in a new tab)">
                        arrow_outward
                    </span>
                )}
            </span>
            {children && <span className={styles.text}>{children}</span>}
        </Link>
    );
}

export default Card;
