---
title: Global
description: "The Global tab of the AYON Studio Settings: the server configuration with the studio name, login page customization, password login, project code regex, changelog visibility and CDN resolver URL, with the default of every field."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/ServerConfig/ServerConfig.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/ServerConfig/ServerConfigUpload.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/LoginPage/LoginPage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectManagerPage/NewProjectDialog/NewProject.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/shared/src/components/Feedback/context/feedback/FeedbackContext.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/config/serverconfig.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/config/config.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/config/files.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/system/info.py
  - https://github.com/ynput/ayon-backend/blob/develop/api/users/invite.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/files/project_storage.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/config/ayonconfig.py
---

# Global

The **Global** tab edits the server configuration: values that belong to the AYON server itself rather than to an addon or a project. It covers the studio name, the look of the login page, password login, the rule that suggests project codes, who sees the changelog, and the CDN resolver for project files. The server stores only the values that differ from the defaults.

## Where it appears

| Tab | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| Global | Studio Settings, **Global** | none | `/settings/server` | Admins |

## Layout and controls

The tab is one centered column with the settings form and a toolbar above it.

| Control | What it does |
|---|---|
| **Save server config** | Saves the form. Active when a field has been changed. On failure a message **Failed to save server config** appears. |
| Form | The fields below, in the settings editor used across the web app. A field whose saved value differs from the default carries the green studio override marker (see [Override states in the editor](../../backend/settings/index.md#override-states-in-the-editor)). |

The first field, **Studio Name**, stands on its own; the other fields are grouped in the panels **Customization**, **Authentication**, **Project Options**, **Changelog Settings** and **CDN Settings**.

## Fields

### Studio name

| Field | Key | Default | Meaning |
|---|---|---|---|
| **Studio Name** | `studio_name` | empty | The name of the studio. Used in the invitation email sent from the [Users](users.md) tab: the subject reads "You have been invited to join &lt;studio name&gt; Ayon server". Any signed-in user can read this value through the API. |

### Customization

Customization options for the web interface, mostly for the login page.

| Field | Key | Default | Meaning |
|---|---|---|---|
| **Login Background** | `customization.login_background` | empty | Image shown as the background of the login page. |
| **Studio Logo** | `customization.studio_logo` | empty | Image shown on the login page, in a panel above the login message. |
| **Login Page Message** | `customization.motd` | empty | Text shown to users on the login page, in the same panel as the studio logo. Markdown is supported. |
| **Frontend Flags** | `customization.frontend_flags` | none set | Switches that turn web app features on or off. The only flag is **Enable legacy version browser page**, which adds the deprecated **Browser** tab to the project pages. |

**Login Background** and **Studio Logo** are not typed in. Each shows the stored file name with an **Upload** button, or a **Remove** button once a file is set.

| Action | Behavior |
|---|---|
| **Upload** | Opens a file picker. The file is uploaded and stored at once, without **Save server config**. Only JPEG and PNG images are accepted. Characters other than letters, digits and `.` in the file name are replaced with `_`. The server keeps the file in `/storage/static/customization` and serves it from `/static/customization/<file name>`. Messages: **File uploaded successfully** or **Failed to upload file**. |
| **Remove** | Clears the field and saves the configuration at once. Message on failure: **Failed to clear upload**. |

When **Login Page Message**, **Login Background** or **Studio Logo** is empty, the login page falls back to the older server environment variables `AYON_MOTD` (or the file `/storage/motd.md`), `AYON_LOGIN_PAGE_BACKGROUND` and `AYON_LOGIN_PAGE_BRAND`, which are deprecated.

### Authentication

Settings related to user authentication.

| Field | Key | Default | Meaning |
|---|---|---|---|
| **Hide Password Authentication** | `authentication.hide_password_auth` | off | Hides the username and password form on the login page, so that users sign in with another login option such as a single sign-on addon. The form remains reachable through **Show all login options**. Invitation emails then link to the server address instead of the page that sets a password. |

### Project options

| Field | Key | Default | Meaning |
|---|---|---|---|
| **Project Code Regex** | `project_options.project_code_regex` | `^.{0,3}` | Regular expression that creates the suggested project code from the project name in the **Create a new project** dialog. The default takes the first three characters. The code field's tooltip shows the expression. Any signed-in user can read this value through the API. See [Creating a project](../../how-ayon-works/creating-a-project.md#name-code-and-label). |

### Changelog settings

Settings for the changelog feature.

| Field | Key | Default | Meaning |
|---|---|---|---|
| **Show Changelog to Users** | `changelog.show_changelog_to_users` | on | When on, users who are not admins see the changelog widget with the highlights. Admins always see the server, addon and pipeline entries instead. For users who are not admins, the changelog also stays hidden when the server runs in offline mode or with feedback disabled. |

### CDN settings

Settings for the CDN resolver.

| Field | Key | Default | Meaning |
|---|---|---|---|
| **Default CDN Resolver URL** | `cdn.default_cdn_resolver_url` | empty | URL of the service that returns CDN links for project files kept in the server's default project storage. Takes precedence over the environment variable `AYON_DEFAULT_PROJECT_STORAGE_CDN_RESOLVER`, whose value is shown as the placeholder. When neither is set, CDN links are not available for the default storage. |

## Permissions

| Action | Admin | Manager | User |
|---|---|---|---|
| Open **Global** | Yes | No | No |
| Read and save the server configuration | Yes | No | No |
| Upload login background and studio logo | Yes | No | No |
| Read **Studio Name** and **Project Options** through the API | Yes | Yes | Yes |

## Related

- [Studio configuration](index.md)
- [Users](users.md)
- [Creating a project](../../how-ayon-works/creating-a-project.md)
- [Settings scopes and storage](../../backend/settings/index.md)
