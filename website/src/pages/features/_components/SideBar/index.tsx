import React from "react";
import ShowcaseTagSelect from "../ShowcaseTagSelect";
import styles from "./styles.module.scss";

const SideBar = ({ TagList }) => {
    return (
        <aside className={styles.toolbar}>
            <div className={styles.sidebarWrapper}>
                <div>
                    <nav aria-label="Docs sidebar">
                        <ul className="theme-doc-sidebar-menu menu__list">
                            {TagList.map((tag, i) => {
                                const id = `showcase_checkbox_id_${tag}`;

                                return (
                                    <li
                                        key={i}
                                        className={`${styles.checkboxListItem} theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__list-item`}
                                    >
                                        <ShowcaseTagSelect
                                            tag={tag}
                                            id={id}
                                            label={tag}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
