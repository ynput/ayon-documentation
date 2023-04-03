/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.scss";
import { Brush, Cube, Shield } from "../components/icons";

const links = [
    {
        title: "User",
        icon: Brush,
        bio: "Guides for users, artists and coordinators",
        to: "docs/artist_getting_started",
        button: "Get Help",
    },
    {
        title: "Admin",
        icon: Shield,
        bio: "Studio setup, configuration and management",
        to: "docs/system_introduction",
        button: "Get Setup",
    },
    {
        title: "Developer",
        icon: Cube,
        bio: "Technical docs and guides for TDs and Devs",
        to: "docs/dev_introduction",
        button: "Developer Docs",
    },
];

const LinkModal = ({ link }) => {
    const { title, icon, bio, to, button } = link;
    return (
        <div className={styles.link}>
            <header>
                {icon()}
                <h3>{title}</h3>
            </header>
            <p>{bio}</p>
            <Link
                className={clsx(
                    "button button--secondary button--md",
                    "pagination-nav__link",
                    styles.button
                )}
                to={useBaseUrl(to)}
            >
                {button}
            </Link>
        </div>
    );
};

export default function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;
    return (
        <Layout>
            <header className={clsx(styles.header)}>
                <div className={clsx(styles.hero)}>
                    <div className={styles.title}>
                        <img
                            src="img/AYON_blackG_dot.svg"
                            alt="AYON logo"
                            width="100"
                            height="100"
                            className={styles.logo}
                        />
                        <img
                            src="img/AYON_whiteG_dot.svg"
                            alt="AYON logo"
                            width="100"
                            height="100"
                            className={styles.logo}
                        />
                    </div>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                </div>
                <div className={styles.links}>
                    {links.map((link, i) => (
                        <LinkModal key={i} link={link} />
                    ))}
                </div>
                <div className={styles.more}>
                    <p className="hero__subtitle">
                        AYON offers core features and official addons with
                        flexibility and customisation in mind.
                    </p>
                    <Link
                        className={clsx(
                            "button button--primary button--lg",
                            styles.getStarted
                        )}
                        to={"/features"}
                    >
                        Supported Features
                    </Link>
                </div>
            </header>
        </Layout>
    );
}
