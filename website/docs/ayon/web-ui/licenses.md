---
title: Licenses
description: "The licensing of the AYON server: the server license, feature and addon licenses, user pools and seats, and the license views of the Users page."
verified: 2026-10-15
sources:
  - https://help.ayon.app/en/help/articles/6592804-ayon-licenses
---

# Licenses

AYON has three kinds of licensing: the license of the server software, licenses that unlock specific features and addons, and user licenses that limit how many people can sign in. Instance and license information comes from Ynput Cloud, so the license views need a server connected to it.

## Server license

The AYON server is published under the Functional Source License. Most server features are available without a subscription.

## Feature and addon licenses

Some features and addons, for example Power Features, require a license. A license comes with an AYON subscription or is granted for a single instance. A subscription can also set limits such as the number of seats or the number of days of event history.

## User licenses

A subscription includes a number of seats. The seats form a user pool, which limits how many users can sign in at the same time. An instance can have several pools.

| Pool type | Description |
|---|---|
| Fixed | A set number of seats assigned to specific users. Seats can be reassigned at any time. Several fixed pools add up: two active pools of 20 and 10 seats allow 30 users. When a pool expires, it is removed, and the users assigned to it lose access. |
| Metered | A pool shown as "Up to N seats" in the license list. |

A user can sign in when the user is **active** and, on a server that uses pools, is assigned to a pool. A user without a pool is assigned automatically to a fixed pool with free seats. When no seat is free, the user cannot sign in. Deactivating a user releases the user's license.

## Where it appears

| Place | Location | Description |
|---|---|---|
| Users page | Settings, **Users** (`u+u`, `/settings/users`) | The **Licenses** button in the toolbar opens the license dialog. The dialog also opens through the query parameter `?licenses=true`. |
| User detail | Users page, side panel, section **License control** (**Login control** when the server has no pools) | **User active** switch and, with pools, the **User license** dropdown. |

## License dialog

The dialog is titled **Instance and licenses**. When the server is not connected to Ynput Cloud, it shows **Connect this instance to Ynput Cloud to get license information.**

| Element | Content |
|---|---|
| **Manage Subscriptions** | Opens the instance's license page on Ynput Cloud, where seat counts, billing information and plan options are managed. |
| Instance information | Instance ID, instance name, organization ID and organization name. Each value has a copy button. |
| **Licenses** list | One row per license with its label, type and a status icon. The status icon is a check mark for a valid license and an error icon for an invalid one; its tooltip shows the note from the license. The list header shows when the licenses were last synced. The list is refreshed each time the dialog opens. |

License types in the list:

| Type | Row shows |
|---|---|
| Seats | Number of seats (`Up to N seats` for metered users), or days for the event history limit. |
| Addon | An addon license. |
| Feature | A feature license. |

Licenses are listed in the order seats, addon, feature.

## User license controls

| Control | Where | What it does |
|---|---|---|
| **User active** | User detail | Turns the user on or off. An inactive user cannot sign in and loses the assigned license. |
| **User license** | User detail, shown when the server has pools | Selects the pool of the user. Options read `<pool label> (<used>/<max>)`, with `(invalid)` for an invalid pool. Pools that are full, have zero seats or are invalid cannot be chosen. The control is disabled for inactive users. Applies to several selected users at once. |

## Permissions

| Action | Required role |
|---|---|
| Open the license dialog and read licenses | Admin |
| See the user pool list in the user detail | Manager or admin |
| Change a user's active state or pool | Manager or admin, within the rules for editing users (see [Users and permissions](users-and-permissions.md)) |

## Related

- [Users and permissions](users-and-permissions.md)
- [Market](market.md)
- [Bundles and addons](bundles-and-addons.md)
- [AYON setups](../setups.md)
