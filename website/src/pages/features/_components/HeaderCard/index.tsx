import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

import Heading from "@theme/Heading";
import styles from "./styles.module.scss";
import IdealImage from "@theme/IdealImage";
import Close from "./close.svg";
import { Addon } from "../../../../data";
import IconBlur from "../IconBlur";

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

    return (
        <li
            key={addon.title}
            className={clsx(
                "card",
                "shadow--md",
                styles.headerCard,
                addon.preview && !addon.icon && styles.preview
            )}
        >
            <button
                className={clsx("clean-btn", styles.close)}
                onClick={() => onClose(addon.id as string)}
            >
                <Close />
            </button>
            <div
                className={clsx(
                    styles.showcaseCardImage,
                    addon.icon && styles.blurWrapper
                )}
            >
                {addon.icon ? (
                    <IconBlur
                        icon={addon.icon}
                        title={addon.title}
                        iconOnly
                        isHeader
                    />
                ) : (
                    addon.preview && (
                        <IdealImage img={addon.preview} alt={addon.title} />
                    )
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
        </li>
    );
}

export default React.memo(HeaderCard);
