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
import { addonsIds, featuredAddons } from "../../data/addons";

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
    features: Feature[],
    selectedTags: string[],
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
                feature.tags?.some((tag) =>
                    tag.toLowerCase().includes(searchName?.toLowerCase())
                )
        );
    }
    if (selectedTags.length === 0) {
        return features;
    }

    return features.filter((feature) => {
        if (feature.tags?.length === 0) {
            return false;
        }
        if (operator === "AND") {
            return selectedTags.every((tag) => feature.tags?.includes(tag));
        }
        return selectedTags.some((tag) => feature.tags?.includes(tag));
    });
}

function filterAddons(
    addons2: Addon[],
    selectedTags: string[],
    operator: Operator,
    searchName: string | null,
    disableTags?: boolean
) {
    if (searchName) {
        // eslint-disable-next-line no-param-reassign
        addons2 = addons2.filter((feature) =>
            feature.title.toLowerCase().includes(searchName?.toLowerCase())
        );
    }

    if (selectedTags.length === 0 || disableTags) {
        return addons2;
    }

    return addons2.filter((feature) => {
        if (feature.id?.length === 0) {
            return false;
        }
        if (operator === "AND") {
            return selectedTags.every((tag) => feature.id?.includes(tag));
        }
        return selectedTags.some((tag) => feature.id?.includes(tag));
    });
}

function useFeaturesFiltered(
    features: Feature[],
    addons: Addon[],
    disableSearch: boolean,
    disableTags?: boolean
) {
    let key = "tags";
    if (!features.length) key = "addons";

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
    }, [location, disableSearch, disableTags]);

    return useMemo(
        () =>
            !!features.length
                ? filterFeatures(features, selectedTags, operator, searchName)
                : filterAddons(
                      addons,
                      selectedTags,
                      operator,
                      disableSearch ? null : searchName,
                      disableTags
                  ),
        [
            selectedTags,
            operator,
            searchName,
            disableSearch,
            disableTags,
            location,
        ]
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
                placeholder={"Search..."}
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
    // split out any addons if addon selected
    const location = useLocation();
    const history = useHistory();

    const toggleTag = useCallback(
        (addon: string, deleteSearch: boolean) => {
            // remove search if there is one
            const tags = readSearchAddons(location.search);
            const newTags = toggleListItem(tags, addon);
            const newSearch = replaceSearchTags(
                location.search,
                newTags,
                "addons",
                deleteSearch
            );
            history.push({
                ...location,
                search: newSearch,
                state: prepareUserState(),
            });
        },
        [location, history]
    );

    const handleAddonClick = (id: string) => {
        toggleTag(id, true);
    };

    const [viewAll, setViewAll] = useState(false);

    let isAddonsSelected = !!readSearchTags(location.search, "addons").length;
    let isSearching = !!readSearchName(location.search);

    const addonsFiltered = useFeaturesFiltered(
        [],
        addons,
        isAddonsSelected,
        false
    ) as Addon[];

    // fix where bug where for one render all addons are seen when an addon is selected
    if (isAddonsSelected && addonsFiltered.length === addons.length) {
        isAddonsSelected = false;
    }

    if (isSearching && addonsFiltered.length === addons.length) {
        isSearching = false;
    }

    console.log({
        isAddonsSelected,
        isSearching,
        addonsFiltered: addonsFiltered.length,
    });

    let featuresFiltered = useFeaturesFiltered(features, [], true) as Feature[];

    // const isFeaturesFiltered = featuresFiltered.length !== features.length;
    let supportedAddons: Addon[] | null = [];

    // now filter out any features that don't have the addon in addons
    if (isAddonsSelected) {
        featuresFiltered = featuresFiltered.filter((feature) =>
            addonsFiltered.some((addon) => feature.addons?.includes(addon.id))
        );

        // if the filtered addons has any addons in features that aren't in filtered addons
        const filteredAddonIds = addonsIds.filter(
            (id) =>
                addonsFiltered.every((addon) => addon.features?.includes(id)) &&
                addonsFiltered.every((addon) => addon.id !== id)
        );

        // add addon to supportedAddons
        filteredAddonIds.forEach((id) => {
            const addon = addons.find((addon) => addon.id === id);
            if (addon) {
                supportedAddons?.push(addon);
            }
        });
    }

    let addonsToShow = isAddonsSelected ? addons : addonsFiltered;

    if (!supportedAddons.length) {
        supportedAddons = null;
        if (!viewAll && !isSearching)
            addonsToShow = addons.filter(({ id }) =>
                featuredAddons.includes(id)
            );
    } else {
        addonsToShow = supportedAddons.filter(
            ({ id }) =>
                !isSearching ||
                id.includes(readSearchName(location.search) as string)
        );
    }

    return (
        <section className="margin-bottom--xl container padding-top--lg padding-bottom--lg">
            {isAddonsSelected && (
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
                            onClose={handleAddonClick}
                        />
                    ))}
                </ul>
            )}
            <div>
                <SearchBar />
                {(!isAddonsSelected || supportedAddons) && (
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
                            <Heading as="h2">
                                {supportedAddons
                                    ? "Supported Addons"
                                    : viewAll || isSearching
                                    ? "All Addons"
                                    : "Featured Addons"}
                            </Heading>
                        </div>
                        <ul
                            className={clsx(
                                "container",
                                "clean-list",
                                styles.showcaseList
                            )}
                        >
                            {addonsToShow.map((addon) => (
                                <AddonCard
                                    key={addon.title}
                                    addon={addon}
                                    onClick={handleAddonClick}
                                />
                            ))}
                        </ul>
                        {!isAddonsSelected && !isSearching && (
                            <div
                                className={clsx(
                                    "button button--secondary button--md",
                                    "pagination-nav__link",
                                    styles.viewAll
                                )}
                                onClick={() => setViewAll(!viewAll)}
                            >
                                {viewAll ? "View Less" : "View All"}
                            </div>
                        )}
                    </div>
                )}
                {!!featuresFiltered.length && (
                    <div className={clsx("container", styles.featuresSection)}>
                        <Heading as="h2" className={styles.showcaseHeader}>
                            {isAddonsSelected
                                ? "Supported Features"
                                : "All Features"}
                        </Heading>

                        <ul className={clsx("clean-list", styles.showcaseList)}>
                            {featuresFiltered.map((feature) => (
                                <FeatureCard
                                    key={feature.id}
                                    feature={feature}
                                />
                            ))}
                        </ul>
                    </div>
                )}
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
