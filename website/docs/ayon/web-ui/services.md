---
title: Services
description: "The Services page of the AYON web app: the table of addon services, the New service dialog, the context menu, statuses and the service details panel."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/2668013-ayon-services
---

# Services

The **Services** page lists the addon services registered on the AYON server and manages them: it creates, starts, stops, edits and deletes services and shows their state. An addon service is a containerized program that an addon runs next to the AYON server. The page only records what should run; the container itself is started by an AYON Service Host (ASH) worker. How ASH works, how to run it and how it reaches the server are described on the [ASH page](../hosting/ash.md).

## Where it appears

| Item | Value |
|---|---|
| Menu entry | **Services**, in the AYON menu of the header, below **Event Viewer** |
| Shortcut | `v+v` |
| URL path | `/services` |
| Visible to | Managers and admins (see [Permissions](#permissions)) |

The browser tab title is **Services • AYON**, or **Services • &lt;addon name&gt; • AYON** while a service is selected.

## Layout

The page has a toolbar with the **New service** button, a table of services and, on the right, a details panel. The details panel appears when a service is selected and closes when the selection is cleared. The table refreshes automatically every 2 seconds.

### Table columns

All columns are sortable. Several rows can be selected.

| Column | Meaning |
|---|---|
| **Service name** | Name of this service instance. |
| **Addon name** | Addon that provides the service. |
| **Addon version** | Version of that addon. |
| **Service** | Name of the service as defined by the addon. |
| **Host** | Name of the ASH worker that runs the service. |
| **Settings variant** | Settings variant (bundle) whose addon settings the service reads. Empty for the `production` variant. |
| **Status** | State of the service, see [Statuses](#statuses). |

## Controls

| Control | Where | What it does |
|---|---|---|
| **New service** | Toolbar | Opens the **Spawn a new service** dialog. |
| **Start selected** | Context menu | Marks the selected services as to be running. The ASH worker starts them. |
| **Stop selected** | Context menu | Marks the selected services as to be stopped. |
| **Edit service** | Context menu | Opens the **Edit service** dialog. Enabled for a single selected service only. |
| **Delete selected** | Context menu | Deletes the selected services after a confirmation. |
| Pencil icon | Details panel header | Same as **Edit service** for the shown service. |
| Close icon | Details panel header | Clears the selection and closes the panel. |

The context menu opens with a right click on a row. Right-clicking a row outside the current selection selects that row alone; right-clicking inside the selection acts on the whole selection.

**Edit service** requires a stopped service. For a service that is marked as running, a dialog titled **Stop Service** asks to stop it first (**Yes, stop service** or **No, cancel**). After a successful edit of a stopped service, a dialog titled **Start Service** asks whether to start it now (**Yes, start service** or **No, keep stopped**).

## Spawn a new service dialog

The dialog is titled **Spawn a new service**. Its button is **Spawn**, and **Cancel** closes it. **Spawn** is active when host, addon, addon version, service and service name are set (and, if registry login is on, user name and password).

| Field | Description |
|---|---|
| **Host** | Dropdown of the registered ASH workers. A worker registers itself when it first contacts the AYON server. |
| **Addon name** | Dropdown of addons that provide services. Changing it clears the version, service and name. |
| **Addon version** | Versions of the chosen addon that define at least one service, newest first. The version has to match the addon version in the production bundle. |
| **Service** | Services defined by the chosen addon version. Choosing one fills **Service name** with the service name. |
| **Service name** | Name of the instance, unique on the server. Lowercase letters, digits, dots and hyphens only (other characters are removed while typing), 3 to 63 characters, beginning and ending with a letter or digit, no two adjacent dots, not formatted like an IP address. |

### Advanced settings

| Field | Description |
|---|---|
| **Settings variant** | Variant of the addon settings the service uses (a bundle name). Defaults to `production`. For any other variant the service receives the environment variable `AYON_DEFAULT_SETTINGS_VARIANT`. |
| **Storages** | Volumes mounted into the container, one per line, in the form `/local/path:/container/path`. |
| **Ports** | Ports published by the container, one per line, in the form `8080:8080`. |
| **Environment** | Environment variables for the container, one `KEY=value` per line. |

### Registry settings

| Field | Description |
|---|---|
| **Registry login** | Switch. Turns on credentials for the image registry. Needed only for services whose image is private. |
| **Registry username**, **Registry password** | Credentials for the registry. The password field is masked. Both are required while **Registry login** is on. |

## Edit service dialog

The dialog is titled **Edit service** and its button is **Update**. It shows **Host**, the read-only **Service name**, the advanced settings and the registry settings. The addon, addon version and service of an existing service cannot be changed.

## Statuses

The **Status** column shows one badge per service.

| Status | Meaning |
|---|---|
| **Unknown** | The server has never seen the service (no last-seen time). |
| **Worker unreachable** | The service was last seen more than 10000 seconds ago. |
| **Error** | The service has an error message, shown as a tooltip on the badge. The server sets one, for example, when the addon, version, service or image of a service no longer exists, and also marks the service as not to be run. The message is cleared once the service runs. |
| **Running** | The service is marked to run and its container is running. |
| **Not running** | The service is marked to run but its container is not running yet. |
| **Stopping** | The service is marked to stop but its container is still running. |
| **Disabled** | The service is marked to stop and its container is not running. |

## Service details panel

The panel header shows the service name with the edit and close buttons.

| Field | Meaning |
|---|---|
| **Host** | The ASH worker. |
| **Addon** | Addon name. |
| **Addon Version** | Addon version. |
| **Service Type** | Name of the service in the addon. |
| **Should Run** | `Yes` when the service is marked to run, otherwise `No`. |
| **Is Running** | `Yes` when its container is running, otherwise `No`. |
| **Last Seen** | Time of the last report from the worker. Shown only when known. |
| **Service Data** | The stored service configuration as JSON: image, volumes, ports, environment, memory limit, user and, when set, registry credentials, and the error message. |

## Permissions

The menu entry and the page are available to managers and admins. The server returns services only to admins, and only admins can create, start, stop, edit or delete them, so a manager sees an empty table and cannot change anything. The list of hosts is available to every signed-in user.

Running services needs an ASH worker that connects with the API key of a service user. See the [ASH page](../hosting/ash.md) for its requirements.

## Related

- [AYON Service Host (ASH)](../hosting/ash.md)
- [Bundles and addons](bundles-and-addons.md)
- [Users and permissions](users-and-permissions.md)
- [Events](events.md)
- [Navigating the web app](navigating-the-web-app.md)
- [Keyboard shortcuts](keyboard-shortcuts.md)
- [Addons](../../addons/index.md)
