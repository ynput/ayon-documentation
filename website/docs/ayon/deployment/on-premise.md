---
title: On-premise deployment
sidebar_label: On-premise
description: "Running the AYON server on the studio's own machines with Docker: what it consists of, the machine it needs, configuration options, provisioning, directories, updating, backups, migration and monitoring."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/2293963-ayon-server-local-deployment
  - https://help.ayon.app/en/help/articles/4287499-ayon-docker-configuration-options
  - https://help.ayon.app/en/help/articles/4089565-ayon-server-provisioning
  - https://help.ayon.app/en/help/articles/3808641-how-to-update-your-ayon-server
  - https://community.ynput.io/t/recommended-self-hosted-server-specifications/1098
  - https://help.ayon.app/en/help/collections/0729005-self-hosting
  - https://github.com/ynput/ayon-docker
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/config/ayonconfig.py
---

# On-premise deployment

An on-premise deployment, also called self hosting, runs the AYON server on infrastructure the studio manages: its own hardware or a virtual machine, in the studio or at a cloud provider. The supported way is the [ayon-docker](https://github.com/ynput/ayon-docker) repository: a Docker Compose file that starts the server together with its database and cache. The studio updates, backs up and monitors the server. Addons that run services also need an [AYON Service Host](ash.md).

The alternative is AYON Cloud, where Ynput runs the server. It updates automatically and includes one preconfigured AYON Service Host. See [Ynput Cloud hosting](cloud.md). Both run the same AYON, and the [setup options](../setups.md) page compares them next to the other setup choices.

## What a self-hosted server consists of

The Compose file starts three containers:

| Container | Image | Role |
|---|---|---|
| `server` | `ynput/ayon`, tag set by `AYON_STACK_SERVER_TAG` (default `latest`) | The AYON backend, which serves the REST and GraphQL APIs, and the web app. Listens on port 5000 inside the container. |
| `postgres` | `postgres`, tag set by `AYON_STACK_POSTGRES_TAG` (default `17`) | The database that holds projects, entities, settings, users and events. |
| `redis` | `redis:alpine` | Cache and message channel for the server. |

An optional fourth container, the [AYON Service Host](ash.md), runs addon services. It is not part of the default Compose file.

| Volume | Holds |
|---|---|
| `db` (Docker volume) | The Postgres data. |
| `./addons` | The installed addons, as `addons/<addon name>/<addon version>/`. |
| `./storage` | Files the server stores itself: launcher installers, dependency packages, avatars, thumbnails, reviewables and comment attachments. |

The server image contains the built web app, so no separate web server is needed. The published products and workfiles of a project are not stored here; they live on the studio's storage and are reached through the project's roots.

## Host machine

| Use | vCPU | RAM | Storage |
|---|---|---|---|
| Starting point for a studio | 4 | 16 GB | 100 GB or more, scalable |
| Basic testing with one or two users | 1 | 2 GB | up to 50 GB |

The storage needed depends on the number and size of the projects. Docker only uses the resources the server needs, so the resource use of a running instance can be read from Docker's runtime metrics and the machine adjusted.

| Operating system | Notes |
|---|---|
| Linux | Recommended for production. |
| Windows | For evaluation. Uses Docker Desktop with WSL. The line `- "/etc/localtime:/etc/localtime:ro"` in `docker-compose.yml` has to be commented out. |
| macOS | Port 5000 is often taken by the AirPlay Receiver. Either set `AYON_STACK_SERVER_PORT=5001` or turn the AirPlay Receiver off in the system settings. |

## Default deployment

```bash
git clone https://github.com/ynput/ayon-docker.git
cd ayon-docker
docker compose up -d --build
```

The server then answers on `http://localhost:5000/`. The first visit asks for an admin user and offers to bootstrap the server, which installs the latest pipeline release. A studio that uses AYON only as a production tracker can skip the bootstrap. Docker, Git and, on Linux and macOS, Make are the tools the repository expects. On a system with the standalone `docker-compose` command, `docker-compose` replaces `docker compose`.

## Configuration

Configuration is set with environment variables. The recommended place is a `.env` file in the `ayon-docker` directory. The other way is an `environment` section under `server` in `docker-compose.yml`. After a change, the containers are rebuilt with `docker compose up -d --build`.

The `AYON_STACK_*` variables only work in the `.env` file, because the Compose file reads them:

| Variable | Default | Description |
|---|---|---|
| `AYON_STACK_SERVER_TAG` | `latest` | Version of the server image. `latest` is the most recent release and `dev` the version in active development. All tags are on [Docker Hub](https://hub.docker.com/r/ynput/ayon/tags). |
| `AYON_STACK_SERVER_PORT` | `5000` | Port the server is published on. |
| `AYON_STACK_POSTGRES_TAG` | `17` | Version of the Postgres image. |

The server itself reads variables with the `AYON_` prefix. The name of each is the upper-cased setting name of `ayonconfig.py` in the backend repository, which has the full list. The main ones:

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
| `AYON_LOG_RETENTION_DAYS` | `7` | Days the logs are kept in the event log. |
| `AYON_EVENT_RETENTION_DAYS` | none | Days events are kept. Empty keeps them. |
| `AYON_USE_GIT_SUFFIX_FOR_ADDONS` | `True` | Adds `+git` to the version of an addon directory that contains a `.git` folder. |
| `AYON_DEFAULT_PROJECT_STORAGE_TYPE` | `local` | Where the server stores project files such as thumbnails: `local` or `s3`. |
| `AYON_DEFAULT_PROJECT_STORAGE_ROOT` | `/storage/server/projects` | Directory of project files for the `local` type. |
| `AYON_OFFLINE_MODE` | `False` | Stops the server from reaching external services. |
| `AYON_RUN_MAINTENANCE` | `True` | Runs the maintenance procedure in the background. It is set to `false` when the server is scaled to several instances. |

### Email

Servers with an active Ynput Cloud subscription send email through Ynput servers, without configuration. A self-hosted server needs an SMTP server for emails such as password recovery:

| Variable | Description |
|---|---|
| `AYON_EMAIL_FROM` | Sender address. Default `noreply@ynput.cloud`. |
| `AYON_EMAIL_SMTP_HOST`, `AYON_EMAIL_SMTP_PORT` | SMTP host and port. |
| `AYON_EMAIL_SMTP_TLS` | Use SSL for the connection. Default `False`. |
| `AYON_EMAIL_SMTP_USER`, `AYON_EMAIL_SMTP_PASS` | SMTP credentials. |

## Directories

### `addons`

Installed addons follow `addons/<addon name>/<addon version>/`. Removing an addon from the directory is enough. Adding one requires the contents of the addon's release `.zip` package, not the repository, in a folder named after the version. An addon under development is a clone of its repository in a version folder such as `dev`; it then appears in bundles with the suffix `+git`. The server-side code of such an addon is live once the server restarts. Its pipeline part needs its path set in a development bundle. Because the server reads addons live, a change of the version string in `package.py` makes the old version disappear from the bundles that used it. The settings of the old version stay stored and can be copied to the new version.

### `storage`

```text
storage/
  ├── desktop
  │     ├── dependency_packages
  │     └── installers
  ├── server
  │     ├── avatars
  │     └── projects
  └── static
```

The server manages this directory. Old launcher installers and dependency packages can be deleted from `desktop`. Files in `server` are only copied, for backup and restore. Everything else goes through the web app or the API.

## Managing the server

The `ayon-docker` repository has helper commands: `make <target>` on Linux and macOS, `./manage.ps1 <target>` on Windows. On Windows the execution policy may need to be `RemoteSigned`.

| Target | What it does |
|---|---|
| `setup` | Applies `settings/template.json`: server settings, and users such as a service account with a fixed API key. |
| `dbshell` | Opens a Postgres shell (`docker compose exec postgres psql -U ayon`). |
| `reload` | Reloads the running server. |
| `demo` | Creates the demo projects of the `demo` directory: `demo_Commercial`, `demo_Big_Episodic` and `demo_Big_Feature`. They hold fake data for evaluation. |
| `dump projectname=<name>` | Writes the database of a project to `dump.<name>.sql`. |
| `restore projectname=<name>` | Restores a project from `dump.<name>.sql`. |
| `update` | Pulls the server image and rebuilds the `server` container. |

Since server version 1.11.0 the image also contains command-line tools, run as `docker compose exec server ay --help`.

The example API key in `settings/template.json` is not secret. A server reachable from the internet needs its own key, set in the file or created as a service user on the Users page.

Logs are shown on the Events page of the web app (shortcut `e+e`) and in the terminal:

```bash
docker compose logs -t -n 1000 server
```

## Updating

A self-hosted server is updated from the `ayon-docker` directory, after a backup:

```bash
git pull origin main
docker compose pull
docker compose up -d --build
```

## Backup and restore

A server is backed up with a database dump and a copy of the files it holds. A project is backed up the same way, for the project only.

| Scope | Back up | Restore |
|---|---|---|
| One project | `make dump projectname=<name>` (Windows: `./manage.ps1 dump projectname=<name>`) writes `dump.<name>.sql`. `storage/server/projects/<name>` is copied. | `make restore projectname=<name>` applies the dump, and the project folder is copied back. |
| Whole server | `docker compose exec postgres pg_dump -U ayon > <file>.sql`. The `storage/` and `addons/` directories are copied. | The two directories are copied back, then `docker compose exec -T postgres psql -U ayon ayon < <file>.sql` and `docker compose up -d --build`. |

A project dump contains the project's settings overrides. The published files and workfiles of a project are on the studio storage and are backed up with it.

Settings alone cannot be backed up with a dedicated tool. They can be read through the REST API: the list of addons and versions (`get all settings`), the studio overrides of each addon (`get_raw_addon_studio_overrides`) and the project overrides of each addon and project (`get_raw_addon_project_overrides`), or the equivalent functions of the AYON Python API. Saving and versioning the result is up to the studio.

## Moving projects between servers

A project moves to another AYON server by restoring a project backup or a full server backup there. For a server hosted on Ynput Cloud, the migration is done by AYON support.

## Monitoring

`docker stats` shows the CPU, memory, network and disk use of the three containers. It is the way to see how much a running server uses and whether the machine needs to change. The release information of a running server is in the `RELEASE` file of the server image:

```bash
docker compose exec server cat RELEASE
```

## Direct database access

The `dbshell` target opens a Postgres shell. A graphical client such as pgAdmin needs the Postgres port published: the `postgres` service in `docker-compose.yml` gets `ports: - 5432:5432`, and the containers are rebuilt. The user name and the password are both `ayon`, and the database is `ayon`. Direct access can change or remove any data, so it is meant for reading.

## Related

- [AYON Service Host](ash.md)
- [Setup options](../setups.md)
- [Ynput Cloud hosting](cloud.md)
- [Bundles and addons](https://help.ayon.app/en/help/articles/4644998-bundles-and-addons) in the help center, for installing addons and dependency packages in the web app
