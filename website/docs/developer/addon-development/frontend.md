---
title: Addon frontend
sidebar_label: Frontend
description: "The frontend of an AYON addon: frontend_scopes and where the page shows (studio settings, project, dashboard), the sidebar, admin and manager keys, the two types of frontend (a Node project such as Vite, or plain HTML), how frontend/dist is served, the context message the web app posts to the iframe (scope, accessToken, context, addon name and version, user and project), requesting it again with request_context, calling the API with a Bearer token, a minimal Vite example, and testing live: inside the server with a clone in the server's addons folder and vite build --watch, or outside it with the Vite dev server and the standalone mode of @ynput/ayon-react-addon-provider (devConfig, login, scope and project toolbar, port 5173)."
verified: 2026-11-13
sources:
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/addons/models.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/addons/addon.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/api/static.py
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectAddon.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/ProjectPage/ProjectPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/UserDashboardPage/UserDashboardPage.tsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/SettingsPage/SettingsAddon.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/pages/UserDashboardPage/DashboardAddon.jsx
  - https://github.com/ynput/ayon-frontend/blob/develop/src/hooks/useAddonContextResend.ts
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/api/dependencies.py
  - https://github.com/ynput/ayon-sitesync/blob/develop/frontend/vite.config.js
  - https://github.com/ynput/ayon-react-addon-provider/blob/main/src/AddonProvider/AddonProvider.tsx
  - https://github.com/ynput/ayon-react-addon-provider/blob/main/src/AddonProvider/StandaloneToolbar.tsx
---

# Addon frontend

An addon can add its own page to the web app. The page is built from the addon's `frontend` folder by [`create_package.py`](overview.md#build-a-package) and declared in the [server addon class](server.md#the-server-addon-class).

`frontend_scopes` sets where the page shows:

```python
class MyAddon(BaseServerAddon):
    frontend_scopes = {"project": {"sidebar": "hierarchy"}}
```

Each scope adds a tab, named after the addon's `title`:

| Scope | Where the tab shows | Address | Addon version used |
|---|---|---|---|
| `settings` | **Studio settings**, for managers and admins | `/settings/addon/{addon name}` | The production bundle's |
| `project` | The project pages, in every project | `/projects/{project name}/addon/{addon name}` | The bundle of the user's bundle mode: production, staging or the user's dev bundle |
| `dashboard` | The dashboard (**Home**) | `/dashboard/addon/{addon name}` | The same as `project` |

Each scope takes these keys:

| To | Set in the scope |
|---|---|
| Show a sidebar next to the page | `"sidebar": "hierarchy"` |
| Show the page only to admins | `"admin": True` |
| Show the page only to managers and admins | `"manager": True` |
| Show the page to all users | Skip setting `admin` or `manager` (the default) |

`admin` and `manager` apply to addon pages in the `project` and `dashboard` scopes; the `settings` scope is for managers and admins anyway. The access levels are described in [Permissions](../../ayon/how-ayon-works/permissions.md).

## Types of frontend

The server serves the files in `frontend/dist` as they are, at `/addons/{addon name}/{addon version}/frontend/`, and loads `index.html` from there. Any frontend that ends up as static files in `frontend/dist` works:

| Type | How `frontend/dist` is made | Example |
|---|---|---|
| Node project, for example React with Vite | `create_package.py` runs `yarn install` and `yarn build` in `frontend/`, which writes `frontend/dist`. | [Site Sync](https://github.com/ynput/ayon-sitesync/tree/develop/frontend) |
| Plain HTML | The HTML, JavaScript and CSS files are kept in `frontend/dist` directly, with no build. | [ShotGrid](https://github.com/ynput/ayon-shotgrid/tree/develop/frontend/dist) |

The `create_package.py` of the addon template builds with Yarn whenever there is a `frontend` folder. A plain HTML frontend needs a package script that only copies the folder, as ShotGrid's does.

## Context from the web app

The files are served without authentication. The web app loads the page in an iframe and posts a message to it when the page loads and whenever the context changes:

| Field | Scopes | Value |
|---|---|---|
| `scope` | All | `settings`, `project` or `dashboard` |
| `accessToken` | All | The signed-in user's access token |
| `context` | All | The web app's current state, for example the focused folders, products and versions |
| `addonName`, `addonVersion` | All | The addon and the version that serves the page |
| `userName`, `projectName` | `project` | The signed-in user and the open project |

The page can ask for the message again by posting `{action: "request_context"}` to the parent window. It calls the server API on the same address, `/api/...` and `/graphql`, with the header `Authorization: Bearer <accessToken>`.

## Example: a Vite page

A minimal page that receives the context and calls the API. Yarn must be installed for `create_package.py` to build it.

```text
frontend/
├── package.json
├── vite.config.js
├── index.html
└── src/
    └── main.js
```

```json title="frontend/package.json"
{
  "name": "my-addon-frontend",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "devDependencies": {
    "vite": "^5.4.0"
  }
}
```

`base: ""` is required: the page is served under `/addons/{addon name}/{addon version}/frontend/`, so the built files must use relative paths. Without it the page stays blank. The proxy lets `yarn dev` run the page against a running server.

```js title="frontend/vite.config.js"
import { defineConfig } from "vite";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

export default defineConfig({
  base: "",
  server: {
    proxy: {
      "/api": SERVER_URL,
      "/graphql": SERVER_URL,
    },
  },
});
```

```html title="frontend/index.html"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Addon</title>
  </head>
  <body>
    <pre id="output">Waiting for the context...</pre>
    <script type="module" src="./src/main.js"></script>
  </body>
</html>
```

```js title="frontend/src/main.js"
window.addEventListener("message", async (event) => {
  const { accessToken, scope, projectName } = event.data ?? {};
  if (!accessToken) return;

  const response = await fetch("/api/users/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const user = await response.json();
  document.getElementById("output").textContent =
    `Scope: ${scope}, project: ${projectName ?? "-"}, user: ${user.name}`;
});

// Ask for the context, in case the first message was sent before the listener
window.parent.postMessage({ action: "request_context" }, "*");
```

`python create_package.py` in the addon's root then runs `yarn install` and `yarn build`, and adds `frontend/dist` to the package.

## Testing live

### Inside the server

The server reads `frontend/dist` from disk on every request, so on a development server a rebuilt page shows after a page reload, without packaging, uploading or restarting:

1. Clone the addon into the server's `addons` folder, restart the server once, and add the clone's version, for example `1.0.0+git`, to your [dev bundle](../developer-mode.md#create-a-dev-bundle-and-assign-it). See [Addon code inside the server](../developer-mode.md#addon-code-inside-the-server).
2. In the clone's `frontend` folder, run `yarn install`, then `yarn vite build --watch`, which rebuilds `frontend/dist` on every change.
3. With the bundle mode set to **Developer**, open the addon's tab in a project or on the dashboard. After a change, reload the page.

The `settings` scope always uses the production bundle's version, so it does not show the clone.

### Outside the server

A React page can run from the Vite dev server, outside the web app, against a running server, with [`@ynput/ayon-react-addon-provider`](https://github.com/ynput/ayon-react-addon-provider). Inside the web app, the provider receives the context message and sets the access token for `axios`. Outside it, it switches to a standalone mode: a login form, a toolbar to switch the scope and the project, and a context made from `devConfig`. It is a regular dependency, bundled into `frontend/dist` by the build.

`@ynput/ayon-react-components` asks for exact versions of React, styled-components and react-datepicker; the command installs the versions it asks for at the time of writing:

```shell
yarn add react@18.3.1 react-dom@18.3.1 styled-components@6.4.0 react-datepicker@4.11.0 axios @ynput/ayon-react-addon-provider @ynput/ayon-react-components
yarn add -D vite @vitejs/plugin-react
```

```js title="frontend/vite.config.js"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

export default defineConfig({
  base: "",
  plugins: [react()],
  server: {
    proxy: {
      "/api": SERVER_URL,
      "/graphql": SERVER_URL,
    },
  },
});
```

```jsx title="frontend/src/main.jsx"
import ReactDOM from "react-dom/client";
import { AddonProvider, useAddonContext } from "@ynput/ayon-react-addon-provider";
import "@ynput/ayon-react-components/dist/style.css";

function App() {
  const { scope, projectName, userName } = useAddonContext();
  return <p>Scope: {scope}, project: {projectName ?? "-"}, user: {userName}</p>;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <AddonProvider
    devConfig={{
      addonName: "my_addon",
      addonVersion: "1.0.0",
      scope: "project",
      projectName: "my_project",
    }}
  >
    <App />
  </AddonProvider>,
);
```

`index.html` loads `./src/main.jsx` into `<div id="root"></div>`. `yarn dev` serves the page at `http://localhost:5173`, and the proxy sends its API calls to `SERVER_URL`. After signing in with an AYON user, changes show as they are saved.

- The provider only enters the standalone mode at `http://localhost:5173`, Vite's default address. On another port the page stays blank.
- The toolbar switches between the `settings` and `project` scopes, and lists the server's projects.
- In the standalone mode `context` is empty, so the focused folders, products and versions cannot be tested this way.
- The access token is kept in the browser until **Logout**.
- The addon's own endpoints only answer when the addon is installed on the server.

A page without the provider, such as the [Vite example](#example-a-vite-page), has no standalone mode.

## Related

- [Server side](server.md)
- [Overview and packaging](overview.md)
- [AYON frontend theme](../server/theme.md)
- [Frontend React components](../api/react-components.md)
