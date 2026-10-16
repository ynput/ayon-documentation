import React from "react";
import MDXComponents from "@theme-original/MDXComponents";
import AddonInfo from "@site/src/components/AddonInfo";
import Embed from "@site/src/components/Embed";

// External links in page content open in a new tab; internal links are unchanged.
function Anchor(props) {
    const Original = MDXComponents.a;
    const external = /^https?:\/\//i.test(props.href || "");
    return external ? (
        <Original {...props} target="_blank" rel="noopener noreferrer" />
    ) : (
        <Original {...props} />
    );
}

// Components available in every .md page without an import.
export default {
    ...MDXComponents,
    a: Anchor,
    AddonInfo,
    Embed,
};
