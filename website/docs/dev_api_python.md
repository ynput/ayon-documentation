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

## Sending Custom Requests

The `ayon_api` library provides a high-level wrapper for most AYON functionalities. However, when working with custom addon endpoints or new REST features not yet fully wrapped in the API, you can use the built-in HTTP methods.

### High-Level vs. Raw Methods

The API provides two sets of methods for each HTTP verb. The choice depends on whether you want a simplified interface or full control over the underlying `requests` arguments.

| HTTP Verb | Standard Method | Raw Method (Explicit) |
| --- | --- | --- |
| **GET** | `get(entrypoint, **kwargs)` | `raw_get(entrypoint, **kwargs)` |
| **POST** | `post(entrypoint, **kwargs)` | `raw_post(entrypoint, **kwargs)` |
| **PUT** | `put(entrypoint, **kwargs)` | `raw_put(entrypoint, **kwargs)` |
| **PATCH** | `patch(entrypoint, **kwargs)` | `raw_patch(entrypoint, **kwargs)` |
| **DELETE** | `delete(entrypoint, **kwargs)` | `raw_delete(entrypoint, **kwargs)` |

The Difference in Argument Handling

* **Standard Methods (`post`, `put`, `patch`):** Any `**kwargs` you pass are automatically bundled into the `json` argument of the request.
* **Standard Methods (`get`, `delete`):** Any `**kwargs` you pass are bundled into the `params` argument.
* **Raw Methods (`raw_*`):** These are **transparent pass-throughs** to the Python `requests` library. You must explicitly define your arguments (e.g., `json=...`, `params=...`, or `headers=...`).


### Practical Example: Creating a User

The following example demonstrates how to create a user using both the standard (concise) and raw (explicit) methods.

```python
import ayon_api

# Prepare your data
user_data = {
  "name": "demouser00",
  "attrib": {
    "fullName": "Tanise de Souza",
    "email": "tanise.desouza@example.com"
  },
  "password": "ayon",
  "data": {
    "defaultAccessGroups": ["artist"]
  }
}

# OPTION A: Using the standard PUT (Kwargs become JSON)
# Note how we unpack the dictionary into the method
ayon_api.put(
    f"users/{user_data['name']}", 
    **user_data
)

# OPTION B: Using raw_put (Explicit requests arguments)
# This is preferred if you need to pass specific headers or timeouts
ayon_api.raw_put(
    f"users/{user_data['name']}", 
    json=user_data
)

```

### When to use `raw_*` methods?

You should use the `raw_` variants whenever you need to access specific features of the [Python Requests Session](https://github.com/psf/requests/blob/main/src/requests/sessions.py#L500-L518) like **Custom Headers** for Sending specific metadata or content-type overrides.

:::tip
Use the **Standard Methods** for quick, clean code when dealing with standard JSON payloads. Use **Raw Methods** for complex integrations where you need full control over the HTTP stack.
:::


## Learn More

For More info and a full list of available commands
Please refer to our [AYON Python API Docs](https://ynput.github.io/ayon-python-api/).
