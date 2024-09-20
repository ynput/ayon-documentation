---
id: dev_api_python
title: AYON Python API
sidebar_label: Python API
description: Information about AYON Python API
toc_max_heading_level: 5
---

## About AYON Python API

A Python client for connecting to AYON server using `requests` module. Wraps REST API endpoints including GraphQl to communicate with server.

The module supports singleton connection which is using `AYON_SERVER_URL` and `AYON_API_KEY` environment variables as source for connection. But you can create multiple connection to different servers using `ServerAPI` class.

## Get Started 
You only need to get the python module to get started.
```
pip install ayon-python-api
```
Then, you can make your first API call from your code editor by running
```python
import os
import ayon_api

# Set necessary environment variables
os.environ["AYON_SERVER_URL"] = "<your-ayon-server-url>"
os.environ["AYON_API_KEY"] = "<your-ayon-api-key>"

# Make the connection
con = ayon_api.get_server_api_connection()

# Get a list of available projects
projects = con.get_projects()
print(projects)
```

:::tip
You can find more examples in the following Community guide on forums.
[AYON Python API First Steps](https://community.ynput.io/t/ayon-python-api-first-steps/1278)
:::

## Learn More

For More info and a full list of available commands
Please refer to our [AYON Python API Docs](https://ynput.github.io/ayon-python-api/).
