---
title: AYON MCP server addon
sidebar_label: AYON MCP server
description: "The AYON MCP server addon (mcp): the tools it exposes to AI assistants through the Model Context Protocol, its guardrails, transports, authentication and service."
addon: mcp
addon_repo: ayon-mcp
addon_version: 0.1.0
addon_scope: server
addon_flags: [alpha]
verified: 2026-10-19
sources:
  - https://github.com/ynput/ayon-mcp/tree/v0.1.0
  - https://github.com/ynput/ayon-mcp/releases/tag/v0.1.0
---

# AYON MCP server addon

<AddonInfo />

:::danger Experimental
This addon is experimental (alpha) and is **not recommended for production use**.

- An AI assistant can call the wrong tool, or call the right tool with wrong arguments.
- Write tools go through the AYON operations endpoint with the real permissions of the user the assistant acts as. A mistake can change or delete production data.
- Use a restricted API key (or a user with a read-only access group) and prefer a non-production AYON server until the behavior is validated for your workflow.
- The guardrails described on this page are defense in depth. They are not a substitute for these precautions.
:::

The AYON MCP server addon (addon name `mcp`) exposes an AYON server to AI assistants through the [Model Context Protocol](https://modelcontextprotocol.io) (MCP). An assistant such as Claude can browse projects, folder hierarchies, tasks, products, versions, representations, events and addon settings, and, when allowed, change them. The addon is a server feature that sits between categories: it serves data of the whole AYON server, production tracking and pipeline alike. It has two parts: a server addon that publishes the MCP endpoint on the AYON server, and a service (`mcp`, a Docker image) that implements the MCP tools and answers the endpoint. The addon has no settings.

## Requirements

| Requirement | Value |
|---|---|
| Addon type | Server addon with one service, no launcher client code |
| Service | `mcp`, image `ynput/ayon-mcp:<addon version>` |
| Service runtime | Python 3.13 or newer (the Docker image uses Python 3.13) |
| Required or compatible addons | None |
| AYON server version | Not restricted by the package. The stable `/api/mcp` URL needs a server that provides a redirect for it (see [Endpoint](#endpoint)) |
| Service user | The API key of the service must belong to an AYON service user (tunnel mode) |
| Redis | The server addon routes tunnel traffic between server workers through Redis |

## Architecture

| Part | What it does |
|---|---|
| Server addon | Publishes the MCP endpoint `/api/addons/mcp/<version>/mcp` and a WebSocket `/api/addons/mcp/<version>/ws` on the AYON server. It authenticates every MCP request as a normal AYON request and forwards it to the service. |
| Service `mcp` | Implements the MCP tools, applies the guardrails and calls the AYON API on behalf of the caller. |

## Transports

The service can reach assistants in three ways.

| Transport | How it runs | Authentication |
|---|---|---|
| Tunnel (default for a service run by the AYON Service Host) | The service connects out to the WebSocket of the addon and opens no port. Assistants use the URL of the AYON server. | The AYON server authenticates the caller (`x-api-key` or `Authorization` header). The service calls AYON with its own service key and `x-as-user: <caller>`, so the permissions of the caller apply. |
| HTTP (streamable HTTP) | The service listens on port `8088` (`AYON_MCP_PORT`) at `/mcp`. Used for a standalone container or a service with `AYON_MCP_TRANSPORT=http`. | Each request must carry an `x-api-key` header. The key is validated against the AYON server and the call acts as the user of that key. |
| Local (stdio) | The assistant starts the service as a local process (`python -m ayon_mcp.cli`, or the `scripts/start_local` scripts of the repository). | One API key from `AYON_API_KEY` or `--api-key`, used for all calls. |

The transport of a containerized service is chosen by `AYON_MCP_TRANSPORT` (`http` or `tunnel`). When it is not set, a service run by the AYON Service Host (which sets `AYON_ADDON_NAME` and `AYON_SERVICE_NAME`) uses `tunnel` and anything else uses `http`. The package also sets `AYON_MCP_TRANSPORT=tunnel` for the service.

### Tunnel mode

- The tunnel forwards plain HTTP and streams responses back chunk by chunk, so server-sent events are not buffered. Responses are flow controlled per request.
- Only a service user can open the tunnel. A service with a non-service or wrong API key is rejected and retries about every 30 seconds.
- The service and the addon check a tunnel protocol version (currently 3) when connecting. The service must be of the same version as the addon.
- The credentials of the caller (`Authorization`, `Cookie`, `x-api-key`, a `token` query parameter) are not forwarded to the service. The service receives only the authenticated user name in the `x-ayon-mcp-user` header, and a client-sent copy of that header is dropped.
- The MCP application runs stateless, so several service replicas can connect at once. A request is handled by a server worker holding a tunnel, or routed through Redis to the worker that holds one.
- Each addon version has its own tunnels. A service resolves its tunnel URL from `AYON_MCP_TUNNEL_URL`, then from `AYON_ADDON_NAME` and `AYON_ADDON_VERSION`, then from the `mcp` addon version in the production bundle.
- While no service is connected, the endpoint answers with HTTP 503.

### Endpoint

| URL | Meaning |
|---|---|
| `https://<ayon-server>/api/addons/mcp/<version>/mcp` | The MCP endpoint of one addon version (`GET`, `POST` and `DELETE`). |
| `https://<ayon-server>/api/mcp` | A stable URL that the repository describes as a redirect (HTTP 307) to the endpoint of the addon version in the production bundle. The redirect belongs to the AYON server, not to this addon, and was not verified. On servers without it, use the versioned URL. |

## Tools

Each tool either only reads or changes data through the AYON API.

### Projects

| Tool | Access | What it does |
|---|---|---|
| `list_projects` | Read | Lists projects with name, code and flags, optionally including inactive projects. |
| `get_project` | Read | Returns the full detail of one project: attributes, statuses, tags, folder types and task types. |
| `get_server_info` | Read | Returns the server URL and version and the identity of the connected user (name, admin and service flags). |

### Entities, read

The `list_*` tools return a page of items with `count` and a `truncated` flag. `limit` defaults to 50 and is capped at 500. The `include_attrib` option adds the attributes of the entities.

| Tool | Access | What it does |
|---|---|---|
| `get_folder_hierarchy` | Read | Returns the nested folder tree of a project (id, name, folder type, status, task names), optionally filtered by a search string and folder types. |
| `list_folders` | Read | Lists and filters folders, for example by path regex, folder type or parent. |
| `list_tasks` | Read | Lists and filters the tasks of a project. |
| `list_products` | Read | Lists and filters products. |
| `list_versions` | Read | Lists the versions of a project or of one product. |
| `list_representations` | Read | Lists the representations of a project or of one version. |
| `get_entity` | Read | Returns one folder, task, product, version or representation with all attributes and data. |
| `query_graphql` | Read | Runs a raw GraphQL query against the AYON server, for what the dedicated tools do not express. |

### Entities, write

These tools use the AYON operations endpoint, so server-side validation, permissions and events apply. The writable entity types are `folder`, `task`, `product` and `version`.

| Tool | Access | What it does |
|---|---|---|
| `create_entity` | Write | Creates a folder, task, product or version from a data dictionary. |
| `update_entity` | Write | Updates fields of an entity. Attribute updates are merged, other fields are replaced. `{"active": false}` archives the entity. |
| `delete_entity` | Destructive | Permanently deletes an entity. The server refuses entities that still have children. |
| `add_comment` | Write | Posts a Markdown comment on the activity feed of an entity. |

### Events

| Tool | Access | What it does |
|---|---|---|
| `list_events` | Read | Lists events, newest first, filtered by topic, project, status, user and time range. |
| `get_event` | Read | Returns one event with summary and payload. |
| `dispatch_event` | Write | Creates an event on the AYON event stream, finished or pending. A pending event can be picked up by another service. |

### Addons and settings

| Tool | Access | What it does |
|---|---|---|
| `list_addons` | Read | Lists installed addons with their versions. |
| `list_bundles` | Read | Lists bundles with their production, staging and dev flags and addon versions. |
| `get_addon_settings` | Read | Returns the resolved settings of an addon version, at studio or project level, for the `production` or `staging` variant. |
| `set_addon_settings` | Write | Saves settings overrides of an addon version. The given object replaces all existing overrides at that level. |

### Generated REST tools

The service also builds one tool per operation of the AYON REST API from the OpenAPI specification of the server (`/openapi.json`). At start the service fetches the specification and regenerates the tools when it differs from the copy bundled with the addon (214 paths, from an AYON server 1.17.0-dev). The tools are classified by HTTP method: `GET`, `HEAD` and `OPTIONS` read; `POST`, `PUT` and `PATCH` write; `DELETE` is destructive. A reviewed table overrides the method where it misleads: for example `POST /api/query` is a read and `POST /api/system/restart` is destructive. The batch operations endpoints of a project are destructive because a batch can contain deletions.

Admin and security endpoints are not registered unless `AYON_MCP_ADMIN_TOOLS` is enabled: secrets, authentication and sessions, user, API key and access management, `/api/system/`, services, onboarding, and uploads of addons, installers and dependency packages. Reads of these endpoints are hidden too.

## Tool surface

| Mode | `AYON_MCP_TOOL_EXPOSURE` | What the assistant sees |
|---|---|---|
| Discovery (default) | unset, or any value other than `direct` | Five tools: `list_ayon_tools`, `search_ayon_tools`, `get_ayon_tool_schema`, `get_ayon_tool_schemas` and `call_ayon_tool`. The assistant finds a tool, reads its schema and runs it with `call_ayon_tool`. This keeps the initial schema small. |
| Direct | `direct` | Every tool is registered as an MCP tool. The guard chain and the `confirm_mutation` check of discovery mode do not apply. Read-only mode still does. |

In discovery mode, a tool that changes data runs only when `call_ayon_tool` receives `confirm_mutation=true` (a top-level argument, next to `tool_name` and `arguments`). The server instructions tell the assistant to set it only after the user explicitly authorized the change. The assistant sets the flag, so it is a prompt to the model and not an authorization by the user.

## Guardrails

The guard chain applies to calls made through discovery mode. It is built from the `chuk-tool-processor` guard package.

| Guard | What it does |
|---|---|
| Schema | Checks the arguments against the schema of the tool; unknown arguments are rejected. |
| Side effect | Blocks tools by classification (read, write, destructive) according to the active mode. |
| Sensitive data | Warns when arguments or results look like secrets. It does not block or redact, because addon settings can legitimately contain such values. |
| Output size | Checks the size of a result against a ceiling of 2,000,000 bytes. |
| Retry safety | `strict` profile only: blocks an identical call (same tool and arguments, per caller) after 3 failures. |

| Variable | Default | Meaning |
|---|---|---|
| `AYON_MCP_GUARDS` | `default` | `default`: the chain above. `strict`: also blocks destructive tools regardless of `confirm_mutation`, and adds retry safety. `off` (also `false`, `0`, `no`): no guard chain. Other truthy values mean `default`; an unknown value falls back to `default` with a warning. |
| `AYON_MCP_READ_ONLY` | `false` | When truthy, write and destructive tools are not registered at all, in both exposure modes, and a call to one is refused. This is enforced even with `AYON_MCP_GUARDS=off`. The server instructions then tell the assistant that the server is read-only. |
| `AYON_MCP_ADMIN_TOOLS` | `false` | When truthy, registers the admin and security REST tools described above. |
| `AYON_MCP_ENABLE_OPENAPI_TOOLS` | `true` | `false` (also `0`, `no`, `off`) disables all generated REST tools; only the curated tools remain. |

What the guardrails do not cover:

- The AYON permissions of the user (or of the API key) remain the real authority. Per-tool or per-project access policies are not implemented in this version.
- In direct exposure mode only read-only mode applies.
- `delete_entity` and the destructive REST tools are blocked only in `strict` mode or read-only mode.

## Service configuration

The service is configured by environment variables, set on the service on the AYON Services page. The package ignores environment values other than the image.

| Variable | Meaning |
|---|---|
| `AYON_SERVER_URL`, `AYON_API_KEY` | AYON server and key of the service. Required. In tunnel mode the key must belong to a service user. |
| `AYON_MCP_TRANSPORT` | `http` or `tunnel`, see [Transports](#transports). |
| `AYON_MCP_PORT` | Listening port in HTTP mode (default `8088`). |
| `AYON_MCP_TUNNEL_URL` | Explicit WebSocket URL of the tunnel. |
| `AYON_MCP_TOOL_EXPOSURE`, `AYON_MCP_GUARDS`, `AYON_MCP_READ_ONLY`, `AYON_MCP_ADMIN_TOOLS`, `AYON_MCP_ENABLE_OPENAPI_TOOLS` | See above. |
| `AYON_MCP_OTEL_ENABLED` | `true` exports OpenTelemetry traces, metrics and logs to the endpoints in `OTEL_EXPORTER_OTLP_ENDPOINT` and `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`. Default `false`. |

## Related

The addon has no settings, so it has no settings page.
