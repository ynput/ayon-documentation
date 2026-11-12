---
id: schema
slug: /
title: GraphQL API reference
sidebar_label: Overview
sidebar_position: 0
description: "The GraphQL schema of the AYON server: every query, type, field and argument, with the raw schema file for tools and AI assistants."
---

<!--
  A cheap move until the backend serves the schema: static/schema.graphql is a copy of the schema
  of ayon-backend 1.17.4, printed with `ayon_server.graphql.schema.as_str()`. Its first line,
  `# Ayon server 1.17.4`, gives the version shown in the heading (scripts/graphql-version.js). The pages of this
  reference are generated from it by @graphql-markdown/docusaurus (`yarn docusaurus graphql-to-doc`,
  run before `start` and `build`). Once ynput/ayon-backend#1277 is released, every server serves the
  schema at /schema.graphql, and the copy can be fetched from the playground at build time instead,
  the same way the REST API reference reads /openapi.json.
-->

# %AYON_SERVER%

Download GraphQL schema: <a className="button button--outline button--primary button--sm" href="/schema.graphql" download>Download</a>

The GraphQL API of the AYON server, with every query, type, field and argument. The API is read-only, so it has queries only. Tools and AI assistants can read the whole schema in the file above. How to write and try queries is described in [GraphQL API](/docs/developer/api/graphql).
