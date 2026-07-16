---
id: ayon_first_steps
title: AYON First Steps
sidebar_label: AYON First Steps
---

Roll up your sleeves and get your server running. This guide covers initial deployment, exploring the web UI, installing the launcher, and understanding bundles and addons. By the end, you'll know the production basics and make your very first publish using standard DCCs and the standalone Tray Publisher.


# Deploy AYON under [some time] for your studio

## Get your AYON Server.
> What is an instance? why is it called an instance?

### AYON on the Cloud in 3 minutes
This is the quickist way to get your AYON Server, also you can request a trial to test all of the premium feautres.
> [Some Steps for how to do it]

### On Premise AYON Instance
AYON is totally opensource and this means you can download the source code directly from github and run it yourself. *Also, you can request a trial? do we recommend it?*

```shell
git clone https://github.com/ynput/ayon-docker.git
cd ayon-docker
docker compose up -d --build
make setup
```

> Note about mac and port 5000.

> On premise can be a big topic as you'll need to take care of maintaining the server like updates and scalabilitly, SSL Configurations, provisioning, backups.

## Explore AYON Server
> I'd like to showcase AYON with stock features to learn about what AYON provides.
 
Now let's go to your server URL and login. For now we will skip bootstrap 

- Explore the UI, four spaces (studio settings, project settings, dashboard, project production) + some utilities
- Link account
- You can do on the server is to customize your AYON Server (studio name, login background, welcome message).
- Add Users + learn about roles.
- Manage licenses for users
- Create Project and tweak project anatomy
- Create project hierarchy folders and tasks via CSV import. (it's comperhinsive but we will use it in a simple way).
(talk about AYON concepts like task is the unit of work, in order to make any thing you need a task.)
- Add users to your projects, learn about access groups and tweak permissions.
- Task assignments 
- upload versions
- collaboration through task and folder panels. 
- to which deep you go through in production features?

> For more information, see a full guide/walkthrough the production features.

## Pipeline
> Features of the pipeline: environment management, publish system, remote artists workflow, ....

Now let's get back to the bootstrap. update pipeline to latest release.
which brings a bundle with launcher, addons and dependency package.

Setting Application Paths: studio settings > applications and application envs
Manage studio environment: (one of the great features in AYON is having a dynamic runtime session which ditches from the user's environment.) application env, global env, project env, tool env (on demand env).

install launcher on user machines.

double click tray icon
- launch applications
- publish: learn about publish system: create, collect, validate, publish

tray publisher






