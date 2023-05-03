---
id: dev_event_system
title: Event system
sidebar_label: Event system
---


Ayon server event system is a robust feature designed to facilitate various tasks such as logging, 
job control, audit trails, dependency management, and more. 

This document provides an overview of the event system and its components.

## Overview

The event system is comprised of individual events, each with its own unique set of attributes and methods for handling payloads. 
Events are organized by their topics, states, progress, and parent relationships. 

The event system also provides a set of functions for creating, updating, and deleting events,
as well as querying events based on their attributes.

### Event types

#### Persistent events

These events are stored in the database, allowing for a persistent record and easy retrieval for future reference. 
Persistent events are suitable for logging, job control, audit trails, and handling dependencies.

#### Fire-and-Forget Events

This type of event does not require storage in the database. 
Instead, they are used for server-to-client or client-to-client notifications, alerts, and requests to update the user interface. 

Fire-and-forget events are transmitted to connected clients using a WebSockets connection.

### Event data

#### id

The automatically assigned event ID ensures that each event is uniquely identifiable, 
This ID is generated upon the creation of a new event and remains associated with the event throughout its lifecycle.

#### hash

An additional unique key that can be explicitly assigned by the endpoint or service responsible for creating the event. 
The event hash is used to prevent duplicate events originating from the same source.

For example, a service that generates events from an external event system (for example ftrack) may use a checksum 
of its own topic combined with the external source ID as the event hash. 

This approach of using event hashes guarantees that duplicate events will not be created 
even if multiple instances of the same service (collecting the same data) run simultaneously.

#### topic

Topic is the only field which is required to provide, when a new event is created.

There are several built-in topics:

 - `entity.{entity_type}.created`
 - `entity.{entity_type}.data_changed`
 - `entity.{entity_type}.label_changed`
 - `entity.{entity_type}.type_changed`
 - `entity.{entity_type}.thumbnail_changed`
 - `entity.{entity_type}.active_changed`
 - `entity.{entity_type}.deleted`
 - `entity.task.assignees_changed`
 - `entity.subset.family_changed`
 - `entity.version.author_changed`
 - `entity.representation.files_changed`
 - `log.debug`
 - `log.info`
 - `log.warning`
 - `log.error`
 - `log.success`
 - `server.restart_requested`
 - `settings.changed`
 - `settings.deleted`

They are dispatched by the server, usually as a response to user action (calling a rest endpoint).
Addons may use their own topics. In that case, it is recommended to prefix the topic with the addon name.

#### Description

A short, human-readable overview of the event. 
This one-line description is displayed in the event viewer table and should not 
contain sensitive information or entity IDs, as they might be confusing or misleading to users.

#### Summary

An event summary is a JSON object that encapsulates the most critical information about the event. 
It provides a concise representation of the event data, allowing for quick reference and analysis.

For example, an event with the topic `entity.folder.created` might contain a summary like this:

```json
{
  "id": "ID_OF_THE_NEW_CREATED_FOLDER"
}
```

The structure (model) of the event summary must remain consistent within the same topic, 
ensuring that any system components or clients handling the event can rely on the data format.

#### payload

The payload is a JSON object that contains the event data. Payload is only accessible via REST API.

The structure (model) of the event payload must remain consistent within the same topic, 
ensuring that any system components or clients handling the event can rely on the data format.

#### project

Name of the project event is scoped to. 

Note that there is no strict relation between this field and actual project name in the database.
This enables to keep the event in the database even if the project is deleted.

#### user

Name of the user who created (or is responsible for) the event.

Note that there is no strict relation between this field and actual user name in the database.
This enables to keep the event in the database even if the user is deleted.

#### sender

Sender ID is a unique identifier used to tag events dispatched by a process. 
It helps track the origin of events and enables the originating process to recognize 
its own messages when they are returned through a WebSocket stream.

The Sender ID can be the name of the service that generated the event or 
in a web-based application, the Sender ID can be the identifier of the browser tab that initiated the action.

#### depends_on

The event ID (if any) that initiated the current event, establishing a parent-child relationship between events.
This is explained in depth in the **enroll** section of this document

#### status

The current status of the event, represented by one of the following values:

- `pending`
- `in_progress`
- `finished`
- `failed`
- `aborted`
- `restarted`

By default, events are created with the `finished` state, which is suitable for one-shot events such as log messages. 
To create an event with a `pending` state, pass `finished=False` to the `dispatch_event` function. 
To update the status of an event, use the `update_event` function and set the status to the appropriate consecutive values.

#### retries

Number of times the event has been retried.

#### created_at

Timestamp of the event creation.

#### updated_at

Timestamp of the event last update.

#### progress

The percentage of completion for the event.

The value is NOT stored in the database, but when `update_event` with `progress` attribute is called, the value is 
broadcasted using websocket connection to the connected clients - this may be used to update progress indicators in the UI.

## Event Management

The Ayon server event system offers various methods for managing events, including:

### Dispatching events

Events may be created using `dispatch_event` function in python or via `[POST] /api/events` REST endpoint.
At least `topic` must be specified in order to dispatch a new event.

By default, dispatched events are persistent (stored in the database). In order to create Fire-and-forget event, 
set the `store` argument of `dispatch_event` function (or respective REST counterpart) to False.

### Updating Events

Events can be updated by modifying their attributes, such as state and progress, to reflect the current status of the associated process.

### Deleting events

Users can delete events from the system, removing them from the database (for persistent events).

### Querying Events

The event system allows users to query events based on their attributes, such as topic, project, user and so on.

Querying is available using GraphQL API.

## Enroll Endpoint

The enroll endpoint can be used by services to request a new job for processing.

Each job consists of a source event and a target event. 
The source event is the event that triggered the job, while the target event is the event that should be created as a result of the job.

To use this endpoint, the service must provide the source and target event topics. 
If there isn't already an existing event with the specified target topic for the same source event, 
a new event will be created and returned.


### Example scenario

A smart coffe maker running Ayon service hosts brews coffee for the user each time a folder is approved.

The service periodically calls the enroll endpoint and when a new event with topic `entity.version.status_changed` is emmited,
and the new status is `Approved`, a new event is created.

Services are language-agonstic, so any language or library may be used.
This is a minimal example using python `requests` library. 

```python
import time
import requests

from .config import config

def main():
    session = requests.session()
    session.headers.update(
        {
            "Content-Type": "application/json",
            "X-Api-Key": config.api_key,
        }
    )

    while True:
        time.sleep(2)

        # Enroll to the event
        # Pass an additional filter to only receive events where the folder status is "Approved".
        # For more information on filtering, see /api/query documentation

        req = {
            "sourceTopic": "entity.folder.status_changed",
            "targetTopic": "example.brew_coffee_on_approve",
            "sender": config.service_name,
            "description": "Preparing to brew coffee on folder approval",
            "filter": {
                "conditions": [
                    {
                        "key": "payload/newValue",
                        "value": "Approved",
                    }
                ]
            }
        }

        try:
            res = session.post(f"{config.server_url}/api/enroll", json=req)
        except Exception as e:
            print(e)
            continue

        # If there's nothing to do, just continue
        if res.status_code != 200:
            continue

        enroll_data = res.json()

        # If the status code is 200, the event was enrolled successfully, and the response
        # contains the event id and the id of the event it depends on.
        # The new event is created in the "pending" state.

        source_event_id = enroll_data["dependsOn"]
        target_event_id = enroll_data["id"]

        # Load the source event data
        source_event = session.get(f"{config.server_url}/api/events/{source_event_id}").json()
        project_name = source_event["project"]
        user_name = source_event["user"]

        session.patch(
            f"{config.server_url}/api/events/{target_event_id}", 
            json={
                "status": "in_progress",
                "description": f"Brewing coffee for {user_name}...",
                "project": project_name,
            }
        )

        # Insert your coffee brewing code here
        # You can use the same patch request to update the progress
        print(f"Brewing coffee for {user_name}...")
        time.sleep(10)

        # Mark the event as finished
        session.patch(
            f"{config.server_url}/api/events/{target_event_id}",
            json={
                "status": "finished",
                "description": f"Coffee for {user_name} brewed successfully",
            }
        )


if __name__ == "__main__":
    main()
```

