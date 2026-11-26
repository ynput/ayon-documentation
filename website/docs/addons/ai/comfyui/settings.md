---
title: ComfyUI addon settings
sidebar_label: Settings
description: "Reference of the settings of the AYON ComfyUI addon with their defaults: local launch profiles, remote connection profiles, ports, launch arguments, extra directories and creators."
addon: comfyui
addon_repo: ayon-comfyui
addon_version: 0.0.28
addon_scope: pipeline
addon_flags: []
verified: 2026-11-19
sources:
  - https://github.com/ynput/ayon-comfyui/tree/0.0.28/server
---

# ComfyUI addon settings

<AddonInfo />

The settings of the [ComfyUI addon](index.md) are in **Studio settings > ComfyUI**, and can be overridden in **Project settings**. Pasting a location below into the URI bar of the web app opens that setting.

The launch settings are lists of named profiles; the **ComfyUI profile** dialog at launch offers one of them. Both lists are empty by default, so at least one profile has to be added before ComfyUI can be launched or connected. All settings that hold paths, directories and launch arguments accept anatomy template keys such as `{roots[work]}/{project[name]}`.

## ComfyUI local launch options

<SettingLocation uri="ayon+settings://comfyui/local_settings" scope="Studio, with project overrides" />

Profiles for a ComfyUI that AYON starts on the artist's machine. The three ports at the top are shared by all local profiles.

<!-- screenshot: settings editor, ComfyUI local launch options with the shared ports -->

<Settings prefix="local">
<Setting name="Default port for website user interacts with." id="local-http-server-port" default="5454">

Port of the wrapper page that embeds ComfyUI in an `<iframe>`.

</Setting>
<Setting name="Default port to pulse connection to backend" id="local-server-pulse-port" default="55055">

Websocket port of the heartbeat that checks the backend is alive.

</Setting>
<Setting name="Default port for frontend websocket RPC" id="local-frontend-port" default="55056">

Websocket port used to talk to the browser.

</Setting>
</Settings>

### Local configuration entry

<SettingLocation uri="ayon+settings://comfyui/local_settings/local_setting_list" />

The local profiles, empty by default. Profile names must be unique.

<!-- screenshot: settings editor, one local configuration entry expanded -->

<Settings prefix="local-entry">
<Setting name="Setting name" default="Empty">

Name of the profile. It also names the managed virtual environment.

</Setting>
<Setting name="Port for ComfyUI (default = 8188)" id="local-entry-port" default="8188">

ComfyUI is started on `http://127.0.0.1:<port>`.

</Setting>
<Setting name="ComfyUI folder on windows." id="local-entry-folder-windows" default="Empty">

The ComfyUI folder on Windows: the folder that contains ComfyUI itself, not the root of a portable build.

</Setting>
<Setting name="ComfyUI folder on Linux." id="local-entry-folder-linux" default="Empty">

The ComfyUI folder on Linux.

</Setting>
<Setting name="ComfyUI folder on MacOsx." id="local-entry-folder-macos" default="Empty">

The ComfyUI folder on macOS.

</Setting>
<Setting name="Use alternate python?" id="local-entry-use-alternate-python" default="Disabled">

Uses a custom Python executable, for a ComfyUI taken from its git repository.

</Setting>
<Setting name="Use managed virtual environment with python" id="local-entry-managed-venv" default="Enabled">

Outside Windows, creates a virtual environment in the AYON folder and installs the dependencies from ComfyUI's `requirements.txt` into it, based on the custom Python or the default `python`. Keeping it on is recommended.

</Setting>
<Setting name="Windows" id="local-entry-python-windows" default="Empty">

The custom ComfyUI Python path on Windows.

</Setting>
<Setting name="Linux" id="local-entry-python-linux" default="Empty">

The custom ComfyUI Python path on Linux.

</Setting>
<Setting name="MacOsx" id="local-entry-python-macos" default="Empty">

The custom ComfyUI Python path on macOS.

</Setting>
<Setting name="Launch configuration" id="local-entry-launch-configuration">

Launch arguments and extra directories of the profile.

<Settings>
<Setting name="Is windows path a 'portable windows' build?" id="local-entry-windows-portable" default="Enabled">

On Windows, takes Python from `python_embeded` and adds the `--windows-portable` flag to the launch arguments.

</Setting>
<Setting name="Omit included plugin (use for developing)" id="local-entry-omit-plugin" default="Disabled">

Does not use the `ayon_menu` plugin included in the addon. A **Custom Nodes** extra directory that holds the plugin is then required.

</Setting>
<Setting name="Launch arguments for Windows" id="local-entry-launch-args-windows" default="Empty list">

Extra launch arguments on Windows, as **Key** and **Value (can be empty)** pairs.

</Setting>
<Setting name="Launch arguments for Linux" id="local-entry-launch-args-linux" default="Empty list">

Extra launch arguments on Linux, as **Key** and **Value (can be empty)** pairs.

</Setting>
<Setting name="Launch arguments for MacOsx" id="local-entry-launch-args-macos" default="Empty list">

Extra launch arguments on macOS, as **Key** and **Value (can be empty)** pairs.

</Setting>
<Setting name="Extra directories" id="local-entry-extra-directories" default="Empty list">

Directories added to the configuration file that ComfyUI reads at start. Entry names must be unique.

<Settings>
<Setting name="Enabled" id="local-entry-extra-dir-enabled" default="Enabled">

Switches the entry on or off.

</Setting>
<Setting name="Name" id="local-entry-extra-dir-name" default="Empty">

Name used in diagnostics.

</Setting>
<Setting name="Folder type" id="local-entry-extra-dir-folder-type" default="Automatic (Based on subdirectory name)">

What ComfyUI expects in the directory. **Automatic (Based on subdirectory name)** includes subdirectories that follow the ComfyUI naming conventions. **Automatic (No validity checking, all subdirectories)** adds all subdirectories without checking their names. Single-purpose types follow, such as **Custom Nodes**, **Checkpoints**, **Diffusion Models**, **Diffusers**, **LoRAs**, **VAEs** and **ControlNet**.

</Setting>
<Setting name="Custom directories windows" id="local-entry-extra-dir-windows" default="Empty list">

Directories on Windows.

</Setting>
<Setting name="Custom directories linux" id="local-entry-extra-dir-linux" default="Empty list">

Directories on Linux.

</Setting>
<Setting name="Custom directories MacOsx" id="local-entry-extra-dir-macos" default="Empty list">

Directories on macOS.

</Setting>
</Settings>

</Setting>
</Settings>

</Setting>
</Settings>

## ComfyUI remote launch options

<SettingLocation uri="ayon+settings://comfyui/remote_settings" scope="Studio, with project overrides" />

Profiles for connecting to a ComfyUI server that is already running.

<!-- screenshot: settings editor, ComfyUI remote launch options with one remote profile expanded -->

<Settings prefix="remote">
<Setting name="Remote configuration entry" default="Empty list">

The remote profiles.

<Settings>
<Setting name="Entry Name" id="remote-entry-name" default="Empty">

Name of the profile.

</Setting>
<Setting name="Default port to pulse connection to backend" id="remote-server-pulse-port" default="55055">

Heartbeat websocket port. It must match the port configured on the server (`AYON_BACKEND_PORT` in the plugin's `consts.py`).

</Setting>
<Setting name="Default port for frontend RPC" id="remote-frontend-port" default="55056">

Websocket port used to talk to the browser.

</Setting>
<Setting name="Default port for website user interacts with." id="remote-http-server-port" default="5454">

Port of the wrapper page.

</Setting>
<Setting name="ComfyUI Web Address" id="remote-web-address" default="http://127.0.0.1:8188">

Address of the ComfyUI frontend, for example `https://comfyui.contoso.com` for a server on the web.

</Setting>
<Setting name="Open browser on connect?" id="remote-open-browser" default="Enabled">

Opens the browser when the connection is made.

</Setting>
</Settings>

</Setting>
</Settings>

## Creators

<SettingLocation uri="ayon+settings://comfyui/create" scope="Studio, with project overrides" />

The creators of the Publisher. What they publish is described in the [ComfyUI addon](index.md) page.

<!-- screenshot: settings editor, Creators with Create Image expanded -->

### Create Image

<SettingLocation uri="ayon+settings://comfyui/create/CreateImage" />

Creates `image` products.

<Settings prefix="create-image">
<Setting name="Enabled" default="Enabled">

Shows the creator in the Publisher.

</Setting>
<Setting name="Default Variants" default="Main">

Variants offered when creating. Only letters, digits and `_` are allowed.

</Setting>
<Setting name="Product type items" default="Empty list">

Optional list of product type and label pairs (**Product type**, **Label**). The addon does not use this list.

</Setting>
</Settings>

### Create Model

<SettingLocation uri="ayon+settings://comfyui/create/CreateModel" />

Creates `model` products.

<Settings prefix="create-model">
<Setting name="Enabled" default="Enabled">

Shows the creator in the Publisher.

</Setting>
<Setting name="Default Variants" default="Main">

Variants offered when creating. Only letters, digits and `_` are allowed.

</Setting>
<Setting name="Product type items" default="Empty list">

Optional list of product type and label pairs (**Product type**, **Label**). The addon does not use this list.

</Setting>
</Settings>

### Create Video

<SettingLocation uri="ayon+settings://comfyui/create/CreateVideo" />

Creates `render` products.

<Settings prefix="create-video">
<Setting name="Enabled" default="Enabled">

Shows the creator in the Publisher.

</Setting>
<Setting name="Default Variants" default="Main">

Variants offered when creating. Only letters, digits and `_` are allowed.

</Setting>
<Setting name="Product type items" default="Empty list">

Optional list of product type and label pairs (**Product type**, **Label**). The addon does not use this list.

</Setting>
</Settings>

## Related

- [ComfyUI addon](index.md)
- [Settings and scopes](../../../ayon/how-ayon-works/settings.md)
