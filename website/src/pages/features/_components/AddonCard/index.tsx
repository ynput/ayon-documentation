import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import IdealImage from "@theme/IdealImage";

import { useLocation, useHistory } from "@docusaurus/router";
import { type Addon } from "../../../../data";

function AddonCard({
    addon,
    onClick,
}: {
    addon: Addon;
    onClick: (id: string) => void;
}) {
    const location = useLocation();
    const history = useHistory();
    // if the card is an addon

    return (
        <li
            key={addon.title}
            className={clsx("card", "shadow--md", styles.isAddon)}
            onClick={() => onClick(addon.id)}
        >
            <div className={clsx("card__image", styles.showcaseCardImage)}>
                {addon.preview && (
                    <IdealImage img={addon.preview} alt={addon.title} />
                )}
            </div>

            <div className="card__body">
                <p className={styles.showcaseCardBody}>{addon.description}</p>
            </div>
        </li>
    );
}

export default React.memo(AddonCard);
