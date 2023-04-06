import React from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.scss";
import { Family } from "../../../../data";

function FamilyCard({ family }: { family: Family }) {
    return (
        <li key={family.title} className={clsx("card", "shadow--md")}>
            <div className="card__body">
                <div className={clsx(styles.showcaseCardHeader)}>
                    <Heading as="h4" className={styles.showcaseCardTitle}>
                        {family.title}
                    </Heading>
                </div>
            </div>
        </li>
    );
}

export default React.memo(FamilyCard);
