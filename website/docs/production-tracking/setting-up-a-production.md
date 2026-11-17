---
title: Set up a production
sidebar_label: Setting up a production
description: "What a producer or admin decides when a production starts in AYON, and why: the project structure in its anatomy (folder types, task types, statuses with their states, tags), the project attributes, anatomy presets as the studio standard, project bundles, and which choices are risky to change once production is running."
verified: 2026-11-17
---

# Set up a production

<!-- screenshot: Anatomy tab of wing_it with the Statuses section expanded: names, short names, states, colors and scopes -->

A new project in AYON starts empty: no folders, no tasks and nothing on disk. Before the first shot is created, a few decisions shape how the whole production is tracked: what kinds of folders and tasks exist, which statuses work moves through, and which values every shot inherits. Most of them are made once, in the project's anatomy, and are hard to change later. This page explains what each decision is for. Creating the project and the dialog it uses are described in [Creating a project](../ayon/how-ayon-works/creating-a-project.md).

:::tip Project Template

With the [Power Pack](../addons/production-tracking/power-pack/index.md), a project does not have to start empty: a [hierarchy template](../addons/production-tracking/power-pack/index.md#hierarchy-templates) saved from an earlier project, such as a sequence with its shots and tasks, can be applied to the new project. See [Break down the work](breaking-down-the-work.md).

:::

## Decide the structure of the project

<!-- screenshot: Anatomy tab of wing_it with Folder types and Task types expanded side by side -->

:::tip Order in Anatomy

The order of the lists matters too: a new folder or task takes the first type of its list, and a new entity the first status whose scope fits it. Putting **Not ready** or **Ready to start** first decides how every new task enters the board.
:::

The [anatomy](../ayon/web-ui/project/anatomy.md) of a project holds the lists its entities can use. Each list answers a production question:

| List | What it decides | Why it matters to production tracking |
|---|---|---|
| Folder types | The kinds of folders, such as episode, sequence, shot and asset. | Folders can be grouped and filtered by type, for example to list every shot of the project. |
| Task types | The kinds of work, such as modeling, animation, lighting and compositing. | Task progress shows one column per task type, so the list of task types is the list of departments a producer follows. With the pipeline, the task type also decides which applications a task offers. |
| Statuses | The steps work goes through, each with a state: not started, in progress, done or blocked. | Progress figures count states, not names, so a status is counted as finished only when its state is done. The scope of a status limits it to the entity types it fits, for example a review status for versions only. |
| Tags | Free labels with a color, such as `retake` or `client_note`. | Tags mark tasks, folders and versions across the hierarchy and can be filtered and grouped by, without being a status. |


The default lists are a working start. A studio usually adjusts them to its own departments and review steps before the project starts. How types, statuses and tags are used by every entity is described in [AYON entities](../ayon/how-ayon-works/entities.md#statuses-types-and-tags), and the default statuses in [Production workflow](../ayon/how-ayon-works/production-workflow.md#3-assign-people-and-statuses).


## Set the values every shot inherits

<!-- screenshot: Attributes section of the wing_it anatomy: fps, resolution, frame start, handles and the project dates -->

The project attributes, such as frame rate, resolution, frame start, handles and the start and end dates, are set in the anatomy. Every folder and task without a value of its own inherits them, so a shot created later already has the frame rate and resolution of the production. A sequence or shot that differs, such as a slow-motion sequence, sets its own value, and its children inherit that instead. See [Attributes and inheritance](../ayon/how-ayon-works/entities.md#attributes-and-inheritance).

## Keep a studio standard with anatomy presets

<!-- screenshot: Anatomy presets tab with the AYON default, a studio preset marked primary, and the Statuses section of the primary preset -->

An [anatomy preset](../ayon/web-ui/studio/anatomy-presets.md) is a stored anatomy that new projects copy. A studio that keeps its folder types, task types, statuses and naming rules in a preset, marked as primary, starts every project with the same structure. That keeps projects comparable: the same department columns, the same statuses, the same reports.

:::caution

A preset is copied, not linked. Changing the preset later does not change projects that were already created from it, and changing a project does not change the preset. A studio that improves its standard during a production updates the preset for the next projects and changes running projects only where needed.
:::

## Lock the pipeline versions of a production

<!-- screenshot: The Freeze production bundle for wing_it dialog with the launcher version, dependency packages and addon versions -->

A new project uses the studio's Production bundle: the addon versions, launcher version and dependency packages that all projects share. Most projects stay on it. A [project bundle](../ayon/web-ui/project/project-bundle.md) fixes those versions for one project, so it keeps working the same way while the studio bundle is updated. A typical case is a long-running production next to smaller ones, frozen before the studio updates its bundle: it keeps the versions it was tested with until there is time to move it.

A project bundle is created when it is needed, not as a setup step. It has a cost: the compatibility of its addon versions is not checked, and addons left to inherit the studio bundle still change with it. See [Bundles](../ayon/how-ayon-works/bundles.md#project-bundles).

## Know what is risky to change later

Some choices can be changed at any time; others decide where files are and how entities are named, and are best settled before production starts.

| Change during production | Effect |
|---|---|
| Adding a folder type, task type, status or tag | Safe. New entities can use it at once. |
| Renaming a type or status | Renames it on every entity that uses it. With the pipeline, settings that filter by the old task type name, such as application or naming profiles, need the new name too. |
| Removing a type or status | Only possible when no entity uses it; saving the anatomy fails otherwise. |
| Changing the state of a status | Changes the progress figures of every task that has it. |
| Changing roots, templates or entity naming | **(Not Recommended)** Applies to new work files and publishes only. Existing files are not moved or renamed. See the caution in [Creating a project](../ayon/how-ayon-works/creating-a-project.md#project-configuration). |
| Renaming, moving, deleting or retyping a folder | Not possible in the web app once the folder holds published versions. |
| Changing a project attribute | Rebuilds the inherited values of every folder and task that has no value of its own. Values set on a folder or task stay. |

## Related

- [Creating a project](../ayon/how-ayon-works/creating-a-project.md)
- [Anatomy](../ayon/web-ui/project/anatomy.md)
- [Anatomy presets](../ayon/web-ui/studio/anatomy-presets.md)
- [Project bundle](../ayon/web-ui/project/project-bundle.md)
- [AYON entities](../ayon/how-ayon-works/entities.md)
- [Break down the work](breaking-down-the-work.md)
- [Put the right people on it](assigning-people.md)
