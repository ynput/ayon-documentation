import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { TagList, type TagType, type Feature, type Tag } from "@site/src/data";
import { sortBy } from "@site/src/utils/jsUtils";
import Heading from "@theme/Heading";
import styles from "./styles.module.scss";
import IdealImage from "@theme/IdealImage";
import { readSearchTags, replaceSearchTags } from "../ShowcaseTagSelect";
import { useLocation, useHistory } from "@docusaurus/router";
import { prepareUserState } from "../..";

const TagComp = React.forwardRef<HTMLLIElement, Tag>(
    ({ tag, isActive }, ref) => (
        <li
            ref={ref}
            className={clsx(styles.tag, isActive && styles.isActive)}
            title={tag}
        >
            <span className={styles.textLabel}>{tag}</span>
        </li>
    )
);

function ShowcaseCardTag({ tags }: { tags: TagType[] }) {
    const tagObjects = tags.map((tag) => ({ tag }));
    const location = useLocation();
    const searchTags = readSearchTags(location.search);

    // Keep same order for all tags
    const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
        TagList.indexOf(tagObject.tag)
    );

    // if searchTags is not empty, sort by searchTags
    if (searchTags.length > 0) {
        tagObjectsSorted.sort((a, b) => {
            const aIndex = searchTags.indexOf(a.tag);
            const bIndex = searchTags.indexOf(b.tag);
            if (aIndex === -1) {
                return 1;
            }
            if (bIndex === -1) {
                return -1;
            }
            return aIndex - bIndex;
        });
    }

    return (
        <>
            {tagObjectsSorted.map((tagObject, index) => {
                const id = `showcase_card_tag_${tagObject.tag}`;

                return (
                    <TagComp
                        key={index}
                        {...tagObject}
                        isActive={searchTags.includes(tagObject.tag)}
                    />
                );
            })}
        </>
    );
}

function FeatureCard({ feature }: { feature: Feature }) {
    const location = useLocation();
    const history = useHistory();
    // if the card is an addon
    const isAddon = feature.tags.includes("addon");

    const handleClick = (name) => {
        if (isAddon) {
            const newSearch = replaceSearchTags(location.search, [name]);
            history.push({
                ...location,
                search: newSearch,
                state: prepareUserState(),
            });
        }
    };

    return (
        <li
            key={feature.title}
            className={clsx("card", "shadow--md", isAddon && styles.isAddon)}
            onClick={() => handleClick(feature.title?.toLowerCase())}
        >
            <div className={clsx("card__image", styles.showcaseCardImage)}>
                {feature.preview && (
                    <IdealImage img={feature.preview} alt={feature.title} />
                )}
            </div>
            <div className="card__body">
                <div className={clsx(styles.showcaseCardHeader)}>
                    <Heading as="h4" className={styles.showcaseCardTitle}>
                        {feature.title}
                    </Heading>
                </div>
                <p className={styles.showcaseCardBody}>{feature.description}</p>
            </div>
            <ul className={clsx("card__footer", styles.cardFooter)}>
                <ShowcaseCardTag tags={feature.tags} />
            </ul>
        </li>
    );
}

export default React.memo(FeatureCard);
