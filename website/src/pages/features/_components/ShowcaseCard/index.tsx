/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import FavoriteIcon from "@site/src/components/svgIcons/FavoriteIcon";
import {
    Tags,
    TagList,
    type TagType,
    type Feature,
    type Tag,
} from "@site/src/data/features";
import { sortBy } from "@site/src/utils/jsUtils";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import IdealImage from "@theme/IdealImage";

const TagComp = React.forwardRef<HTMLLIElement, Tag>(
    ({ label, color, description }, ref) => (
        <li ref={ref} className={styles.tag} title={description}>
            <span className={styles.textLabel}>{label}</span>
        </li>
    )
);

function ShowcaseCardTag({ tags }: { tags: TagType[] }) {
    const tagObjects = tags.map((tag) => ({ tag, ...Tags[tag] }));

    // Keep same order for all tags
    const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
        TagList.indexOf(tagObject.tag)
    );

    return (
        <>
            {tagObjectsSorted.map((tagObject, index) => {
                const id = `showcase_card_tag_${tagObject.tag}`;

                return <TagComp key={index} {...tagObject} />;
            })}
        </>
    );
}

function ShowcaseCard({ feature }: { feature: Feature }) {
    return (
        <li key={feature.title} className="card shadow--md">
            <div className={clsx("card__image", styles.showcaseCardImage)}>
                {feature.preview && (
                    <IdealImage img={feature.preview} alt={feature.title} />
                )}
            </div>
            <div className="card__body">
                <div className={clsx(styles.showcaseCardHeader)}>
                    <Heading as="h4" className={styles.showcaseCardTitle}>
                        <Link
                            href={feature.website}
                            className={styles.showcaseCardLink}
                        >
                            {feature.title}
                        </Link>
                    </Heading>
                    {feature.source && (
                        <Link
                            href={feature.source}
                            className={clsx(
                                "button button--secondary button--sm",
                                styles.showcaseCardSrcBtn
                            )}
                        >
                            source
                        </Link>
                    )}
                </div>
                <p className={styles.showcaseCardBody}>{feature.description}</p>
            </div>
            <ul className={clsx("card__footer", styles.cardFooter)}>
                <ShowcaseCardTag tags={feature.tags} />
            </ul>
        </li>
    );
}

export default React.memo(ShowcaseCard);
