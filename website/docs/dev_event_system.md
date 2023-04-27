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

## Event object

An event is the primary unit of the event system. Each event may contain the following attributes:

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


#### project

Name of the project event is scoped to. 

Note that there is no strict relation between this field and actual project name in the database.
This enables to keep the event in the database even if the project is deleted.

#### user

Name of the user who created (or is responsible for) the event.

Note that there is no strict relation between this field and actual user name in the database.
This enables to keep the event in the database even if the user is deleted.

#### sender

#### depends_on

The event ID (if any) that initiated the current event, establishing a parent-child relationship between events.

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


#### payload

#### created_at

#### updated_at

#### progress

The percentage of completion for the event.

The value is NOT stored in the database, but when `update_event` with `progress` attribute is called, the value is 
broadcasted using websocket connection to the connected clients - this may be used to update progress indicators in the UI.


## Event Management

The Ayon server event system offers various methods for managing events, including:

### Dispatching events

Events may be created using `dispatch_event` function in python or via `[POST] /api/events` REST endpoint.
At least `topic` must be specified in order to dispatch a new event.


### Updating Events

Events can be updated by modifying their attributes, such as state and progress, to reflect the current status of the associated process.

### Deleting events

Users can delete events from the system, removing them from the database (for persistent events).

### Querying Events

The event system allows users to query events based on their attributes, such as topic, project, user and so on.

Querying is available using GraphQL

### Enroll

