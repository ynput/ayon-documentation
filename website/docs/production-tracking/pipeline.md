---
title: What the pipeline brings to production tracking
sidebar_label: Production tracking and the pipeline
description: "Why the AYON pipeline matters to production tracking, beyond publishing: building the project from the edit or from a spreadsheet, statuses backed by published work, review media made at publish, review in a desktop player, delivering versions, and artists working in the context of their tasks; and what a studio without the pipeline still gets."
verified: 2026-11-17
---

# What the pipeline brings to production tracking

<!-- screenshot: Details panel of a wing_it compositing task: the activity feed with a published version, its reviewable thumbnail and a status change below it -->

Production tracking in AYON works on its own: folders, tasks, statuses, assignees and review all live in the web app. The [pipeline](../pipeline/index.md) is the set of desktop tools and application integrations that artists use to open, save and publish their work. It is often seen as a publishing tool for artists, but much of what it does lands in production tracking: it can build the project from the edit, it fills tasks with real versions and files, it makes the media for review, and it delivers. This page explains what that brings to producers, coordinators and admins. The tools are described in the [Pipeline](../pipeline/index.md) section and on the addon pages linked below.

## Build the project from the edit

<!-- screenshot: Overview of wing_it right after an editorial publish: the new sequence and its shots with frame start, frame end, handles and resolution filled in, and their tasks -->

[Import CSV](../ayon/web-ui/dialogs/import-csv.md) builds a project from a shot list. The pipeline can do the same from the material that already exists, so shots are created with the values of the cut instead of being typed in. See [Break down the work](breaking-down-the-work.md) for the other ways to build a hierarchy.

- **From a timeline:** editorial publishing in [Hiero](../addons/compositing-editorial-applications/hiero/index.md) (and Nuke Studio), [DaVinci Resolve](../addons/compositing-editorial-applications/resolve/index.md) and [Flame](../addons/compositing-editorial-applications/flame/index.md) turns the clips of a timeline into shots. It creates the shot folders under a parent hierarchy, such as an episode and a sequence, names them from a template, and sets their frame range, handles, frame rate and resolution from the cut. Hiero and Flame can also create tasks for each shot. The plates, audio and review media of each clip are published into the new shots at the same time.
- **From an edit file:** the editorial creators of the [Tray Publisher](../addons/essentials/traypublisher/index.md#editorial-workflows) read an EDL, XML, AAF or FCPXML file, create a shot for each clip with its hierarchy and tasks, and publish the matching media into it. No editing application is needed.
- **From a spreadsheet:** [CSV ingest](../addons/essentials/traypublisher/index.md#csv-ingest) in the Tray Publisher reads a CSV file that lists files to publish with their folder, task, product and version. Its preset can create the missing folders and tasks before publishing into them. The same ingest runs without a window with the `ingestcsv` command, for example for a vendor delivery that arrives as a folder of files and a CSV.

When the edit changes, publishing the updated cut updates the frame range and other attributes of the existing shots, unless the studio turns this off in the Core addon setting **Collect Hierarchy**. A shot list typed by hand has to be corrected by hand.

## Statuses backed by real work

<!-- screenshot: Products page of wing_it filtered to one shot: versions of the plate, render and review products, each with its task, author and status -->

Without the pipeline, a status is what someone set. With the pipeline, each publish creates a new version that is linked to the task it was made in, holds the published files, and shows in the activity feed of the task. A task set to **Pending review** then has the version that is waiting for review next to it, and the version holds the files that the next department loads. Versions are never overwritten, so the history of a shot stays visible version by version. See [Publishing](../pipeline/publishing.md).

A publish does not change the task status by itself; the artist sets it, as described in the [Artist workflow](../ayon/how-ayon-works/artist-workflow.md#7-what-the-artist-sees-afterwards). With the [Power Pack](../addons/production-tracking/power-pack/index.md), [status sync](../addons/production-tracking/power-pack/index.md#status-sync) can change the task status when a version is created or its status changes, so the board follows the published work.

## Review media made at publish

<!-- screenshot: Web viewer playing a published review movie of a wing_it shot, with burnins and the activity feed next to it -->

When an artist publishes, the pipeline makes the review media of the version: it converts the published frames into a movie or image the browser plays, with burnins when the studio sets them up, and uploads it as a [reviewable](reviewables.md) of the version. The version can be reviewed in the [web viewer](../ayon/web-ui/web-viewer.md) and added to a review session right away, with no one exporting and uploading a movie by hand. Every reviewable comes out with the same settings, which keeps review media consistent across artists and departments. The outputs are set in the **Extract Review** settings of the [Core addon](../addons/essentials/core/index.md). Reviewing and approving is described in [Review and approve](review-and-approve.md).


## Review in a desktop player

<!-- screenshot: OpenRV playing a wing_it review session, with the AYON activity panel open on the right -->

The [Review Desktop addon](../addons/production-tracking/review-desktop/index.md), a licensed addon in beta, opens a review session or a version list in OpenRV on the reviewer's workstation, from an action on the list in the web app. The player plays the published files themselves, from the studio storage where the pipeline put them, at full quality and with its own color tools. The paths come from the project anatomy, so the workstation needs access to the project storage. An AYON panel inside the player shows the feedback of each version. Comments, annotations and status changes made there are saved to AYON like those made in the web app. This suits supervisors who review in a screening room or need to see the full-resolution media rather than the browser version.

## Deliver the approved versions

<!-- screenshot: The Deliver 3 versions dialog of the Browser, with a delivery template selected and the representations to copy -->

Because published versions hold their files, the pipeline can also hand them off: the **Deliver Versions** action copies the files of selected versions to a delivery location, renamed by a delivery template of the project anatomy. It is basic, but it sends approved work out with the studio's naming. How it is used, and what else helps a delivery, is described in [Prepare deliveries](deliveries.md).

## Artists working in context

<!-- screenshot: The Launcher window with the wing_it project, a shot and its compositing task selected, My tasks on, and the application actions -->

An artist starts work from a task: the [Launcher](../pipeline/launcher.md) shows the tasks assigned to them and opens the application in the context of the selected task. Work files and published files are then named and placed by the rules of the project anatomy, not by each artist; see [Naming conventions](../pipeline/naming-conventions.md). For production tracking this means:

- Everything an artist saves and publishes belongs to a known folder and task, so nothing has to be matched up afterwards.
- Files are found where the anatomy says they are, also after an artist leaves the project. See [Naming conventions](../pipeline/naming-conventions.md)
- The applications offered for a task follow its task type, so the right tools open for the right work.

The full path of an artist through a task is described in [Artist workflow](../ayon/how-ayon-works/artist-workflow.md).

## Production tracking without the pipeline

A studio that does not use the AYON pipeline still gets the web app: the hierarchy, tasks, assignees, statuses, planning, reports and review. Versions can be created by uploading media in the web app; see [Versions without a pipeline](versions-without-a-pipeline.md). Such versions hold only reviewables stored on the AYON server.

What such a studio misses:

- Shots built from the edit, with frame ranges and handles taken from the cut.
- Versions that hold the published files, which other departments and applications load.
- Review media made automatically at each publish.
- Delivering versions with the delivery templates of the anatomy, which works only on published files.
- File names and locations set by the anatomy.

A studio that uses another pipeline can keep it and still track the production in AYON, uploading review media or connecting its tools through the API.

## Related

- [Pipeline](../pipeline/index.md)
- [Publishing](../pipeline/publishing.md)
- [Artist workflow](../ayon/how-ayon-works/artist-workflow.md)
- [Tray Publisher](../addons/essentials/traypublisher/index.md)
- [Hiero](../addons/compositing-editorial-applications/hiero/index.md), [Resolve](../addons/compositing-editorial-applications/resolve/index.md) and [Flame](../addons/compositing-editorial-applications/flame/index.md)
- [Review Desktop addon](../addons/production-tracking/review-desktop/index.md)
- [Loader](../pipeline/loader.md) and [Browser](../pipeline/browser.md)
- [Versions without a pipeline](versions-without-a-pipeline.md)
