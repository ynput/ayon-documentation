---
title: REST API reference
description: "The REST API page of the AYON web app: the Redoc reference generated from the running server's OpenAPI specification, with search, the spec download, addon endpoints and the settings that control who can open it."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/APIDocsPage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AppRoutes.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/Menu/Menus/HelpMenu.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/Breadcrumbs/Breadcrumbs.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/AddonsManager/AddonsManager.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/api/server.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/api/metadata.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/api/lifespan.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/addons/openapi.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/config/ayonconfig.py
---

# REST API reference

The REST API page shows the reference of the server's REST API: every endpoint with its method, path, parameters, request body and responses. It is generated from the OpenAPI specification of the running server, so it always matches the server version in use. It is a reference to read; requests are made from scripts and tools. How to authenticate and call the API, with examples, is in the developer guide [REST API](../../developer/api/rest.md).

## Where it appears

| Page | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| REST API reference | **Help** menu, **REST API** (opens in a new browser tab) | `8` opens the Help menu | `/doc/api` | Menu entry: user role and above. Content: managers and admins by default, see [Permissions](#permissions) |

The page keeps the top bar of the web app; the breadcrumbs show **Doc / Api**. The reference itself is served by the server at `/docs` and shown in a frame. Opening `/docs` directly shows it without the top bar.

## Layout and controls

The reference is rendered with Redoc.

| Part | What it shows |
|---|---|
| Left column | **Search...** field and the endpoints grouped by tag, such as **Authentication**, **Bundles**, **Folders** or **Inbox**. |
| Header | The title **Ayon server** with the server version, the description, contact and license, and **Download** for the OpenAPI specification. |
| Middle column | For the selected endpoint: description, path and query parameters, request body schema and response schemas. |
| Right column | The method and path, and request and response samples. |

**Download** saves the specification as JSON. The same file is served at `/openapi.json`, for generating clients or importing into API tools.

## What it includes

| Endpoints | Included |
|---|---|
| Core server endpoints under `/api` | Yes |
| GraphQL (`/graphql`) and internal routes | No. GraphQL has its own [GraphQL Explorer](graphql-explorer.md). |
| Endpoints of server addons (`/api/addons/<addon name>/<version>/...`) | No, by default. With `AYON_OPENAPI_INCLUDE_ADDON_ENDPOINTS` set to `true`, the endpoints of every installed addon version are included, tagged with the addon name and version. |

Each addon version that has endpoints also has its own reference at `/api/addons/<addon name>/<version>/api-docs`. Admins open it from the **API Docs** entry of the version context menu on the [Addons](studio/addons.md) page.

This documentation site has a REST API reference at [/api](/api) as well. It is built from the specification of Ynput's public playground server, so its version and addon endpoints can differ from a studio's server.

## Permissions

Server settings decide who can load the reference, the specification and the addon references (see [On-premise deployment](../deployment/on-premise.md#configuration) for how settings are set):

| Setting | Default | Effect |
|---|---|---|
| `AYON_OPENAPI_REQUIRE_AUTHENTICATION` | `true` | Only signed-in managers and admins can load them. Other users see the error "You are not allowed to access API documentation" in the page. With `false`, anyone who can reach the server can load them, without signing in. |
| `AYON_DISABLE_REST_DOCS` | `false` | With `true`, nobody can load them. |

These settings only hide the documentation. Access to the endpoints themselves follows the user's permissions in every case.

## Related

- [REST API](../../developer/api/rest.md)
- [GraphQL Explorer](graphql-explorer.md)
- [Addons](studio/addons.md)
- [Navigation bar](navigation-bar.md#help-menu)
