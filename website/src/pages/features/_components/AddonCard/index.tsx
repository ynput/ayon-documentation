import React from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

import { type Addon } from "../../../../data";
import IconBlur from "../IconBlur";
import IdealImageWrapper from "../../../../components/IdealImageWrapper";

function AddonCard({
    addon,
    onClick,
}: {
    addon: Addon;
    onClick?: (id: string) => void;
}) {
    return (
        <li
            key={addon.title}
            className={clsx("card", "shadow--md", styles.isAddon)}
            onClick={() => onClick && onClick(addon.id as string)}
        >
            {addon.icon ? (
                <IconBlur icon={addon.icon} title={addon.title} />
            ) : (
                <div className={clsx("card__image", styles.showcaseCardImage)}>
                    {addon.preview && (
                        <IdealImageWrapper
                            img={addon.preview}
                            alt={addon.title}
                        />
                    )}
                </div>
            )}
        </li>
    );
}

export default React.memo(AddonCard);
