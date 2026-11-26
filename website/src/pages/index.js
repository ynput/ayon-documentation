import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.scss";
import SearchBar from "@theme/SearchBar";

const links = [
    {
        title: "AYON",
        bio: "What AYON is, how it works and how it is set up",
        to: "docs/ayon/introduction",
        button: "Introduction",
    },
    {
        title: "Backend",
        bio: "The data model and the settings scopes",
        to: "docs/ayon/backend/data-model",
        button: "Data model",
    },
    {
        title: "Production tracking",
        bio: "The web app pages and features for tracking production",
        to: "docs/production-tracking",
        button: "Overview",
    },
    {
        title: "Pipeline",
        bio: "How data flows through the pipeline, and the tools artists use",
        to: "docs/pipeline",
        button: "Overview",
    },
    {
        title: "Ynput Cloud",
        bio: "The platform for AYON subscriptions and cloud-hosted servers",
        to: "docs/ynput-cloud",
        button: "Ynput Cloud",
    },
    {
        title: "Addons",
        bio: "What each addon provides and its settings",
        to: "docs/addons",
        button: "Addons",
    },
    {
        title: "Developer",
        bio: "APIs, and guides for addon development",
        to: "docs/developer",
        button: "Introduction",
    },
];

const LinkModal = ({ link }) => {
    const { title, bio, to, button } = link;
    return (
        <div className={styles.link}>
            <header>
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
                        Explore the reference
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
