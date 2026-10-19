---
title: AYON plans
description: "The AYON editions and plans, Community, Pro, Studio and Enterprise: what each includes, which features and addons are included or paid, usage limits and the cloud server specifications."
verified: 2026-10-16
sources:
  - https://ayon.app/pricing-eur
  - https://help.ayon.app/en/help/articles/6619325-getting-started-with-ayon-cloud-hosted
  - https://help.ayon.app/en/help/articles/6592804-ayon-licenses
---

# AYON plans

AYON comes in a free Community edition and in the commercial plans AYON Pro and AYON Studio. Pro and Studio can run on a self-hosted server or on a server hosted by Ynput, and both unlock features and addons that the Community edition does not have. This page lists what each plan includes. The [addons catalogue](../addons/index.md) shows the license of every addon with the same names: **Free**, **Pro** and **Studio**.

## The plans

| Plan | What it is |
|---|---|
| **Community** | Self-hosting for free, with a combination of fair-source and open-source code (license FSL-1.1-AL2). Includes the base features, all DCC integrations and the pipeline features. |
| **AYON Pro** | The production-ready plan: all power features, all DCC integrations, the API, single sign-on and optional paid addons. Self-hosted or cloud hosted. Online licensing. |
| **AYON Studio** | Everything in Pro, plus unlimited users, planning and scheduling, client reviews, workflow orchestration, all addons included, an additional developer server and high-availability cloud hosting. Online and offline licensing. |
| **Enterprise** | Role-based licensing for large studios: full access for developers, managers and producers, and artist-only access for the wider team. Arranged individually. |
| **Schools** | Educational institutions can get AYON Studio free of charge with an on-premise installation, or hosted by Ynput for a fee. |

Plans use **fixed seats**: a studio buys a number of seats and assigns, reassigns or swaps them between people. Seats limit how many people can log in as active users. Pro and Studio start at 5 active users. Pro supports up to 200 active users and Studio an unlimited number. How the seats appear in the AYON server is described on the [licenses page](web-ui/licenses.md).

An addon is either included in a plan, available as a **paid addon** on top of AYON Pro, or not part of the plan. Paid addons apply to all active users of the server. AYON Studio includes every addon.

In the tables, "Included" means the plan has the feature and "Paid addon" means it needs an addon bought on top of the plan. Features marked *planned* are announced and not available yet.

The search box and the plan filters below narrow the feature tables. Each filter reads as a sentence, for example "AYON Pro needs a paid addon" lists the features that cost extra on Pro, and a line under the filters repeats what is shown.

<TableFilter columns={["Community", "Pro", "Studio"]} placeholder="Search the features" labels={{ Community: "Community", Pro: "AYON Pro", Studio: "AYON Studio" }} optionLabels={{ Included: "includes it", "Paid addon": "needs a paid addon", No: "does not have it" }}>

## Base features

| Feature | Community | Pro | Studio |
|---|---|---|---|
| Unlimited projects | Included | Included | Included |
| API (REST, GraphQL, Python, C++) | Included | Included | Included |
| Reviewables | Included | Included | Included |
| Manage links | Included | Included | Included |
| Tasks overview | Included | Included | Included |
| Lists | Included | Included | Included |
| List attributes | No | Included | Included |
| Calculated attributes | No | Included | Included |
| Team custom attributes (planned) | No | Included | Included |
| Task and folder templates | No | Included | Included |
| SSO (SAML, LDAP, OAuth 2.0) | No | Included | Included |
| Status automation | No | Included | Included |

## Production tracking

| Feature | Community | Pro | Studio |
|---|---|---|---|
| Inbox and notifications | Included | Included | Included |
| Annotations | No | Included | Included |
| Table view grouping | No | Included | Included |
| Complex filters | No | Included | Included |
| Complex slicer | No | Included | Included |
| Custom view sharing | No | Included | Included |
| Related work panel | No | Included | Included |
| Email notifications (planned) | No | Included | Included |
| Global search (planned) | No | No | Included |
| Reporting dashboards | No | Paid addon | Included |
| Project node graph | No | Paid addon | Included |
| Planner and scheduler | No | Paid addon | Included |
| Internal review sessions | No | Paid addon | Included |
| Guest review sessions | No | Paid addon | Included |
| Time tracking (planned) | No | Paid addon | Included |

The web app pages and features are described in the [Production tracking](../production-tracking/tasks-home.md) section. The addons behind them are [Planner](../addons/production-tracking/planner/index.md), [Reports](../addons/production-tracking/reports/index.md), [Node Graph](../addons/production-tracking/node-graph/index.md) and [Review](../addons/production-tracking/review/index.md).

## Pipeline features

| Feature | Community | Pro | Studio |
|---|---|---|---|
| All DCC integrations | Included | Included | Included |
| OpenUSD workflow and resolver | Included | Included | Included |
| AYON Launcher | Included | Included | Included |
| Desktop Publisher and simple version publisher | Included | Included | Included |
| Site Sync | Included | Included | Included |
| Hero versions | Included | Included | Included |
| Environment management | Included | Included | Included |
| Plugin management | Included | Included | Included |
| Source code of the pipeline tools | Included | Included | Included |

## Pipeline addons

| Addon | Community | Pro | Studio |
|---|---|---|---|
| Batch Ingest | No | Included | Included |
| Batch Delivery tools | No | Included | Included |
| Advanced burn-ins | No | Included | Included |
| Automated slates | No | Included | Included |
| Web Publisher | No | Paid addon | Included |
| Archival tools | No | Paid addon | Included |
| AYON Workflows | No | No | Included |

</TableFilter>

## Services and licensing

| | Community | Pro | Studio |
|---|---|---|---|
| Product support | Community forum | Email | Email and live chat |
| Professional services | Quote | Quote | Quote |
| Trial onboarding support | No | 2 hours | 2 hours |
| Production onboarding support | No | 4 hours | 4 hours |
| Free access to all paid addons | No | No | Yes |
| Licensing | FSL-1.1-AL2 | Online only | Online and offline |

## Usage

| | Community | Pro | Studio |
|---|---|---|---|
| Self-hosting | Yes | Yes | Yes |
| Minimum active users | Self managed | 5 | 5 |
| Maximum active users | Self managed | 200 | Unlimited |
| Detailed audit history | Self managed | 21 days | 60 days |
| Cloud-hosted dev server | No | Optional | Included |
| Production freeze | No | Optional | Optional |

## Cloud server

These specifications apply when Ynput hosts the server. See [cloud hosting](hosting/cloud-hosting.md).

| | Pro | Studio |
|---|---|---|
| Cloud deployment | Elastic | Premium |
| Server storage | 100 GB | 200 GB |
| Media storage | 500 GB | 1 TB |
| Additional media storage | Blocks of 500 GB | Blocks of 500 GB |
| Data transfer fair use | 1 TB | 2 TB |
| Mailing | Included | Included |
| Automatic updates | Included | Included |
| Server monitoring | Included | Included |
| Background service worker | Included | Included |
| Data residency | EU | EU and US, others on request |
| Database restore points | 3 per 72 hours and 1 per week | 4 per 16 hours, then as Pro |
| Update rollout window | 3 months | 6 months |

In the Community edition the server hosting, storage, monitoring and backups are the studio's own.

## Related

- [Licenses page](web-ui/licenses.md): how seats and user license pools appear in the web UI.
- [Addons catalogue](../addons/index.md): license of every addon.
- [Cloud hosting](hosting/cloud-hosting.md) and [self hosting](hosting/self-hosting.md).
- [Ynput Cloud](../ynput-cloud/index.md): where subscriptions are managed.
