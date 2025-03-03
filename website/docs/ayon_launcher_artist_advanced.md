---
id: ayon_launcher_artist_advanced
title: Advanced Usage
sidebar_label: Advanced Usage
description: AYON Launcher
toc_max_heading_level: 5
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info
This page explains the advanced usage of AYON Launcher for advanced users and TDs.
Where it explains different launcher arguments and CLI interface.
:::

## General Information

### AYON Executables

After installing AYON launcher, you'll find different executables based on your OS.

<Tabs
    defaultValue='win'
    values={[
        {label: 'Windows', value: 'win'},
        {label: 'Linux & MacOS', value: 'linuxmac'},
    ]}>

<TabItem value='win'>

`ayon.exe` and `ayon_console.exe` on Windows

```
cd <ayon-launcher-installation-location>
./ayon.exe
```
Or 

```
cd <ayon-launcher-installation-location>
./ayon_console.exe
```

:::info 

Executable `ayon_console.exe` creates console with output - useful for debugging, `ayon.exe` does not create console, but does not have any `stdout` or `stderr` output.
:::
</TabItem>


<TabItem value='linuxmac'>

`ayon` on Linux and MacOS.

```
cd <ayon-launcher-installation-location>
ayon
```
</TabItem>
</Tabs>


### Launch in different Pipeline Modes

<Tabs
    defaultValue='production'
    values={[
        {label: <span><span style={{color:'#23E0A9'}}>⬤</span> Production</span>, value: 'production'},
        {label: <span><span style={{color:'#ff858b'}}>⬤</span> Staging</span>, value: 'staging'},
        {label: <span><span style={{color:'#e2e2e3'}}>⬤</span> Development</span>, value: 'dev'},
    ]}>

<TabItem value='production'>

By default when launching the app, it runs in <span style={{color:'#1c2026',backgroundColor:'#23E0A9', borderRadius: '4px', padding: '2px 4px'}}>Production</span> mode.

:::info example
<Tabs
    defaultValue='win'
    values={[
        {label: 'Windows', value: 'win'},
        {label: 'Linux & MacOS', value: 'linuxmac'},
    ]}>

<TabItem value='win'>

```
cd <ayon-launcher-installation-location>
./ayon_console.exe
```
Or 
```
cd <ayon-launcher-installation-location>
./ayon.exe
```

</TabItem>

<TabItem value='linuxmac'>

```
cd <ayon-launcher-installation-location>
ayon
```
</TabItem>
</Tabs>
:::

</TabItem>


<TabItem value='staging'>

when passing `--use-staging` argument to ayon executable.
It runs in <span style={{color:'#1c2026', backgroundColor:'#ff858b', borderRadius: '4px', padding: '2px 4px'}}>Staging</span> mode.

:::info example
<Tabs
    defaultValue='win'
    values={[
        {label: 'Windows', value: 'win'},
        {label: 'Linux & MacOS', value: 'linuxmac'},
    ]}>

<TabItem value='win'>

```
cd <ayon-launcher-installation-location>
./ayon_console.exe --use-staging
```
Or 
```
cd <ayon-launcher-installation-location>
./ayon.exe --use-staging
```

</TabItem>

<TabItem value='linuxmac'>

```
cd <ayon-launcher-installation-location>
ayon --use-staging
```
</TabItem>
</Tabs>
:::

</TabItem>


<TabItem value='dev'>

when passing `--use-dev` argument to ayon executable.
It runs AYON Launcher in <span style={{color:'#1c2026',backgroundColor:'#e2e2e3', borderRadius: '4px', padding: '2px 4px'}}>Development</span> mode.

:::info example
<Tabs
    defaultValue='win'
    values={[
        {label: 'Windows', value: 'win'},
        {label: 'Linux & MacOS', value: 'linuxmac'},
    ]}>

<TabItem value='win'>

```
cd <ayon-launcher-installation-location>
./ayon_console.exe --use-dev
```
Or 
```
cd <ayon-launcher-installation-location>
./ayon.exe --use-dev
```

</TabItem>

<TabItem value='linuxmac'>

```
cd <ayon-launcher-installation-location>
ayon --use-dev
```
</TabItem>
</Tabs>
:::

</TabItem>
</Tabs>

## Global Executable Arguments

These arguments can be used with both AYON and AYON Console executables.

| Argument | Description |
|--|--|
| `init-ayon-launcher` | Initialize launcher. Register executable path to known AYON launcher locations, and install shim executable. |
| `--bundle <BUNDLE NAME>` | Force AYON to use specific bundle instead of the one that is set in the config file. This is useful for testing new bundles before they are released. |
| `--verbose <LOG LEVEL>` | Change logging level to one of the following: `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`. |
| `--debug` | Simplified way how to change verbose to DEBUG. Also sets `AYON_DEBUG` environment variable to `1`. |
| `--skip-headers` | Skip headers in the console output. |
| `--use-dev` | Use dev bundle and settings, if bundle is not explicitly defined. |
| `--use-staging` | Use staging settings, and use staging bundle, if bundle is not explicitly defined. Cannot be combined with staging. |
| `--headless` | Tell AYON to run in headless mode. No UIs are shown during bootstrap. Affects `AYON_HEADLESS_MODE` environment variable. Custom logic must handle headless mode on own. |
| `--ayon-login` | Show login dialog on startup. |
| `--skip-bootstrap` | Skip bootstrap process. Used for inner logic of distribution. |

## Launcher CLI Interface

:::info Windows
To access the following commands on windows, use `./ayon_console.exe`.
:::

:::tip
Use `--help` to get information about the current existent commands.
:::

### Core

import selectcontextWindow from './assets/launcher/artist/selectcontext_window.png';
import consoleInteractive from './assets/launcher/artist/console_interactive.png';

<!-- This is written in HTML to use nested tables as markdown doesn't support nested tables. -->
<table>
    <thead>
        <tr>
            <th>Argument</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>contextselection [OPTIONS] &lt;OUTPUT_PATH&gt;</code></td>
            <td>Show Qt dialog to select a context and save it to a output json file. You can specify options to preselect some parts of the context.
                <details><summary>Example Output</summary>
                    <pre>
                        &#123; <br/>
                        &ensp;&ensp;"project": "Animal_Logic_ALab", <br/>
                        &ensp;&ensp;"project_name": "Animal_Logic_ALab", <br/>
                        &ensp;&ensp;"asset": "decor_sheets_projector01", <br/>
                        &ensp;&ensp;"folder_id": "5e065e68efba11efac2907e3bade2bbe", <br/>
                        &ensp;&ensp;"folder_path": "/assets/decor_sheets_projector01", <br/>
                        &ensp;&ensp;"task": "modeling", <br/>
                        &ensp;&ensp;"task_name": "modeling", <br/>
                        &ensp;&ensp;"task_id": "5e0b3067efba11efbdbd07e3bade2bbe", <br/>
                        &ensp;&ensp;"initial_context_valid": true <br/>
                        &#125;
                    </pre>
                </details>
                <table>
                    <thead>
                        <tr>
                            <th>Option</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>--project &lt;TEXT&gt;</code></td>
                            <td>Define project context</td>
                        </tr>
                        <tr>
                            <td><code>--folder &lt;TEXT&gt;</code></td>
                            <td>Define folder in project (project must be set)</td>
                        </tr>
                        <tr>
                            <td><code>--strict</code></td>
                            <td>Full context must be set otherwise dialog can't be closed.</td>
                        </tr>
                    </tbody>
                </table>
                <img src={selectcontextWindow}/>
            </td>
        </tr>
        <tr>
            <td><code>interactive</code></td>
            <td>Interactive (Python like) console.
                <img src={consoleInteractive}/>
            </td>
        </tr>
        <tr>
            <td><code>publish</code></td>
            <td>Start CLI publishing. Publish collects json from path provided as an argument. Json like the generated one for deadline jobs.
                <table>
                    <thead>
                        <tr>
                            <th>Option</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>--targets &lt;TEXT&gt;</code> or <code>-t &lt;TEXT&gt;</code></td>
                            <td>Targets</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td><code>publish-report-viewer</code></td>
            <td> Launch <a href="ayon_launcher_artist_basic#publish-report-viewer">Publish Report Viewer</a></td>
        </tr>
        <tr>
            <td><code>run &lt;SCRIPT_PATH&gt;</code></td>
            <td>Run python script in AYON context.</td>
        </tr>
        <tr>
            <td><code>tray</code></td>
            <td>Launch AYON tray. Default action of AYON command is to launch tray 
                widget to control basic aspects of AYON.
                <table>
                    <thead>
                        <tr>
                            <th>Option</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>--force</code></td>
                            <td>Force to start tray and close any existing one.</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>

:::info Example

<Tabs
    defaultValue='win'
    values={[
        {label: 'Windows', value: 'win'},
        {label: 'Linux & MacOS', value: 'linuxmac'},
    ]}>

<TabItem value='win'>

```
cd <ayon-launcher-installation-location>
./ayon_console.exe contextselection "E:/selected_context.json"
```
</TabItem>

<TabItem value='linuxmac'>

```
cd <ayon-launcher-installation-location>
ayon contextselection "/mnt/share/selected_context.json"
```
</TabItem>
</Tabs>

:::

### Addons
These commands are added by other addons. 

<table>
    <thead>
        <tr>
            <th>Argument</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>addon applications</code></td>
            <td>Applications addon commands
                <table>
                    <thead>
                        <tr>
                            <th>Command</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>extractenvironments</code></td>
                            <td>Extract environment variables for context into json file
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Option</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><code>--project &lt;TEXT&gt;</code></td>
                                            <td>Project name</td>
                                        </tr>
                                        <tr>
                                            <td><code>--folder &lt;TEXT&gt;</code></td>
                                            <td>Folder Path</td>
                                        </tr>
                                        <tr>
                                            <td><code>--task &lt;TEXT&gt;</code></td>
                                            <td>Task name</td>
                                        </tr>
                                        <tr>
                                            <td><code>--app &lt;TEXT&gt;</code></td>
                                            <td>Full application name</td>
                                        </tr>
                                        <tr>
                                            <td><code>--envgroup &lt;TEXT&gt;</code></td>
                                            <td>Environment group (e.g. "farm")</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td><code>launch</code></td>
                            <td>Launch application.
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Option</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><code>--app &lt;TEXT&gt;</code></td>
                                            <td>Full application name  [required]</td>
                                        </tr>
                                        <tr>
                                            <td><code>--project &lt;TEXT&gt;</code></td>
                                            <td>Project name  [required]</td>
                                        </tr>
                                        <tr>
                                            <td><code>--folder &lt;TEXT&gt;</code></td>
                                            <td>Folder path [required]</td>
                                        </tr>
                                        <tr>
                                            <td><code>--task &lt;TEXT&gt;</code></td>
                                            <td>Task name [required]</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td><code>launch-by-id</code></td>
                            <td>Launch application by id.
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Option</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><code>--app &lt;TEXT&gt;</code></td>
                                            <td>Full application name  [required]</td>
                                        </tr>
                                        <tr>
                                            <td><code>--project &lt;TEXT&gt;</code></td>
                                            <td>Project name  [required]</td>
                                        </tr>
                                        <tr>
                                            <td><code>--task-id &lt;TEXT&gt;</code></td>
                                            <td>Task id  [required]</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td><code>addon traypublisher</code></td>
            <td>TrayPublisher related commands. More Info <a href="addon_traypublisher_artist_advanced">Tray Publisher CLI Interface</a> </td>
        </tr>
    </tbody>
</table>

:::info Example

<Tabs
    defaultValue='win'
    values={[
        {label: 'Windows', value: 'win'},
        {label: 'Linux & MacOS', value: 'linuxmac'},
    ]}>

<TabItem value='win'>

```
cd <ayon-launcher-installation-location>
./ayon_console.exe addon applications launch --app houdini/20-5 --project Experiments --folder /shots/shot_01 --task fx
```
</TabItem>

<TabItem value='linuxmac'>

```
cd <ayon-launcher-installation-location>
ayon addon applications launch --app houdini/20-5 --project Experiments --folder /shots/shot_01 --task fx
```
</TabItem>
</Tabs>


:::