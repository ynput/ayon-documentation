import React from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { Github, Twitter } from "../Icons";

const YnputNavbar = () => {
    return (
        <header className={clsx(styles.bHeader, styles.clearfix)}>
            <div className={styles.wrap}>
                <div className={clsx(styles.contents, styles.clearfix)}>
                    <div className={styles.title}>
                        <a href="https://ynput.io">
                            <img
                                src="/img/ynput_logo_small_BG.svg"
                                alt="Ynput Logo"
                                id="brand-logo"
                            />
                        </a>
                    </div>
                    <div className={clsx(styles.panel, styles.clearfix)}>
                        <ul className={clsx(styles.icons, styles.clearfix)}>
                            <li>
                                <a href="https://twitter.com/ynput_io">
                                    <Twitter className={styles.svgIcon} />
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/ynput">
                                    <Github className={styles.svgIcon} />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <nav className={styles.links}>
                        <ul className={clsx(styles.nav, styles.navPills)}>
                            <li>
                                <a href="https://ynput.io/ayon/">AYON Home</a>
                            </li>
                            <li>
                                <a href="https://ynput.io/services">Services</a>
                            </li>
                            <li>
                                <a href="https://community.ynput.io/">Community</a>
                            </li>
                            <li>
                                <a href="https://ynput.io/contact">Contact</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default YnputNavbar;
