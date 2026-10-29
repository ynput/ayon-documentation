---
title: Cloud deployment
sidebar_label: Cloud
description: "AYON Cloud hosting: an AYON server run by Ynput, what it includes, how it differs from self hosting, what can be configured when it is created and what Ynput manages."
verified: 2026-10-16
sources:
  - https://help.ayon.app/en/help/articles/6619325-getting-started-with-ayon-cloud-hosted
  - https://ayon.app/pricing-eur
---

# Cloud deployment

Cloud hosting means Ynput runs the AYON server. The studio gets its own isolated AYON server on a dedicated domain, with updates, maintenance and backups handled by Ynput, and manages subscriptions and seats on [Ynput Cloud](../../ynput-cloud/index.md). The alternative is [on-premise deployment](on-premise.md), where the studio runs the server on its own machines. Both run the same AYON.

## What it includes

| Area | Cloud hosting |
|---|---|
| Server | A secure AYON server on its own domain, `<name>.ayon.app`, with HTTPS. Servers are isolated from each other. |
| Infrastructure | Elastic with the Pro plan and premium with the Studio plan. The infrastructure scales with load, for example many artists uploading review files at the same time. |
| Updates | Applied by Ynput on a schedule that is announced to the studio beforehand. An update that conflicts with an older custom studio tool can be rolled back with Ynput's help. The rollout window is 3 months on Pro and 6 months on Studio. |
| Backups | Automatic. Database restore points are kept: 3 per 72 hours and 1 per week on Pro, 4 per 16 hours and the Pro set on Studio. |
| AYON Service Host | One preconfigured [AYON Service Host](ash.md) runs the services of addons. |
| Email | Sent through Ynput servers, so no SMTP configuration is needed. |
| Monitoring | Server monitoring by Ynput. |
| Storage | Server storage for launcher installers, addons, dependency packages, thumbnails and review videos uploaded in the browser: 100 GB (Pro) or 200 GB (Studio). Media storage: 500 GB (Pro) or 1 TB (Studio). More media storage is available in blocks of 500 GB. |
| Data residency | EU for Pro. EU and US for Studio, and other regions on request. |
| Support | Annual subscriptions include onboarding hours in the first month. |

The plan details are on the [plans](../plans.md) page.

## Options when a server is created

A cloud server is created from an organization on [Ynput Cloud](../../ynput-cloud/index.md).

| Option | Meaning |
|---|---|
| Free trial | A 14-day evaluation server. Takes a country, a studio address and a domain name. |
| New cloud subscription | A commercial server. Takes the cloud region, the domain name, the payment period (yearly or monthly), the base plan (AYON Pro or AYON Studio), premium addons to switch on, and the billing type (stored payment method or invoice). |
| Domain name | Becomes the address of the server and its login page: `<domain>.ayon.app`. |

## Differences from self hosting

| Topic | Cloud hosting | Self hosting |
|---|---|---|
| Server operation | By Ynput | By the studio |
| Updates and backups | By Ynput | By the studio |
| Custom addons | Uploading custom Python addons to the server is disabled by default. Ynput support reviews and enables a bespoke addon. | Any addon can be installed |
| Logs | The Events page of the web UI shows basic logs. Infrastructure logs go through Ynput support. | Full access |
| Direct database access | No | Yes |
| ASH | One included, more can be added on premise | Run by the studio |

A studio can also keep a self-hosted server and connect it to a Pro or Studio subscription to unlock the plan's features.

## Accounts

A Ynput Cloud account is separate from the account on the AYON server. The Ynput Cloud account manages billing, seats and subscriptions, and is used by producers or technical directors. The AYON server account is the one artists and managers use every day to track tasks, launch software and publish. The Ynput Cloud login can also be enabled as a login method for the AYON server. See the [Ynput Cloud addon](../../addons/server-features/ynput-cloud/index.md).

## Data

Ynput Cloud collects anonymous server settings and system metrics, both for cloud-hosted and for self-hosted servers. It does not collect the studio's creative assets, file names or artwork.

## Related

- [On-premise deployment](on-premise.md)
- [AYON Service Host](ash.md)
- [Plans](../plans.md)
- [Ynput Cloud](../../ynput-cloud/index.md)
