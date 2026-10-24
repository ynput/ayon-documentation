---
title: Ynput Cloud
description: "Ynput Cloud, the platform for managing AYON subscriptions and launching cloud-hosted AYON servers: organizations, AYON workspaces, subscriptions, seats, addons, billing and members."
verified: 2026-10-16
sources:
  - https://help.ayon.app/en/help/articles/6619325-getting-started-with-ayon-cloud-hosted
  - https://ynput.cloud/
---

# Ynput Cloud

[Ynput Cloud](https://ynput.cloud/) is the platform where studios manage their AYON subscriptions and launch AYON servers hosted by Ynput. It is separate from the AYON server itself: Ynput Cloud handles accounts, organizations, subscriptions, seats, addons and billing, and the AYON server is where the production work happens. A server hosted by Ynput is described on the [cloud hosting](../ayon/hosting/cloud-hosting.md) page, and the available plans on the [plans](../ayon/plans.md) page.

## Structure

| Level | What it is |
|---|---|
| Account | A person's login on Ynput Cloud. It is a business account for producers or technical directors who manage billing, seats and subscriptions, and is not the login of an AYON server. |
| Organization | The studio or entity. A person can create an organization or be invited to one. |
| AYON workspace | A server created under an organization. Each has its own domain, `<name>.ayon.app`, and its own subscription. The Ynput Cloud interface calls it an AYON workspace; this site calls it an AYON server. |

Members of an organization can invite teammates, change subscriptions and oversee billing from the same dashboard.

## What the interface offers

| Area | Contents |
|---|---|
| Organizations | List of the organizations of the account, with **Create New Organization**. |
| Workspaces | The AYON workspaces of an organization, with **Start Free Trial** (a 14-day evaluation server) and **Add New Cloud Subscription** (a commercial server). A link opens the server. |
| Workspace creation | Cloud region, domain name, payment period (yearly or monthly), base plan (AYON Pro or AYON Studio), premium addons, billing type (stored payment method or invoice). A trial asks for the country, the studio address and the domain name. |
| Subscription and billing | The subscription of each workspace, with the seat count (**Manage Seats**, also called update license pool), the addons of the plan and extra storage. New seats are available immediately on the Users page of the AYON server. Premium addons on a Pro subscription are listed with **Add** to activate a license. Additional media storage is bought in blocks of 500 GB. |
| Billing | Payment methods and billing preferences for renewals. |
| Members | The people of the organization, with an invitation for production managers or technical leads to help manage seats, addons and subscriptions. |

## Relation to the AYON server

- A server hosted by Ynput is created and billed here. A self-hosted server can also be connected to a subscription to unlock the plan's features.
- The [Ynput Cloud addon](../addons/server-features/ynput-cloud/index.md) on the AYON server adds the Ynput Cloud login (users sign in to the AYON server with their Ynput Cloud account, and the matching AYON user is created or updated) and the remote support access for the Ynput support team.
- Seats and user licenses appear on the [licenses page](../ayon/web-ui/licenses.md).

## Related

- [Cloud hosting](../ayon/hosting/cloud-hosting.md)
- [AYON plans](../ayon/plans.md)
- [Ynput Cloud addon](../addons/server-features/ynput-cloud/index.md)
