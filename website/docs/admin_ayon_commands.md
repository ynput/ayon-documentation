---
id: admin_ayon_commands
title: AYON Commands Reference
sidebar_label: AYON Commands
---

:::info
You can substitute `ayon_console` with `poetry run python start.py` if you want to run it
directly from sources.
:::

:::note
Running AYON without any commands will default to `tray`.
:::

## Common arguments
`--use-version` to specify explicit version to use:
```shell
ayon_console --use-version=3.0.0-foo+bar
```
`--headless` - to run AYON in headless mode (without using graphical UI)

`--use-staging` - to use staging versions of AYON.

`--list-versions` - to list available versions.

`--validate-version` - to validate integrity of given version

`--verbose` `<level>` - change log verbose level of AYON loggers

`--debug` - set debug flag affects logging

For more information [see here](admin_use.md#run-ayon).

## Commands

| Command | Description | Arguments |
| --- | --- |: --- :|
| contextselection | Open Context selection dialog. |  |
| module | Run command line arguments for modules. |  |
| repack-version | Tool to re-create version zip. | [📑](#repack-version-arguments) |
| tray | Launch AYON Tray. | [📑](#tray-arguments)
| launch | Launch application in AYON environment. | [📑](#launch-arguments) |
| publish | AYON takes JSON from provided path and use it to publish data in it. | [📑](#publish-arguments) |
| extractenvironments | Extract environment variables for entered context to a json file. | [📑](#extractenvironments-arguments) |
| run | Execute given python script within AYON environment. | [📑](#run-arguments) |
| interactive | Start python like interactive console session. | |
| projectmanager | Launch Project Manager UI | [📑](#projectmanager-arguments) |
| settings | Open Settings UI | [📑](#settings-arguments) |

---
### `tray` arguments {#tray-arguments}

```shell
ayon_console tray
```
---

### `launch` arguments {#launch-arguments}

| Argument | Description |
| --- | --- |
| `--app` | Application name - this should be the key for application from Settings. |
| `--project` | Project name (default taken from `AVALON_PROJECT` if set) |
| `--asset` | Asset name (default taken from `AVALON_ASSET` if set) |
| `--task` | Task name (default taken from `AVALON_TASK` is set) |
| `--tools` | *Optional: Additional tools to add* |
| `--user` | *Optional: User on behalf to run* |
| `--ftrack-server` / `-fs` | *Optional: Ftrack server URL* |
| `--ftrack-user` / `-fu` | *Optional: Ftrack user* |
| `--ftrack-key` / `-fk` | *Optional: Ftrack API key* |

For example to run Python interactive console in Pype context:
```shell
pype launch --app python --project my_project --asset my_asset --task my_task
```

---
### `publish` arguments {#publish-arguments}

Run publishing based on metadata passed in json file e.g. on farm.

| Argument | Description |
| --- | --- |
| `--targets` | define publishing targets (e.g. "farm") |
| `--gui` (`-g`) | Show publishing |
| Positional argument | Path to metadata json file |

```shell
ayon publish <PATH_TO_JSON> --targes farm
```

---
### `extractenvironments` arguments {#extractenvironments-arguments}

Entered output filepath will be created if does not exists.
All context options must be passed otherwise only ayon's global environments will be extracted.
Context options are `project`, `asset`, `task`, `app`

| Argument | Description |
| --- | --- |
| `output_json_path` | Absolute path to the exported json file |
| `--project` | Project name |
| `--asset` | Asset name |
| `--task` | Task name |
| `--app` | Application name |

```shell
ayon_console /home/ayon/env.json --project Foo --asset Bar --task modeling --app maya-2019
```

---
### `run` arguments {#run-arguments}

| Argument | Description |
| `--script` | run specified python script |

Note that additional arguments are passed to the script.

```shell
ayon_console run --script /foo/bar/baz.py arg1 arg2
```

---
### `projectmanager` arguments {#projectmanager-arguments}
`projectmanager` has no command-line arguments.
```shell
ayon_console projectmanager
```

---
### `settings` arguments {#settings-arguments}

| Argument | Description |
| `-d` / `--dev` | Run settings in developer mode. |

```shell
ayonconsole settings
```

---
### `repack-version` arguments {#repack-version-arguments}
Takes path to unzipped and possibly modified AYON version. Files will be
zipped, checksums recalculated and version will be determined by folder name
(and written to `version.py`).

```shell
./ayon_console repack-version /path/to/some/modified/unzipped/version/ayon-v3.8.3-modified
```
