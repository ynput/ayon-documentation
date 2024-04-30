---
id: addon_slack_admin
title: Slack Admin Docs
sidebar_label: Slack
---

import ReactMarkdown from "react-markdown";
import versions from '@site/docs/assets/json/Ayon_addons_version.json'

<ReactMarkdown>
{versions.Slack_Badge}
</ReactMarkdown>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


This module allows configuring profiles(when to trigger, for which combination of task, host and family)
and templates(could contain {} placeholder) to send notification to Slack channel(s)
whenever configured asset type is published.


## App installation

Slack application must be installed to company's Slack first. 

Please locate `ayon/modules/slack/manifest.yml` file in deployed AYON installation and follow instruction at
https://api.slack.com/reference/manifests#using and follow "Creating apps with manifests".

### App icon

If you would like to enrich bot with an icon, Slack admin must add the icon after app installation. 

Go to your Slack app home (something like https://api.slack.com/apps/XXXXXXXX/general?) > Basic information > Display Information.
You can upload any image you want, or for your convenience locate prepared AYON icon in your installed AYON installation in `ayon\modules\slac\resources`.

## Settings

If Slack addon is enabled on the server, admin can configure notification for all project (`User menu > Settings > Studio Settings`)
or per project (`Project menu > select project > Manage projects > Project Settings`)

### Token
Most important for module to work is to fill authentication token 
```Project settings > Slack > Publish plugins > Token```

This token should be available after installation of the app in the Slack dashboard.
It is possible to create multiple tokens and configure different scopes for them.

![Get token](assets/slack_token.png)

### Profiles
Profiles are used to select when to trigger notification. One or multiple profiles
could be configured, `Families`, `Task names` (regex available), `Host names`, `Product names` (regex available) combination is needed.

Eg. If I want to be notified when render is published from Maya, setting is:

- family: 'render'
- host: 'Maya'

### Messages to channels

#### Channels
Multiple messages could be delivered to one or multiple channels, by default app allows Slack bot
to send messages to 'public' channels (eg. bot doesn't need to join the channel first).

![Configure module](assets/slack_project.png)

#### Upload thumbnail
Integration can upload 'thumbnail' file (if present in an instance), for that bot must be 
manually added to each target channel by Slack admin first!
(In target channel write: ```/invite @ayonNotifier``)

#### Upload review
Integration can upload 'review' file (if present in an instance), for that bot must be 
manually added to each target channel by Slack admin first!
(In target channel write: ```/invite @ayonNotifier``)

This option is limited by `Upload review maximum file size` value in `Profiles` section. It might make sense to limit uploading
of reviews only up to certain size. If the review file hits that limit, only link to studio accessible location will be inserted instead.

Burnin version of the review (usually .mp4) is preferred if present.

Please be sure that this configuration is viable for your use case. In case of uploading large reviews to Slack, 
all publishes will be slowed down and you might hit a file limit on Slack pretty soon (it is 5GB for Free version of Slack, any file cannot be bigger than 1GB).
You might try to add `{review_filepath}` to message content instead of using `Upload review`. This link might help users to find review easier on their machines.
(It won't show a playable preview though!)

#### Message
Message content can use Templating (see [Available template keys](admin_settings_project_anatomy#available-template-keys)).

Few keys also have Capitalized and UPPERCASE format. Values will be modified accordingly ({Asset} >> "Asset", {FAMILY} >> "RENDER").

**Additional implemented keys:**
- review_filepath

##### Message example
```
{Product} was published for {ASSET} in {task[name]} task.

Here you can find review {review_filepath}
```

##### Dynamic message for artists
If artists uses host with implemented Publisher (new UI for publishing, implemented in Tray Publisher, Adobe products etc), it is possible for
them to add additional message (notification for specific users for example, artists must provide proper user id with '@').
Additional message will be sent only if at least one profile, eg. one target channel is configured.
All available template keys (see higher) could be used here as a placeholder too.

#### User or group notifications
Message template or dynamic data could contain user or group notification, it must be in format @artist.name, '@John Doe' or "@admin group" for display name containing space.
If value prefixed with @ is not resolved and Slack user is not found, message will contain same value (not translated by Slack into link and proper mention.)

#### Message retention
Currently no purging of old messages is implemented in AYON. Admins of Slack should set their own retention of messages and files per channel.
(see https://slack.com/help/articles/203457187-Customize-message-and-file-retention-policies)