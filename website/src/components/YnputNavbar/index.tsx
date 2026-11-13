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
                        <a href="https://ynput.io" target="_blank" rel="noopener noreferrer">
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
                                <a href="https://x.com/ynput_io" target="_blank" rel="noopener noreferrer" aria-label="X">
                                    <XIcon className={styles.svgIcon} />
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/ynput" target="_blank" rel="noopener noreferrer">
                                    <Github className={styles.svgIcon} />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <nav className={styles.links}>
                        <ul className={clsx(styles.nav, styles.navPills)}>
                            <li>
                                <a href="https://ayon.app/" target="_blank" rel="noopener noreferrer">Visit website</a>
                            </li>
                            <li>
                                <a href="https://ynput.cloud/" target="_blank" rel="noopener noreferrer">Ynput Cloud</a>
                            </li>
                            <li>
                                <a href="https://playground.ayon.app/" target="_blank" rel="noopener noreferrer">
                                    Try AYON
                                </a>
                            </li>
                            <li>
                                <a href="https://feedback.ayon.app/" target="_blank" rel="noopener noreferrer">
                                    Feedback
                                </a>
                            </li>
                            <li>
                                <a href="https://ayon.app/services" target="_blank" rel="noopener noreferrer">Services</a>
                            </li>
                            <li>
                                <a href="https://ynput.io/community/" target="_blank" rel="noopener noreferrer">
                                    Community
                                </a>
                            </li>
                            <li>
                                <a href="https://ayon.app/about-us" target="_blank" rel="noopener noreferrer">Company</a>
                            </li>
                            <li>
                                <a href="https://ayon.app/contact" target="_blank" rel="noopener noreferrer">Contact</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default YnputNavbar;
