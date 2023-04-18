---
id: admin_server_installing_addons
title: Installing addons
sidebar_label: Installing addons
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Directory structure

Ayon addons are installed into the `addons` directory, following the structure:

```markdown
addons/
  └── {addon_name}/
      └── {addon_version}/
```

Each version of an addon contains the following components:

- Addon base class (`__init__.py`): This is the main class that defines the addon's functionality.
- Server code (optional): This includes any server-side code for the addon.
- Frontend code (optional): This contains the frontend code for the addon, if applicable.
- Binary package for the client application (optional): This is a pre-compiled binary package that can be used by the client application.

For example, an addon named `example` with version `1.0.0` would have the following directory structure:

```markdown
addons/
  └── example/
      └── 1_0_0/
          ├── __init__.py
          ├── frontend/ (optional - frontend code)
          ├── private/ (optional - static files available to logged in users)
          └── public/ (optional - publicly available static files, such as icons)
```

This structure allows for multiple versions of addons to coexist, and makes it easy to manage and update addons in your Ayon server.

## Using Development Versions of Addons

The common practice for working with development versions of addons is to use the `dev` directory instead of a specific version number. This allows you to separate the development version from production versions and makes it easier to test and debug your addons.

To set up a development version of an addon, follow these steps:

1. Create a directory for the addon within the `addons` folder using the addon's name.

```bash
mkdir addons/example
```

2. Navigate to the newly created addon directory.

```bash
cd addons/example
```

3. Clone the addon repository into the `dev` directory.

```bash
git clone https://github.com/ynput/ayon-example-addon dev
```

Your addon's directory structure should now look like this:

```markdown
addons/
  └── example/
      └── dev/
          ├── __init__.py
          └── ...
```

