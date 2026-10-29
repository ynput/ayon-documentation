---
title: Power features
description: "Power Features are licensed functions of the AYON web app and server, marked with a lightning symbol: the feature list with delivery and status, slicer, annotations, status synchronization and pinned project settings."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/articles/7017685-power-features
  - https://help.ayon.app/en/articles/7144550-calculated-attributes
---

# Power features

**Power features** are advanced production tracking functions that need a Power license. In the web app a feature that needs the license is marked with a lightning symbol; selecting the symbol shows a description of the feature. Features the user has no access to may not appear at all.

Most Power features are delivered by the Power Features addon (addon name `powerpack`), which also manages the licensing of the other licensed addons. Addon version, requirements and settings are described in [Power Features addon](../addons/production-tracking/power-pack/index.md). License management is described in [Licenses](../ayon/licenses.md).

## Feature list

| Feature | Description | Delivery | Status |
|---|---|---|---|
| [Slicer](#slicer) | Filters a page on the fly by hierarchy, assignees, status, task type and custom attributes. | Power Features addon | Production |
| [Annotations](#annotations) | Drawing tools on frames of videos and images. | Power Features addon | Production |
| Release history | Access to and download of all pipeline releases, not only the latest. | Built in | Production |
| Single sign-on | OAuth 2.0, Google, Discord, Okta, Entra, SAML. | SSO addon | Production |
| List attributes | Attributes for the items of [lists](../ayon/web-ui/production-tracking/lists.md). | Power Features addon | Production |
| List access | Access levels per [list](../ayon/web-ui/production-tracking/lists.md). | Power Features addon | Production |
| List folders | Folders that organize lists. | Power Features addon | Production |
| Comment categories | Categories for comments with colors and visibility rules. See [Activity feed](../ayon/web-ui/details-panel.md#activity-feed). | Power Features addon | Production |
| Entity templates | Create and apply templates of folders and tasks. See [hierarchy templates](../addons/production-tracking/power-pack/index.md#hierarchy-templates). | Power Features addon | Production |
| Calculated attributes | Attributes computed by formulas. See [Calculated attributes](calculated-attributes.md). | Power Features addon | Production |
| Advanced filters | Complex filters with exclusion, several operators and AND or OR groups. | Power Features addon | Production on the [project overview](../ayon/web-ui/production-tracking/overview.md) |
| Group attributes | Group tasks by attributes such as status, assignees and tags, with ascending or descending group order. | Power Features addon | Production on the [project overview](../ayon/web-ui/production-tracking/overview.md) and [products and versions](../ayon/web-ui/production-tracking/products.md) |
| [Views](../ayon/web-ui/views.md) | Saved, shared and project default page layouts. | Power Features addon | Production |
| Column summaries | Summary footer of tables with a calculation per column. | Power Features addon | Available |
| Project folders | Folders that organize the projects list. | Power Features addon | Available |
| Reviewables transcoder | Transcodes uploaded reviewable videos to formats the browser plays. See [Reviewables](reviewables.md). | Service | Under development |
| Smart lists | Lists filled dynamically from filters. | Power Features addon | Under development |
| Email notifications | Email for task and project updates. | Service | Under development |
| Team assignments and mentions | Assign teams to tasks and mention teams in comments. See [Teams](../ayon/web-ui/project/teams.md). | Power Features addon | Under development |
| Related work panel | Shows tasks related to the selected task, for example the previous and next shots. | Power Features addon | Planning |

Statuses other than Production describe features that are not generally available.

## Slicer

The slicer filters the content of a page without changing the filters already applied to it. Slicing happens in a side panel and is combined with the page filters.

| Slice by | Description |
|---|---|
| Hierarchy | Folders of the project. |
| Assignees | Users assigned to tasks. |
| Status | Task statuses. |
| Task type | Task types. |
| Custom attributes | Attributes of the entities on the page. |

The slice type is stored in [views](../ayon/web-ui/views.md).

## Annotations

Annotations draw on a frame of a video or an image in the viewer (see [Reviewables](reviewables.md)).

| Tool | Description |
|---|---|
| Draw (`b`) | Brush. The brush size is adjustable. |
| Erase (`e`) | Eraser. A right click erases while drawing. |
| Colors | Preset colors, a custom color and an eyedropper. |
| Undo and redo | Step through the drawing history. |

Annotation tools can be fully operated from the keyboard. See [Keyboard shortcuts](../ayon/web-ui/quick-navigation.md#keyboard-shortcuts).

## Status synchronization

Status synchronization changes the status of related folders, tasks and versions when a status changes. The rules are configured in the Power Features addon settings; all are off by default.

| Rule | Effect |
|---|---|
| Task to folder | The folder status follows the statuses of its tasks. Rules under **All tasks match** (for example all tasks `Approved` sets the folder to `Approved`) take priority over **Task to folder status mapping** (for example any task `In progress` sets the folder to `In progress`). Filtered by folder type. |
| Task to version | The status of versions follows the task status (for example `Approved` task approves the last and hero versions). Filtered by an allow list or deny list of product types; an empty deny list includes all products. |
| Version to task | The task status follows the version status (for example a published version sets the task to `In progress`). Filtered by product types. A task change can in turn change its folder through the task to folder rule. |
| Folder to task | The statuses of the tasks of a folder follow the folder status. |

Statuses offered in the rule settings come from the anatomy presets at studio level and from the project anatomy at project level. Rules that feed each other (a task changes a version and the version changes the same task) create loops and must be avoided. Details are in [Power Features addon](../addons/production-tracking/power-pack/index.md).

## Pinned project settings

A list of settings paths in the Power Features addon settings (**Settings Paths**, form `ayon+settings://<addon>/<path>`) is copied into every new project as project overrides. Later changes to the studio value then do not reach those projects.

| Setting kind | Can be pinned |
|---|---|
| Available at studio and project level | Yes |
| Studio level only (for example `ayon+settings://applications/applications`) | No |
| Project level only | Not needed; the setting already belongs to one project. |

A typical use is pinning color management per project:

```
ayon+settings://core/imageio
ayon+settings://houdini/imageio
ayon+settings://nuke/imageio
ayon+settings://aftereffects/imageio
```

## Related

- [Power Features addon](../addons/production-tracking/power-pack/index.md)
- [Licenses](../ayon/licenses.md)
- [Views](../ayon/web-ui/views.md)
- [Calculated attributes](calculated-attributes.md)
- [Lists](../ayon/web-ui/production-tracking/lists.md)
- [Market](../ayon/web-ui/market.md)
