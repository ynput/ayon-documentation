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
import styles from "./styles.module.css";

const features = [
    {
        title: "Battle tested",
        //imageUrl: '',
        description: (
            <>
                Designed, used, broken-in and validated in collaboration with
                many studios, who's artist have used it on projects ranging from
                commercials, to features.
            </>
        ),
    },
    {
        title: "Supported",
        //imageUrl: '',
        description: (
            <>
                AYON is developed and maintained by ynput.io, a full-time,
                dedicated team of industry professionals, providing support and
                training to studios and artists.
            </>
        ),
    },
    {
        title: "Extensible",
        //imageUrl: '',
        description: (
            <>
                Project needs differ, clients differ and studios differ. AYON is
                designed to fit into your workflow and bend to your will. If a
                feature is missing, it can most probably be added.
            </>
        ),
    },
    {
        title: "Focused",
        //imageUrl: '',
        description: (
            <>
                All AYON features have been added to solve specific needs during
                it's use in production. If something is obsolete, it is
                carefully deprecated, to keep the codebase lean and easier to
                maintain.
            </>
        ),
    },
];

function Feature({ imageUrl, title, description }) {
    const imgUrl = useBaseUrl(imageUrl);
    return (
        <div className={clsx("col col--3", styles.feature)}>
            {imgUrl && (
                <div className="text--center">
                    <img
                        className={styles.featureImage}
                        src={imgUrl}
                        alt={title}
                    />
                </div>
            )}
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;
    return (
        <Layout title={siteConfig.title} description={siteConfig.tagline}>
            <header className={clsx("hero hero--primary", styles.heroBanner)}>
                <div className="container">
                    <div className={styles.title}>
                        <img
                            src="img/logo.svg"
                            alt="AYON logo"
                            width="100"
                            height="100"
                        />
                        <h1 className={`${styles.projectTitle} hero__title`}>
                            {siteConfig.title}
                        </h1>
                    </div>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.buttons}>
                        <Link
                            className={clsx(
                                "button button--secondary button--lg",
                                styles.getStarted
                            )}
                            to={useBaseUrl("introduction/getting-started")}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                {features && features.length > 0 && (
                    <section className={styles.features}>
                        <div className="container">
                            <div className="row">
                                {features.map(
                                    ({ title, imageUrl, description }) => (
                                        <Feature
                                            key={title}
                                            title={title}
                                            imageUrl={imageUrl}
                                            description={description}
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                )}

                <section className={(styles.features, "darkBackground")}>
                    <div className="container">
                        <div className="row">
                            <div className="col col--6">
                                <img src="" />
                            </div>
                            <div className="col col--6">
                                <h2>Join the creative pipeline revolution</h2>
                                <p>
                                    AYON is for anyone that wants to make their
                                    creative studio scalable to take on more
                                    projects with a pipeline that is
                                    production-proven and continuously improving
                                    in-line with industry demands. We are funded
                                    by the industry to strengthen the industry.
                                    AYON opens the door for your creative team
                                    to take on new projects, giving a scalable
                                    platform to grow your studio.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}
