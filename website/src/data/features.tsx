/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

const key_features = [
    {
        label: "Workfiles",
        description:
            "Save and load workfiles in progress. Change the context inside of the application.",
        docs: "/docs/artist_tools_workfiles",
    },
    {
        label: "Creator",
        description:
            "Universal GUI for defining content for publishing from your DCC app.",
        docs: "/docs/artist_tools_creator",
    },
    {
        label: "Loader",
        description:
            "Universal GUI for loading published assets into your DCC app.",
        docs: "/docs/artist_tools_loader",
    },
    {
        label: "Publisher",
        description:
            "Universal GUI for validating and publishng content from your DCC app.",
        image: "",
        docs: "/docs/artist_tools_publisher",
    },
    {
        label: "Scene manager",
        description:
            "Universal GUI for managing versions of assets loaded into your working scene.",
        docs: "docs/artist_tools_inventory",
    },
    {
        label: "Project manager",
        docs: "",
        description:
            "Tools for creating shots, assets and task within your project if you don't use third party project management",
    },
    {
        label: "Library Loader",
        description:
            "A loader GUI that allows yo to load content from dedicated cross project asset library",
        docs: "docs/artist_tool_library_loader",
        image: "",
    },
    {
        label: "Tray Publisher",
        link: "",
        description:
            "A standalone GUI for publishing data into pipeline without going though DCC app.",
        image: "",
    },
    {
        label: "App Launcher",
        link: "",
        description:
            "Standalone GUI for launching application in the chosen context directly from tray",
    },
    {
        label: "Configuration GUI",
        link: "",
        description:
            "All settings and configuration are done via AYON Settings tool. No need to dig around .json and .yaml",
    },
    {
        label: "Site Sync",
        docs: "docs/module_site_sync",
        description:
            "Built in file synchronization between your central storage (cloud or physical) and all your freelancers",
    },
    {
        label: "Timers Manager",
        link: "docs/admin_settings_system#timers-manager",
        description:
            "Service for monitoring the user activity to start, stop and synchronise time tracking.",
    },
    {
        label: "Farm rendering",
        docs: "docs/module_deadline",
        description:
            "Integrations with Deadline and Muster render managers. Render, publish and generate reviews on the farm.",
    },
    {
        label: "Remote",
        link: "",
        description:
            "Production proven in fully remote workflows. Pype can run of cloud servers and storage.",
    },
    {
        label: "Scene Builder",
        link: "",
        description:
            "System for simple scene building. Loads pre-defined publishes to scene with single click, speeding up scene preparation.",
    },
    {
        label: "Reviewables",
        docs: "docs/project_settings/settings_project_global#extract-review",
        description:
            "Generate automated reviewable quicktimes and sequences in any format, with metadata burnins.",
    },
];

const ftrack = [
    {
        docs: "docs/manager_ftrack_actions#applications",
        label: "App launchers",
        description:
            "Start any DCC application directly from ftrack task, with pype loaded.",
    },
    {
        docs: "docs/manager_ftrack#project-management",
        label: "Project Setup",
        description:
            "Quickly sets up project with customisable pre-defined structure and attributes.",
    },
    {
        docs: "docs/module_ftrack#update-status-on-task-action",
        label: "Automate statuses",
        description:
            "Quickly sets up project with customisable pre-defined structure and attributes.",
    },
    {
        docs: "docs/admin_ftrack#event-server",
        label: "Event Server",
        description:
            "Built-in ftrack event server takes care of all automation on your ftrack.",
    },
    {
        docs: "",
        label: "Review publishing",
        description:
            "All reviewables from all DCC aps, including farm renders are pushed to ftrack online review.",
    },
    {
        docs: "docs/admin_settings_system#timers-manager",
        label: "Auto Time Tracker",
        description:
            "Automatically starts and stops ftrack time tracker, base on artist activity.",
    },
];

const ftrackActions = [
    {
        docbase: "docs/manager_ftrack_actions",
        label: "Launch Applications",
    },
    {
        docbase: "docs/manager_ftrack_actions#",
        label: "RV Player",
    },
    {
        docbase: "docs/manager_ftrack_actions#",
        label: "DJV view",
    },
    {
        docbase: "docs/manager_ftrack_actions#",
        label: "Prepare Project",
    },
    {
        docbase: "docs/manager_ftrack_actions#",
        label: "Delete Asset/Subset",
        target: "delete-assetsubset",
    },
    {
        docbase: "docs/manager_ftrack_actions#",
        label: "Create Folders",
    },
    {
        docbase: "docs/manager_ftrack_actions#",
        label: "Create Project Structure",
    },
    {
        docbase: "docs/manager_ftrack_actions#",
        label: "Open File",
    },
    {
        docbase: "docs/manager_ftrack_actions#",
        label: "Kill old jobs",
        target: "job-killer",
    },
    {
        docbase: "docs/manager_ftrack_actions#",
        label: "Sort Review",
    },
    {
        docbase: "docs/manager_ftrack_actions#",
        label: "Sync to Avalon",
    },
    {
        docbase: "docs/manager_ftrack_actions#",
        label: "Propagate Thumbnails",
        target: "thumbnail",
    },
];

const maya_features = [
    {
        label: "Look Management",
        docs: "docs/artist_hosts_maya#look-development",
        description:
            "Publish shading networks with textures and assign them to all assets in the scene at once",
    },
    {
        label: "Project Shelves",
        description:
            "Add any custom projects scripts to dynamically generated maya shelves",
    },
    {
        label: "Playblasts",
        docs: "docs/artist_hosts_maya#reviews",
        description:
            "Makes all your playblasts consistent, with burnins and correct viewport settings",
    },
    {
        label: "Renderlayers and AOVs",
        description:
            "Full support of rendersetup layers and AOVs in all major renderers.",
        docs: "docs/artist_hosts_maya#working-with-pype-in-maya",
    },
    {
        label: "Farm Renders",
        description:
            "Send RenderSetup layers to the farm, generate quicktimes and publish multi-layer or individual AOVs.",
        docs: "docs/artist_hosts_maya#working-with-pype-in-maya",
    },
    {
        label: "Plugins Support",
        description:
            "AYON plays well with Arnold, Vray, Redshift and Yeti. With more plugins added upon client requests.",
        docs: "docs/artist_hosts_maya#working-with-yeti-in-pype",
    },
];

const maya_families = [
    { label: "Model" },
    { label: "Look" },
    { label: "Rig" },
    { label: "Setdress" },
    { label: "Animation" },
    { label: "Cache" },
    { label: "VDB Cache" },
    { label: "Assembly" },
    { label: "Camera" },
    { label: "CameraRig" },
    { label: "RenderSetup" },
    { label: "Render" },
    { label: "Plate" },
    { label: "Review" },
    { label: "Workfile" },
    { label: ".ASS StandIn" },
    { label: "Yeti Cache" },
    { label: "Yeti Rig" },
    { label: "Vray Scene" },
    { label: "Vray Proxy" },
];

const nuke_features = [
    {
        label: "Color Managed",
        description: "Fully colour managed outputs for work and review.",
        docs: "docs/artist_hosts_nuke#set-colorspace",
    },
    {
        label: "Script Building",
        description:
            "Automatically build initial workfiles from published plates or renders",
        docs: "docs/artist_hosts_nuke#build-first-work-file",
    },
    {
        label: "Node Presets",
        description:
            "Template system for centrally controlled node parameters.",
    },
    {
        label: "Rendering",
        description:
            "Support for local and farm renders, including baked reviews.",
    },
    {
        label: "Slates",
        description: "Generate slates and attach them to rendered.",
    },
];

const nuke_families = [
    { label: "Model" },
    { label: "Camera" },
    { label: "Render" },
    { label: "Plate" },
    { label: "Review" },
    { label: "Workfile" },
    { label: "LUT" },
    { label: "Gizmo" },
    { label: "Prerender" },
];

const deadline_features = [
    {
        label: "Tiled Renders",
        description:
            "Send high resolution tiled renders to deadline for single frames and sequences.",
    },
    {
        label: "Maya",
        description: "Render maya rendersetup layers.",
    },
    {
        label: "Nuke",
        description:
            "Render write nodes and generate review quicktimes with baked colours.",
    },
    {
        label: "Harmony",
        description: "Render write nodes.",
    },
    {
        label: "After Effects",
        description: "Render compositions.",
    },
    {
        label: "Publishing",
        description:
            "All renders are automatically published. Generate reviewable quicktimes with optional burnins.",
    },
];

const deadline_families = [];

const hiero_features = [
    {
        label: "Project setup",
        description:
            "Automatic colour, timeline and fps setup of you hiero project.",
    },
    {
        label: "Create shots",
        description:
            "Populate project with shots based on your conformed edit.",
    },
    {
        label: "Publish plates",
        description:
            "Publish multiple tracks with plates to you shots from a single timeline.",
    },
    {
        label: "Retimes",
        description: "Publish retime information for individual plates.",
    },
    {
        label: "LUTS and fx",
        description:
            "Publish soft effects from your timeline to be used on shots.",
    },
];

const hiero_families = [
    { label: "Render" },
    { label: "Plate" },
    { label: "Review" },
    { label: "LUT" },
    { label: "Nukenodes" },
    { label: "Gizmo" },
    { label: "Workfile" },
];

const blender_features = [];

const blender_families = [
    { label: "Model" },
    { label: "Rig" },
    { label: "Setdress" },
    { label: "Layout" },
    { label: "Animation" },
    { label: "Point Cache" },
    { label: "Camera" },
    { label: "Workfile" },
];

const houdini_features = [];

const houdini_families = [
    { label: "Model" },
    { label: "Point Cache" },
    { label: "VDB Cache" },
    { label: "Camera" },
    { label: "Workfile" },
];

const fusion_features = [];

const fusion_families = [
    { label: "Render" },
    { label: "Plate" },
    { label: "Review" },
    { label: "Workfile" },
];

const harmony_families = [
    { label: "Render" },
    { label: "Plate" },
    { label: "Review" },
    { label: "Template" },
    { label: "Rig" },
    { label: "Palette" },
    { label: "Workfile" },
];

const tvpaint_families = [
    { label: "Render" },
    { label: "Review" },
    { label: "Image" },
    { label: "Audio" },
    { label: "Workfile" },
];

const photoshop_families = [
    { label: "Render" },
    { label: "Plate" },
    { label: "Image" },
    { label: "LayeredImage" },
    { label: "Background" },
    { label: "Workfile" },
];

const aftereffects_families = [
    { label: "Render" },
    { label: "Plate" },
    { label: "Image" },
    { label: "Audio" },
    { label: "Background" },
    { label: "Workfile" },
];

import { sortBy } from "@site/src/utils/jsUtils";

/*
 * ADD YOUR SITE TO THE DOCUSAURUS SHOWCASE
 *
 * Please don't submit a PR yourself: use the Github Discussion instead:
 * https://github.com/facebook/docusaurus/discussions/7826
 *
 * Instructions for maintainers:
 * - Add the site in the json array below
 * - `title` is the project's name (no need for the "Docs" suffix)
 * - A short (≤120 characters) description of the project
 * - Use relevant tags to categorize the site (read the tag descriptions on the
 *   https://docusaurus.io/showcase page and some further clarifications below)
 * - Add a local image preview (decent screenshot of the Docusaurus site)
 * - The image MUST be added to the GitHub repository, and use `require("img")`
 * - The image has to have minimum width 640 and an aspect of no wider than 2:1
 * - If a website is open-source, add a source link. The link should open
 *   to a directory containing the `docusaurus.config.js` file
 * - Resize images: node admin/scripts/resizeImage.js
 * - Run optimizt manually (see resize image script comment)
 * - Open a PR and check for reported CI errors
 *
 * Example PR: https://github.com/facebook/docusaurus/pull/7620
 */

// LIST OF AVAILABLE TAGS
export type TagType =
    | "core"
    | "key"
    | "integration"
    | "ftrack"
    | "maya"
    | "nuke"
    | "deadline"
    | "hiero"
    | "blender"
    | "houdini"
    | "fusion"
    | "harmony"
    | "tvpaint"
    | "photoshop"
    | "aftereffects"
    | "addon";

export type FeaturesType = {
    [key: string]: Feature;
};
// Add features to this list
// prettier-ignore
// first add key_features (core features)
const CoreFeatures: FeaturesType = {
    workfiles: {
        title: "Workfiles",
        description: "Save and load workfiles in progress. Change the context inside of the application.",
        preview: require("./features/workfiles.png"),
        docs: {
          "user": "artist_tools_workfiles",},
        tags: ["core", "key"],
    },
    creator: {
      title: "Creator",
      description: "Universal GUI for defining content for publishing from your DCC app.",
      // preview: require("./features/creator.png"),
      docs: {
          "user": "artist_tools_creator",
      },
      tags: ["core"],
  },
  loader: {
      title: "Loader",
      description: "Universal GUI for loading published assets into your DCC app.",
      preview: require("./features/loader.png"),
      docs: {
          "user": "artist_tools_loader",
      },
      tags: ["core", "key"],
  },
  publisher: {
      title: "Publisher",
      description: "Universal GUI for validating and publishing content from your DCC app.",
      // preview: require("./features/publisher.png"),
      docs: {
          "user": "artist_tools_publisher",
      },
      tags: ["core"],
  },
  sceneManager: {
      title: "Scene manager",
      description: "Universal GUI for managing versions of assets loaded into your working scene.",
      preview: require("./features/scene_manager.png"),
      docs: {
          "user": "artist_tools_inventory",
      },
      tags: ["core", "key"],
  },
  projectManager: {
      title: "Project manager",
      description: "Tools for creating shots, assets and task within your project if you don't use third party project management",
      // preview: require("./features/project_manager.png"),
      tags: ["core"],
  },
  libraryLoader: {
      title: "Library Loader",
      description: "A loader GUI that allows yo to load content from dedicated cross project asset library",
      // preview: require("./features/library_loader.png"),
      docs: {
          "user": "artist_tool_library_loader",
      },
      tags: ["core"],
  },
  trayPublisher: {
      title: "Tray Publisher",
      description: "A standalone GUI for publishing data into pipeline without going though DCC app.",
      // preview: require("./features/tray_publisher.png"),
      tags: ["core"],
  },
  appLauncher: {
      title: "App Launcher",
      description: "Standalone GUI for launching application in the chosen context directly from tray",
      // preview: require("./features/app_launcher.png"),
      tags: ["core"],
  },
  configurationGUI: {
      title: "Configuration GUI",
      description: "All settings and configuration are done via AYON Settings tool. No need to dig around .json and .yaml",
      // preview: require("./features/configuration_gui.png"),
      tags: ["core"],
  },
  siteSync: {
      title: "Site Sync",
      description: "Built in file synchronization between your central storage (cloud or physical) and all your freelancers",
      // preview: require("./features/site_sync.png"),
      docs: {
          "admin": "module_site_sync",
      },
      tags: ["core"],
  },
  timersManager: {
      title: "Timers Manager",
      description: "Service for monitoring the user activity to start, stop and synchronise time tracking.",
      // preview: require("./features/timers_manager.png"),
      docs: {
          "admin": "admin_settings_system#timers-manager",
      },
      tags: ["core"],
  },
    
  }

const NukeFeatures: FeaturesType = {
    nuke: {
        title: "Nuke",
        description:
            "Nuke is a compositing software for visual effects and motion graphics artists.",
        preview: require("./features/nuke.png"),
        docs: {
            user: "artist_hosts_nuke",
        },
        tags: ["nuke", "integration"],
    },
    colorManaged: {
        title: "Color Managed",
        description: "Fully colour managed outputs for work and review",
        preview: require("./features/color_managed.png"),
        docs: {
            user: "artist_hosts_nuke#set-colorspace",
        },
        tags: ["nuke"],
    },
    scriptBuilding: {
        title: "Script Building",
        description:
            "Automatically build initial workfiles from published plates or renders",
        preview: require("./features/script_building.png"),
        docs: {
            user: "artist_hosts_nuke#build-first-work-file",
        },
        tags: ["nuke"],
    },
    nodePresets: {
        title: "Node Presets",
        description:
            "Template system for centrally controlled node parameters.",
        // preview: require("./features/node_presets.png"),
        tags: ["nuke"],
    },
    rendering: {
        title: "Rendering",
        description:
            "Support for local and farm renders, including baked reviews.",
        tags: ["nuke"],
        preview: require("./features/rendering.png"),
    },
    slates: {
        title: "Slates",
        description: "Generate slates and attach them to rendered.",
        tags: ["nuke"],
        preview: require("./features/slates.png"),
    },
};

const ExtraFeatures: FeaturesType = {
    ftrack: {
        title: "Ftrack",
        description: "Ftrack is a project management tool for creative teams.",
        docs: {
            user: "artist_ftrack",
            admin: "module_ftrack",
        },
        preview: require("./features/ftrack.png"),
        tags: ["ftrack"],
    },
};

// add other features
export const Features: FeaturesType = {
    ...CoreFeatures,
    ...NukeFeatures,
    ...ExtraFeatures,
};

export type DocType = "user" | "admin" | "developer";

export type Feature = {
    title: string;
    description: string;
    preview?: string;
    tags: TagType[];
    docs?: { [type in DocType]?: String };
    families?: string[];
};

export type Tag = {
    label: string;
    feature?: string;
};

export const Tags: { [type in TagType]: Tag } = {
    key: {
        label: "Key",
    },
    core: {
        label: "Core",
    },
    integration: {
        label: "Integrations",
    },
    ftrack: {
        label: "Ftrack",
        feature: "ftrack",
    },
    nuke: {
        label: "Nuke",
        feature: "nuke",
    },
};

export type Family = {
    label: string;
};

export const TagList = Object.keys(Tags) as TagType[];
function sortFeatures() {
    let result = Object.values(Features);
    // Sort by site name
    result = sortBy(result, (feature) => feature.title.toLowerCase());
    // Sort by favorite tag, favorites first
    result = sortBy(result, (feature) => !feature.tags.includes("favorite"));
    return result;
}

export const sortedUsers = sortFeatures();
