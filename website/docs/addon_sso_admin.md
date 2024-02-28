---
id: addon_sso_admin
title: Single Sign-On addon
sidebar_label: Single Sign-On
---

The SSO Addon offers seamless single sign-on capabilities, 
allowing users to access the system with their existing accounts 
from various service providers. 

Currently, we support Google and Discord, but thanks to the addon's modular design, 
integrating additional providers is straightforward, 
promising easy scalability to meet evolving user needs.

This addon requires a valid license. See [https://ynput.io/ayon/pricing/](https://ynput.io/ayon/pricing/)
for more information.

Google
------

For authentication using google, you need to create OAuth2 credentials in 
[Google cloud console](https://console.cloud.google.com/)

- In the APIs & Services page of your project, select "Credentials" from the sidebar
- Create credentials with OAuth Client ID
- Set Application type to "Web application"
- Set a name and add `https://yourserver` to **Authorized JavaScript origins** list
- Add `https://yourserver/login/google` to **Authorized redirect URIs** list
- If needed, configure OAuth consent screen. In most cases, you could use "Internal" mode

Please follow [this tutorial](https://support.google.com/cloud/answer/6158849?hl=en) for more details.

Copy **client id** and **client secret** and store them to Ayon secrets as `google_sso_client_id` and 
`google_sso_client_secret`.

In the SSO Addon settings, enable "Google" and add your domain to the **Allowed domains** list.

By default, only users with existing Ayon accounts can log in. 
However, you have the option to activate the "New Users" functionality, 
enabling automatic creation of user accounts. 

This feature permits entry for new users from authorized domains and automatically assigns them the role 
outlined in the "New Users" section. It's important to note that user levels and default access groups 
are assigned just once to new users. Therefore, an administrator has the flexibility 
to modify a user's role within Ayon's user management system. 
Subsequent logins by the user will reflect their updated role.

After restarting the server and logging out, you will see a new "Log in using Google" button on the login page.

Discord
-------

- Start a new [Discord application](https://discord.com/developers/applications)
and create OAuth2 client and secrets
- Add `https://yourserver/login/discord` to a valid redirect url list
- In Ayon secrets, create `discord_sso_client_id` and `discord_sso_client_secret` records with values you got during app creation
- In SSO Addon settings, turn on "Discord"

After restarting the server and logging out, you will see a new "Log in using Discord" button on the login page.

Due to privacy concerns, Discord only support sign-in for users that already exist in Ayon.
Users are matched by their email address and their profiles are not updated in any way.
