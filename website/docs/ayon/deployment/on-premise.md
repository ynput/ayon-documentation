---
title: On-premise deployment
sidebar_label: On-premise
description: "Running the AYON server on the studio's own machines with Docker: host machine and prerequisites, default deployment, HTTPS, updating, configuration, provisioning, directory layout, and an FAQ on backups, migration, logs, monitoring and database access."
verified: 2026-11-05
sources:
  - https://help.ayon.app/en/help/articles/2293963-ayon-server-local-deployment
  - https://help.ayon.app/en/help/articles/4287499-ayon-docker-configuration-options
  - https://help.ayon.app/en/help/articles/4089565-ayon-server-provisioning
  - https://help.ayon.app/en/help/articles/3808641-how-to-update-your-ayon-server
  - https://community.ynput.io/t/recommended-self-hosted-server-specifications/1098
  - https://help.ayon.app/en/help/collections/0729005-self-hosting
  - https://github.com/ynput/ayon-docker
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/config/ayonconfig.py
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/background/log_collector.py
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# On-premise deployment

An on-premise deployment, also called self hosting, runs the AYON server on infrastructure the studio manages: its own hardware or a virtual machine, in the studio or at a cloud provider. The official [ayon-docker](https://github.com/ynput/ayon-docker) repository provides a simple and direct way to deploy AYON. This setup can be run as it is or used as a reference for a customised setup. The studio updates, backs up and monitors the server.

A self-hosted server can be connected to an AYON subscription, see [plans](../plans.md).

:::tip AYON Service Host Deployment

An [AYON Service Host](ash.md) is needed for running addon services. It is not part of the default Compose file in the `ayon-docker` repository; its deployment options are on its own page.
:::

## Host machine specs and prerequisites

| Use | vCPU | RAM | Storage |
|---|---|---|---|
| Starting point for a studio | 4 | 16 GB | 100 GB or more, scalable |
| Basic testing with one or two users | 1 | 2 GB | up to 50 GB |

The storage needed depends on the number and size of the projects. Docker only uses the resources the server needs, so the resource use of a running instance can be read from Docker's runtime metrics and the machine adjusted.

The machine needs Docker and Git, plus Make on Linux and macOS, or PowerShell on Windows.

:::tip

The commands on this page use `docker compose`. The older standalone `docker-compose` (with a hyphen) is deprecated and can fail to update the server with recent Docker versions, so it is replaced with the `docker compose` plugin, see [Migrate to Compose V2](https://docs.docker.com/compose/releases/migrate/).
:::

:::info Host machine operating system notes

When deploying the AYON server on:
- Windows: Docker Desktop with WSL 2 is needed to run the server's Linux containers.
- macOS: Port 5000 is often taken by the AirPlay Receiver. Either set `AYON_STACK_SERVER_PORT=5001` or turn the AirPlay Receiver off in the system settings.
:::

## Default deployment

The `docker compose` command starts the `server` container along with the `postgres` and `redis` containers. The optional `setup` command then creates the admin `admin` with the password `admin`, and the service user `service` with the API key `veryinsecurapikey`. See [Helper commands](#helper-commands).

<Tabs groupId="os">
<TabItem value="windows" label="Windows" default>

```powershell
git clone https://github.com/ynput/ayon-docker.git
cd ayon-docker
docker compose up -d
./manage.ps1 setup
```

</TabItem>
<TabItem value="unix" label="Linux/Mac">

```bash
git clone https://github.com/ynput/ayon-docker.git
cd ayon-docker
docker compose up -d
make setup
```

</TabItem>
</Tabs>

The server answers on `http://localhost:5000/`. Without the `setup` command, the first visit asks to create an admin user. After the first sign-in, the [first-run setup](../web-ui/dialogs/first-run-setup.md) offers to install the latest pipeline release.

:::tip Skipping AYON server first run setup

A studio that uses AYON only as a production tracker can skip the first-run setup.
:::

:::info

### HTTPS with a reverse proxy

AYON can be served over HTTPS by placing a reverse proxy such as [Caddy](https://caddyserver.com/), [NGINX](https://nginx.org/) or [Traefik](https://traefik.io/traefik) in front of the `server` container.

Running AYON server over HTTPS unlocks features that are restricted by web browsers when serving over plain HTTP, such as clipboard copy and paste and features used by addons like AYON Review.

The `ayon-docker` repository does not provide an official HTTPS setup, as each studio can set it up in its own way. An example setup with Caddy is on the community forum: [Running a self-hosted AYON server with HTTPS](https://community.ynput.io/t/running-a-self-hosted-ayon-server-with-https/3289).
:::

## Updating

:::caution Back up before updating
The server is best backed up before an update. For the steps, see [How to back up and restore projects or the whole server](#how-to-back-up-and-restore-projects-or-the-whole-server).
:::

A self-hosted server is updated from the `ayon-docker` directory:

```bash
git pull origin main
docker compose pull
docker compose up -d
```

## Configuration

Configuration is set with environment variables, in two places:

- The `AYON_STACK_*` variables configure the Compose file itself. They go in a `.env` file in the `ayon-docker` directory, which Docker Compose reads automatically.
- The server variables (`AYON_*`) are passed to the `server` container, with an `environment` section under `server` in `docker-compose.yml`. Adding `env_file: .env` to the `server` service instead passes the whole `.env` file to the container.

After a change, `docker compose up -d` recreates the containers whose settings changed.

The `AYON_STACK_*` variables:

| Variable | Default | Description |
|---|---|---|
| `AYON_STACK_SERVER_TAG` | `latest` | Version of the server image. `latest` is the most recent release and `dev` the version in active development. All tags are on [Docker Hub](https://hub.docker.com/r/ynput/ayon/tags). |
| `AYON_STACK_SERVER_PORT` | `5000` | Port the server is published on. |
| `AYON_STACK_POSTGRES_TAG` | `17` | Version of the Postgres image. |

The server itself reads variables with the `AYON_` prefix. The name of each is the upper-cased setting name in [`ayonconfig.py`](https://github.com/ynput/ayon-backend/blob/develop/ayon_server/config/ayonconfig.py), which has the full list. The main ones:

| Variable | Default | Description |
|---|---|---|
| `AYON_HTTP_LISTEN_ADDRESS`, `AYON_HTTP_LISTEN_PORT` | `0.0.0.0`, `5000` | Address and port the API server listens on. |
| `AYON_POSTGRES_URL` | `postgres://ayon:ayon@postgres/ayon` | Postgres connection string. |
| `AYON_POSTGRES_POOL_SIZE`, `AYON_POSTGRES_POOL_TIMEOUT` | `64`, `20` | Size and timeout of the Postgres connection pool. |
| `AYON_REDIS_URL` | `redis://redis/` | Redis connection string. |
| `AYON_ADDONS_DIR` | `/addons` | Directory with the addons. |
| `AYON_AUTH_PASS_PEPPER` | `supersecretpasswordpepper` | Secret string used to salt password hashes. It should be changed for a server that is reachable from outside. |
| `AYON_AUTH_PASS_MIN_LENGTH`, `AYON_AUTH_PASS_COMPLEX` | `8`, `True` | Minimum password length and complexity requirement. |
| `AYON_SESSION_TTL` | `259200` (72 hours) | Session lifetime in seconds. |
| `AYON_MAX_FAILED_LOGIN_ATTEMPTS`, `AYON_FAILED_LOGIN_BAN_TIME` | `10`, `600` | Failed logins allowed before an IP address is banned, and the ban in seconds. |
| `AYON_MOTD`, `AYON_MOTD_PATH` | none, `/storage/motd.md` | Message shown on the login page, as text or as a file. |
| `AYON_LOG_LEVEL` | `DEBUG` | Console log level: `TRACE`, `DEBUG`, `INFO`, `WARNING`, `ERROR` or `CRITICAL`. |
| `AYON_LOG_LEVEL_DB` | `INFO` | Lowest level of the log messages stored as events and shown in the [Event Viewer](../web-ui/event-viewer.md). |
| `AYON_LOG_RETENTION_DAYS` | `7` | Days the log messages are kept in the Event Viewer. |
| `AYON_EVENT_RETENTION_DAYS` | none | Days events are kept. Empty keeps them. |
| `AYON_USE_GIT_SUFFIX_FOR_ADDONS` | `True` | Adds `+git` to the version of an addon directory that contains a `.git` folder. |
| `AYON_DEFAULT_PROJECT_STORAGE_TYPE` | `local` | Where the server stores project files such as thumbnails: `local` or `s3`. |
| `AYON_DEFAULT_PROJECT_STORAGE_ROOT` | `/storage/server/projects` | Directory of project files for the `local` type. |
| `AYON_OFFLINE_MODE` | `False` | Stops the server from reaching external services. |
| `AYON_RUN_MAINTENANCE` | `True` | Runs the maintenance procedure in the background. It is set to `false` when the server is scaled to several instances. |

### Email

Servers with an active Ynput Cloud subscription send email through Ynput servers, so no configuration is needed. A self-hosted server needs an SMTP server for emails such as password recovery:

| Variable | Description |
|---|---|
| `AYON_EMAIL_FROM` | Sender address. Default `noreply@ynput.cloud`. |
| `AYON_EMAIL_SMTP_HOST`, `AYON_EMAIL_SMTP_PORT` | SMTP host and port. |
| `AYON_EMAIL_SMTP_TLS` | Use SSL for the connection. Default `False`. |
| `AYON_EMAIL_SMTP_USER`, `AYON_EMAIL_SMTP_PASS` | SMTP credentials. |

Once SMTP is set and the server is restarted, a **Reset password** link appears on the login page. It can be used to test that emails are sent: the password only changes when the link in the email is followed.

## Provisioning

Besides the web UI, a self-hosted server can be provisioned from the `ayon-docker` directory.

### Helper commands

The `ayon-docker` repository has helper commands: `make <target>` on Linux and macOS, `./manage.ps1 <target>` on Windows. On Windows, the execution policy may need to be set with `Set-ExecutionPolicy RemoteSigned` in PowerShell.

| Target | What it does |
|---|---|
| `setup` | Applies `settings/template.json`: server settings, and users such as a service account with a fixed API key. |
| `dbshell` | Opens a Postgres shell (`docker compose exec postgres psql -U ayon`). |
| `reload` | Reloads the running server. |
| `demo` | Creates the demo projects of the `demo` directory: `demo_Commercial`, `demo_Big_Episodic` and `demo_Big_Feature`. They hold fake data for evaluation. |
| `dump projectname=<name>` | Writes the database of a project to `dump.<name>.sql`. |
| `restore projectname=<name>` | Restores a project from `dump.<name>.sql`. |
| `update` | Pulls the server image and rebuilds the `server` container. |

:::danger Default API key on a server reachable from the internet

The example API key in [`settings/template.json`](https://github.com/ynput/ayon-docker/blob/main/settings/template.json) is not secret. A server reachable from the internet needs its own key, set in the file or created as a service user on the Users page.
:::

### Command-line tools

Since AYON server `1.11.0`, the server image contains command-line tools, run as `docker compose exec server ay <tool name>`. `docker compose exec server ay --help` lists them.

## Directory layout

Two folders of the `ayon-docker` directory are mounted into the `server` container and hold its files:

| Folder | Holds |
|---|---|
| `./addons` | The installed addons, as `addons/<addon name>/<addon version>/`. See [Addons directory](#addons-directory). |
| `./storage` | Files the server stores itself, such as launcher installers, dependency packages, thumbnails and reviewables. See [Storage directory](#storage-directory). |

:::note

The `./storage` folder is not the studio storage. The published products and workfiles of a project are on the studio storage, not in this folder.
:::

### Addons directory

This is where the server keeps the installed addons, as `addons/<addon name>/<addon version>/`.

- Removing an addon version from this directory removes it from the server. Removing it on the [Addons](../web-ui/studio/addons.md) page of the web UI is safer, because the web UI does not remove a version that a bundle uses.
- Adding an addon version requires the contents of the **addon's release `.zip` package, not the repository,** in a folder named after the version.
- A clone of an addon repository in this directory is used for development, see [Developer mode](../../developer/developer-mode.md#addon-code-inside-the-server).
### Storage directory

```text
storage/
  ├── addons
  │     └── <addon name>           files uploaded to an addon, e.g. Slater templates, registered workflows
  ├── desktop
  │     ├── dependency_packages
  │     └── installers             AYON launcher installers
  ├── server
  │     ├── avatars
  │     └── projects
  │           └── <project name>
  │                 ├── thumbnails
  │                 └── uploads    reviewables, comment attachments
  └── static
```
This is where the server keeps files uploaded to addons, which every version of the addon uses, uploaded launcher installers, dependency packages, and project thumbnails and reviewables.

- The server manages this folder. Manual changes here can break the server.
- Files in `server` are only copied, for backup and restore. Everything else goes through the web app or the API.

:::note

The reviewables in `uploads` are the files the web app plays, processed by the server. They are separate from the review files the pipeline publishes to the studio storage.
:::

## FAQ

### How to back up and restore projects or the whole server?

A server is backed up with a database dump and a copy of the files it holds. A project is backed up the same way, for the project only.

| Scope | Back up | Restore |
|---|---|---|
| One project | `make dump projectname=<name>` (Windows: `./manage.ps1 dump projectname=<name>`) writes `dump.<name>.sql`. `storage/server/projects/<name>` is copied. | `make restore projectname=<name>` applies the dump, and the project folder is copied back. |
| Whole server | `docker compose exec postgres pg_dump -U ayon > <file>.sql`. The `storage/` and `addons/` directories are copied. | The two directories are copied back, then `docker compose exec -T postgres psql -U ayon ayon < <file>.sql` and `docker compose up -d`. |

A project dump contains the project's settings overrides. The published files and workfiles of a project are on the studio storage and are backed up with it.

### How to back up the settings?

There is no dedicated tool for backing up settings. They can be read through the REST API: the list of addons and versions ([`get all settings`](/api#tag/Addons/operation/get_all_settings)), the studio overrides of each addon ([`get_raw_addon_studio_overrides`](/api#tag/Addons/operation/get_raw_addon_studio_overrides)) and the project overrides of each addon and project ([`get_raw_addon_project_overrides`](/api#tag/Addons/operation/get_raw_addon_project_overrides)), or the equivalent functions of the AYON Python API. Saving and versioning the result is up to the studio.

### How to move projects between servers?

A project moves to another AYON server by restoring a project backup or a full server backup there. For a server hosted on Ynput Cloud, the migration is done by AYON support.

### How to view the server logs?

In the web app, on the [Event Viewer](../web-ui/event-viewer.md) page.

For troubleshooting, the Docker log of the `server` container has more detail, such as debug messages and API requests:

```bash
docker compose logs -t -n 1000 server
```

The levels shown in each are set by `AYON_LOG_LEVEL_DB` (Event Viewer) and `AYON_LOG_LEVEL` (Docker log), see [Configuration](#configuration).

### How to monitor the resources the server uses?

`docker stats` shows the CPU, memory, network and disk use of the three containers. It is the way to see how much a running server uses and whether the machine needs to change.

### How to see the release information of the server?

The release information of a running server is in the `RELEASE` file of the server image:

```bash
docker compose exec server cat RELEASE
```

### How to connect to the database directly?

:::caution

Direct access gives full control over the AYON database: data can be read, added and removed. A wrong change can break the production server, so direct access is best kept for reading.
:::

The `dbshell` target opens a Postgres shell. A graphical client such as pgAdmin needs the Postgres port published: the `postgres` service in `docker-compose.yml` gets `ports: - 5432:5432`, and the containers are rebuilt. The user name, password and database are the ones in `AYON_POSTGRES_URL`. A step-by-step guide for pgAdmin is on the community forum: [How to connect to AYON database via pgAdmin](https://community.ynput.io/t/how-to-connect-to-ayon-database-via-pgadmin/3288).

## Related

- [AYON Service Host](ash.md)
- [Artist workstation setup](../workstation-setup.md)
- [Ynput Cloud hosting](cloud.md)
- [Bundles and addons](https://help.ayon.app/en/help/articles/4644998-bundles-and-addons) in the help center, for installing addons and dependency packages in the web app
