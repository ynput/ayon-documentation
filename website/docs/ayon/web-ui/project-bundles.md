---
title: Project bundles
description: "Project bundles in the AYON server: a frozen set of launcher, dependency package and addon versions assigned to one project, independent of the studio Production and Staging bundles."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/0782429-project-bundles
---

# Project bundles

A project bundle is a bundle assigned to one project. It lets the project run on its own launcher version, dependency packages and addon versions while the studio Production or Staging bundle moves on. Project bundles protect long-running projects from changes made to the studio bundles. A project bundle is frozen, not locked: individual addon versions can be changed afterward.

## Where it appears

| Place | Description |
|---|---|
| Project settings, addon list toolbar | A lock button next to the variant selector. Its tooltip reads **Freeze production bundle for this project** (or staging). The button is highlighted when the project already has a project bundle for the selected variant. |
| Bundles page | Project bundles are listed when the **Project** switch is on, with a **Project** badge. See [Bundles and addons](bundles-and-addons.md). |
| Bundle name | `__project__<project name>__<variant>`, where the variant is `production` or `staging`. |

The lock button is available for the Production and Staging variants only. For any other variant, including Dev, it is disabled with the tooltip **Variant must be production or staging to freeze.**

## What a project bundle contains

| Part | Description |
|---|---|
| Launcher version | The launcher version for the project. |
| Dependency packages | One package per platform (Windows, Linux, Darwin), or **None**. |
| Addon versions | A version choice for each addon that allows project-level version overrides. |

Addons that do not allow project-level version overrides are not part of the choice. They always follow the studio bundle of the same variant. They appear in the project bundle on the Bundles page with a lock icon, the studio version, and the note **(cannot override)**.

The project bundle starts from the studio bundle of the selected variant: the dialog loads the studio launcher version and dependency packages, and lists each overridable addon at the version of that studio bundle.

## The freeze dialog

The dialog is titled **Freeze &lt;variant&gt; bundle for &lt;project&gt;**.

| Section | Control | Options |
|---|---|---|
| Launcher | **Launcher Version** dropdown | Launcher versions uploaded to the server. |
| **Dependency Packages** | One dropdown per platform | **None** and the dependency packages uploaded for that platform. |
| **Addons** | One dropdown per overridable addon | See below. |

Addon version options:

| Option | Meaning |
|---|---|
| **Inherit (&lt;version&gt;)** | The addon follows the studio bundle of the variant. When the studio bundle changes its version, the project follows. The label shows the current studio version, or `DISABLED`. |
| **Disable** | The addon is disabled for the project (stored as no version). |
| An explicit version | The addon stays at that version regardless of studio changes. Versions that cannot be used in project bundles are listed but disabled, with the message **This version cannot be used in project bundles.** |

Footer buttons:

| Button | Visible | What it does |
|---|---|---|
| **Freeze** | No project bundle yet | Creates the project bundle from the dialog values. |
| **Update Freeze** | A project bundle exists | Saves the dialog values to the existing project bundle. |
| **Unfreeze** | A project bundle exists | Removes the project bundle. |

Errors from the server appear in a message at the bottom of the dialog.

## Effects on settings

| Event | Effect |
|---|---|
| Freeze or update | For every addon with an explicit version, the project's complete settings (studio values plus project overrides) are written as project overrides for that addon version. In the settings editor these values show as project overrides. |
| Unfreeze | The project bundle is deleted and removed from the project. For the addons that had explicit versions, studio-level values are removed from the project overrides, and the overrides are migrated to the version the studio bundle uses. |

Settings are stored per addon version (see [Bundles and addons](bundles-and-addons.md)):

- At the studio level, a project bundle that uses the same addon version as the studio bundle shares its studio settings. A change to that version's studio settings shows in the project bundle.
- At the project level, a project keeps its own overrides whether it uses a studio bundle or a project bundle. Unfreezing does not delete them.
- A project bundle locks the code. Project settings are already fixed per project wherever project overrides exist.

## Behavior and limits

| Topic | Behavior |
|---|---|
| Inherited and non-overridable addons | They are not frozen. Their versions follow the studio bundle of the variant, so check their compatibility when the studio bundle changes. |
| Disabling a non-overridable addon | Not possible in the dialog. |
| State | A project bundle cannot be set to Production, Staging or Dev, and its state cannot be changed. |
| Compatibility check | Not run when a project bundle is created or updated. |
| Development mode | Project bundles are not supported for the Dev variant. |
| Bundle form | A project bundle in the Bundles page shows overridable addons first. Overrides are shown in orange; inherited values are shown with a lock. |

## Permissions

Freezing, updating and unfreezing a project bundle, and reading the dialog data, require the manager or admin role. Viewing project bundles on the Bundles page requires the admin role.

## Related

- [Bundles and addons](bundles-and-addons.md)
- [Users and permissions](users-and-permissions.md)
- [AYON setups](../setups.md)
