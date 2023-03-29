/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useMemo, useEffect } from "react";
import clsx from "clsx";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { useHistory, useLocation } from "@docusaurus/router";

import Layout from "@theme/Layout";

import {
    sortedFeatures,
    TagList,
    type Feature,
    type TagType,
} from "@site/src/data";
import Heading from "@theme/Heading";
import { readSearchTags } from "./_components/ShowcaseTagSelect";
import ShowcaseFilterToggle, {
    type Operator,
    readOperator,
} from "./_components/ShowcaseFilterToggle";
import ShowcaseCard from "./_components/ShowcaseCard";

import styles from "./styles.module.css";
import SideBar from "./_components/SideBar";

type UserState = {
    scrollTopPosition: number;
    focusedElementId: string | undefined;
};

function restoreUserState(userState: UserState | null) {
    const { scrollTopPosition, focusedElementId } = userState ?? {
        scrollTopPosition: 0,
        focusedElementId: undefined,
    };
    // @ts-expect-error: if focusedElementId is undefined it returns null
    document.getElementById(focusedElementId)?.focus();
    window.scrollTo({ top: scrollTopPosition });
}

export function prepareUserState(): UserState | undefined {
    if (ExecutionEnvironment.canUseDOM) {
        return {
            scrollTopPosition: window.scrollY,
            focusedElementId: document.activeElement?.id,
        };
    }

    return undefined;
}

const SearchNameQueryKey = "name";

function readSearchName(search: string) {
    return new URLSearchParams(search).get(SearchNameQueryKey);
}

function filterUsers(
    features: Feature[],
    selectedTags: TagType[],
    operator: Operator,
    searchName: string | null
) {
    if (searchName) {
        // eslint-disable-next-line no-param-reassign
        features = features.filter(
            (feature) =>
                feature.title
                    .toLowerCase()
                    .includes(searchName?.toLowerCase()) ||
                feature.tags.some((tag) =>
                    tag.toLowerCase().includes(searchName?.toLowerCase())
                )
        );
    }
    if (selectedTags.length === 0) {
        return features;
    }
    return features.filter((feature) => {
        if (feature.tags.length === 0) {
            return false;
        }
        if (operator === "AND") {
            return selectedTags.every((tag) => feature.tags.includes(tag));
        }
        return selectedTags.some((tag) => feature.tags.includes(tag));
    });
}

function useFilteredFeatures() {
    const location = useLocation<UserState>();
    const [operator, setOperator] = useState<Operator>("OR");
    // On SSR / first mount (hydration) no tag is selected
    const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
    const [searchName, setSearchName] = useState<string | null>(null);
    // Sync tags from QS to state (delayed on purpose to avoid SSR/Client
    // hydration mismatch)
    useEffect(() => {
        setSelectedTags(readSearchTags(location.search));
        setOperator(readOperator(location.search));
        setSearchName(readSearchName(location.search));
        restoreUserState(location.state);
    }, [location]);

    return useMemo(
        () => filterUsers(sortedFeatures, selectedTags, operator, searchName),
        [selectedTags, operator, searchName]
    );
}

const keyFeatures = sortedFeatures.filter((feature) =>
    feature.tags.includes("key")
);
const otherFeatures = sortedFeatures.filter(
    (feature) => !feature.tags.includes("key")
);

function SearchBar() {
    const history = useHistory();
    const location = useLocation();
    const [value, setValue] = useState<string | null>(null);
    useEffect(() => {
        setValue(readSearchName(location.search));
    }, [location]);
    return (
        <div className={styles.searchContainer}>
            <input
                id="searchbar"
                placeholder={"Search features..."}
                value={value ?? undefined}
                onInput={(e) => {
                    setValue(e.currentTarget.value);
                    const newSearch = new URLSearchParams(location.search);
                    newSearch.delete(SearchNameQueryKey);
                    if (e.currentTarget.value) {
                        newSearch.set(
                            SearchNameQueryKey,
                            e.currentTarget.value
                        );
                    }
                    history.push({
                        ...location,
                        search: newSearch.toString(),
                        state: prepareUserState(),
                    });
                    setTimeout(() => {
                        document.getElementById("searchbar")?.focus();
                    }, 0);
                }}
            />
        </div>
    );
}

function ShowcaseCards() {
    const filteredFeatures = useFilteredFeatures();
    const location = useLocation();
    const searchTags = readSearchTags(location.search);

    if (filteredFeatures.length === 0) {
        return (
            <section className="margin-top--lg margin-bottom--xl">
                <div className="container padding-vert--md text--center">
                    <Heading as="h2">No result</Heading>
                    <SearchBar />
                </div>
            </section>
        );
    }

    return (
        <section className="margin-bottom--xl container padding-top--lg padding-bottom--lg">
            {filteredFeatures.length === sortedFeatures.length ? (
                <>
                    <div className={clsx("container", styles.featuresSection)}>
                        <div
                            className={clsx(
                                "margin-bottom--md",
                                styles.showcaseFavoriteHeader
                            )}
                        >
                            <Heading as="h2">Key Features</Heading>
                            <SearchBar />
                        </div>
                        <ul
                            className={clsx(
                                "container",
                                "clean-list",
                                styles.showcaseList
                            )}
                        >
                            {keyFeatures.map((feature) => (
                                <ShowcaseCard
                                    key={feature.title}
                                    feature={feature}
                                />
                            ))}
                        </ul>
                    </div>

                    <div className={clsx("container", styles.featuresSection)}>
                        <Heading as="h2" className={styles.showcaseHeader}>
                            All Features
                        </Heading>
                        <ul className={clsx("clean-list", styles.showcaseList)}>
                            {otherFeatures.map((feature) => (
                                <ShowcaseCard
                                    key={feature.title}
                                    feature={feature}
                                />
                            ))}
                        </ul>
                    </div>
                </>
            ) : (
                <div className="container">
                    <div
                        className={clsx(
                            "margin-bottom--md",
                            styles.showcaseFavoriteHeader
                        )}
                    >
                        <Heading as="h2" className={styles.showcaseHeader}>
                            Filtered: {searchTags.map((tag) => tag).join(", ")}
                        </Heading>
                        <SearchBar />
                    </div>
                    <ul className={clsx("clean-list", styles.showcaseList)}>
                        {filteredFeatures.map((feature) => (
                            <ShowcaseCard
                                key={feature.title}
                                feature={feature}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}

export default function Features(): JSX.Element {
    return (
        <Layout>
            <div
                style={{ width: "100vw" }}
                className={styles.showcaseContainer}
            >
                <SideBar TagList={TagList} />
                <main>
                    <ShowcaseCards />
                </main>
            </div>
        </Layout>
    );
}
