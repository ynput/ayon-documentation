/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useMemo, useEffect, useCallback } from "react";
import clsx from "clsx";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { useHistory, useLocation } from "@docusaurus/router";
import Layout from "@theme/Layout";

import Heading from "@theme/Heading";
import {
    readSearchTags,
    replaceSearchTags,
    toggleListItem,
} from "./_components/ShowcaseTagSelect";
import ShowcaseFilterToggle, {
    type Operator,
    readOperator,
} from "./_components/ShowcaseFilterToggle";
import FeatureCard from "./_components/FeatureCard";

import styles from "./styles.module.css";
import SideBar from "./_components/SideBar";
import HeaderCard from "./_components/HeaderCard";
import { type Addon, type Feature, addons, features } from "../../data";
import AddonCard from "./_components/AddonCard";

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

const AddonQueryStringKey = "addons";

export function readSearchAddons(search: string): string[] {
    return new URLSearchParams(search).getAll(AddonQueryStringKey) as string[];
}

function filterFeatures(
    features: (Addon & { tags?: string; addons?: string[] })[],
    selectedTags: string[],
    operator: Operator,
    searchName: string | null,
    searchField: "tags" | "id" = "tags"
) {
    if (searchName) {
        // eslint-disable-next-line no-param-reassign
        features = features.filter(
            (feature) =>
                feature.title
                    .toLowerCase()
                    .includes(searchName?.toLowerCase()) ||
                feature.tags?.some((tag) =>
                    tag.toLowerCase().includes(searchName?.toLowerCase())
                )
        );
    }
    if (selectedTags.length === 0) {
        return features;
    }

    return features.filter((feature) => {
        if (feature[searchField]?.length === 0) {
            return false;
        }
        if (operator === "AND") {
            return selectedTags.every((tag) =>
                feature[searchField]?.includes(tag)
            );
        }
        return selectedTags.some((tag) => feature[searchField]?.includes(tag));
    });
}

function useFeaturesFiltered(
    features: (Addon & {
        tags?: string[] | undefined;
        addons?: string[] | undefined;
    })[],
    key: "tags" | "addons" = "tags",
    search: boolean
) {
    const location = useLocation<UserState>();
    const [operator, setOperator] = useState<Operator>("OR");
    // On SSR / first mount (hydration) no tag is selected
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [searchName, setSearchName] = useState<string | null>(null);
    // Sync tags from QS to state (delayed on purpose to avoid SSR/Client
    // hydration mismatch)
    useEffect(() => {
        setSelectedTags(readSearchTags(location.search, key));
        setOperator(readOperator(location.search));
        setSearchName(readSearchName(location.search));
        restoreUserState(location.state);
    }, [location]);

    return useMemo(
        () =>
            filterFeatures(
                features,
                selectedTags,
                operator,
                search ? searchName : null,
                key === "addons" ? "id" : "tags"
            ),
        [selectedTags, operator, searchName]
    );
}

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
                autoComplete="off"
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

function FeaturesCards() {
    // const featuresFiltered = useFeaturesFiltered(false);
    // const featuresFilteredNoSearch = useFeaturesFiltered(true);
    // split out any addons if addon selected
    const location = useLocation();
    const history = useHistory();

    const toggleTag = useCallback(
        (addon) => {
            const tags = readSearchAddons(location.search);
            const newTags = toggleListItem(tags, addon);
            const newSearch = replaceSearchTags(
                location.search,
                newTags,
                "addons"
            );
            history.push({
                ...location,
                search: newSearch,
            });
        },
        [location, history]
    );

    const addonsFiltered = useFeaturesFiltered(addons, "addons", false);
    let featuresFiltered = useFeaturesFiltered(features, "tags", true);

    const isAddonsFiltered = addonsFiltered.length !== addons.length;
    // const isFeaturesFiltered = featuresFiltered.length !== features.length;

    // now filter out any features that don't have the addon in addons
    if (isAddonsFiltered) {
        featuresFiltered = featuresFiltered.filter((feature) =>
            addonsFiltered.some((addon) => feature.addons?.includes(addon.id))
        );
    }

    return (
        <section className="margin-bottom--xl container padding-top--lg padding-bottom--lg">
            <div
                className={clsx(
                    "container",
                    styles.featuresSection,
                    styles.addonsSection
                )}
            >
                <div
                    className={clsx(
                        "margin-bottom--md",
                        styles.showcaseFavoriteHeader
                    )}
                >
                    <Heading as="h2">Addons</Heading>
                    <SearchBar />
                </div>
                {!isAddonsFiltered ? (
                    <ul
                        className={clsx(
                            "container",
                            "clean-list",
                            styles.showcaseList
                        )}
                    >
                        {addons.map((addon) => (
                            <AddonCard
                                key={addon.title}
                                addon={addon}
                                onClick={toggleTag}
                            />
                        ))}
                    </ul>
                ) : (
                    <ul className={clsx("clean-list", styles.headerList)}>
                        {addonsFiltered.map((addon, index) => (
                            <HeaderCard
                                key={addon.id}
                                addon={addon}
                                showSupport={
                                    addonsFiltered.length === 1 ||
                                    (!(index % 2) &&
                                        addonsFiltered.length - 1 === index)
                                }
                                onClose={toggleTag}
                            />
                        ))}
                    </ul>
                )}
            </div>
            <div className={clsx("container", styles.featuresSection)}>
                <Heading as="h2" className={styles.showcaseHeader}>
                    {isAddonsFiltered ? "Supported Features" : "All Features"}
                </Heading>

                <ul className={clsx("clean-list", styles.showcaseList)}>
                    {featuresFiltered.map((feature) => (
                        <FeatureCard key={feature.id} feature={feature} />
                    ))}
                </ul>
            </div>
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
                <SideBar />
                <main>
                    <FeaturesCards />
                </main>
            </div>
        </Layout>
    );
}
