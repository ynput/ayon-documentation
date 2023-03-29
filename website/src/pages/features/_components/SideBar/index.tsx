import clsx from "clsx";
import React from "react";
import { TagList, sortedAddons } from "@site/src/data";
import ShowcaseTagSelect from "../ShowcaseTagSelect";
import styles from "./styles.module.scss";

const ListItem = ({ tag, id, i = -1 }) => {
    return (
        <li
            key={i}
            className={`${styles.checkboxListItem} theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item`}
        >
            <ShowcaseTagSelect tag={tag} id={id} label={tag} />
        </li>
    );
};

const SideBar = () => {
    return (
        <aside className={styles.toolbar}>
            <div className={styles.sidebarWrapper}>
                <div>
                    <nav aria-label="Docs sidebar">
                        <label className={clsx("menu__link", styles.title)}>
                            Addons
                        </label>
                        <ul className="theme-doc-sidebar-menu menu__list">
                            {sortedAddons.map(({ title }, i) => (
                                <ListItem
                                    id={`showcase_checkbox_id_${title}`}
                                    tag={title?.toLowerCase()}
                                    i={i}
                                    key={`showcase_checkbox_id_${title}`}
                                />
                            ))}
                        </ul>
                        <label className={clsx("menu__link", styles.title)}>
                            Tags
                        </label>
                        <ul className="theme-doc-sidebar-menu menu__list">
                            {TagList.map((tag, i) => (
                                <ListItem
                                    id={`showcase_checkbox_id_${tag}`}
                                    tag={tag}
                                    key={`showcase_checkbox_id_${tag}`}
                                />
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
