---
title: Glossary
description: "Alphabetical definitions of the terms used in AYON and in this reference: entities, publishing, bundles and bundle modes, addons, services, settings scopes, sites and site IDs, permissions and access levels, Power features, and the parts of the web app such as the App header, URI bar, details panel and web viewer."
verified: 2026-11-15
sources:
  - https://help.ayon.app/en/help/articles/3030530-ayon-glossary
---

# Glossary

The terms below are written as the AYON web app and the AYON server use them. Entity terms (project, folder, task, product, version, representation, workfile) are explained with their relations on the [AYON entities](../how-ayon-works/entities.md) page.

| Term | Definition |
|---|---|
| **Access group** | A named set of permissions, assigned to a user per project or as a default for all projects. Access groups only limit users with the **User** access level. See [Permissions](../how-ayon-works/permissions.md#layer-2-access-groups). |
| **Access level** | The first layer of permissions, set per account: **Admin**, **Manager**, **User**, **Service** or **Guest**. Admins, managers and service users work in every project; users are limited by access groups; guests only see what is shared with them. See [Permissions](../how-ayon-works/permissions.md#layer-1-access-level). |
| **Activity** | An entry of the activity feed of an entity: a comment, a status, assignee, attribute or tag change, or a published or reviewed version. See [Activity feed](../web-ui/details-panel.md#activity-feed). |
| **Addon** | A versioned package that extends the AYON server, the pipeline or both. It has a server part, a client part (for host integrations and tools), or both, plus settings. See [Addons](../../addons/index.md) and [Bundles](../web-ui/studio/bundles.md). |
| **Addon data** | Files that users upload to an addon, such as slate templates or workflows, shared by every version of the addon. See [Addon files](../../developer/addon-development/files.md#addon-data). |
| **Anatomy** | The structure and conventions of one project: folder types, task types, statuses, tags, link types, roots, path templates, entity naming and product type appearance. The **Anatomy** page of the project manager edits it, and **Anatomy presets** hold reusable copies. |
| **App header** | The bar at the top of every page of the web app, with the project menu, Home, the URI bar and the menus. See [App header](../web-ui/app-header.md). |
| **ASH (AYON Service Host)** | The worker that starts, stops and removes the containers of addon services on request of the AYON server. See [ASH](../deployment/ash.md). |
| **Assignee** | A user assigned to a task. A task can have any number of assignees. |
| **Attribute** | A named, typed property of an entity, such as `fps`, `frameStart` or `priority`. Attributes are defined once for the AYON server, with the entity types (scopes) they exist on. See [Attributes](../web-ui/studio/attributes.md). |
| **AYON URI** | An address of an entity or a setting, such as `ayon+entity://<project>/<folder path>?task=<task>` or `ayon+settings://...`. It is shown, copied and opened in the URI bar. See [URI bar](../web-ui/app-header.md#uri-bar). |
| **Bundle** | A named set of addon versions, one launcher version and up to three dependency packages (one per platform). A bundle with a state decides what the server and the launcher run. See [Bundles](../how-ayon-works/bundles.md). |
| **Bundle mode** | The bundle a user works with: Production (the default), Staging or Developer, set in the App header for the web app and with the launcher mode on workstations. See [Bundles](../how-ayon-works/bundles.md). |
| **Bundle state** | The label that puts a bundle into use: Production, Staging or Dev. A bundle without a state is stored but not used. See [Bundles](../how-ayon-works/bundles.md). |
| **Context** | The location of the work: the project name, the folder path and the task name. Pipeline tools, publishing and the launcher work in a context. |
| **Creator** | A plugin of a host integration that defines one kind of product to publish and creates its publish instance. See [Publisher](../../pipeline/publisher.md). |
| **Dependency package** | An archive of the Python modules the client code of a bundle's addons needs, built for one platform. See [Bundles](../web-ui/studio/bundles.md#dependency-packages). |
| **Details panel** | The side panel that shows a selected folder, task, version or representation with its status, attributes and activity feed. See [Details panel](../web-ui/details-panel.md). |
| **Dev bundle** | A bundle with the Dev state, assigned to one developer, which can run addons from source. Needs developer mode. See [Developer mode](../../developer/developer-mode.md). |
| **Developer mode** | A user setting that allows a Dev bundle and the **Developer** bundle mode, for running addons from source. See [Developer mode](../../developer/developer-mode.md). |
| **Entity** | A stored record of a project or of the AYON server: project, folder, task, product, version, representation, workfile, user, list or link. |
| **Event** | A record of something that happened on the AYON server, such as a changed entity or a job for a service, with a topic and a status. See [Event Viewer](../web-ui/event-viewer.md). |
| **Folder** | The main building block of a project hierarchy. Folders nest into each other and hold tasks and products. Every folder has a folder type, such as Asset, Sequence or Shot. |
| **Folder path** | The names of a folder and its parents joined by `/`, for example `/assets/characters/bob`. Names are unique within one parent. |
| **Folder type** | The classification of a folder, defined in the project anatomy. The defaults are Folder, Library, Asset, Episode, Sequence and Shot. |
| **Guest** | An account that only sees what is shared with it, for example in a review. See [Permissions](../how-ayon-works/permissions.md#layer-1-access-level). |
| **Hero version** | A version of a product that has the negative of its source version number and is shown as HERO. It is an unversioned copy of the latest publish, so references to it stay valid when a new version is published. See [Publishing](../../pipeline/publishing.md). |
| **Host** | An addon that integrates a third-party application, usually a DCC such as Maya, Houdini or Nuke, into the pipeline. |
| **Inbox** | The page that collects the activity concerning the current user across projects. See [Inbox and notifications](../web-ui/inbox/index.md). |
| **Installer** | A launcher build for one platform, stored on the AYON server so users can download it and bundles can reference it. |
| **Instance** | See Publish instance. |
| **Label** | An optional display name of an entity. Folders, tasks, projects and lists have a label next to the name. |
| **Launcher** | The AYON desktop application that starts DCC applications in a context and runs the pipeline of a bundle. Platform builds of it are uploaded to the AYON server as installers. See [AYON launcher](../../pipeline/launcher.md). |
| **Library project** | A project marked **Library** that stores reusable data, such as assets, which other projects can load. |
| **Link** | A stored, typed relationship between two entities of one project. See [Links manager](../web-ui/links-manager.md). |
| **Link type** | The definition of a kind of link in the project anatomy: a name, an input entity type and an output entity type. The defaults are `generative`, `breakdown`, `reference` and `template`. |
| **List** | A collection of folders, tasks or versions from anywhere in a project, kept outside the hierarchy. Lists of the review session type belong to the Review addon. See [Lists](../web-ui/production-tracking/lists.md). |
| **Load** | Bringing a published product version into the current scene with a loader, so that the scene stays version controlled and can be updated. See [Loader](../../pipeline/loader.md). |
| **Market** | The page for installing addons, launchers and releases from Ynput. See [Market](../web-ui/market.md). |
| **Pipeline addon** | An addon of type `pipeline`. Its client code is loaded by the launcher. A server addon runs only on the AYON server. |
| **Pipeline release** | A tested set of addons, launchers and dependency packages published by Ynput, installed as a new bundle. See [Install pipeline release](../web-ui/dialogs/install-pipeline-release.md). |
| **Power features** | Licensed features of the web app and server delivered by the Power Pack, marked with a lightning symbol. See [Power features](../../addons/production-tracking/power-pack/index.md). |
| **Product** | A named, typed set of published versions that belongs to a folder, for example `modelMain`. Publishing creates products and their versions. See [Product types](../../pipeline/product-types.md). |
| **Product base type** | The generic, technical type of a product, for example `model` or `render`. Creators, plugins and settings profiles work with it. |
| **Product name** | The name of a product, built from a template, the product type, the variant and the context. See [Naming conventions](../../pipeline/naming-conventions.md). |
| **Product type** | The type stored on a product. It equals the product base type unless a studio defines its own type for a base type. It does not decide the file format. See [Product types](../../pipeline/product-types.md). |
| **Production** | The bundle state of the stable bundle for daily work, and the default pipeline mode of the launcher. |
| **Project** | The top entity of a production. It owns the folder hierarchy, the tasks, products and versions, the anatomy and the project settings. |
| **Project bundle** | A bundle locked for one production: it sets the launcher version, the dependency packages and the addon versions of one project, while the studio bundles move on. See [Project bundle](../web-ui/project/project-bundle.md). |
| **Publish** | Exporting data from a work scene into products with versioned, immutable files that other users can load. See [Publishing](../../pipeline/publishing.md). |
| **Publish instance** | One entry that defines a publish output of a workfile. Instances are stored in the workfile, so later publishes produce consistent outputs. |
| **Publisher** | The tool in which creators are used to define instances and in which a publish runs. See [Publisher](../../pipeline/publisher.md). |
| **Representation** | One form of the data of a version, for example an `abc` or `obj` file of a model, or a movie of its turnaround. A version can have several. |
| **Review session** | A list of the review session type, used for reviewing versions with the Review addon. See [Review](../../addons/production-tracking/review/index.md). |
| **Reviewable** | A video or image file of a version that is played in the web viewer. See [Reviewables](../web-ui/details-panel.md#version-files-tab). |
| **Roots** | Named storage locations in the project anatomy, with one path per platform. Path templates start from a root. See [Naming conventions](../../pipeline/naming-conventions.md). |
| **Secret** | A named value stored on the AYON server, such as an API key or a password, that addon settings refer to by name. See [Secrets](../web-ui/studio/secrets.md). |
| **Server addon** | An addon of type `server`. It runs on the AYON server only and does not change what the launcher runs. |
| **Service** | A program of an addon, shipped as a Docker image, that runs next to the AYON server, for example a tracker synchronization. It is usually run by an ASH worker from the **Services** page, and can also be run as a container outside AYON. See [Addon services](../how-ayon-works/services.md). |
| **Service user** | An account for scripts and services that connects with an API key instead of a password. See [Users](../web-ui/studio/users.md). |
| **Settings scope** | The level a setting value is stored at: studio, project, studio site or project site. Each level overrides the one before it. See [Settings](../how-ayon-works/settings.md). |
| **Site** | Two meanings: one workstation, identified by its [site ID](../how-ayon-works/site-ids.md), for which site settings are stored; and in the [Site Sync](../../addons/pipeline-features/sitesync/index.md) addon, a storage location that files are synchronized to and from. |
| **Site ID** | The ID of one workstation, created by the launcher at its first start, that ties site settings to the machine. See [Site IDs](../how-ayon-works/site-ids.md). |
| **Slicer** | The panel on the left of some project pages that filters the page by hierarchy and, with the Power Pack, by assignee, status, type or attribute. See [Slicer](../web-ui/slicer.md). |
| **Staging** | Two unrelated meanings: the bundle state of the bundle used to test new addon versions and settings before production, and the staging directory to which a publish extracts files before they are copied to their final location. |
| **Status** | The progress state of a folder, task, product, version, representation or workfile. Statuses are defined per project, each with a short name, a state, a color and the entity types it applies to. |
| **Subtask** | A small work item stored inside a task, not an entity of its own. See [Subtasks](../../addons/production-tracking/planner/subtasks.md). |
| **Tag** | A label from the tag list of the project that is set on entities to group or filter them. |
| **Task** | A unit of work of a folder in which an artist works, for example `modeling` or `rigging`. Every task has a task type. A host application is started in a task. See [Workfiles](../../pipeline/workfiles.md). |
| **Task type** | The classification of a task, defined in the project anatomy, for example Modeling, Rigging or Compositing. |
| **Team** | A named group of users of one project, with a role per member and optional leaders. See [Teams](../web-ui/project/teams.md). |
| **Template** | A path pattern of the project anatomy that turns context data into work and publish paths. |
| **Tool** | A small program for a purpose, such as the Publisher or the Loader. Most tools have a window, a few are command-line only. |
| **URI bar** | The box in the middle of the App header that shows the current location as an AYON URI, copies it, and opens a typed or pasted one. See [URI bar](../web-ui/app-header.md#uri-bar). |
| **Variant** | In publishing, the free name that separates products of one type in a folder, such as `Main` or `Proxy`. In settings, one of the stored value sets of an addon: factory defaults, `production`, `staging` or a development variant. |
| **Version** | A numbered iteration of a product, shown as `v001`. A version has at least one representation. The version of a product with a negative number is its hero version. |
| **View** | A saved layout of a web app page: filters, sorting, grouping and columns. See [Views](../web-ui/views.md). |
| **Watcher** | A user who is notified in their Inbox of the activity of an entity. See [Details panel](../web-ui/details-panel.md#watchers). |
| **Web action** | An action an addon adds to the web app for the selected entities, for example in the details panel. The addon runs it on the server, and can ask the AYON launcher on the workstation to do part of it. See [Web actions](../../developer/addon-development/server.md#web-actions). |
| **Web viewer** | The player of the web app for the reviewables of versions, with annotations and frame comments. See [Web viewer](../web-ui/web-viewer.md). |
| **Workfile** | A scene file an artist works in within a task. Workfiles are saved and opened with the Workfiles tool and belong to the task. See [Workfiles](../../pipeline/workfiles.md). |
| **Workflow** | Two different things in AYON. A **pipeline workflow** is a way of working that runs through several pipeline tools, such as the templated workfile builder, editorial publishing or OpenUSD, see [Workflows](../../pipeline/index.md#workflows). A **workflow graph** is a graph of nodes of the [Workflow addon](../../addons/automation/workflow/index.md), edited in its browser editor and run on a workstation, on the farm or by an event. |

## Related

- [AYON entities](../how-ayon-works/entities.md)
- [Product types](../../pipeline/product-types.md)
- [Naming conventions](../../pipeline/naming-conventions.md)
- [AYON plans](../plans.md)
