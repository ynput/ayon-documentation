import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.scss";
import { Cube } from "../components/Icons";
import SearchBar from "@theme/SearchBar";

const links = [
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
                    <div className="searchBarBox home">
                        <SearchBar avoidKeyboardShortcuts />
                    </div>
                </div>
                <div className={styles.linksWrapper}>
                    <h2 className={clsx("hero__subtitle", styles.getStarted)}>
                        Get Started
                    </h2>
                    <div className={styles.links}>
                        {links.map((link, i) => (
                            <LinkModal key={i} link={link} />
                        ))}
                    </div>
                </div>
            </header>
        </Layout>
    );
}
