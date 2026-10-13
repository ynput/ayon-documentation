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
        to: "docs/ayon/what-is-ayon",
        button: "What is AYON",
    },
    {
        title: "Backend",
        bio: "The data model and the settings scopes",
        to: "docs/backend/data-model",
        button: "Data model",
    },
    {
        title: "Pipeline",
        bio: "How data flows through the pipeline, and the tools artists use",
        to: "docs/pipeline/pipeline-flow",
        button: "Pipeline flow",
    },
    {
        title: "Server",
        bio: "The web UI, page by page, and automation options",
        to: "docs/server/web-ui",
        button: "Web UI",
    },
    {
        title: "Hosting",
        bio: "Hosting the AYON server and the AYON Service Host",
        to: "docs/hosting/server-hosting",
        button: "Server hosting",
    },
    {
        title: "Ynput Cloud",
        bio: "Cloud pages, AYON plans and cloud hosting",
        to: "docs/ynput-cloud/plans",
        button: "AYON plans",
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
