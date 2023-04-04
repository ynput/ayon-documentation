import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import ColorThief from "colorthief";
import IdealImage from "@theme/IdealImage";

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

function IconBlur({
    icon,
    title,
    iconOnly,
}: {
    icon: string;
    title: string;
    iconOnly?: boolean;
}) {
    const blurRef = useRef<HTMLDivElement>(null);

    // hsl color
    const [domColor, setDomColor] = useState([0, 0, 0]);
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = (img) => {
        if (!img) return;

        try {
            const colorThief = new ColorThief();

            const colors = colorThief.getColor(img);

            const hsl = rgbToHsl(colors);

            setDomColor(hsl);

            setIsLoading(false);

            console.log("test");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!blurRef.current) return;
        const imgDiv = blurRef.current.querySelector("div");
        const img = blurRef.current.querySelector("img");

        const config = { attributes: true, childList: true, subtree: true };

        const handleImg = (img) => {
            if (img.complete) {
                handleLoad(img);
            } else {
                img.addEventListener("load", () => handleLoad(img));
            }
        };

        // Callback function to execute when mutations are observed
        const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
                if (mutation.type === "childList") {
                    // img is now in DOM
                    const img = imgDiv?.querySelector("img");
                    console.log(img);
                    if (img) {
                        handleImg(img);
                    }
                }
            }
        };

        const observer = new MutationObserver(callback);

        if (imgDiv) {
            // Start observing the target node for configured mutations
            observer.observe(imgDiv, config);
        } else if (img) {
            handleImg(img);
        }

        // cleanup event listener
        return () => {
            if (observer) observer.disconnect();
            if (img) img.removeEventListener("load", () => handleLoad(img));
        };
    }, [blurRef.current]);

    let ratios = [-0.4, 0.4, -0.1];

    // if domColor[1] lightness is below 0.45 invert ratios
    if (domColor[2] >= 0.65) {
        // invert ratios
        ratios[0] = -ratios[0] - 0.1;
        ratios[1] = -ratios[1];
        ratios[2] = -ratios[2] - 0.2;
    } else if (domColor[2] >= 0.5) {
        ratios[2] = -0.2;
        ratios[3] = -0.2;
    }

    if (domColor[2] < 0.3) {
        ratios = [0.5, 0.1, -0.1];
    }

    // make title color darker domColor
    let titleColor = `hsl(${domColor[0]}, ${domColor[1] * 100}%, ${
        Math.min(Math.max(domColor[2] + ratios[0], 0.2), 0.95) * 100
    }%)`;

    // make bg color light domColor
    let bgColor = `hsl(${domColor[0]}, ${domColor[1] * 100}%, ${
        (domColor[2] + ratios[1]) * 100
    }%)`;

    // convert dom color to hsl string for css
    let blurColor = `hsl(${domColor[0]}, ${domColor[1] * 100}%, ${
        (domColor[2] + ratios[2]) * 100
    }%)`;

    return (
        <div
            className={clsx(
                styles.icon,
                styles.showcaseCardImage,
                iconOnly && styles.iconOnly,
                isLoading && styles.loading
            )}
            style={{
                backgroundColor: bgColor,
            }}
        >
            <>
                <div className={styles.blur} style={{ color: blurColor }}>
                    {title}
                </div>
                {!iconOnly && (
                    <h3
                        style={{
                            color: titleColor,
                        }}
                    >
                        {title}
                        <br />
                        Addon
                    </h3>
                )}
            </>

            <div className={styles.iconContainer} ref={blurRef}>
                <IdealImage img={icon} alt={title} aria-disabled />
            </div>
        </div>
    );
}

export default IconBlur;
