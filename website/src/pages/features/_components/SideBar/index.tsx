import clsx from "clsx";
import React from "react";
import { addons } from "@site/src/data";
import ShowcaseTagSelect from "../ShowcaseTagSelect";
import styles from "./styles.module.scss";

const ListItem = ({ tag, label, id, i = -1, isAddon = false }) => {
    return (
        <li
            key={i}
            className={`${styles.checkboxListItem} theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item`}
        >
            <ShowcaseTagSelect
                tag={tag}
                id={id}
                label={label}
                isAddon={isAddon}
            />
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
                            <span>(hold shift to compare)</span>
                        </label>
                        <ul className="theme-doc-sidebar-menu menu__list">
                            {addons.map(({ id, title }, i) => (
                                <ListItem
                                    id={`showcase_checkbox_id_${id}`}
                                    tag={id}
                                    label={title}
                                    i={i}
                                    key={`showcase_checkbox_id_${id}`}
                                    isAddon
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
