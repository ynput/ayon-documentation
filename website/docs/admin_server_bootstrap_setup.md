---
id: admin_server_bootstrap_setup
title: Bootstrap setup 
sidebar_label: Bootstrap setup
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

The `settings` key is used to specify particular settings for an addon. It is possible to configure multiple versions of each addon using this key. The value of this key is a dictionary containing the addon names as keys, and another dictionary as values with the addon version number as the key and the settings for that version as the value.

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

In this example, the `ftrack` addon's version `1.0.0` is configured with a custom `server_url` setting. Multiple versions of the same addon can be configured by adding additional version numbers with their respective settings within the addon dictionary.

### Secrets

The `secrets` key is used for storing sensitive information that the server and addons have access to. Since settings are sent to clients, secrets provide a way to hide sensitive data from users. Both the server part of addons and services have access to secrets and may use them as needed.

Example:

```json
"secrets": {
  "secret_api_key": "123456789abcd"
}
```

In this example, a `secret_api_key` is stored within the `secrets` key. This secret can be accessed by the server and addons, but will not be exposed to the users.


### Users

The `users` key is used to define user accounts for the Ayon server. The value of this key is an array of dictionaries, with each dictionary representing a user account.

Example:

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

In this example, a user account named `admin` with the password `admin` is created. The `fullName` key specifies the user's display name, and the `isAdmin` key indicates whether the user has administrative privileges.

If the `users` key is not provided in the `template.json` file, a default admin user with the username `admin` and password `admin` will be created.

The `forceUpdate` key, when set to `true`, ensures that the `make setup` command will always update the existing user with the information from the `template.json` file, including the password.


## Security Considerations

Using the bootstrapped settings is particularly useful during the testing phase of your Ayon server. However, once the server is properly set up and configured, it is strongly recommended to remove the `settings/template.json` file.

The reason for this recommendation is that the `template.json` file may contain sensitive information, such as secrets and passwords, in plain text. Storing these credentials in an unsecured manner poses a security risk, as unauthorized users may gain access to the server's sensitive data.
