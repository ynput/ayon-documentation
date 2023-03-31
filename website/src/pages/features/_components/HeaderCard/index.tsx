import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

import Heading from "@theme/Heading";
import styles from "./styles.module.scss";
import IdealImage from "@theme/IdealImage";
import Close from "./close.svg";
import { Addon } from "../../../../data";

function HeaderCard({
    addon,
    showSupport,
    onClose,
}: {
    addon: Addon;
    showSupport: boolean;
    onClose: (tag: string) => void;
}) {
    if (!addon) return null;

    const longestSupportLabel =
        addon.supports?.reduce(
            (a, b) => (a.label.length > b.label.length ? a : b),
            { label: "" }
        )?.label.length || 0;

    const supportLength = addon.supports?.length || 0;
    const flex = Math.max((supportLength * longestSupportLabel) / 100, 0.5);

    return (
        <li
            key={addon.title}
            className={clsx("card", "shadow--md", styles.headerCard)}
        >
            <button
                className={clsx("clean-btn", styles.close)}
                onClick={() => onClose(addon.id)}
            >
                <Close />
            </button>
            <div className={clsx(styles.showcaseCardImage)}>
                {addon.preview && (
                    <IdealImage img={addon.preview} alt={addon.title} />
                )}
            </div>
            <div className={clsx(styles.cardContent, "card__body")}>
                <div className={clsx(styles.showcaseCardHeader)}>
                    <Heading as="h2" className={styles.showcaseCardTitle}>
                        {addon.title} Addon
                    </Heading>
                </div>
                <p className={styles.description}>
                    {addon.descriptionLong && showSupport
                        ? addon.descriptionLong
                        : addon.description}
                </p>
                <div className={clsx(styles.buttons)}>
                    {addon.docs &&
                        Object.entries(addon.docs).map(([k, v]) => (
                            <Link
                                href={"/docs/" + v}
                                className={clsx(
                                    "button button--secondary button--md",
                                    "pagination-nav__link",
                                    styles.button
                                )}
                                key={k}
                            >
                                {k.charAt(0).toUpperCase() + k.slice(1)} Docs
                            </Link>
                        ))}
                    {addon.github && (
                        <Link
                            href={addon.github}
                            className={clsx(
                                "button button--secondary button--md",
                                "pagination-nav__link",
                                styles.button
                            )}
                        >
                            Github
                        </Link>
                    )}
                </div>
            </div>
            {!!addon.supports?.length && showSupport && (
                <div
                    className={clsx(styles.supports)}
                    style={{
                        flex,
                    }}
                >
                    <Heading as="h2" className={styles.showcaseCardTitle}>
                        {addon.supportsTitle || "Supports"}
                    </Heading>
                    <ul
                        style={{
                            gridTemplateColumns: `repeat(auto-fill, minmax(${
                                longestSupportLabel * 10
                            }px, 1fr))`,
                        }}
                    >
                        {addon.supports.map((support) => (
                            <Link
                                key={support.label}
                                href={
                                    support?.docbase
                                        ? "/docs/" + support.docbase
                                        : "#"
                                }
                                className={clsx(
                                    "button button--secondary button--md",
                                    styles.supportButton,
                                    !support.docbase && styles.noLink
                                )}
                            >
                                {support.label}
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
}

export default React.memo(HeaderCard);
