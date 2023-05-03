import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.scss";
import { Brush, Cube, Shield } from "../components/Icons";
import SearchBar from "@theme/SearchBar";
import AddonCard from "./features/_components/AddonCard";
import stylesFeatures from "./features/styles.module.scss";
import FeatureCard from "./features/_components/FeatureCard";
import { addons, families, features } from "../data";
import FamilyCard from "./features/_components/FamilyCard";
import Heading from "@theme/Heading";

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
                    <div className="searchBarBox home">
                        <SearchBar avoidKeyboardShortcuts />
                    </div>
                    <div className={styles.warning}>
                        While we're transitioning from OpenPype documentation, there are
                        some details that might be factually incorrect and imaged that show the old OpenPype interface. We're working on
                        resolving all of them. We'll appreciate if you notify us of any such discrepancies. 
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
            <section
                className={clsx(
                    "margin-bottom--xl margin-top--xl container padding-top--lg padding-bottom--lg",
                    styles.features
                )}
            >
                <Link href="/features">
                    <Heading as="h2" className={clsx("hero__subtitle")}>
                        Addons
                    </Heading>
                </Link>
                <p>
                    AYON is a highly modular system designed to cater to your
                    specific needs. With its extensive library of both official
                    and community-developed addons, it can seamlessly integrate
                    with a variety of different software.
                </p>
                <div
                    className={clsx(
                        "container",
                        stylesFeatures.featuresSection,
                        stylesFeatures.addonsSection
                    )}
                >
                    <ul
                        className={clsx(
                            "container",
                            "clean-list",
                            stylesFeatures.showcaseList
                        )}
                    >
                        {[...addons].splice(0, 12).map((addon) => (
                            <AddonCard addon={addon} key={addon.id} />
                        ))}
                    </ul>
                    <a href="/features?viewAll=addons">
                        <div
                            className={clsx(
                                "button button--secondary button--md",
                                "pagination-nav__link",
                                styles.viewAll
                            )}
                        >
                            View All Addons
                        </div>
                    </a>
                </div>
            </section>
            <section
                className={clsx(
                    "margin-bottom--xl container padding-top--lg padding-bottom--lg",
                    styles.features
                )}
            >
                <Link href="/features">
                    <Heading as="h2" className={clsx("hero__subtitle")}>
                        Features
                    </Heading>
                </Link>
                <p>
                    AYON has a vast library of built-in features that can be
                    utilized throughout the pipeline and addons.
                </p>
                <div
                    className={clsx(
                        "container",
                        stylesFeatures.featuresSection,
                        stylesFeatures.addonsSection
                    )}
                >
                    <ul
                        className={clsx(
                            "container",
                            "clean-list",
                            stylesFeatures.showcaseList
                        )}
                    >
                        {[...features].splice(0, 8).map((feature) => (
                            <FeatureCard feature={feature} key={feature.id} />
                        ))}
                    </ul>
                    <a href="/features#features">
                        <div
                            className={clsx(
                                "button button--secondary button--md",
                                "pagination-nav__link",
                                styles.viewAll
                            )}
                        >
                            View All Features
                        </div>
                    </a>
                </div>
            </section>
            <section
                className={clsx(
                    "margin-bottom--xl container padding-top--lg padding-bottom--lg",
                    styles.features
                )}
            >
                <Link href="/docs/artist_publish">
                    <Heading as="h2" className={clsx("hero__subtitle")}>
                        Families
                    </Heading>
                </Link>
                <p>
                    Streamline your data management with our customizable family
                    categorization system. Efficiently organize data instances
                    and join the industry standard for efficient data handling
                    today!
                </p>
                <div
                    className={clsx(
                        "container",
                        stylesFeatures.featuresSection,
                        stylesFeatures.addonsSection
                    )}
                >
                    <ul
                        className={clsx(
                            "container",
                            "clean-list",
                            stylesFeatures.showcaseList
                        )}
                    >
                        {[...families].splice(0, 16).map((family) => (
                            <FamilyCard family={family} key={family.id} />
                        ))}
                    </ul>
                    <a href="/features#families">
                        <div
                            className={clsx(
                                "button button--secondary button--md",
                                "pagination-nav__link",
                                styles.viewAll
                            )}
                        >
                            View All Families
                        </div>
                    </a>
                </div>
            </section>
            <section
                className={clsx(
                    "margin-bottom--xl container padding-top--lg padding-bottom--lg"
                )}
            >
                <div className={styles.more}>
                    <h2 className={clsx("hero__subtitle")}>More on ynput.io</h2>
                    <div className={styles.buttons}>
                        <a href="/features#features">
                            <div
                                className={clsx(
                                    "button button--secondary button--lg"
                                )}
                            >
                                Try AYON Beta
                            </div>
                        </a>
                        <a href="/features#features">
                            <div
                                className={clsx(
                                    "button button--secondary button--lg"
                                )}
                            >
                                Join Our Community
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
