/**
 * Wraps the Admonition of @docusaurus/theme-classic 2.4.0.
 *
 * An admonition without a title whose first element is a heading shows that
 * heading as its title, next to the icon. The heading keeps its id and hash
 * link, so the admonition can be linked to:
 *
 *     :::tip
 *
 *     ### Share one site ID across render nodes
 *
 *     ...
 *     :::
 *
 * Without this wrapper the same Markdown shows a normal heading inside the box.
 */
import React from "react";
import Admonition from "@theme-original/Admonition";
import styles from "./styles.module.css";

const HEADINGS = ["h2", "h3", "h4", "h5", "h6"];

export default function AdmonitionWrapper(props) {
    // A title written after `:::tip` comes as the first child
    // (mdxType "mdxAdmonitionTitle"), so a heading first means no title.
    const items = React.Children.toArray(props.children);
    const first = items[0];
    if (
        props.title == null &&
        React.isValidElement(first) &&
        HEADINGS.includes(first.props?.mdxType)
    ) {
        return (
            <Admonition
                {...props}
                title={<span className={styles.headingTitle}>{first}</span>}
            >
                {items.slice(1)}
            </Admonition>
        );
    }
    return <Admonition {...props} />;
}
