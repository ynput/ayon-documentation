---
id: dev_api_rest
title: AYON REST API
sidebar_label: REST API
description: Information about AYON Rest API
toc_max_heading_level: 5
---

## What is a REST API?

REST is a short name for `RESTful` which is a programming interface that allows you to communicate with web servers via `HTTP` requests to access and use data.
HTTP requests include `POST` (create), GET (read), `PUT` (update) and DELETE data.

These 4 types of requests form the famous terminology `CRUD`: Create, Read, Update and Delete.

## AYON REST API

You can use `AYON REST API` to manipulate AYON Resources.
e.g. you can use it to get a list of projects or create new projects, get a list of current users or add users and manage resources e.g. download or upload AYON Launcher, addons and dependency packages.

Each AYON server generates docs for its REST API as they can be extended via [Addons Devolvement](dev_addon_creation.md#end-points)

You access the REST API Docs via `<your-ayon-server-url>/api` or via help icon.

![](assets/apis_and_resources/rest_api_docs.png)

For instance, you can check the REST API Docs for our Public AYON Server here at [AYON REST API Docs](/api).

## Authentication Headers

Almost all endpoints are private and require authentication, even if it's not explicitly mentioned in the [AYON REST API Docs](https://www.google.com/search?q=/api).

### Access as a User
This method expects a **Bearer token**, which you typically get by logging in with a username and password. You can find an example of this in the [Your First AYON API Call](#your-first-ayon-api-call) section.
```json
{
  "Authorization": "Bearer 07a8fd2050250309fdeb5530bb24e875e095ba031058ba8bb75ffb2760a0f64b"
}
```

### Access as a Service User
This method expects an [AYON API key](https://help.ayon.app/en/help/articles/6698141-user-management#klrl452c446). You set the `X-Api-Key` header to your **AYON API Key**.
```json
{
  "X-Api-Key": "veryinsecureapikey"
}
```
Optionally, you can add the `X-as-user` header and specify a user name to act as that user.
```json
{
  "X-Api-Key": "veryinsecureapikey",
  "X-as-user": "admin"
}
```

:::info

The `X-Api-Key` header can accept both an **API key** and a **Bearer token** interchangeably.

```json
{
  "X-Api-Key": "07a8fd2050250309fdeb5530bb24e875e095ba031058ba8bb75ffb2760a0f64b"
}
```
:::

## Your First AYON API Call

:::tip
Examples in this section were brought from the following Community guide.
Feel free to check it and delve into discussions.

[AYON REST API Guide](https://community.ynput.io/t/ayon-rest-api-guide/1268)
:::

Let's do our first api calls where we will login into AYON and get a list available projects.
For this purpose consider using a REST client such as [postman](https://www.postman.com/) or [VsCode Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client).

For the following example, I'll stick to `VsCode Thunder Client`.

### Login into AYON
1. Write a login request: `<your-ayon-server-url>/api/auth/login`
2. Add name and password
3. Send
4. Find the token.
   
![](assets/apis_and_resources/rest_login.png)

### Get list of projects
> You'll need the token from the last call.
 
1. write a login request: `<your-ayon-server-url>/api/projects`
2. Add your token
3. Send
4. Find the available projects.

![](assets/apis_and_resources/rest_get_projects.png)

### Conclusion
As you may have noticed, using the API, sending and processing the data is not meant to be read and processed by Humans. 
we should do that with the aid of scripts where we can deal with them from a higher perspective where we can use a command like `get_projects_names` and it should use the proper API call and process the output for us.
and, that's why REST API is called a programming interface.

:::tip
While AYON REST API solely doesn't process the data for us.
You would need to write the essential code to make the API call
and then process the data before displaying it for you.
For example check [AYON REST API Guide](https://community.ynput.io/t/ayon-rest-api-guide/1268) to
explore different ways to make REST API calls.
:::
