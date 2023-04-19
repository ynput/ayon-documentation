---
id: artist_concepts
title: Key concepts glossary
sidebar_label: Key Concepts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


AYON is a robust and interconnected pipeline platform and as such it comes with certain terminology. This page explains the most important terms and concepts that you will need on a daily basis while working with it. 


## Folder
:::note This is an important change between OpenPype and AYON
<Tabs
  groupId="version"
  defaultValue="ayon"
  values={[
    {label: 'AYON', value: 'ayon'},
    {label: 'OpenPype', value: 'openpype'},
  ]}>

<TabItem value="ayon">

The main building block of all AYON projects. Each Folder can have a type, which by default includes Episode, Sequence, Shot, and AssetBuild, but can be expanded to any type a project might require. Folders can be parented to each other, forming a hierarchy in the same way as directories on disk.

A folder can be identified by its full path, e.g., `assets/characters/bob`, or by its unique ID. It is not possible to have two folders with the same name within the same parent. So you can have `sq01/sh010` and `sq02/sh010` in the same project, but not two shots named `sh010` within the same sequence.


</TabItem>
<TabItem value="openpype">

### Asset

In OpenPype all the main entities the project is made from are internally considered *'Assets'*. Episode, sequence, shot, character, prop, etc. All of these behave identically in the pipeline. 

OpenPype has a limitation regarding duplicated names. Name of assets must be unique across whole project.

</TabItem>

</Tabs>
:::


### Subset

Publishing any data from an AYON Folder (a shot, asset build, or any other type) results in a **Subset**.

The Subset type is referred to as [family](#family), for example, a rig, model, or a look. A single Folder can have many Subsets, even of a single family, named [variants](#variant). By default, a Subset is named as a combination of family + variant. Sometimes prefixed with the task name (for example, a workfile).

### Variant

Usually, an asset needs to be created in multiple *'flavors'*. A character might have multiple different looks, a model needs to be published in different resolutions, a standard animation rig might not be usable in a crowd system, and so on. Variants are here to accommodate all this variety that might be needed within a single asset. A model might have variant: *'main'*, *'proxy'*, *'sculpt'*, while a Subset of *'look'* family could have Subsets *'main'*, *'dirty'*, *'damaged'*. Variants have some default recommendations for their names, but ultimately it's up to the artist to use them for separation of publishes when needed.

### Version

A numbered iteration of a given Subset. Each Version has to contain at least one [representation](#representation).

#### Hero version

A hero version is a version that always corresponds to the latest published version. When a new publish is generated, it's written over the previous hero version, replacing it in-place, as opposed to regular versions where each new publish is a higher version number.

This is an optional feature. The generation of hero versions can be completely disabled in AYON by an admin through the Studio Settings.

### Representation

Each published Subset version can be made up of multiple representations. These represent the actual data on disk as it's extracted from the DCC. These are most often different file formats of the same data, for example, `.ABC` and `.OBJ` representations of a model, but can be a bit more abstract in nature. For example, a video file with a model turnaround is also a representation of a given model version. The only difference is that the data is usable in a video player, rather than a DCC.

### Family

Each published [subset](#subset) can have exactly one family assigned to it. Family determines the type of data that the Subset holds. Family doesn't dictate the file type, but can enforce certain technical specifications. For example, AYON's default configuration expects `model` family to only contain geometry without any shaders or joints when it is published.

### Task

A task defines a work area for an asset where an artist can work in. For example asset *characterA* can have tasks named *modeling* and *rigging*. Tasks also have types. Multiple tasks of the same type may exist on an asset. A task with type `fx` could for example appear twice as *fx_fire* and *fx_cloth*.

Without a task you cannot launch a host application.

:::note
#### Entity naming convention

At this moment, the names of Folders, Tasks, Subsets or Representations can contain only letters, numbers and underscores.
:::

### Workfile

The source scene file an artist works in within their task. These are versioned scene files and can be loaded and saved (automatically named) through the [workfiles tool](artist_tools_workfiles.md).

### Addon

AYON is a modular system build up of many addons. Addon can be almost any larger part of the software, but most often it provides integration with another software which could be a DCC, another cloud service, but also complete expansion of AYON itself.

### Host

A special kind of [Addon](#addon) providing deep integration with a third party Software or Application. These are usually DCC applications like Maya, Houdini or Nuke.

### Tool

Small piece of software usually dedicated to a particular purpose. Most of AYON tools have GUI used directly by artists, but some are command line only.

### Publish

Process of exporting data from your work scene to a versioned, immutable file that can be used by other artists in the studio.

#### (Publish) Instance

A publish instance is a single entry which defines a publish output within a [workfile](#workfile). Publish instances persist within the workfile. This way we can expect that a publish from a newer workfile will produce similar and consistent versioned outputs, compared to previous versions.

### Load

Process of importing previously published Subsets into your current scene, using any of the AYON tools. Loading asset using proper tools will ensure that all your scene content stays version controlled and updatable at a later point.
