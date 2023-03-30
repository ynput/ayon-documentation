import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { type Feature } from "@site/src/data";
import Heading from "@theme/Heading";
import styles from "./styles.module.scss";
import IdealImage from "@theme/IdealImage";
import Close from "./close.svg";

function HeaderCard({
    feature,
    showSupport,
    onClose,
}: {
    feature: Feature;
    showSupport: boolean;
    onClose: (tag: string) => void;
}) {
    if (!feature) return null;

    const longestSupportLabel = feature.supports?.reduce(
        (a, b) => (a.label.length > b.label.length ? a : b),
        { label: "" }
    )?.label.length;

    const supportLength = feature.supports?.length;
    const flex = (supportLength * longestSupportLabel) / 100;

    return (
        <li
            key={feature.title}
            className={clsx("card", "shadow--md", styles.headerCard)}
        >
            <button
                className={clsx("clean-btn", styles.close)}
                onClick={() => onClose(feature.title?.toLowerCase())}
            >
                <Close />
            </button>
            <div className={clsx(styles.showcaseCardImage)}>
                {feature.preview && (
                    <IdealImage img={feature.preview} alt={feature.title} />
                )}
            </div>
            <div className={clsx(styles.cardContent, "card__body")}>
                <div className={clsx(styles.showcaseCardHeader)}>
                    <Heading as="h2" className={styles.showcaseCardTitle}>
                        {feature.title} Addon
                    </Heading>
                </div>
                <p className={styles.description}>
                    {feature.descriptionLong && showSupport
                        ? feature.descriptionLong
                        : feature.description}
                </p>
                <div className={clsx(styles.buttons)}>
                    {feature.docs &&
                        Object.entries(feature.docs).map(([k, v]) => (
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
                    {feature.github && (
                        <Link
                            href={feature.github}
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
            {!!feature.supports?.length && showSupport && (
                <div
                    className={clsx(styles.supports)}
                    style={{
                        flex,
                    }}
                >
                    <Heading as="h2" className={styles.showcaseCardTitle}>
                        {feature.supportsTitle || "Supports"}
                    </Heading>
                    <ul
                        style={{
                            gridTemplateColumns: `repeat(auto-fill, minmax(${
                                longestSupportLabel * 10
                            }px, 1fr))`,
                        }}
                    >
                        {feature.supports.map((support) => (
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
