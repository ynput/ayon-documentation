import React, { KeyboardEventHandler, useState } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.scss";
import { readSearchTags } from "../ShowcaseTagSelect";
import { useLocation } from "@docusaurus/router";
import { Feature } from "../../../../data";
import IdealImageWrapper from "../../../../components/IdealImageWrapper";
import Close from "../HeaderCard/close.svg";
import Link from "@docusaurus/Link";

const TagComp = React.forwardRef<HTMLLIElement, any>(
    ({ tag, isActive, label }, ref) => (
        <li
            ref={ref}
            className={clsx(styles.tag, isActive && styles.isActive)}
            title={tag}
        >
            <span className={styles.textLabel}>{label}</span>
        </li>
    )
);

function FeatureTag({
    tags,
    addons: addonsTags,
}: {
    tags: string[];
    addons: string[];
}) {
    const tagObjects = tags.map((tag) => ({
        tag,
        label: tag.replace(/\b\w/g, (c) => c.toUpperCase()),
    }));

    const location = useLocation();
    const searchTags = readSearchTags(location.search);
    const searchAddons = readSearchTags(location.search, "addons");

    const allTags = [...searchTags, ...searchAddons];

    // Keep same order for all tags
    let tagObjectsSorted: { tag: string; label: string }[] = [];

    // if searchTags is not empty, sort by searchTags
    if (allTags.length > 0) {
        tagObjectsSorted = tagObjects.sort((a, b) => {
            const aIndex = allTags.indexOf(a.tag);
            const bIndex = allTags.indexOf(b.tag);
            if (aIndex === -1) {
                return 1;
            }
            if (bIndex === -1) {
                return -1;
            }
            return aIndex - bIndex;
        });
    } else {
        tagObjectsSorted = tagObjects.splice(0, 3);
    }

    return (
        <>
            {tagObjectsSorted.map(({ tag, label }, index) => {
                return (
                    <TagComp
                        key={index}
                        tag={tag}
                        label={label}
                        isActive={allTags.includes(tag)}
                    />
                );
            })}
        </>
    );
}

function FeatureCard({ feature }: { feature: Feature }) {
    const hasPreview = !!feature.preview;
    const isVideo = feature.preview?.default?.includes(".mp4");

    // modal open state
    const [modalOpen, setModalOpen] = useState(false);

    const Media = ({ className }: { className?: string }) =>
        hasPreview ? (
            isVideo ? (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={feature.preview?.default}
                    className={className}
                />
            ) : feature.preview ? (
                <IdealImageWrapper
                    img={feature.preview}
                    alt={feature.title}
                    className={className}
                />
            ) : null
        ) : null;

    return (
        <>
            <li
                key={feature.title}
                className={clsx(
                    "card",
                    "shadow--md",
                    hasPreview && styles.hasPreview,
                    styles.card
                )}
            >
                <button onClick={() => setModalOpen(true)}>
                    <div className={clsx("card__image")}>
                        <div className={clsx(styles.image)}>
                            <Media />
                        </div>
                    </div>
                    <div className="card__body">
                        <div className={clsx(styles.header)}>
                            <Heading as="h4" className={styles.title}>
                                {feature.title}
                            </Heading>
                        </div>

                        <p className={styles.body}>{feature.description}</p>
                    </div>
                </button>
            </li>

            {hasPreview && (
                <div
                    className={clsx(
                        styles.modal,
                        modalOpen ? styles.open : styles.closed
                    )}
                >
                    <div
                        className={styles.backdrop}
                        onClick={() => setModalOpen(false)}
                    />
                    <div className={styles.modalInner}>
                        <Media className={styles.modalMedia} />

                        <div className="card__body">
                            <div className={clsx(styles.header)}>
                                <Heading as="h1" className={styles.title}>
                                    {feature.title}
                                </Heading>
                                {feature.docs &&
                                    Object.entries(feature.docs).map(
                                        ([k, v]) => (
                                            <Link
                                                href={v.startsWith("https://") ? `${v}` : `/docs/${v}`}
                                                className={clsx(
                                                    "button button--secondary button--md",
                                                    "pagination-nav__link",
                                                    styles.button
                                                )}
                                                key={k}
                                                tabIndex={modalOpen ? 0 : -1}
                                            >
                                                {k.charAt(0).toUpperCase() +
                                                    k.slice(1)}{" "}
                                                Docs
                                            </Link>
                                        )
                                    )}
                            </div>
                        </div>

                        <button
                            className={clsx("clean-btn", styles.close)}
                            onClick={() => setModalOpen(false)}
                            tabIndex={modalOpen ? 0 : -1}
                        >
                            <Close />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default React.memo(FeatureCard);
