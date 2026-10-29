---
title: GraphQL Explorer
description: "The GraphQL Explorer page of the AYON web app: the in-app GraphiQL editor for running read-only GraphQL queries against the server as the signed-in user, with the query builder, schema documentation, query variables and history."
verified: 2026-10-25
sources:
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ExplorerPage.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/AppRoutes.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/components/Menu/Menus/HelpMenu.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/containers/Breadcrumbs/Breadcrumbs.tsx
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/api/server.py
  - https://github.com/ynput/ayon-backend/blob/develop/static/graphiql/index.html
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/graphql/__init__.py
---

# GraphQL Explorer

The GraphQL Explorer is an interactive editor for the server's GraphQL API, built on GraphiQL. It is used to try out queries, look up which fields an entity has, and copy working queries into scripts and tools. Queries run against the live server with the signed-in user's own session, so the results are exactly what that user may see. How to write queries, with examples, is in the developer guide [GraphQL API](../../developer/api/graphql.md).

## Where it appears

| Page | Menu entry | Shortcut | URL path | Who sees it |
|---|---|---|---|---|
| GraphQL Explorer | **Help** menu, **GraphQL Explorer** (opens in a new browser tab) | `8` opens the Help menu | `/explorer` | User role and above |

The page keeps the top bar of the web app; the breadcrumbs show **Explorer**. The editor itself is served by the server at `/graphiql` and shown in a frame. Opening `/graphiql` directly shows the same editor without the top bar; it requires being signed in to the web app in the same browser.

## Layout and controls

| Control | Where | What it does |
|---|---|---|
| Run button | Toolbar, left | Runs the query (`Ctrl+Enter`). With several named operations in the editor, it asks which one to run. |
| **Prettify** | Toolbar | Reformats the query (`Shift+Ctrl+P`). |
| **History** | Toolbar | Shows and hides the list of queries run before. The history and the last query are kept in the browser. |
| **Explorer** | Toolbar | Shows and hides the query builder on the left: the schema as a tree, where ticking fields and arguments writes the query. Closed when the page opens. |
| **Docs** | Top right | Opens the **Documentation Explorer**, the schema reference with every type, field and argument and its description, with search. |
| Query editor | Left pane | The GraphQL query. |
| **Query Variables** | Below the query editor | JSON values for the variables of the query, for example `{"projectName": "demo"}`. Opened by clicking its title bar. |
| Result | Right pane | The JSON response, including errors. |

## What it can run

The AYON GraphQL API is read-only: the schema has queries only, no mutations or subscriptions. Changes go through the REST API (see [REST API reference](rest-api.md)).

## Permissions

Every query runs as the signed-in user, with their access level and access groups. A user sees only the projects, folders and other entities their permissions allow, exactly as in the rest of the web app. The Help menu entry is hidden for guests.

## Related

- [GraphQL API](../../developer/api/graphql.md)
- [REST API reference](rest-api.md)
- [Navigation bar](navigation-bar.md#help-menu)
- [Users](studio/users.md)
