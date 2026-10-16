---
title: Royal Render addon
sidebar_label: Overview
description: "The AYON integration for the Royal Render farm manager: the job creation and submission plugins, the RR_ROOT files it ships, and its requirements."
addon: royalrender
addon_repo: ayon-royalrender
addon_version: 0.4.1
addon_scope: pipeline
addon_flags: []
verified: 2026-10-15
sources:
  - https://github.com/ynput/ayon-royalrender/tree/0.4.1
  - https://github.com/ynput/ayon-royalrender/releases
  - https://help.ayon.app/en/articles/6879829-configure-royal-render-addon
---

# Royal Render addon

<AddonInfo />

The Royal Render addon connects AYON to the Royal Render (RR) render farm manager. For instances that are set to render on the farm, it creates render and publish jobs, writes an RR submission file and sends it to the RR server. It also ships the job configuration and scripts that are copied into the studio's `RR_ROOT`. Its settings are described on the [settings page](settings.md).

## Requirements

| Requirement | Version |
|---|---|
| AYON core addon | Newer than 1.6.4 |
| Applications addon | 1.0.0 or newer |
| Royal Render | A studio installation whose `RR_ROOT` contains the files of the addon's `rr_root` folder |
| AYON launcher | Installed on the render nodes, with `AYON_EXECUTABLE`, `AYON_SERVER_URL` and `AYON_API_KEY` set in their environment |

The addon has no AYON services.

## What it connects

| Part | Role |
|---|---|
| Royal Render server | Jobs are submitted through the RR root path, which is chosen per operating system in the settings. |
| `RR_ROOT` overlay | The folder `client/ayon_royalrender/rr_root`, copied into `RR_ROOT`. It adds the AYON render application configs, install paths and scripts. |
| AYON launcher | Started on the render nodes to run the publish command. |

## What it submits

| Job | Created by | Content |
|---|---|---|
| Maya render job | `CreateMayaRoyalRenderJob` ("Create Maya Render job in RR") | Renders `renderlayer` instances. |
| Maya cache job | `CreateMayaCacheRoyalRenderJob` ("Create Maya Cache job in RR") | Exports `pointcache` instances on the farm. Added in 0.4.0. |
| Nuke render job | `CreateNukeRoyalRenderJob` ("Create Nuke Render job in RR") | Renders `render` and `prerender` instances. Optional. |
| Publish job | `CreatePublishRoyalRenderJob` ("Create publish job in RR") | Waits for the render jobs, then publishes the rendered files using a JSON metadata file. |

The submit plugin gives each job an ID and makes each job wait for the previous one.

## Publish plugins

| Plugin | What it does |
|---|---|
| RoyalRender Farm Environment Variables | Passes `AYON_APP_NAME` and `PYBLISHPLUGINPATH` to the jobs, and `AYON_USE_STAGING` when the launcher runs in staging mode. |
| Collect Royal Render path name from the Instance | For `render`, `prerender`, `renderlayer` and `pointcache` instances, sets the RR root: the first selected RR path that exists on this machine. |
| Create Maya Render job in RR, Create Maya Cache job in RR, Create Nuke Render job in RR | Create the render jobs listed above. |
| Create publish job in RR | Creates the publish job for `fusion`, `maya`, `nuke`, `celaction`, `aftereffects` and `harmony` instances. |
| Submit jobs to RoyalRender | Collects all jobs of the publish session, writes the submission XML and submits it. Fails when no RR root is known. |
| Collect Rendered Frames | Collects file sequences from the job folder or from the metadata JSON files named in `AYON_PUBLISH_DATA`, and can generate reviews. Runs for the `rr_control` publish target. |

### Job attributes in the Publisher

The render job plugins give the artist these options.

| Attribute | Default | Description |
|---|---|---|
| Priority | 50 | Job priority. |
| Frames Per Task | 1 | Chunk size, 1 to 1000. |
| Concurrency | 1 | Concurrent tasks, 1 to 10. |
| Use GPU | On | Use the GPU for rendering. |
| Suspend publish | Off | Create the publish job suspended. |
| Use published workfile | On | Render the published workfile. |
| Cleanup temp renderfolder | On | Delete the temporary render folder afterwards. |

## Files for RR_ROOT

| Item | Purpose |
|---|---|
| `E05__Ayon__GenericJob.cfg` | Render application `Ayon` of type Generic. Runs the launcher with the job's environment but without the publish arguments. |
| `E05__Ayon__PublishJob.cfg` | Render application `Ayon` of type Execute. Runs `publish` headless with the targets `royalrender` and `farm`. |
| `E02__AYON_RemotePublish__global__inhouse.cfg` | In-house job for remote publishing from Maya. |
| `Ayon.cfg` | Default install paths of the launcher executable (`ayon_console` on Windows and Linux, `ayon` on macOS). |
| `ayon_inject_envvar.py` | Builds an environment file for a job from its metadata, because RR's environment list is limited to 2000 characters. |
| `ayon_remote_publish.py` | Opens a Maya scene in standalone mode and publishes it. |

## Settings areas

| Area | What it covers |
|---|---|
| Enable addon | Turns the addon on or off. |
| Royal Render Root Paths | Named RR root folders, one path per operating system. |
| Selected Royal Render Paths | The names of the root paths a project uses. |
| Publish plugins | Review generation from collected sequences. |

## Related

- [Royal Render addon settings](settings.md)
