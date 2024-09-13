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

Version control, as defined by [Git](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control), is a system that records changes to a file or set of files over time. This allows you to revisit and restore earlier versions if needed.

Now, you might wonder, doesn't AYON do something similar? We'll dive deeper into this in the following section.

## Nature of Version Control
:::tip
Version control, conceptually, is similar to hero versioning where you have a master version that points to one preferred version among other saved versions.
:::

AYON at its core adopts the traditional up-versioning strategy, which stands apart from using a Version Control System. But what sets them apart? Let's compare the two to highlight key differences:

<Tabs
groupId="vc_vs_up_versioning"
defaultValue="upversioning"
values={[
{label: 'Up-Versioning', value: 'upversioning'},
{label: 'Version-Control', value: 'versioncontrol'},
]}>

<TabItem value="upversioning">

- Uses a folder-based structure.
- Updates are made by creating a new folder labeled with the next version number and saving the updated files there.
- To access a specific version, you simply navigate to the folder labeled with that version number.
- Allows simultaneous access to multiple versions, like loading v005, v008, and v009 simultaneously.
- Reviewing the history requires going through the folder structure.

</TabItem>

<TabItem value="versioncontrol">

- Uses a repository, Think of a repository as a database that keeps track of all version histories.
- Updates are made by committing changes, which are essentially snapshots of your files at a specific point in time.
- Accessing a specific version involves using commands to revert your files to that particular snapshot.
- Although it requires extra effort, it's possible to access multiple versions at once, like loading v005, v008, and v009 simultaneously.
- Reviewing the history requires using a dedicated tool designed for tracking and visualizing version histories.
  
</TabItem>

</Tabs>

:::tip
From a pipeline perspective, users can remain focused on their tasks without worrying about the inner workings of various systems in the backend, as these are fully managed by the pipeline.

Additionally, it is up to the pipeline admin to choose the most suitable version control system.
:::

## Version Control & Creative Industries

Version control is widely recognized in the gaming industry and virtual production, more so than in other creative sectors such as VFX, animation and advertising.
This is reflected in the extensive discussions on forums and official sites for Unreal Engine or Unity.

For instance, Epic Games offers an insightful article [Versioning and Source Control](https://dev.epicgames.com/community/learning/tutorials/jO2m/unreal-engine-versioning-and-source-control), which delves into: 
- Comprehensive tutorials on version control basics.
- Workflow practices for version control in virtual production.
- Building an Asset Library in Perforce, catering to various projects, sequences, seasons, episodes, and more.

## Learn More

- [What is Git?](https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F)
- [Perforce Helix Core vs Git](https://get.assembla.com/blog/perforce-vs-git/)
- [Perforce Helix Core Beginner’s Guide](https://www.youtube.com/playlist?list=PLH3pq2J85xsPYn71_yzzsZQKvalTW-duE)
- [Perforce Helix Core Admin’s Guide](https://www.youtube.com/playlist?list=PLH3pq2J85xsMDY2AAkzUhTmHIg1S7WN1f)
