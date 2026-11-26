---
title: How AYON works
sidebar_label: Overview
description: "How AYON works in daily use: what happens when a project is created, how permissions are decided, where pipeline files are stored, how bundles change the server and the pipeline, and the typical work of artists and producers."
verified: 2026-10-19
sources:
  - https://help.ayon.app/en/help/articles/0358916-ayon-on-cloud-a-complete-studio-walkthrough
---

# How AYON works

This section explains what happens inside AYON when people use it: which parts take part in a process, what is created or changed, and in which order. It is written for administrators and leads who set AYON up and need to understand the consequences of their choices, and for anyone who wants the full picture of the daily work. The reference pages of the other sections describe each page, tool and setting; this section connects them.

## Processes

| Page | What it explains |
|---|---|
| [AYON entities](entities.md) | The entities on the server, from projects and folders to versions and representations, how they relate and are linked, and how attributes are inherited. |
| [Settings](settings.md) | The settings scopes of addons, how they override each other, and how settings are stored per addon version and variant. |
| [Site IDs](site-ids.md) | The ID of a workstation that ties site settings to a machine: how the launcher creates it and the server registers it. |
| [Bundles](bundles.md) | What a bundle sets on the server and on workstations, the production, staging and dev variants, and the usual way an addon reaches production. |
| [Addon services](services.md) | How the Services page, the AYON server and the AYON Service Host (ASH) start addon services as containers, and what happens when they stop. |
| [Creating a project](creating-a-project.md) | What a new project receives from the anatomy preset, the access groups and the project attributes, and what to adjust afterwards. |
| [Storage](storage.md) | Where AYON keeps files: the studio storage for work files and published files and how their paths are decided, the server storage for records, thumbnails, reviewables and addons, and Site Sync. |
| [Permissions](permissions.md) | The two layers of the permission system: the user level first, then the access groups of each project. |

## Daily use

| Page | What it explains |
|---|---|
| [Artist workflow](artist-workflow.md) | From opening the AYON launcher to publishing a new version and receiving feedback. |
| [Production workflow](production-workflow.md) | Setting up a project, planning and assigning work, tracking progress, reviewing and delivering. |

## Related

- [Introduction to AYON](../introduction.md)
- [Artist workstation setup](../workstation-setup.md)
- [Quick navigation and server layout](../web-ui/quick-navigation.md)
- [Glossary](../glossary/index.md)
