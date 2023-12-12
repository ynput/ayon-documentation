---
id: addon_wrap_admin
title: Wrap Admin Docs
sidebar_label: Wrap
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Wrap_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Wrap settings

A Faceform **Wrap** is a topology transfer tool for creation of digital characters based on 3D scans of real actors or sculpts.

As **Wrap** has no Python API its integration is a bit limited. It can now open predefined template workfile based on profiles.
These template workfiles could contain placeholders which will be textually replaced before starting and opening a workfile with Wrap.

Location: `ayon+settings://wrap/workfile_builder/custom_templates`

![Wrap Project Settings](assets/admin_hosts_wrap_settings.png)

### Workfile Builder

Allows to open prepared workfile for an artist when no workfile exists. Useful to share standards, additional helpful content in the workfile.

Could be configured per `Task type`, eg. `composition` task type could use different `.wrap` template file than `art` task.
Workfile template must be accessible for all artists.

(Currently template sharing is not handled by [SiteSync](addon_site_sync_admin.md) so they must be accessible for all artist machines.)