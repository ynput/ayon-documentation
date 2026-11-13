---
title: Jira addon
sidebar_label: Overview
sidebar_class_name: addon-archived
description: "The AYON integration for Jira: template-based creation of AYON tasks and matching Jira tickets from a project page, the Jira current phase attribute and the publish plugins that comment on Jira tickets."
addon: jira
addon_repo: ayon-jira
addon_version: 0.1.1
addon_scope: pipeline-server
addon_flags: []
addon_archived: true
addon_last_push: 2026-02-24
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-jira/tree/0.1.1
  - https://github.com/ynput/ayon-jira/releases
  - https://help.ayon.app/en/articles/8465192-jira
---

# Jira addon

<AddonInfo />

The Jira addon connects AYON to [Jira](https://www.atlassian.com/software/jira). It creates AYON tasks together with matching Jira epics and tickets from template files, and it posts a comment (optionally with a thumbnail and a review) to the Jira ticket of a task when a publish finishes. Its settings are described on the [settings page](settings.md).

The addon is an early beta version and is unmaintained: the last release, 0.1.1, is from 2024-11-29.

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | 0.4.0 or newer |
| AYON server | No minimum declared |
| Services | None |
| Jira | A server URL, a user name and password, a project code, and custom fields on tickets (see below) |

The addon has to be in the production bundle for its project page to appear.

## What it connects

| AYON | Jira |
|---|---|
| AYON projects, folders and tasks | The Jira project set by **Jira project code**, reached with the credentials in the settings (a user name and a password) |

Jira credentials are read from the project settings, so they can differ per project.

## Ticket preparation

The addon adds a page to each project in the AYON web interface. It has the fields **Folder Path** and **Template**, one field for each placeholder of the chosen template, and a **Create** button. It creates, for each given folder path, the tasks of the template in AYON and the epics and tickets of the template in Jira, and reports how many it created or updated.

Templates are pairs of JSON files in the addon's `server/templates` folder, `<name>_Jira_Template.json` and `<name>_Ayon_Template.json`. The addon ships one pair, `Tier_1_Outfit`. Adding a template means changing the addon source and building a new package. The server provides endpoints to list the templates and the placeholders of a template, and to run one.

| File | Content |
|---|---|
| Jira template | A `jira_template` list of tickets. Each has `Epic Link`, `Component`, `AYON Task`, `Summary`, `Description`, `Custom ID`, `Depends_On`, `Unblocks`, `IssueType`, `Priority`, `Original Estimate` and `Int vs Ext`. Text between `%` signs is a placeholder that the page asks a value for. |
| AYON template | An `ayon_template` with `tasks`. Each task has `current_phase` and keys of the form `<phase>_jira_id`, which point to a `Custom ID` of the Jira template, and `<phase>_jira_ticket`, which receives the ticket key. |

### Template handling

- Epics are matched by their name (`Epic Link`) and tickets by a Jira custom ID built from the folder name and the template's `Custom ID`, so running a template again updates instead of duplicating.
- `Depends_On` and `Unblocks` become links between the tickets.
- The AYON task keeps the ticket keys in its data under `jira`, and each ticket gets the id of its AYON task.
- Tickets are created with the issue type `Task`, the summary, the description, and three custom fields (custom ID, AYON task, component). `Priority`, `Original Estimate`, `IssueType` and `Int vs Ext` from the template are not applied in 0.1.1.
- The ids of the three Jira custom fields are fixed in `server/custom_fields.py` (`customfield_10035`, `customfield_10033`, `customfield_10034`) and must be changed to the ids of the Jira site, in the source, before the package is built. The fields have to exist on the tickets, and the custom ID field also on epics.

## Jira current phase

The addon creates the task attribute **Jira Current Phase** (`jiraCurrentPhase`). Its options come from the **List of process phases** setting. The phase selects which of the Jira tickets of a task receives the publish comment: the plugin looks for the task data key `<phase>_jira_ticket`.

## Publishing

| Plugin | Label | What it does |
|---|---|---|
| `CollectJiraCredentials` | Collect Jira Credentials | Copies the Jira settings of the project into the publish context. |
| `CollectJiraNotifications` | Collect Jira Notifications | Finds the first matching notification profile for the instance (host, task type, task name, product name, product type). When one matches, it adds the `jira` family and stores the comment and upload options. In the Publisher it offers a text field **Additional Jira message**, which is put before the comment. |
| `CollectJiraTicket` | Collect Jira Ticket | For `jira` instances, reads the ticket key of the current phase from the task data. |
| `IntegrateJiraComment` | Integrate Jira Comment | Adds a comment to the ticket, filled from the profile's template and the instance's anatomy data. It can attach the thumbnail and the review. A review above the size limit is not attached, and its path is added to the comment. The plugin is optional. |

## Related

- [Jira addon settings](settings.md)
