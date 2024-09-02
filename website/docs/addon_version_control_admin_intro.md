---
id: addon_version_control_admin_intro
title: Version Control Intro
sidebar_label: Intro
description: Version Control Intro.
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## What is version control ?

As Git defines it, Version control is a system that records changes to a file or set of files over time so that you can recall specific versions later. 

## Nature of Version Control
How using Version Control System is different from traditional up versioning strategy ?
From overview it's similar to hero versioning.
Let's make an easy comparison:

<Tabs
groupId="vc_vs_up_versioning"
defaultValue="upversining"
values={[
{label: 'Up-Versining', value: 'upversining'},
{label: 'Version-Control', value: 'versioncontrol'},
]}>

<TabItem value="upversining">

- Follows a Folder Structure
- Create new folder with version up and save new files inside it.
- To pick a version, navigate to its folder.
- Can pick different versions at the same time. e.g. pick v005 and v008 and v009 at the same time.
- To check the history, navigate to your folder structure.

</TabItem>

<TabItem value="versioncontrol">

- A repository
- Push commit to the repository
- To pick a version, you'd need to use a dedicated command.
- Can pick different versions at the same time ? or it's only one at the same time ?
- To check the history, use a dedicated viewer.

</TabItem>

</Tabs>

:::tip
From a pipeline perspective, users shouldn't be concerned about how these things are handled in the backend as this should be totally managed by the pipeline.

And, it should be up to the pipeline admin to select the version control system that provide easy maintenance and better performance.
:::


## Further Reading 

### Perforce vs Git: Comparing the Differences 

https://get.assembla.com/blog/perforce-vs-git/