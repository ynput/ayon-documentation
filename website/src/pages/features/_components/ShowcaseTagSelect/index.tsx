/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
    useCallback,
    useState,
    useEffect,
    type ComponentProps,
    type ReactNode,
} from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import type { TagType } from "@site/src/data";

import { prepareUserState, readSearchAddons } from "../../index";
import styles from "./styles.module.css";
import clsx from "clsx";

interface Props extends ComponentProps<"input"> {
    label: ReactNode;
    tag: TagType;
    isAddon?: boolean;
}

const TagQueryStringKey = "tags";

export function readSearchTags(search: string, key?: string): TagType[] {
    return new URLSearchParams(search).getAll(
        key || TagQueryStringKey
    ) as TagType[];
}

export function replaceSearchTags(
    search: string,
    newTags: TagType[],
    queryKey: "tags" | "addons" = "tags"
): string {
    const searchParams = new URLSearchParams(search);
    searchParams.delete(queryKey);
    newTags.forEach((tag) => searchParams.append(queryKey, tag));
    return searchParams.toString();
}

export function toggleListItem<T>(list: T[], item: T): T[] {
    const itemIndex = list.indexOf(item);
    if (itemIndex === -1) {
        return list.concat(item);
    }
    const newList = [...list];
    newList.splice(itemIndex, 1);
    return newList;
}

function ShowcaseTagSelect(
    { id, tag, isAddon, label, ...rest }: Props,
    ref: React.ForwardedRef<HTMLLabelElement>
) {
    const location = useLocation();
    const history = useHistory();
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        const tags = readSearchTags(
            location.search,
            isAddon ? "addons" : "tags"
        );
        setSelected(tags.includes(tag));
    }, [tag, location]);

    const toggleTag = useCallback(() => {
        let tags: string[] = [];
        if (isAddon) tags = readSearchAddons(location.search);
        else tags = readSearchTags(location.search);

        const newTags = toggleListItem(tags, tag);

        const newSearch = replaceSearchTags(
            location.search,
            newTags,
            isAddon ? "addons" : "tags"
        );

        history.push({
            ...location,
            search: newSearch,
            state: prepareUserState(),
        });
    }, [tag, location, history]);

    return (
        <>
            <input
                type="checkbox"
                id={id}
                className="screen-reader-only"
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        toggleTag();
                    }
                }}
                onFocus={(e) => {
                    if (e.relatedTarget) {
                        e.target.nextElementSibling?.dispatchEvent(
                            new KeyboardEvent("focus")
                        );
                    }
                }}
                onBlur={(e) => {
                    e.target.nextElementSibling?.dispatchEvent(
                        new KeyboardEvent("blur")
                    );
                }}
                onChange={toggleTag}
                checked={selected}
                {...rest}
            />
            <label
                ref={ref}
                htmlFor={id}
                className={clsx(styles.checkboxLabel, "menu__link")}
            >
                {label}
            </label>
        </>
    );
}

export default React.forwardRef(ShowcaseTagSelect);
