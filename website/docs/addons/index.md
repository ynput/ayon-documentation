---
title: Addons
sidebar_position: 0
description: "A catalogue of AYON addons in two groups: server addons (production management, power features, single sign-on) and pipeline addons (core, 3D, 2D, compositing, trackers, review, farm, automation, integrations). For each addon: what it provides, its type, its license and its settings."
---

# Addons

AYON is modular: integrations with applications, trackers, render farms and review tools, production management features and many pipeline features are addons. This catalogue lists the 68 addons in three groups by scope. The groups show where an addon works, because server addons and pipeline addons are set up differently.

| Type | What it is | Where it runs |
|---|---|---|
| **Server** | An addon with no pipeline part: web app features, services or sign-in options. | On the AYON server only. |
| **Pipeline** | An addon with a pipeline part (a `client` folder in its repository) next to its server part, which holds the settings. | On workstations, in the launcher and in applications, plus the server. |
| **Pipeline + server** | A pipeline addon that also adds substantial server features: services, web app pages or API endpoints. | On workstations and on the AYON server. |

**Pipeline addons** are part of a bundle's pipeline side, and their Python dependencies end up in the bundle's dependency package, so they need more care when a bundle is put together, and mixing addon versions needs attention. **Server addons** add no pipeline part and no dependencies to that package. Each addon page states its type in the box under the title.

Every addon page states the addon version it was written and checked for, so a page can be compared with the latest release of the addon. The license column follows the AYON Market: **Free** addons are part of every edition, **Pro, Studio** addons need one of those plans, and **Studio** addons need the Studio plan. Addons marked **archived** are no longer developed and addons marked **unreleased** have no release yet; archived addons are still listed in the AYON Market. See the [plans](../ayon/plans.md).

How addons are installed, activated and configured is described in [how AYON works](../ayon/how-ayon-works/index.md).

<TableFilter columns={["Type", "License"]} placeholder="Search the addons">

## Production tracking

AYON's own production tracking features: planning, reports, node graphs, review sessions, power features and user access (single sign-on, Ynput Cloud login and support). Most of them are Pro or Studio addons. They run on the AYON server, so AYON is more than a pipeline tool.

| Addon | Type | Version | License | What it is |
|---|---|---|---|---|
| [Node Graph](production-tracking/node-graph/index.md) | Server | 0.3.0 | Pro, Studio | The AYON Node Graph addon: a node-based view of a project's entities and the links between them, with a hierarchy browser and a links creator. |
| [Planner](production-tracking/planner/index.md) | Server | 2.3.2 | Pro, Studio | The AYON Planner addon: a studio-level resource and booking timeline with capacity and workload, and a project-level task schedule. |
| [Power Pack](production-tracking/power-pack/index.md) | Server | 1.6.7 | Pro, Studio | The AYON Power Features addon (powerpack): the licensed features it adds, such as multi-view slicer, annotations, views, comment categories,... |
| [Reports](production-tracking/reports/index.md) | Server | 0.3.13 | Pro, Studio | The AYON Reports addon: project-level dashboards of charts and KPI cards for tasks, folders and versions, with filters, shareable views and PDF or... |
| [Review](production-tracking/review/index.md) | Server | 1.0.1 | Pro, Studio | The AYON Review addon (review sessions): playlists of versions with frame-accurate playback, annotations, comparison, synchronized sessions and... |
| [Review Desktop](production-tracking/review-desktop/index.md) | Pipeline | 0.0.5 | Pro, Studio | The AYON Review Desktop addon: opens version lists and review sessions in OpenRV with an AYON activity panel for viewing feedback and submitting... |

### Access and support

Server addons for signing in and getting help: single sign-on with an identity provider, Keycloak, and the Ynput Cloud login and remote support. They run on the AYON server only.

| Addon | Type | Version | License | What it is |
|---|---|---|---|---|
| [Keycloak](server-features/keycloak/index.md) | Server | 1.0.2 | Pro, Studio | The AYON Keycloak addon: sign-in to AYON through a Keycloak realm using OpenID Connect, with Keycloak client roles mapped to AYON access levels and... |
| [SSO](server-features/sso/index.md) | Server | 1.1.1 | Pro, Studio | The AYON SSO addon: sign-in to AYON with Authentik, Discord, Microsoft Entra, Google or Okta accounts, automatic creation of users and mapping of... |
| [YnputCloud](server-features/ynput-cloud/index.md) | Server | 1.1.1 | Pro, Studio | The YnputCloud addon: Ynput Cloud support for an AYON server. |

## Pipeline addons

Everything with a pipeline part that runs on workstations: the core, publishing and delivery features, the integrations with 3D, 2D and compositing applications, review players, render farm managers and automation.

### Essentials

The addons every pipeline bundle starts from. Core is declared as required by 53 other addons and Applications by 8. Core's code also needs 3rd party binaries (FFmpeg and OpenImageIO) and OCIO configs (the built-in color configs), although it lists them only as compatible addons. TrayPublisher completes the base publishing features and is required by Batch Ingest.

| Addon | Type | Version | License | What it is |
|---|---|---|---|---|
| [3rd party binaries](essentials/3rd-party-binaries/index.md) | Pipeline | 1.4.1 | Free | The 3rd party binaries addon (ayon_third_party): it distributes ffmpeg and OpenImageIO command-line tools from the AYON server to workstations, or... |
| [Applications](essentials/applications/index.md) | Pipeline | 1.4.7 | Free | The AYON Applications addon: how applications and tools are defined, filtered per task and launched from the AYON web UI, the launcher and the... |
| [Core](essentials/core/index.md) | Pipeline | 1.10.1 | Free | The AYON core addon: the base of the AYON pipeline with the artist tools (Launcher, Workfiles, Loader, Publisher, Scene Inventory), the shared... |
| [OCIO configs](essentials/ocio/index.md) | Pipeline | 1.2.2 | Free | The OCIO configs addon (ayon_ocio): it ships the built-in OpenColorIO configs (ACES 2.0, ACES 1.3 and others) with AYON and exposes their location... |
| [TrayPublisher](essentials/traypublisher/index.md) | Pipeline | 0.4.8 | Free | The TrayPublisher addon (traypublisher): the standalone Tray Publisher tool that publishes existing files to AYON without a DCC application, with... |

### Pipeline features

Pipeline addons that add publishing, delivery, storage and format features: site sync, USD, burn-ins, slates, batch ingest and delivery, archival and version control.

| Addon | Type | Version | License | What it is |
|---|---|---|---|---|
| [ArchivalTool](pipeline-features/archival-tool/index.md) | Pipeline + server | 0.1.2 | Pro, Studio | The AYON ArchivalTool addon: analysing folders of a project, reporting which published versions and work files can be removed, and deleting or... |
| [Batch delivery](pipeline-features/batch-delivery/index.md) | Pipeline + server | 0.4.5 | Pro, Studio | The AYON Batch delivery addon: server actions that submit delivery and transcoding jobs to Deadline, the Deadline submitter service, the publish... |
| [BatchIngest](pipeline-features/batch-ingest/index.md) | Pipeline | 0.3.0 | Pro, Studio | The AYON BatchIngest addon: the Batch Ingest creator of the Tray Publisher that groups files from dropped folders into products using presets, its... |
| [Premium burnins](pipeline-features/premium-burnins/index.md) | Pipeline | 0.2.4 | Pro, Studio | The Premium burnins addon: a publish plugin that renders configurable top and bottom burnin bars with text, images and spacers onto review videos,... |
| [SiteSync](pipeline-features/sitesync/index.md) | Pipeline + server | 1.3.2 | Free | The AYON SiteSync addon: what a site is, how published files are kept in step between sites, the storage providers, the sync page, the background... |
| [Slater](pipeline-features/slater/index.md) | Pipeline | 1.0.6 | Pro, Studio | The AYON Slater addon: the Slate Editor desktop tool, the slate templates stored on the AYON server and the publish plugin that adds generated... |
| [USD](pipeline-features/usd/index.md) | Pipeline | 0.1.9 | Free | The AYON USD addon: distribution of the AYON USD asset resolver for Maya, Houdini and Unreal, the launch hooks that set it up, the USD publish... |
| [Version Control (archived)](pipeline-features/version-control/index.md) | Pipeline | 0.1.1 | Free | The AYON Version Control addon: Perforce support for publishing products to a Perforce server, the Unreal Engine changelist sync dialog and... |
| [Web Publisher](pipeline-features/web-publisher/index.md) | Pipeline + server | 1.2.5 | Pro, Studio | The AYON Web Publisher addon: publishing uploaded files from the AYON web interface, the studio-side service that processes the uploads, and the... |

### 3D applications

AYON addons that integrate 3D applications such as Blender, Houdini and Maya: modeling, animation, rigging, lookdev, FX and game engines.

| Addon | Type | Version | License | What it is |
|---|---|---|---|---|
| [3DEqualizer](3d-applications/3dequalizer/index.md) | Pipeline | 0.2.2 | Free | The AYON integration for 3DEqualizer: the AYON menu, the match move and lens distortion products it publishes for Maya and Nuke, the loaders for... |
| [3ds Max](3d-applications/3dsmax/index.md) | Pipeline | 0.5.3 | Free | The AYON integration for Autodesk 3ds Max: the AYON menu, the products 3ds Max can create, publish and load, validators, render targets, tyFlow and... |
| [Blender](3d-applications/blender/index.md) | Pipeline | 1.1.11 | Free | The AYON integration for Blender: the AYON menu, the products Blender can create, publish and load, the validators and extractors it provides,... |
| [Cinema4D](3d-applications/cinema4d/index.md) | Pipeline | 0.2.0 | Free | The AYON integration for Cinema4D: the AYON menu, the products Cinema4D can create, publish and load, the validators and extractors it provides,... |
| [Houdini](3d-applications/houdini/index.md) | Pipeline | 0.10.10 | Free | The AYON integration for SideFX Houdini: the AYON menu, the products Houdini can create, publish and load, validators and extractors, the loader... |
| [Marvelous Designer](3d-applications/marvelous-designer/index.md) | Pipeline | 1.1.4 | Free | The AYON integration for Marvelous Designer: the AYON plugin entry, the garment and fabric products it can create, publish and load, launch hooks,... |
| [Maya](3d-applications/maya/index.md) | Pipeline | 0.6.13 | Free | The AYON integration for Autodesk Maya: the AYON menu, the products Maya can create, publish and load, validators and extractors, inventory actions,... |
| [Motionbuilder](3d-applications/motionbuilder/index.md) | Pipeline | 0.2.1 | Free | The AYON integration for Autodesk MotionBuilder: the AYON menu, the animation and workfile products, the FBX publish and load plugins, launch hooks... |
| [SpeedTree](3d-applications/speedtree/index.md) | Pipeline | 0.2.1 | Free | The AYON integration for SpeedTree: the floating AYON tools window, the model and workfile products, FBX and XML publishing, workfile loading,... |
| [Substance Designer](3d-applications/substance-designer/index.md) | Pipeline | 0.2.1 | Free | The AYON integration for Substance Designer: the AYON menu, project templates, the texture set and SBSAR products, publishing, texture loading,... |
| [Substance Painter](3d-applications/substance-painter/index.md) | Pipeline | 0.3.6 | Free | The AYON integration for Substance Painter: the AYON menu, loading the project mesh, publishing texture sets with their options and validator,... |
| [Unreal](3d-applications/unreal/index.md) | Pipeline | 0.4.0 | Free | The AYON integration for Unreal Engine: the AYON tools, the products Unreal can create, publish and load, the validators and extractors it provides,... |
| [Wrap (unreleased)](3d-applications/wrap/index.md) | Pipeline | 0.0.3-dev.1 | Free | The AYON integration for Faceform Wrap: template workfiles with placeholders that load AYON products, and semi-manual publishing of Wrap workfiles... |
| [Zbrush](3d-applications/zbrush/index.md) | Pipeline | 0.4.2 | Free | The AYON integration for Zbrush: the AYON menu, the workfile and model products Zbrush can create and publish, the model loader, workfile metadata... |

### 2D drawing applications

AYON addons that integrate 2D drawing and painting applications such as Photoshop, Harmony and TVPaint.

| Addon | Type | Version | License | What it is |
|---|---|---|---|---|
| [CelAction](2d-drawing-applications/celaction/index.md) | Pipeline | 0.2.5 | Free | The AYON integration for CelAction2D: how the application is launched with a workfile and farm submission settings, the publish plugins that collect... |
| [Harmony](2d-drawing-applications/harmony/index.md) | Pipeline | 0.5.4 | Free | The AYON integration for Toon Boom Harmony: the AYON menu, workfile handling, the products Harmony can create, publish and load, its validators and... |
| [Photoshop](2d-drawing-applications/photoshop/index.md) | Pipeline | 0.4.8 | Free | The AYON integration for Adobe Photoshop: the AYON panel, the image, review and workfile products it creates, publishing, validators, loaders,... |
| [TVPaint](2d-drawing-applications/tvpaint/index.md) | Pipeline | 0.4.3 | Free | The AYON integration for TVPaint Animation: the AYON Tools panel, workfile handling, the products TVPaint can create, publish and load, its... |

### Compositing and editorial applications

AYON addons that integrate compositing, editorial and finishing applications such as Nuke, After Effects, Premiere and DaVinci Resolve.

| Addon | Type | Version | License | What it is |
|---|---|---|---|---|
| [After Effects](compositing-editorial-applications/after-effects/index.md) | Pipeline | 0.3.7 | Free | The AYON integration for Adobe After Effects: the AYON panel, the render and workfile products it creates, publishing and farm rendering, loaders,... |
| [Flame](compositing-editorial-applications/flame/index.md) | Pipeline | 1.4.5 | Free | The AYON integration for Autodesk Flame: the AYON menus, editorial publishing of clips as shots and plates, batch render and batch workfile... |
| [Fusion](compositing-editorial-applications/fusion/index.md) | Pipeline | 0.4.3 | Free | The AYON integration for Blackmagic Fusion: the AYON menu, the Saver based render and image products, publishing, the validators it provides,... |
| [Hiero](compositing-editorial-applications/hiero/index.md) | Pipeline | 0.6.5 | Free | The AYON integration for Hiero and Nuke Studio: the AYON menu, editorial publishing of shots, plates, audio, effects and editorial packages from a... |
| [Mocha Pro](compositing-editorial-applications/mocha-pro/index.md) | Pipeline | 1.1.0 | Free | The AYON integration for the Mocha Pro standalone application: the AYON menu, the products it can create and publish (tracking points, shapes,... |
| [Nuke](compositing-editorial-applications/nuke/index.md) | Pipeline | 0.4.19 | Free | The AYON integration for Nuke: the AYON menu, the write, node and 3D products Nuke can create, publish and load, render targets, review and slate... |
| [Premiere Pro](compositing-editorial-applications/premiere-pro/index.md) | Pipeline | 0.2.3 | Free | The AYON integration for Adobe Premiere Pro: the AYON extension panel, the workfile product it creates, publishing, loading footage and After... |
| [DaVinci Resolve](compositing-editorial-applications/resolve/index.md) | Pipeline | 0.6.5 | Free | The AYON integration for DaVinci Resolve: the AYON menu, editorial products it creates (shots, plates, audio, editorial packages, workfiles),... |
| [Silhouette](compositing-editorial-applications/silhouette/index.md) | Pipeline | 0.2.2 | Free | The AYON integration for Silhouette: the AYON menu, the matte shapes, track points and render products it creates, their export formats, loading... |

### Review and media players

AYON addons for reviewing media: media players and review tools.

| Addon | Type | Version | License | What it is |
|---|---|---|---|---|
| [DJV player](review-and-media-players/djv/index.md) | Pipeline | 1.2.0 | Free | The AYON integration for the DJV media player: the Open in DJV action of the Loader, the ftrack action, its requirements and the executable paths it... |
| [Open RV](review-and-media-players/open-rv/index.md) | Pipeline | 1.2.4 | Free | The AYON integration for Open RV: launching Open RV from AYON, the AYON menu, loaders, the Open in RV actions, workfile publishing, requirements and... |
| [SyncSketch](review-and-media-players/syncsketch/index.md) | Server | 0.4.1 | Free | The AYON integration for SyncSketch: pushing version lists to SyncSketch review sessions, pulling comments and drawings back as activities, the... |
| [xStudio (unreleased)](review-and-media-players/xstudio/index.md) | Pipeline | 0.0.1 | Free | The AYON integration for the xStudio media player: the Open in xStudio action of the Loader, its requirements and the executable paths it uses. The... |

### Farm managers

AYON addons that submit publish and render jobs to render farm managers.

| Addon | Type | Version | License | What it is |
|---|---|---|---|---|
| [Deadline](farm-managers/deadline/index.md) | Pipeline | 0.7.5 | Free | The AYON integration for the Deadline render farm manager: the job and publish plugins it adds to each application, the Deadline repository plugins,... |
| [Royal Render](farm-managers/royal-render/index.md) | Pipeline | 0.4.1 | Free | The AYON integration for the Royal Render farm manager: the job creation and submission plugins, the RR_ROOT files it ships, and its requirements. |

### Automation

Addons for automating AYON with node-based workflows.

| Addon | Type | Version | License | What it is |
|---|---|---|---|---|
| [Workflow](automation/workflow/index.md) | Pipeline + server | 0.4.4 | Studio | The AYON Workflow addon: node-based automation with a browser editor, local, farm and event-triggered execution, simple actions in the AYON web app,... |

## Third-party project management

Addons that connect AYON to production trackers and other project management tools outside AYON.

### Production trackers

AYON addons that connect AYON to third-party production trackers.

| Addon | Type | Version | License | What it is |
|---|---|---|---|---|
| [Airtable](third-party-trackers/airtable/index.md) | Pipeline + server | 0.1.1 | Free | The AYON integration for Airtable: the version status synchronization between AYON and an Airtable base, the Leecher, Processor and Transmitter... |
| [Flow (ShotGrid)](third-party-trackers/flow-shotgrid/index.md) | Pipeline + server | 0.6.20 | Free | The AYON integration for Autodesk Flow Production Tracking (ShotGrid): the project, hierarchy, task, version, note and playlist synchronization, the... |
| [ftrack](third-party-trackers/ftrack/index.md) | Pipeline + server | 1.6.8 | Free | The AYON integration for ftrack: what it connects, the synchronization between ftrack and AYON, the actions and launcher entries it adds, the... |
| [Kitsu](third-party-trackers/kitsu/index.md) | Pipeline + server | 1.2.7 | Free | The AYON integration for Kitsu: what it connects, how projects are paired and synchronized from Kitsu to AYON, the launcher and tray entries it... |

### Other integrations

Addons that connect AYON to other third-party tools (time tracking, chat, issue tracking, HR) and to AI tooling, plus the timers manager.

| Addon | Type | Version | License | What it is |
|---|---|---|---|---|
| [Clockify](integrations/clockify/index.md) | Pipeline | 0.2.2 | Free | The AYON Clockify addon: it starts and stops Clockify time entries for AYON tasks, adds launcher actions to start a timer and sync projects, and... |
| [ComfyUI](integrations/comfyui/index.md) | Pipeline | 0.0.28 | Free | The AYON ComfyUI integration: how ComfyUI is launched locally or connected remotely, the AYON menu and nodes inside ComfyUI, and the products it can... |
| [HiBob](integrations/hibob/index.md) | Server | 1.1.3 | Free | The AYON HiBob addon, an integration with the HiBob HR information system. |
| [Jira (archived)](integrations/jira/index.md) | Pipeline + server | 0.1.1 | Free | The AYON integration for Jira: template-based creation of AYON tasks and matching Jira tickets from a project page, the Jira current phase attribute... |
| [Slack](integrations/slack/index.md) | Pipeline | 1.3.1 | Free | The AYON Slack addon: it posts notifications to Slack channels when products are published, with profile-based filtering, message templates, user... |
| [Soko Sync](integrations/soko/index.md) | Server | 0.1.4 | Free | The AYON Soko Sync addon, which synchronizes projects and their data between AYON and Soko. |
| [TimersManager](integrations/timers-manager/index.md) | Pipeline | 0.2.0 | Free | The AYON Timers Manager addon: a common interface that starts and stops timers in connected time tracking addons, stops them after user inactivity,... |

</TableFilter>
