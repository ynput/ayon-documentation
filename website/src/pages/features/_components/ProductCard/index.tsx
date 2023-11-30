import React from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.scss";
import { Product } from "../../../../data";
import Link from "@docusaurus/Link";

function ProductCard({ product }: { product: Product }) {
    return (
        <Link
            href={`/docs/artist_publish${
                product.docs ? product.docs : "#products"
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
