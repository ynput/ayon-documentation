import React from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { Github, XIcon } from "../Icons";

const YnputNavbar = () => {
    return (
        <header className={clsx(styles.bHeader, styles.clearfix)}>
            <div className={styles.wrap}>
                <div className={clsx(styles.contents, styles.clearfix)}>
                    <div className={styles.title}>
                        <a href="https://ynput.io">
                            <img
                                src="/img/ynput_logo_small_W.svg"
                                alt="Ynput Logo"
                                id="brand-logo"
                            />
                        </a>
                    </div>
                    <div className={clsx(styles.panel, styles.clearfix)}>
                        <ul className={clsx(styles.icons, styles.clearfix)}>
                            <li>
                                <a href="https://x.com/ynput_io" aria-label="X">
                                    <XIcon className={styles.svgIcon} />
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
                                <a href="https://ayon.app/">Visit website</a>
                            </li>
                            <li>
                                <a href="https://ynput.cloud/">Ynput Cloud</a>
                            </li>
                            <li>
                                <a href="https://playground.ayon.app/">
                                    Try AYON
                                </a>
                            </li>
                            <li>
                                <a href="https://feedback.ayon.app/">
                                    Feedback
                                </a>
                            </li>
                            <li>
                                <a href="https://ayon.app/services">Services</a>
                            </li>
                            <li>
                                <a href="https://ynput.io/community/">
                                    Community
                                </a>
                            </li>
                            <li>
                                <a href="https://ayon.app/about-us">Company</a>
                            </li>
                            <li>
                                <a href="https://ayon.app/contact">Contact</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default YnputNavbar;
