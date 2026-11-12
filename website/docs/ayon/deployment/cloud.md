---
title: Cloud deployment
sidebar_label: Cloud
description: "AYON Cloud hosting: an AYON server run by Ynput, what it includes, how it differs from self hosting, what can be configured when it is created and what Ynput manages."
verified: 2026-11-05
sources:
  - https://help.ayon.app/en/help/articles/6619325-getting-started-with-ayon-cloud-hosted
  - https://ayon.app/pricing-eur
  - https://github.com/ynput/ayon-backend/blob/develop/ayon_server/background/log_collector.py
---

# Cloud deployment

Cloud hosting means the studio's AYON server runs on [Ynput Cloud](../../ynput-cloud/index.md) and is managed by the Ynput team. The studio gets its own isolated server on a dedicated domain, connected to the subscription the studio chooses, with updates, maintenance and backups handled by Ynput. The alternative is [on-premise deployment](on-premise.md): the studio runs the server on its own machines and connects it to a subscription. Both run the same AYON.

:::tip Step-by-step guide

[AYON on Cloud: A Complete Studio Walkthrough](https://help.ayon.app/en/help/articles/0358916-ayon-on-cloud-a-complete-studio-walkthrough) in the AYON help center goes from a new cloud server to a running production: preparing the server and its users, creating projects, bundles and addons, the pipeline and the artist workflow, and delivery.
:::

## What it includes

| Area | Cloud hosting |
|---|---|
| Plan | A 14-day free trial, AYON Pro or AYON Studio. See [plans](../plans.md). |
| Server | A secure AYON server on its own domain, `<name>.ayon.app`, with HTTPS, created from an organization on Ynput Cloud. Servers are isolated from each other. |
| Infrastructure | Elastic with the Pro plan and premium with the Studio plan. The infrastructure scales with load, for example many artists uploading review files at the same time. |
| Updates | Applied by Ynput on a schedule that is announced to the studio beforehand. An update that conflicts with an older custom studio tool can be rolled back with Ynput's help. The rollout window is 3 months on Pro and 6 months on Studio. |
| Audit history | The detailed event stream in the [Event Viewer](../web-ui/event-viewer.md) is kept for 21 days on Pro and 60 days on Studio. |
| Backups | Automatic. The database can be restored to how it was at one of these points: on Pro, 1 day, 2 days, 3 days and 1 week ago, about 4 in total; on Studio, also 4, 8, 12 and 16 hours ago, about 8 in total. |
| AYON Service Host | One [AYON Service Host](ash.md) runs in the cloud next to the server, for the services of addons. More can be run on the studio's own machines. |
| Email | Sent through Ynput servers, so no SMTP configuration is needed. |
| Monitoring | Server monitoring by Ynput. |
| Server storage | 100 GB (Pro) or 200 GB (Studio), for the database and the addons. Also used as temporary storage by web publishing. |
| Media storage | 500 GB (Pro) or 1 TB (Studio), for the reviewables, thumbnails and comment attachments uploaded to the server, usually the largest part of the data. More is available in blocks of 500 GB. |
| Data transfer | Fair use of 1 TB (Pro) or 2 TB (Studio). |
| Data residency | EU for Pro. EU and US for Studio, and other regions on request. |
| Dev server | An additional server with up to 5 users and 50 GB of storage, for testing and development next to production. Included with Studio, optional with Pro. |
| Production freeze | Pauses the server between projects at a lower monthly cost. Optional with both plans. |

## Addons and logs on a cloud server

- **Addons:** the official addons are installed from the [Market](../web-ui/market.md). Uploading custom addons is turned off by default and can be turned on by contacting Ynput support.
- **Logs:** the server's events and log messages are in the [Event Viewer](../web-ui/event-viewer.md). Ynput support can help with anything deeper.

## Create a cloud server

A cloud server is created from an organization on [Ynput Cloud](../../ynput-cloud/index.md), which also manages its subscription, seats and billing.

## Related

- [On-premise deployment](on-premise.md)
- [AYON Service Host](ash.md)
- [Plans](../plans.md)
- [Ynput Cloud](../../ynput-cloud/index.md)
