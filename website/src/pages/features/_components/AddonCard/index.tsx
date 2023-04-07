import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

import { type Addon } from "../../../../data";
import IconBlur from "../IconBlur";
import IdealImageWrapper from "../../../../components/IdealImageWrapper";
import Link from "@docusaurus/Link";

function AddonCard({ addon }: { addon: Addon }) {
    return (
        <Link href={`/features?addons=${addon.id}`} className={styles.link}>
            <li
                key={addon.title}
                className={clsx("card", "shadow--md", styles.card)}
            >
                {addon.icon ? (
                    <IconBlur icon={addon.icon} title={addon.title} />
                ) : (
                    <div className={clsx("card__image", styles.image)}>
                        {addon.preview && (
                            <IdealImageWrapper
                                img={addon.preview}
                                alt={addon.title}
                                isPreview
                            />
                        )}
                    </div>
                )}
            </li>
        </Link>
    );
}

export default React.memo(AddonCard);
