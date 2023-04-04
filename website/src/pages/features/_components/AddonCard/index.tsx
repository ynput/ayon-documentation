import React, { useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import IdealImage from "@theme/IdealImage";
import ColorThief from "colorthief";

function rgbToHsl(rgb: number[]): number[] {
    const [r, g, b] = rgb.map((value) => value / 255); // convert RGB values to range of 0 to 1

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let lightness = (max + min) / 2;

    let hue = 0;
    let saturation = 0;
    if (max !== min) {
        const delta = max - min;
        saturation = delta / (1 - Math.abs(2 * lightness - 1));
        if (max === r) {
            hue = 60 * (((g - b) / delta) % 6);
        } else if (max === g) {
            hue = 60 * ((b - r) / delta + 2);
        } else {
            hue = 60 * ((r - g) / delta + 4);
        }
    }

    if (hue < 0) {
        hue += 360;
    }

    // Round the HSL values to two decimal places
    hue = Math.round(hue * 100) / 100;
    saturation = Math.round(saturation * 100) / 100;
    lightness = Math.round(lightness * 100) / 100;

    return [hue, saturation, lightness];
}

import { type Addon } from "../../../../data";
import IconBlur from "../IconBlur";

function AddonCard({
    addon,
    onClick,
}: {
    addon: Addon;
    onClick: (id: string) => void;
}) {
    return (
        <li
            key={addon.title}
            className={clsx("card", "shadow--md", styles.isAddon)}
            onClick={() => onClick(addon.id)}
        >
            {addon.icon ? (
                <IconBlur icon={addon.icon} title={addon.title} />
            ) : (
                <div className={clsx("card__image", styles.showcaseCardImage)}>
                    {addon.preview && (
                        <IdealImage img={addon.preview} alt={addon.title} />
                    )}
                </div>
            )}

            <div className="card__body">
                <p className={styles.showcaseCardBody}>{addon.description}</p>
            </div>
        </li>
    );
}

export default React.memo(AddonCard);
