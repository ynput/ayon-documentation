---
title: Glossary
description: "Alphabetical definitions of the terms used in AYON and in this reference: entities, publishing, bundles, addons, services and the web app."
verified: 2026-10-19
sources:
  - https://help.ayon.app/en/help/articles/3030530-ayon-glossary
---

# Glossary

The terms below are written as the AYON web app and the AYON server use them. Entity terms (project, folder, task, product, version, representation, workfile) are explained with their relations on the [data model](../backend/data-model/index.md) page.

| Term | Definition |
|---|---|
| **Access group** | A named set of permissions that is assigned to a user, per project or as a default for all projects. See [Users and permissions](../web-ui/users-and-permissions.md). |
| **Activity** | An entry of the activity feed of an entity: a comment, a status, assignee, attribute or tag change, or a published or reviewed version. See [Activity feed and comments](../../production-tracking/activity-feed-and-comments.md). |
| **Addon** | A versioned package that extends the AYON server, the pipeline or both. It has a server part, a client part (for host integrations and tools), or both, plus settings. See [Addons](../../addons/index.md) and [Bundles and addons](../web-ui/bundles-and-addons.md). |
| **Anatomy** | The structure and conventions of one project: folder types, task types, statuses, tags, link types, roots, path templates, entity naming and product type appearance. The **Anatomy** page of the project manager edits it, and **Anatomy presets** hold reusable copies. |
| **ASH (AYON Service Host)** | The worker that starts, stops and removes the containers of addon services on request of the AYON server. See [ASH](../hosting/ash.md). |
| **Assignee** | A user assigned to a task. A task can have any number of assignees. |
| **Attribute** | A named, typed property of an entity, such as `fps`, `frameStart` or `priority`. Attributes are defined once for the AYON server, with the entity types (scopes) they exist on. See [Attributes](../web-ui/attributes.md). |
| **Bundle** | A named set of addon versions, one launcher version and up to three dependency packages (one per platform). A bundle with a state decides what the server and the launcher run. See [Bundles and addons](../web-ui/bundles-and-addons.md). |
| **Bundle state** | The label that makes a bundle active: Production, Staging or Dev. A bundle without a state is stored but not used. |
| **Context** | The location of the work: the project name, the folder path and the task name. Pipeline tools, publishing and the launcher work in a context. |
| **Creator** | A plugin of a host integration that defines one kind of product to publish and creates its publish instance. See [Publisher](../../pipeline/publisher.md). |
| **Dependency package** | An archive of the Python modules the client code of a bundle's addons needs, built for one platform. See [Bundles and addons](../web-ui/bundles-and-addons.md#dependency-packages). |
| **Dev bundle** | A bundle with the Dev state, used by a developer who runs addons from source. Available with the **Developer mode** user attribute. |
| **Entity** | A stored record of a project or of the AYON server: project, folder, task, product, version, representation, workfile, user, list or link. |
| **Folder** | The main building block of a project hierarchy. Folders nest into each other and hold tasks and products. Every folder has a folder type, such as Asset, Sequence or Shot. |
| **Folder path** | The names of a folder and its parents joined by `/`, for example `/assets/characters/bob`. Names are unique within one parent. |
| **Folder type** | The classification of a folder, defined in the project anatomy. The defaults are Folder, Library, Asset, Episode, Sequence and Shot. |
| **Hero version** | A version of a product that has the negative of its source version number and is shown as HERO. It is an unversioned copy of the latest publish, so references to it stay valid when a new version is published. See [Publishing](../../pipeline/publishing.md). |
| **Host** | An addon that integrates a third-party application, usually a DCC such as Maya, Houdini or Nuke, into the pipeline. |
| **Inbox** | The page that collects the activity concerning the current user across projects. See [Inbox and notifications](../../production-tracking/inbox-and-notifications.md). |
| **Installer** | A launcher build for one platform, stored on the AYON server so users can download it and bundles can reference it. |
| **Instance** | See Publish instance. |
| **Label** | An optional display name of an entity. Folders, tasks, projects and lists have a label next to the name. |
| **Launcher** | The AYON desktop application that starts DCC applications in a context and runs the pipeline of a bundle. Platform builds of it are uploaded to the AYON server as installers. See [Launcher](../../pipeline/launcher.md). |
| **Library project** | A project marked **Library** that stores reusable data, such as assets, which other projects can load. |
| **Link** | A stored, typed relationship between two entities of one project. See [Links manager](../../production-tracking/links-manager.md). |
| **Link type** | The definition of a kind of link in the project anatomy: a name, an input entity type and an output entity type. The defaults are `generative`, `breakdown`, `reference` and `template`. |
| **List** | A collection of folders, tasks or versions from anywhere in a project, kept outside the hierarchy. Lists of the review session type belong to the Review addon. See [Lists](../../production-tracking/lists.md). |
| **Load** | Bringing a published product version into the current scene with a loader, so that the scene stays version controlled and can be updated. See [Loader](../../pipeline/loader.md). |
| **Market** | The page for installing addons, launchers and releases from Ynput. See [Market](../web-ui/market.md). |
| **Pipeline addon** | An addon of type `pipeline`. Its client code is loaded by the launcher. A server addon runs only on the AYON server. |
| **Product** | A named, typed set of published versions that belongs to a folder, for example `modelMain`. Publishing creates products and their versions. See [Product types](../../pipeline/product-types.md). |
| **Product base type** | The generic, technical type of a product, for example `model` or `render`. Creators, plugins and settings profiles work with it. |
| **Product name** | The name of a product, built from a template, the product type, the variant and the context. See [Naming conventions](../../pipeline/naming-conventions.md). |
| **Product type** | The type stored on a product. It equals the product base type unless a studio defines its own type for a base type. It does not decide the file format. See [Product types](../../pipeline/product-types.md). |
| **Production** | The bundle state of the stable bundle for daily work, and the default pipeline mode of the launcher. |
| **Project** | The top entity of a production. It owns the folder hierarchy, the tasks, products and versions, the anatomy and the project settings. |
| **Project bundle** | A bundle frozen for one project, with its own launcher version, dependency packages and addon versions. See [Project bundles](../web-ui/project-bundles.md). |
| **Publish** | Exporting data from a work scene into products with versioned, immutable files that other users can load. See [Publishing](../../pipeline/publishing.md). |
| **Publish instance** | One entry that defines a publish output of a workfile. Instances are stored in the workfile, so later publishes produce consistent outputs. |
| **Publisher** | The tool in which creators are used to define instances and in which a publish runs. See [Publisher](../../pipeline/publisher.md). |
| **Representation** | One form of the data of a version, for example an `abc` or `obj` file of a model, or a movie of its turnaround. A version can have several. |
| **Review session** | A list of the review session type, used for reviewing versions with the Review addon. See [Review](../../addons/production-tracking/review/index.md). |
| **Reviewable** | A video or image file of a version that is played in the web viewer. See [Reviewables](../../production-tracking/reviewables.md). |
| **Roots** | Named storage locations in the project anatomy, with one path per platform. Path templates start from a root. See [Naming conventions](../../pipeline/naming-conventions.md). |
| **Server addon** | An addon of type `server`. It runs on the AYON server only and does not change what the launcher runs. |
| **Service** | A containerized program of an addon that runs next to the AYON server, for example a tracker synchronization. The **Services** page records services, and an ASH worker runs them. See [Services](../web-ui/services.md). |
| **Site** | One machine, identified by a site ID that the launcher assigns on first start. Addons use it to keep per-machine settings. See [Launcher](../../pipeline/launcher.md). |
| **Staging** | Two unrelated meanings: the bundle state of the bundle used to test new addon versions and settings before production, and the staging directory to which a publish extracts files before they are copied to their final location. |
| **Status** | The progress state of a folder, task, product, version, representation or workfile. Statuses are defined per project, each with a short name, a state, a color and the entity types it applies to. |
| **Subtask** | A small work item stored inside a task, not an entity of its own. See [Subtasks](../../production-tracking/subtasks.md). |
| **Tag** | A label from the tag list of the project that is set on entities to group or filter them. |
| **Task** | A unit of work of a folder in which an artist works, for example `modeling` or `rigging`. Every task has a task type. A host application is started in a task. See [Workfiles](../../pipeline/workfiles.md). |
| **Task type** | The classification of a task, defined in the project anatomy, for example Modeling, Rigging or Compositing. |
| **Team** | A named group of users of one project, with a role per member and optional leaders. See [Teams](../../production-tracking/teams.md). |
| **Template** | A path pattern of the project anatomy that turns context data into work and publish paths. |
| **Tool** | A small program for a purpose, such as the Publisher or the Loader. Most tools have a window, a few are command-line only. |
| **Variant** | In publishing, the free name that separates products of one type in a folder, such as `Main` or `Proxy`. In settings, one of the stored value sets of an addon: factory defaults, `production`, `staging` or a development variant. |
| **Version** | A numbered iteration of a product, shown as `v001`. A version has at least one representation. The version of a product with a negative number is its hero version. |
| **View** | A saved layout of a web app page: filters, sorting, grouping and columns. See [Views](../../production-tracking/views.md). |
| **Workfile** | A scene file an artist works in within a task. Workfiles are saved and opened with the Workfiles tool and belong to the task. See [Workfiles](../../pipeline/workfiles.md). |

## Related

- [Data model](../backend/data-model/index.md)
- [Product types](../../pipeline/product-types.md)
- [Naming conventions](../../pipeline/naming-conventions.md)
- [AYON plans](../plans.md)
