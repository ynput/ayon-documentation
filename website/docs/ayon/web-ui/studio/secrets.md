---
title: Secrets
description: "The Secrets page of the AYON server studio settings: storing named key-value pairs such as API keys and referencing them from addon settings."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/3701069-ayon-server-secrets
---

# Secrets

Secrets are named key-value pairs stored on the AYON server, typically API keys and passwords that addons need. Addon settings reference a secret by its name, so the value does not have to be written into the settings.

## Where it appears

| Item | Value |
|---|---|
| Location | Studio settings, **Secrets** entry in the left sidebar |
| URL path | `/settings/secrets` |
| Visible to | Managers and admins. Only admins can read values and make changes. |

## Layout

The page is one centered column with two groups.

| Group | Content |
|---|---|
| **New secret** | One row with the **Secret name** input, the **Secret value** input and the **Add** button. |
| **Stored secrets** | One row per stored secret, ordered as the server returns them. |

## Controls

| Control | Where | What it does |
|---|---|---|
| **Secret name** | New and stored rows | Name of the secret. Editable only while creating; stored names are read-only. A name uses letters, digits, `_`, `.` and `-`, starts and ends with a letter, digit or `_`, and has no spaces. |
| **Secret value** | New and stored rows | Value of the secret, masked as a password. The eye button inside the input shows or hides it. |
| Copy button | Stored rows | Copies the value to the clipboard. |
| **Add** | New row | Saves the secret. Active when both name and value are filled. Saving with an existing name replaces its value. |
| Check button | Stored rows | Saves a changed value. |
| Delete button | Stored rows | Removes the secret after a confirmation. |

The secret `ynput_cloud_key`, which stores the Ynput Cloud connection, is not listed. Secrets whose names start with `_` are internal and are not listed either.

## Using secrets

Addon settings that accept a secret show a selection of the stored secret names. The addon reads the value on the server, so users who can edit settings, including managers, only handle names.

## Permissions

| Role | List names | Read values | Create, change, delete |
|---|---|---|---|
| Admin | Yes | Yes | Yes |
| Manager | Yes | No (values stay empty) | No |
| User, guest | No | No | No |

Service users with the admin role can use the same API (`/api/secrets`) as admins.

## Related

- [Users](users.md)
- [Bundles](bundles.md)
- [Services](../services.md)
