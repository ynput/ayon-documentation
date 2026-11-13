import React from "react";
import MDXComponents from "@theme-original/MDXComponents";
import AddonInfo from "@site/src/components/AddonInfo";
import PageInfo from "@site/src/components/PageInfo";
import { Card, Cards } from "@site/src/components/Cards";
import Embed from "@site/src/components/Embed";
import FlowTrace from "@site/src/components/FlowTrace";
import Gallery from "@site/src/components/Gallery";
import TableFilter from "@site/src/components/TableFilter";
import TemplateExplorer from "@site/src/components/TemplateExplorer";
import ZoomableImage from "@site/src/components/ZoomableImage";
import { Column, Columns } from "@site/src/components/Columns";
import { Swatches, TypeScale } from "@site/src/components/ThemeSwatches";

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
    img: ZoomableImage,
    AddonInfo,
    Card,
    Cards,
    Column,
    Columns,
    Embed,
    FlowTrace,
    Gallery,
    PageInfo,
    Swatches,
    TableFilter,
    TemplateExplorer,
    TypeScale,
};
