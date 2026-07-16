---
id: ayon_user_guides_overview
title: AYON User Guides Overview
sidebar_label: AYON Guides
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocCardList from '@theme/DocCardList';
import { useCurrentSidebarCategory } from '@docusaurus/theme-common';

## AYON Platform Introduction

Learn about AYON through simple, step-by-step guides.

From deploying your server and setting up your studio, to tracking production, preparing artist environments, and working smoothly inside your favorite creative apps, we have you covered. We also feature specialized guides for extending your AYON server.

Whether you are an artist, a production manager, or a pipeline TD, you will find the right path for you here—and if a guide you need is missing, you can always request one!

<DocCardList items={useCurrentSidebarCategory().items.slice(0, 5)} />

## DCC AYON User Guides

Your practical manual for using AYON directly inside your creative software. Learn how to configure your settings, set up artist workstations, and master the day-to-day loading, publishing, and exporting tools. We also break down custom tools unique to each specific app.

<DocCardList items={useCurrentSidebarCategory().items.slice(5, 8)} />

## Pipeline TD Guides

Learn how to interact with AYON programmatically and discover the structural foundations for extending AYON by creating your own custom addons.

<DocCardList items={useCurrentSidebarCategory().items.slice(8)} />
