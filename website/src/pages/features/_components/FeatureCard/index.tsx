import React from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.scss";
import { readSearchTags } from "../ShowcaseTagSelect";
import { useLocation } from "@docusaurus/router";
import { addons, Feature } from "../../../../data";
import { addonsIds } from "../../../../data/addons";

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
    return (
        <li key={feature.title} className={clsx("card", "shadow--md")}>
            <div className="card__body">
                <div className={clsx(styles.showcaseCardHeader)}>
                    <Heading as="h4" className={styles.showcaseCardTitle}>
                        {feature.title}
                    </Heading>
                </div>

                <p className={styles.showcaseCardBody}>{feature.description}</p>
            </div>
        </li>
    );
}

export default React.memo(FeatureCard);
