---
id: admin_server_provisioning
title: Provisioning
sidebar_label: Provisioning
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Configuration file

Ayon server offers a convenient method for bootstrapping its basic settings 
using a single JSON file. This enables you to quickly set up the server with 
your desired configurations.

By default, the server expects the configuration file to be located at `settings/template.json`. 
The settings within this file will be applied each time you run the `make setup` command.

```markdown
settings/
  └── template.json
```

## Security Considerations

Using the bootstrapped settings is particularly useful during the testing phase of your Ayon server. 
However, once the server is properly set up and configured, 
it is strongly recommended to remove the `settings/template.json` file.

The reason for this recommendation is that the `template.json` file may contain sensitive information, 
such as secrets and passwords, in plain text. Storing these credentials in an unsecured manner 
poses a security risk, as unauthorized users may gain access to the server's sensitive data.

## File structure

The `template.json` file contains a dictionary with several optional keys that allow you to customize various aspects of your Ayon server. The available keys are:

- `addons`
- `settings`
- `secrets`
- `users`
- `roles`

### Addons

The `addons` key allows you to specify the production versions of addons that should be enabled on your Ayon server. The value of this key is a dictionary containing the addon names as keys and their respective version numbers as values.

Example:

```json
"addons": {
  "ftrack": "1.0.0",
  "example": "1.0.0"
}
```

In this example, two addons, `ftrack` and `example`, will be enabled with version `1.0.0`.

### Settings

The `settings` key is used to specify particular settings for an addon. 
It is possible to configure multiple versions of each addon using this key. 
The value of this key is a dictionary containing the addon names as keys, 
and another dictionary as values with the addon version number as the key 
and the settings for that version as the value.

Example:

```json
"settings": {
  "ftrack": {
    "1.0.0": {
      "server_url": "https://example.ftrack.com"
    }
  }
}
```

In this example, the `ftrack` addon's version `1.0.0` is configured with a custom `server_url` setting. 
Multiple versions of the same addon can be configured by adding additional 
version numbers with their respective settings within the addon dictionary.

### Secrets

The `secrets` key is used for storing sensitive information that the server and addons have access to. 
Since settings are sent to clients, secrets provide a way to hide sensitive data from users. 
Both the server part of addons and services have access to secrets and may use them as needed.

Example:

```json
"secrets": {
  "secret_api_key": "123456789abcd"
}
```

In this example, a `secret_api_key` is stored within the `secrets` key. 
This secret can be accessed by the server and addons, but will not be exposed to the users.


## Roles

User roles define the level of access and permissions a user has within a project. 
Each role allows whitelisting certain rights to perform specific actions, 
such as reading, creating, updating, and deleting project resources.

If not provided, default roles "artist", "viewer" and "editor" are created.

### Role definition example

The following example demonstrates how to create a single role named "artist".
This role grants users the ability to read and update subfolders, 
but only if the user has tasks assigned on a parent folder.

```json
"roles" : [
  {
    "name": "artist",
    "data": {
      "read": {
        "enabled": true,
        "access_list": [{ "type": "assigned"}]
      },
      "create": {
        "enabled": true,
        "access_list": []
      },
      "delete": {
        "enabled": true,
        "access_list": []
      },
      "update": {
        "enabled": true,
        "access_list": [{ "type": "assigned"}]
      }
    }
  }
]
```

For more information on the role data structure, please refer to the API documentation.


### Users

The `users` key is used to define user accounts for the Ayon server. 
The value of this key is an array of dictionaries, with each dictionary representing a user account.

If the `users` key is not provided in the `template.json` file, 
a default administrator with the username `admin` and password `admin` will be created.


```json
"users": [
  {
    "name": "admin",
    "password": "admin",
    "fullName": "Ayon admin",
    "isAdmin": true,
    "forceUpdate": true
  }
]
```

#### `forceUpdate` (boolean)

Ensures that the setup command will always update 
the existing user with the information from the `template.json` file, including the password.

#### `fullName` (string)

Represents the full name of the user.

#### `email` (string)

Represents the user's email address, which is used for authentication and communication purposes.

#### `avatarUrl` (string)

Contains the URL of the user's avatar image.

#### `isManager` (boolean)

Indicates if the user is a manager. 
A manager has elevated privileges within the server.

#### `isAdmin` (boolean)

Indicates if the user is an administrator. 
An administrator has the highest level of access and control within the server.

#### `isService` (boolean)

Indicates if the user is a service account. 
A service account should be only used by addon services and it should be authenticated
using an API key.

#### `isGuest` (boolean)

Indicates if the user is a guest.

#### `password` (string)

Represents the user's password. This field is required for authentication purposes.

#### `apiKey` (string)

Contains the API key associated with service users. 
This key is used when a service interacting with the server through the API.

#### `defaultRoles` (array of strings)

Lists the roles assigned to the user on new projects. 
These roles determine the user's privileges and access levels within a project.

Example:

```json
"defaultRoles": ["artist"]
```

#### `roles`

Lists the roles assigned to the user on particular projects. 

Example:

```json
"roles": {
  "example_project1": ["artist"],
  "example_project2": ["artist", "viewer"]
}
```



