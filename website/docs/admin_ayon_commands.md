---
id: admin_ayon_commands
title: AYON Commands Reference
sidebar_label: AYON Commands
---

:::info
You can substitute `ayon` with `poetry run python ayon_start.py` if you want to run it directly from sources.
:::

:::note
Running AYON without any commands will default to `tray`.
:::

## Common Arguments

`--headless` - to run AYON in headless mode (without using graphical UI).

`--use-staging` - to use staging versions of AYON.

`--verbose` `<level>` - change the log verbose level of AYON loggers.

`--debug` - set the debug flag, which affects logging.

For more information, [see here](admin_use.md#run-ayon).

## Commands

| Command | Description | Arguments |
| --- | --- | --- |
| contextselection | Open Context selection dialog. | [📑](#contextselection-arguments) |
| module | Run command line arguments of addons/modules. | |
| tray | Launch AYON Tray. | [📑](#tray-arguments) |
| publish | AYON takes JSON from the provided path and uses it to publish data in it. | [📑](#publish-arguments) |
| extractenvironments | Extract environment variables for the entered context to a JSON file. | [📑](#extractenvironments-arguments) |
| run | Execute the given Python script within AYON environment. | [📑](#run-arguments) |
| interactive | Start Python-like interactive console session. | |

---

### `tray` Arguments {#tray-arguments}

```shell
ayon tray
```

---

### `contextselection` Arguments {#contextselection-arguments}
| Argument | Description |
| --- | --- |
| `output_json_path` | Path to a JSON file where the output will be stored. |
| `--project` | Pre-define project context. The project cannot be changed when passed. |
| `--asset` | Pre-define asset in the project. The project must be passed. |
| `--strict` | The full context must be set, or the dialog cannot be confirmed. |

**Example output:**
```json
{
    "project": "OP01_CG_Demo",
    "asset": "robot",
    "task": "modeling"
}
```

```shell
ayon contextselection <PATH_TO_JSON> 
```

---

### `publish` Arguments {#publish-arguments}

Run publishing based on metadata passed in the JSON file, for example, on a farm.

| Argument | Description |
| --- | --- |
| `--targets` | Define publishing targets (e.g., "farm"). |
| `--gui` (`-g`) | Show publishing. |
| Positional argument | Path to metadata JSON file. |

```shell
ayon publish <PATH_TO_JSON> --targes farm
```

---

### `extractenvironments` Arguments {#extractenvironments-arguments}

The entered output filepath will be created if it does not exist. 
All context options must be passed; otherwise, only AYON's global environments will be extracted.
Context options are `project`, `asset`, `task`, `app`.

| Argument | Description |
| --- | --- |
| `output_json_path` | Absolute path to the exported JSON file. |
| `--project` | Project name. |
| `--asset` | Asset name. |
| `--task` | Task name. |
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
