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
import Link from "@docusaurus/Link";

import Heading from "@theme/Heading";
import {
    readSearchTags,
    replaceSearchTags,
} from "./_components/ShowcaseTagSelect";
import {
    type Operator,
    readOperator,
} from "./_components/ShowcaseFilterToggle";
import FeatureCard from "./_components/FeatureCard";

import styles from "./styles.module.scss";
import SideBar from "./_components/SideBar";
import HeaderCard from "./_components/HeaderCard";
import {
    type Addon,
    addons,
    features,
    addonsIds,
    featuredAddons,
    topFeatures,
    products,
    ProductType,
} from "../../data";
import AddonCard from "./_components/AddonCard";
import ProductCard from "./_components/ProductCard";

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
            scrollTopPosition: 0,
            focusedElementId: document.activeElement?.id,
        };
    }

    return undefined;
}

const AddonQueryStringKey = "addons";

export function readSearchAddons(search: string): string[] {
    return new URLSearchParams(search).getAll(AddonQueryStringKey) as string[];
}

function filterAddons(
    addons2: Addon[],
    selectedTags: string[],
    operator: Operator
) {
    if (selectedTags.length === 0) {
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

function useAddonsFiltered(
    addons: Addon[],
    disableSearch: boolean,
    disableTags?: boolean
) {
    const key = "addons";

    const location = useLocation<UserState>();
    const [operator, setOperator] = useState<Operator>("OR");
    // On SSR / first mount (hydration) no tag is selected
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Sync tags from QS to state (delayed on purpose to avoid SSR/Client
    // hydration mismatch)

    useEffect(() => {
        setSelectedTags(readSearchTags(location.search, key));
        setOperator(readOperator(location.search));
        restoreUserState(location.state);
    }, [location, disableSearch, disableTags]);

    return useMemo(
        () => filterAddons(addons, selectedTags, operator),
        [selectedTags, operator, disableTags, location]
    );
}

function SearchBar({ value, setValue }) {
    return (
        <div className={styles.searchContainer}>
            <input
                autoComplete="off"
                id="searchbar"
                placeholder={"Search..."}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
            />
        </div>
    );
}

function FeaturesCards() {
    const [search, setSearch] = useState<string>("");
    // split out any addons if addon selected
    const location = useLocation();
    const history = useHistory();

    const toggleTag = useCallback(
        (addon: string, deleteSearch: boolean) => {
            const newTags = deleteSearch ? [] : [addon];
            const newSearch = replaceSearchTags(
                location.search,
                newTags,
                "addons"
            );
            history.push({
                ...location,
                search: newSearch,
                state: prepareUserState(),
            });
        },
        [location, history]
    );

    const [viewAll, setViewAll] = useState(false);
    const [viewAllFeatures, setViewAllFeatures] = useState(false);

    let isAddonsSelected = !!readSearchTags(location.search, "addons").length;
    let isSearching = !!search.length;

    useEffect(() => {
        if (isSearching) {
            setSearch("");
        }
    }, [isAddonsSelected]);

    useEffect(() => {
        if (!!readSearchTags(location.search, "viewAll").length) {
            setViewAll(true);
        }
    }, []);

    const addonsFiltered = useAddonsFiltered(
        addons,
        isAddonsSelected,
        false
    ) as Addon[];

    // fix where bug where for one render all addons are seen when an addon is selected
    if (isAddonsSelected && addonsFiltered.length === addons.length) {
        isAddonsSelected = false;
    }

    let featuresFiltered = features;

    let productsFiltered = products;

    // const isFeaturesFiltered = featuresFiltered.length !== features.length;
    let supportedAddons: Addon[] | null = [];

    // now filter out any features that don't have the addon in addons
    if (isAddonsSelected) {
        featuresFiltered = featuresFiltered.filter((feature) =>
            addonsFiltered.some((addon) => addon.features?.includes(feature.id))
        );

        productsFiltered = productsFiltered.filter((product) =>
            addonsFiltered.some((addon) =>
                addon.products?.includes(product.id as ProductType)
            )
        );

        // if the filtered addons has any addons in features that aren't in filtered addons
        const filteredAddonIds = addonsIds.filter(
            (id) =>
                addonsFiltered.every((addon) => addon.addons?.includes(id)) &&
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
        // if not searching or viewing all, limit to 8
        if (!viewAll && !isSearching) {
            addonsToShow = addons.filter(({ id }) =>
                featuredAddons.includes(id)
            );
        }
    } else {
        addonsToShow = supportedAddons;
    }

    // if not searching or viewing all, limit to top
    if (!viewAllFeatures && !isSearching && !isAddonsSelected) {
        featuresFiltered = featuresFiltered.filter(({ id }) =>
            topFeatures.includes(id)
        );
    }

    if (isSearching) {
        addonsToShow = addonsToShow.filter(({ id }) =>
            id.includes(search.toLowerCase())
        );
        // filter by search
        featuresFiltered = featuresFiltered.filter(
            ({ title, description, id }) =>
                title.toLowerCase().includes(search.toLowerCase()) ||
                description.toLowerCase().includes(search.toLowerCase()) ||
                addonsToShow.some((addon) => addon.features?.includes(id))
        );
        // filter products by search
        productsFiltered = productsFiltered.filter(
            ({ title, id }) =>
                title.toLowerCase().includes(search.toLowerCase()) ||
                addonsToShow.some((addon) =>
                    addon.products?.includes(id as ProductType)
                )
        );
    }

    // sort addonsToShow by if id in featuredAddons
    addonsToShow.sort((a, b) => {
        if (featuredAddons.includes(a.id) && !featuredAddons.includes(b.id)) {
            return -1;
        }
        if (!featuredAddons.includes(a.id) && featuredAddons.includes(b.id)) {
            return 1;
        }
        return 0;
    });

    // sort featuresFiltered by if id in topFeatures
    featuresFiltered.sort((a, b) => {
        if (topFeatures.includes(a.id) && !topFeatures.includes(b.id)) {
            return -1;
        }
        if (!topFeatures.includes(a.id) && topFeatures.includes(b.id)) {
            return 1;
        }
        return 0;
    });

    return (
        <section
            className="margin-bottom--xl container padding-top--lg padding-bottom--lg"
            style={{
                minHeight: "100vh",
            }}
        >
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
                            onClose={() => toggleTag(addon.id, true)}
                            autoFocus={index === 0}
                        />
                    ))}
                </ul>
            )}
            <div style={{ position: "relative" }}>
                <SearchBar value={search} setValue={setSearch} />
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
                            {addonsToShow.map((addon, i) => (
                                <AddonCard key={addon.title} addon={addon} />
                            ))}
                        </ul>
                        {!isAddonsSelected && !isSearching && (
                            <button
                                className={clsx(
                                    "button button--secondary button--md",
                                    "pagination-nav__link",
                                    styles.viewAll
                                )}
                                onClick={() => setViewAll(!viewAll)}
                            >
                                {viewAll ? "View Less" : "View All"}
                            </button>
                        )}
                    </div>
                )}
                {!!featuresFiltered.length && (
                    <div
                        className={clsx("container", styles.featuresSection)}
                        id="features"
                    >
                        <Heading as="h2" className={styles.showcaseHeader}>
                            {isAddonsSelected
                                ? "Supported Features"
                                : viewAllFeatures || isSearching
                                ? "All Features"
                                : "Top Features"}
                        </Heading>
                        <ul className={clsx("clean-list", styles.showcaseList)}>
                            {featuresFiltered.map((feature) => (
                                <FeatureCard
                                    key={feature.id}
                                    feature={feature}
                                />
                            ))}
                        </ul>
                        {!isAddonsSelected && !isSearching && (
                            <button
                                className={clsx(
                                    "button button--secondary button--md",
                                    "pagination-nav__link",
                                    styles.viewAll
                                )}
                                onClick={() =>
                                    setViewAllFeatures(!viewAllFeatures)
                                }
                            >
                                {viewAllFeatures ? "View Less" : "View All"}
                            </button>
                        )}
                    </div>
                )}
                {!!productsFiltered.length && (
                    <div
                        className={clsx(
                            "container",
                            styles.featuresSection,
                            styles.products
                        )}
                        id="products"
                    >
                        <Heading as="h2" className={styles.showcaseHeader}>
                            {isAddonsSelected
                                ? "Supported Product Types"
                                : "All Products Types"}
                            {!isAddonsSelected && (
                                <Link href="https://help.ayon.app/en/help/articles/7070980-about-ayon-pipeline#iw8re13zz2o">
                                    What are products?
                                </Link>
                            )}
                        </Heading>
                        <ul className={clsx("clean-list", styles.showcaseList)}>
                            {productsFiltered.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
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
        <Layout title="Features">
            <div style={{ width: "100%" }} className={styles.showcaseContainer}>
                <SideBar />
                <main>
                    <FeaturesCards />
                </main>
            </div>
        </Layout>
    );
}
