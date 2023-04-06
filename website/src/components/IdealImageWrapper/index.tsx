import React, { FC, useEffect, useRef, useState } from "react";
import IdealImage from "@theme/IdealImage";
import styles from "./styles.module.scss";
import clsx from "clsx";

type Props = {
    onLoad?: (ref: HTMLImageElement | null) => void;
    img: string;
    alt: string;
    isPreview?: boolean;
    style?: React.CSSProperties;
    className?: string;
};

const IdealImageWrapper: FC<Props> = ({
    onLoad,
    img,
    alt,
    isPreview,
    style,
    className,
}) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = (ref) => {
        setIsLoading(false);
        if (onLoad) onLoad(ref);
    };
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!wrapperRef.current) return;
        const imgDiv = wrapperRef.current.querySelector("div");
        const img = wrapperRef.current.querySelector("img");

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
    }, [wrapperRef.current]);

    return (
        <div
            className={clsx(
                styles.wrapper,
                isLoading && styles.loading,
                isPreview && styles.isPreview,
                className
            )}
            ref={wrapperRef}
            style={style}
        >
            <IdealImage img={img} alt={alt} aria-disabled />
        </div>
    );
};

export default IdealImageWrapper;
