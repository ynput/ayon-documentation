---
id: addon_usd_resolver_artist
title: AYON USD Resolver
sidebar_label: USD Resolver
description: AYON USD Resolver documentations for artists.
toc_max_heading_level: 5
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
  {versions.USD_Badge}
</ReactMarkdown>

## What is the AYON USD Resolver?

The AYON USD Resolver allows to load files in USD using an AYON Entity URI by resolving it at runtime to the correct filepath on your machine.

An AYON Entity URI may look like:
- `ayon+entity://demo_Big_Feature/assets/environments/01_pfueghtiaoft?product=layoutMain&version=v004&representation=usd`
- `ayon+entity://project_name/assets/char/hero?product=modelMain&version=v003&representation=usd`

## Pinning

The AYON USD Resolver supports **pinning**. Pinning allows to retarget an entity URI or path to a 'pinned' output filepath.

This is heavily used on the farm, because loading a single USD file may itself require resolving many other files resulting in potentially 1000s of resolves, requiring 1000s of AYON server queries - for each worker in your farm. Pinning avoids this completely by predefining the mapping of an AYON Entity URI to a filepath, resulting in no AYON server connection even being required at all.

:::tip Pinning files are heavily recommend for the farm

The amount of resolves a USD resolver may do can be detrimental to the performance of your server. The AYON USD Resolver does have a good local caching system, but if 100s of machines start resolving 1000s of unique URIs simultaneously there's little optimization that can be done because USD will resolve URIs one by one.

:::

:::note What is the `.json` file next to my USD file?

If you see a `.json` file next to a USD file, especially when the USD file is to be rendered on the farm, there's a good chance that it is an AYON USD Resolver pinning file.

This can easily be confirmed by checking whether it contains a big list of files and text like `ayon_resolver_pinning_data` inside of it.

:::

## Caching

The AYON USD Resolver has a local caching mechanism to optimize its performance in
daily use. Entity URIs traditionally resolve to static paths, so caching them in your local sessions is the best way to improve performance.