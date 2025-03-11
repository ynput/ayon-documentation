---
id: ayon_launcher_artist_advanced
title: Advanced Usage
sidebar_label: Advanced Usage
description: AYON Launcher
toc_max_heading_level: 5
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';

:::info
This page explains the advanced usage of AYON Launcher for advanced users and TDs, covering different launcher arguments and the CLI interface.
:::

## General Information

### AYON Executables

After installing the AYON Launcher, you'll find different executables based on your OS.

<Tabs
    defaultValue='win'
    values={[
        {label: 'Windows', value: 'win'},
        {label: 'Linux & MacOS', value: 'linuxmac'},
    ]}>

<TabItem value='win'>

`ayon.exe` and `ayon_console.exe` on Windows

```bash
cd <ayon-launcher-installation-location>
./ayon.exe
```
Or 

```bash
cd <ayon-launcher-installation-location>
./ayon_console.exe
```

:::info

The executable `ayon_console.exe` creates a console with output, which is useful for debugging. `ayon.exe` does not create a console and has no `stdout` or `stderr` output.
:::
</TabItem>

<TabItem value='linuxmac'>

`ayon` on Linux and MacOS.

```bash
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

By default, when launching the app, it runs in <span style={{color:'#1c2026',backgroundColor:'#23E0A9', borderRadius: '4px', padding: '2px 4px'}}>Production</span> mode.

:::info example
<Tabs defaultValue='win' values={[{label: 'Windows', value: 'win'}, {label: 'Linux & MacOS', value: 'linuxmac'}]}>

<TabItem value='win'>

```bash
cd <ayon-launcher-installation-location>
./ayon_console.exe
```
Or 
```bash
cd <ayon-launcher-installation-location>
./ayon.exe
```

</TabItem>

<TabItem value='linuxmac'>

```bash
cd <ayon-launcher-installation-location>
ayon
```
</TabItem>
</Tabs>
:::

</TabItem>

<TabItem value='staging'>

To run in <span style={{color:'#1c2026', backgroundColor:'#ff858b', borderRadius: '4px', padding: '2px 4px'}}>Staging</span> mode, pass the `--use-staging` argument to the AYON executable.

:::info example
<Tabs
    defaultValue='win'
    values={[
        {label: 'Windows', value: 'win'},
        {label: 'Linux & MacOS', value: 'linuxmac'},
    ]}>

<TabItem value='win'>

```bash
cd <ayon-launcher-installation-location>
./ayon_console.exe --use-staging
```
Or 
```bash
cd <ayon-launcher-installation-location>
./ayon.exe --use-staging
```

</TabItem>

<TabItem value='linuxmac'>

```bash
cd <ayon-launcher-installation-location>
ayon --use-staging
```
</TabItem>
</Tabs>
:::

</TabItem>

<TabItem value='dev'>

To run AYON Launcher in <span style={{color:'#1c2026',backgroundColor:'#e2e2e3', borderRadius: '4px', padding: '2px 4px'}}>Development</span> mode, pass the `--use-dev` argument to the executable.

:::info example
<Tabs
    defaultValue='win'
    values={[
        {label: 'Windows', value: 'win'},
        {label: 'Linux & MacOS', value: 'linuxmac'},
    ]}>

<TabItem value='win'>

```bash
cd <ayon-launcher-installation-location>
./ayon_console.exe --use-dev
```
Or 
```bash
cd <ayon-launcher-installation-location>
./ayon.exe --use-dev
```

</TabItem>

<TabItem value='linuxmac'>

```bash
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

<table>
    <thead>
        <tr>
            <th>Argument</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>init-ayon-launcher</code></td>
            <td>Initializes the launcher by registering the executable path to known AYON launcher locations and installing a shim executable.</td>
        </tr>
        <tr>
            <td><code>--bundle &lt;BUNDLE NAME&gt;</code></td>
            <td>Forces AYON to use a specific bundle instead of the one set in the bundle settings. This is useful for testing new bundles before release. <br/>
            See examples here: <a href="https://community.ynput.io/t/how-to-use-different-bundles-with-different-projects/1096">How to use different bundles with different projects? | Ynput Forums</a>
            </td>
        </tr>
        <tr>
            <td><code>--verbose &lt;LOG LEVEL&gt;</code></td>
            <td>Changes the logging level to one of the following: <code>DEBUG</code>, <code>INFO</code>, <code>WARNING</code>, <code>ERROR</code>, <code>CRITICAL</code>.
                <div>
                    <Admonition type="info" title="LOG Level Value">
                        <p>The LOG LEVEL value can be an integer from <code>0-50</code> or one of the enum strings: <code>"notset" (0)</code>, <code>"debug" (10)</code>, <code>"info" (20)</code>, <code>"warning" (30)</code>, <code>"error" (40)</code>, <code>"critical" (50)</code>. The value is stored in the <code>AYON_LOG_LEVEL</code> environment variable for subsequent processes.</p>
                    </Admonition>
                </div>
            </td>
        </tr>
        <tr>
            <td><code>--debug</code></td>
            <td>A simplified way to set verbose to DEBUG. Also sets the <code>AYON_DEBUG</code> environment variable to <code>1</code>.</td>
        </tr>
        <tr>
            <td><code>--skip-headers</code></td>
            <td>Skips headers in the console output.</td>
        </tr>
        <tr>
            <td><code>--use-dev</code></td>
            <td>Uses the dev bundle and settings if a bundle is not explicitly defined.</td>
        </tr>
        <tr>
            <td><code>--use-staging</code></td>
            <td>Uses staging settings and the staging bundle if a bundle is not explicitly defined. Cannot be combined with staging.</td>
        </tr>
        <tr>
            <td><code>--headless</code></td>
            <td>Runs AYON in headless mode, with no UIs shown during bootstrap. Affects the <code>AYON_HEADLESS_MODE</code> environment variable. Custom logic must handle headless mode independently.</td>
        </tr>
        <tr>
            <td><code>--ayon-login</code></td>
            <td>Displays the login dialog on startup.</td>
        </tr>
        <tr>
            <td><code>--skip-bootstrap</code></td>
            <td>Skips the bootstrap process, used for internal distribution logic.</td>
        </tr>
    </tbody>
</table>

## Launcher CLI Interface

:::info Windows
To access the following commands on Windows, use `./ayon_console.exe`.
:::

:::tip
Use `--help` to get information about the available commands.
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
            <td>Displays a Qt dialog to select a context and save it to an output JSON file. Options can be specified to preselect parts of the context.
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
                            <td>Define project context.</td>
                        </tr>
                        <tr>
                            <td><code>--folder &lt;TEXT&gt;</code></td>
                            <td>Define folder in project (project must be set).</td>
                        </tr>
                        <tr>
                            <td><code>--strict</code></td>
                            <td>Full context must be set; otherwise, the dialog can't be closed.</td>
                        </tr>
                    </tbody>
                </table>
                <img src={selectcontextWindow}/>
                <details><summary>Example Output</summary>
                    <pre>
                        &#123; <br/>
                        &ensp;&ensp;"project": "demo_Commercial", <br/>
                        &ensp;&ensp;"project_name": "demo_Commercial", <br/>
                        &ensp;&ensp;"asset": "00_traioloiaks_youctietch", <br/>
                        &ensp;&ensp;"folder_id": "1d48b384ea3111ef87200242ac120004", <br/>
                        &ensp;&ensp;"folder_path": "/assets/characters/00_traioloiaks_youctietch", <br/>
                        &ensp;&ensp;"task": "modeling", <br/>
                        &ensp;&ensp;"task_name": "modeling", <br/>
                        &ensp;&ensp;"task_id": "1d4c39aaea3111ef87200242ac120004", <br/>
                        &ensp;&ensp;"initial_context_valid": true <br/>
                        &#125;
                    </pre>
                </details>
            </td>
        </tr>
        <tr>
            <td><code>interactive</code></td>
            <td>Interactive (Python-like) console.
                <img src={consoleInteractive}/>
            </td>
        </tr>
        <tr>
            <td><code>publish [OPTIONS] &lt;JSON_PATH&gt;</code></td>
            <td>Start CLI publishing using the provided JSON file. This process is similar to AYON publish job on Deadline.
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
                            <td>Specify targets.</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td><code>publish-report-viewer</code></td>
            <td>Launch the <a href="ayon_launcher_artist_basic#publish-report-viewer">Publish Report Viewer</a>.</td>
        </tr>
        <tr>
            <td><code>run &lt;SCRIPT_PATH&gt;</code></td>
            <td>Run a Python script in the AYON context. Additional arguments are passed to the script.
            <pre>ayon run --script /foo/bar/baz.py arg1 arg2</pre>
                <div>
                    <Admonition type="caution" title="Deprecated">
                        <p>AYON launcher now supports running scripts directly, making this command deprecated.</p>
                        <pre>ayon /foo/bar/baz.py arg1 arg2</pre>
                    </Admonition>
                </div>
            </td>
        </tr>
        <tr>
            <td><code>tray</code></td>
            <td>Launch the AYON tray. The default action of the AYON command is to launch the tray widget to control basic aspects of AYON.
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
                            <td>Force start the tray and close any existing instance.</td>
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

```bash
cd <ayon-launcher-installation-location>
./ayon_console.exe contextselection "E:/selected_context.json"
```
</TabItem>

<TabItem value='linuxmac'>

```bash
cd <ayon-launcher-installation-location>
ayon contextselection "/mnt/share/selected_context.json"
```
</TabItem>
</Tabs>

:::

### Addons
These commands are added by other addons. 

`addon <addon-name>` is the main command to acess the addons commands.


| Argument | Description |
|--|--|
| `addon applications` | Applications addon commands |
| `addon traypublisher` | TrayPublisher related commands. More Info [Tray Publisher CLI Interface](addon_traypublisher_artist_advanced.md) |


#### Applications Addon Commands

`addon applications <command> [OPTIONS]` is the main command to acess the addons commands.

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
            <td>Extract environment variables for context into a JSON file. Context options must be passed; otherwise, only AYON's global environments will be extracted.
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
                            <td>Folder path</td>
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
                            <td>Task ID  [required]</td>
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

```bash
cd <ayon-launcher-installation-location>
./ayon_console.exe addon applications launch --app houdini/20-5 --project Experiments --folder /shots/shot_01 --task fx
```
</TabItem>

<TabItem value='linuxmac'>

```bash
cd <ayon-launcher-installation-location>
ayon addon applications launch --app houdini/20-5 --project Experiments --folder /shots/shot_01 --task fx
```
</TabItem>
</Tabs>

:::