---
id: artist_concepts
title: Key concepts glossary
sidebar_label: Key Concepts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


AYON is a robust and interconnected pipeline platform and as such it comes with certain terminology. This page explains the most important terms and concepts that you will need on a daily basis while working with it. 


### Folder

The main building block of all AYON projects. Each Folder can have a type, which by default includes Episode, Sequence, Shot, and AssetBuild, but can be expanded to any type a project might require. Folders can be parented to each other, forming a hierarchy in the same way as directories on disk.

A folder can be identified by its full path, e.g., `assets/characters/bob`, or by its unique ID. It is not possible to have two folders with the same name within the same parent. So you can have `sq01/sh010` and `sq02/sh010` in the same project, but not two shots named `sh010` within the same sequence.


### Product

Publishing any data from an AYON Folder (a shot, asset build, or any other type) results in a **Product**.

Each product must be of exactly one [type](#product-type), for example, a rig, model, or a look. A single Folder can have many Products, even of a single family, named [variants](#variant). By default, a Product is named as a combination of its type + variant. Sometimes prefixed with the task name (often in case of a workfile product).

 Product type doesn't dictate the file type, but can enforce certain technical specifications. For example, AYON's default configuration expects `model` product type to only contain geometry without any shaders or joints when it is published.

### Variant

Usually, a product needs to be created in multiple *'flavors'*. A character might have multiple different looks, a model needs to be published in different resolutions, a standard animation rig might not be usable in a crowd system, and so on. Variants are here to accommodate all this variety that might be needed within a single asset. A model might have variant: *'main'*, *'proxy'*, *'sculpt'*, while a Product of *'look'* family could have Products *'main'*, *'dirty'*, *'damaged'*. Variants have some default recommendations for their names, but ultimately it's up to the artist to use them for separation of publishes when needed.

### Version

A numbered iteration of a given Product. Each Version has to contain at least one [representation](#representation).

#### Hero version

In a production pipeline a hero version is a versioning strategy where the latest published version (e.g. of a model or render) is automatically overwritten in-place, rather than being assigned a new version number like regular versions. This means that the hero version is always the latest version (potentially also "approved" instead of latest). As such, scenes loading that version will instantly update to this new version as it gets overwritten.

This is an optional feature. The generation of hero versions can be completely disabled in AYON by an admin through the Project Settings.

:::tip Push versus pull pipeline
The Hero version strategy is also known as a "push" pipeline because the new version of the asset is "pushed" to replace the older version, rather than requiring users to manually "pull" in the latest version.
:::

The use of a hero version strategy can help ensure that everyone is automatically using the latest version of a product. However, automatically updating would also mean that if a machine was currently rendering a scene for which a new pointcache would be published that mid-render it would get the new updated pointcache resulting in a change of version as frames are being rendered.

### Representation

Each published Product version can be made up of multiple representations. These represent the actual data on disk as it's extracted from the DCC. These are most often different file formats of the same data, for example, `.ABC` and `.OBJ` representations of a model, but can be a bit more abstract in nature. For example, a video file with a model turnaround is also a representation of a given model version. The only difference is that the data is usable in a video player, rather than a DCC.


### Task

A task defines a work area for an asset where an artist can work in. For example asset *characterA* can have tasks named *modeling* and *rigging*. Tasks also have types. Multiple tasks of the same type may exist on an asset. A task with type `fx` could for example appear twice as *fx_fire* and *fx_cloth*.

Without a task you cannot launch a host application.

:::note
#### Entity naming convention

At this moment, the names of Folders, Tasks, Products or Representations can contain only letters, numbers and underscores.
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

Process of importing previously published Products into your current scene, using any of the AYON tools. Loading asset using proper tools will ensure that all your scene content stays version controlled and updatable at a later point.
