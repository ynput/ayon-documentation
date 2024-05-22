---
id: system_introduction
title: Introduction
sidebar_label: Introduction
---

**AYON** is a modular python application build of two main parts.

- AYON **server** installed centrally for the whole studio
- AYON **launcher** running on each artist workstation
  
To use AYON, you need to install both the server and the launcher app. Pre-built binaries of the desktop launcher for all platforms are [available for download](https://github.com/ynput/ayon-launcher), but if you make any changes to the core of the app, you will need to build it yourself. Fortunately, AYON's build and install scripts handle this task for you. AYON can install most of its requirements automatically, but various usage scenarios may require additional steps.

## Studio Preparation

You can find a detailed breakdown of technical requirements [here](dev_requirements.md), but in general, AYON should be able to operate in most studios fairly quickly. The main obstacles are usually related to workflows and habits that may not be fully compatible with what AYON expects or enforces. It is recommended to go through the [key concepts](artist_concepts.md) for artists to get comfortable with the basics.

Keep in mind that if you run into any workflows that are not supported, it is usually because AYON has not encountered that particular case and it can likely be added upon request.

## Server

AYON Server is the heart and soul of your studio pipeline. It provides a database for all the metadata about the projects, users, versions, relationships, and pretty much all other pipeline-related information. It also provides a web-based user interface to allow for working with your published data or project structures, without having to install AYON desktop. This is especially useful for producers and coordinators. Server UI is also used for managing all studio and project settings and to monitor all events that happen within a studio pipeline. You can also extend it with addons which can provide completely new functionality or improve what's already there.

## Artist Workstations

To use AYON in production, the launcher app should be installed on each artist workstation, whether that is in the studio or at home in case of a distributed workflow. Once started, it lives in the system tray menu bar, and all of its tools are executed locally on the artist workstation. There are no special requirements for the artist workstations if you are running AYON from a frozen build.

Each artist workstation will need to be able to connect to your AYON server to load and publish any work. They will also need access to your centralized project storage, unless you are running a fully distributed pipeline.

## Centralized and Distributed?

AYON supports a variety of studio setups, such as:
- Single physical location with monolithic project storage.
- Fully remote studios, utilizing artists' home workstations.
- Distributed studios, running fully or partially on the cloud.
- Hybrid setups with different storages per project.
- And others that we probably did not think of at all.

It is up to you how you deploy and distribute AYON to your artists, but there are a few things to keep in mind:
- While it is possible to store project files in different locations for different artists, it brings a lot of extra complexity to the table.
- Some DCCs do not support using environment variables in file paths. This will make it very hard to maintain full multiplatform compatibility as well variable storage roots.
- Relying on a VPN connection and using it to work directly off network storage will be painfully slow.
