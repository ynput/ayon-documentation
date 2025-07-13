import React from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.scss";
import { Product } from "../../../../data";
import Link from "@docusaurus/Link";

function ProductCard({ product }: { product: Product }) {
    return (
        <Link
            href={`https://help.ayon.app/en/help/articles/7070980-about-ayon-pipeline${
                product.docs ? product.docs : "#46rec8lr0em"
            }`}
            className={styles.link}
        >
            <li
                key={product.title}
                className={clsx("card", "shadow--md", styles.card)}
            >
                <div className="card__body">
                    <div className={clsx(styles.header)}>
                        <span className="material-symbols-outlined">
                            {product.icon}
                        </span>
                        <Heading as="h4" className={styles.title}>
                            {product.title}
                        </Heading>
                    </div>
                </div>
            </li>
        </Link>
    );
}

export default React.memo(ProductCard);
