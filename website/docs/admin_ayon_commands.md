---
id: admin_ayon_commands
title: AYON Commands Reference
sidebar_label: AYON Commands
---

:::info
You can substitute `ayon` with `poetry run python ayon_start.py` if you want to run it
directly from sources.
:::

:::note
Running AYON without any commands will default to `tray`.
:::

## Common arguments
`--headless` - to run AYON in headless mode (without using graphical UI)

`--use-staging` - to use staging versions of AYON.

`--verbose` `<level>` - change log verbose level of AYON loggers

`--debug` - set debug flag affects logging

For more information [see here](admin_use.md#run-ayon).

## Commands

| Command | Description | Arguments |
| --- | --- |: --- :|
| contextselection | Open Context selection dialog. |  |
| module | Run command line arguments for modules. |  |
| tray | Launch AYON Tray. | [📑](#tray-arguments)
| publish | AYON takes JSON from provided path and use it to publish data in it. | [📑](#publish-arguments) |
| extractenvironments | Extract environment variables for entered context to a json file. | [📑](#extractenvironments-arguments) |
| run | Execute given python script within AYON environment. | [📑](#run-arguments) |
| interactive | Start python like interactive console session. | |

---
### `tray` arguments {#tray-arguments}

```shell
ayon tray
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
ayon /home/openpype/env.json --project Foo --asset Bar --task modeling --app maya-2019
```

---
### `run` arguments {#run-arguments}

| Argument | Description |
| `--script` | run specified python script |

Note that additional arguments are passed to the script.

```shell
ayon run --script /foo/bar/baz.py arg1 arg2
```
