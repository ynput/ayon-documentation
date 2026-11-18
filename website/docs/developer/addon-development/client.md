---
title: Addon client side
sidebar_label: Client side
description: "How the launcher finds and loads the client code of an addon, the AYONAddon class and its methods (initialize, connect_with_addons, enabled, settings, environments, process preparation, host install), the interfaces ITrayAddon, ITrayAction, ITrayService, IPluginPaths, IHostAddon and ITraits, launch hook paths, command line commands with click_wrap, tray menu items and local web server routes, Python dependencies, using ayon_api, and a minimal example."
verified: 2026-11-13
sources:
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/addon/base.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/addon/interfaces.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/addon/click_wrap.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/addon/utils.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/cli.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/settings/lib.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/tray/ui/addons_manager.py
  - https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/tools/tray/webserver/server.py
  - https://github.com/ynput/ayon-applications/blob/develop/client/ayon_applications/manager.py
  - https://github.com/ynput/ayon-applications/blob/develop/client/ayon_applications/addon.py
  - https://github.com/ynput/ayon-launcher/blob/develop/common/ayon_common/distribution/control.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/addons/addon.py
---

# Addon client side

The client code of an addon runs on workstations: in the launcher, in the tray, in command line calls and inside applications. It adds tools, tray menu items, commands, pipeline plugins and host integrations. This page describes how the client code is loaded and the `AYONAddon` class with its interfaces. Packaging the client code is described in [Build a package](overview.md#build-a-package), host integrations and pipeline plugins in [Host integration](host-integration.md).

## How the client code is loaded

1. The package holds the client code as `private/client.zip`. The server offers it for download only when this file exists.
2. The launcher downloads the `client.zip` of each addon version in the [bundle](../../ayon/how-ayon-works/bundles.md) and unpacks it into its local storage as `addons/<name>_<version>/`. `AYON_ADDONS_DIR` sets another folder.
3. In a [dev bundle](../developer-mode.md#addon-client-code), an addon with its addon directory switched on is read from that path instead.
4. Core adds the addon folder to `sys.path` and imports every Python package or module in it, so the folder named by `client_dir` is imported by its name, for example `import my_addon`. Files and folders with a dot in the name, `setup.py` and `start.py` are skipped.
5. A module is kept when it has a subclass of `AYONAddon` among its attributes. The class must therefore be importable from the package's `__init__.py`. A folder with no such module logs `Addon <name> <version> has no content to import`.
6. The `AddonsManager` creates one object of each class that is not abstract. A class with missing abstract methods is skipped with a warning that lists them.

Every AYON process that uses addons, such as the tray, a command or an application, creates its own `AddonsManager`, so the addon object exists once per process.

## The AYONAddon class

`AYONAddon` in `ayon_core.addon` is the base class of the client code.

| Member | Required | Purpose |
|---|---|---|
| `name` | Yes | The addon's name, the same as `name` in `package.py`. |
| `version` | Yes, in practice | The addon's version, usually `__version__` from `version.py`, which `create_package.py` writes. Without it the version is `0.0.0` with a `DEV WARNING`. |
| `enabled` | No | `True` by default. A disabled addon is created but left out of `connect_with_addons`, plugin paths, the tray and the other lookups of enabled addons. |
| `initialize(settings)` | No | Sets up the addon. Called from `__init__`, which should not be overridden. |
| `connect_with_addons(enabled_addons)` | No | Called once all addons are created, with the list of enabled addons, to find and use other addons. |
| `get_global_environments()` | No | Environment variables to set when AYON starts. Two addons may not set the same key. |
| `ensure_is_process_ready(process_context)` | No | Prepares the addon before a process starts, for example asks for a login. Called for example before the Applications addon launches an application. Raising `ProcessPreparationError` stops the process and shows its message. |
| `on_host_install(host, host_name, project_name)` | No | Called inside an application after the host is installed, for example to register callbacks. |
| `cli(addon_click_group)` | No | Adds command line commands, see [Command line](#command-line). |
| `log`, `manager` | Set by the base class | A logger named after the addon, and the `AddonsManager`. `manager.get_enabled_addon(<name>)` returns another enabled addon or `None`. |

### Settings

`initialize` gets the studio settings of the bundle's addons as a dictionary keyed by addon name, for the settings variant of the session (production, staging or dev). An addon reads its own part with `settings[self.name]`. The settings models are defined in the server code, see [Server side](server.md).

Elsewhere in client code, `ayon_core.settings` reads settings at any time:

| Function | Returns |
|---|---|
| `get_studio_settings()` | Studio settings of all addons, keyed by addon name. |
| `get_project_settings(project_name)` | Project settings of all addons, keyed by addon name, with the project site overrides of the current site. |

Both read the settings of the current bundle and variant, and are cached for 10 seconds. Neither includes the studio site settings, which have a separate model (see [Scopes](server.md#scopes)). `ayon_api.get_addon_site_settings(addon_name, addon_version)` returns them for the current site.

An addon that only works when it is configured can turn itself off:

```python
def initialize(self, settings):
    workspace_name = settings[self.name]["workspace_name"]
    self.enabled = bool(workspace_name)
    self.workspace_name = workspace_name
```

## Interfaces

Interfaces are mixin classes from `ayon_core.addon` that an addon class inherits next to `AYONAddon`. Each one adds a feature.

| Interface | Purpose | Methods to implement |
|---|---|---|
| `ITrayAddon` | Takes part in the tray: UI, menu items, background work. | `tray_init`, `tray_menu(tray_menu)`, `tray_start`, `tray_exit` |
| `ITrayAction` | A single tray menu item that runs `on_action_trigger`, usually to show a tool. `admin_action = True` puts it into the **Admin** submenu. | `label`, `tray_init`, `on_action_trigger` |
| `ITrayService` | A service shown in the **Services** submenu with a running, idle or failed icon. | `label`, `tray_init`, `tray_start`, `tray_exit` |
| `IPluginPaths` | Adds folders of pipeline plugins and actions. | Any of the methods below |
| `IHostAddon` | The addon integrates an application. See [Host integration](host-integration.md). | `host_name`, optionally `get_workfile_extensions` |
| `ITraits` | Adds trait classes. | `get_addon_traits` |

`ITrayAction` and `ITrayService` inherit `ITrayAddon` and add the menu item themselves. The full signatures are in [interfaces.py](https://github.com/ynput/ayon-core/blob/develop/client/ayon_core/addon/interfaces.py).

### Plugin paths

`IPluginPaths` has one method per plugin type. Each returns a list of folder paths and is called on enabled addons only. `host_name` is the application the plugins are collected for, so an addon can return different folders per application.

| Method | Plugins |
|---|---|
| `get_create_plugin_paths(host_name)` | Creators |
| `get_publish_plugin_paths(host_name)` | Publish plugins: collectors, validators, extractors, integrators |
| `get_load_plugin_paths(host_name)` | Loaders |
| `get_inventory_action_paths(host_name)` | Scene inventory actions |
| `get_loader_action_plugin_paths(host_name)` | Loader actions, also outside applications |
| `get_workfile_action_plugin_paths(host_name)` | Workfiles tool actions |
| `get_launcher_action_paths()` | Launcher actions |

`get_plugin_paths()`, which returns a dictionary with the keys `create`, `publish`, `load`, `inventory` and `actions`, is deprecated and logs a warning. Writing the plugins is described in [Host integration](host-integration.md).

```python
import os

from ayon_core.addon import AYONAddon, IPluginPaths

ADDON_ROOT = os.path.dirname(os.path.abspath(__file__))


class MyAddon(AYONAddon, IPluginPaths):
    name = "my_addon"

    def get_publish_plugin_paths(self, host_name):
        return [os.path.join(ADDON_ROOT, "plugins", "publish")]
```

### Launch hook paths

Launch hooks run before and after an application starts. They are not part of an interface: the Applications addon calls `get_launch_hook_paths` on every enabled addon that has the method, with the `Application` object when the method takes an argument. It returns a list of folders. See [Host integration](host-integration.md).

```python
def get_launch_hook_paths(self, app):
    return [os.path.join(ADDON_ROOT, "hooks")]
```

## Command line

The `cli` method adds commands under the launcher's `addon` command. It gets a click group and adds the addon's own group to it. Usage of addon commands is described in [Addon commands](../../pipeline/launcher-administration.md#addon-commands).

`ayon_core.addon.click_wrap` defines the commands with the same API as `click`, without importing `click` in the addon: the `click` version of AYON is not compatible with the one in some applications. `to_click_obj()` turns the group into a click object.

```python
from ayon_core.addon import AYONAddon, click_wrap


class MyAddon(AYONAddon):
    name = "my_addon"

    def cli(self, addon_click_group):
        main_group = click_wrap.group(
            self._cli_main, name=self.name, help="My Addon commands"
        )
        main_group.command(
            self._cli_hello, name="hello", help="Prints a greeting"
        ).option("--project", help="Project name", default=None)
        addon_click_group.add_command(main_group.to_click_obj())

    def _cli_main(self):
        pass

    def _cli_hello(self, project):
        print(f"Hello from {project}")
```

```shell
ayon_console.exe addon my_addon hello --project demo
```

The group name is the first word after `addon`. By convention it is the addon's name.

## Tray

The tray creates its addons in this order, and calls the `ITrayAddon` methods between the general ones:

| Step | Called on |
|---|---|
| `initialize(settings)` | All addons |
| `tray_init()` | Enabled tray addons. Load the UI here, not in `initialize`. |
| `webserver_initialization(manager)` | Enabled addons that have the method |
| `connect_with_addons(enabled_addons)` | Enabled addons |
| `tray_menu(tray_menu)` | Tray addons whose `tray_init` succeeded |
| `tray_start()` | The same addons, after the tray's web server starts |
| `tray_exit()` | The same addons, when the tray closes. Stop threads here. |

An addon that crashes in `tray_init` or `tray_menu` is left out of the next steps. A tray addon must still work in processes without a tray, where only `initialize` and `connect_with_addons` run.

`ITrayAddon` also provides `show_tray_message(title, message)`, `execute_in_main_thread(callback)` for Qt calls from other threads, and `add_action_to_admin_submenu(label, tray_menu)`. Qt is imported from `qtpy`.

### Local web server

The tray runs a small web server on `127.0.0.1`, which lets applications and other processes talk to the tray. An addon adds routes in a `webserver_initialization(manager)` method:

```python
def webserver_initialization(self, manager):
    manager.add_addon_route(self.name, "/status", "GET", self._get_status)

async def _get_status(self, request):
    from aiohttp import web

    return web.json_response({"addon": self.name})
```

`add_addon_route` registers the handler at `/addons/<name>/<path>` and returns that path. `add_addon_static(name, prefix, path)` serves a folder. Handlers are [aiohttp](https://docs.aiohttp.org/) handlers. In another process, `get_tray_server_url()` from `ayon_core.tools.tray` returns the server's URL.

## Python dependencies

The client code runs on the Python modules of the launcher and of the bundle's dependency package. Modules the addon needs on top of these go into `client/pyproject.toml`, from which the AYON dependencies tool builds the [dependency package](../../ayon/web-ui/studio/bundles.md#dependency-packages). The sections of that file are described in [Addons and pipeline](../requirements.md#addons-and-pipeline).

## Talking to the server

The launcher connects to the server before the addons load, with `AYON_SERVER_URL` and `AYON_API_KEY` in the environment. Client code calls the functions of `ayon_api` directly, without logging in. See [Python API](../api/python.md).

```python
import ayon_api

project = ayon_api.get_project("demo")
```

## Example

A minimal addon with a tray menu item that reads a value from its settings. `version.py` is written by `create_package.py`; the `greeting` field is defined in the server settings model.

```text
client/
├── pyproject.toml
└── my_addon/
    ├── __init__.py
    ├── addon.py
    └── version.py
```

```python title="client/my_addon/__init__.py"
from .version import __version__
from .addon import MyAddon

__all__ = ("__version__", "MyAddon")
```

```python title="client/my_addon/addon.py"
from ayon_core.addon import AYONAddon, ITrayAction

from .version import __version__


class MyAddon(AYONAddon, ITrayAction):
    name = "my_addon"
    version = __version__
    label = "My Tool"

    def initialize(self, settings):
        self.greeting = settings[self.name]["greeting"]

    def tray_init(self):
        pass

    def on_action_trigger(self):
        from qtpy import QtWidgets

        QtWidgets.QMessageBox.information(None, self.label, self.greeting)
```

The tray then shows **My Tool** in its menu. More complete examples are the client code of [ayon-applications](https://github.com/ynput/ayon-applications/blob/develop/client/ayon_applications/addon.py) and [ayon-traypublisher](https://github.com/ynput/ayon-traypublisher/blob/develop/client/ayon_traypublisher/addon.py).

## Related

- [Addon overview and packaging](overview.md)
- [Server side](server.md)
- [Host integration](host-integration.md)
- [Developer mode](../developer-mode.md)
- [Launcher administration](../../pipeline/launcher-administration.md)
