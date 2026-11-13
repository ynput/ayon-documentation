---
title: AYON REST API
sidebar_label: REST API
description: Information about AYON Rest API
toc_max_heading_level: 5
---

REST is a short name for `RESTful` which is a programming interface that allows you to communicate with web servers via `HTTP` requests to access and use data.
HTTP requests include `POST` (create), GET (read), `PUT` (update) and DELETE data.

These 4 types of requests form the famous terminology `CRUD`: Create, Read, Update and Delete.

The AYON REST API works with the resources of an AYON server: for example, it lists or creates projects and users, and uploads or downloads AYON launcher installers, addons and dependency packages.

<Cards variant="compact">
<Card icon="api" title="REST API reference" href="/api">
Every endpoint of the AYON server, also under REST API in the top bar.
</Card>
</Cards>

<Columns widths="65 35">
<Column>

Every AYON server also has its own reference, which includes the endpoints that its addons add (see [Endpoints](../addon-development/server.md#endpoints)):

- **Where:** `<your-ayon-server-url>/docs`, or **REST API** in the Help menu of the web app, which shows it at `/doc/api`.
- **Who:** managers and admins, by default.

See [REST API](../../ayon/web-ui/rest-api.md) in the Web UI section.

</Column>
<Column>

![](../assets/apis_and_resources/rest_api_docs.png)

</Column>
</Columns>

## Authentication Headers

Almost all endpoints are private and require authentication, even if it's not explicitly mentioned in the [AYON REST API Docs](/api).

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
   
![](../assets/apis_and_resources/rest_login.png)

### Get list of projects
> You'll need the token from the last call.
 
1. write a login request: `<your-ayon-server-url>/api/projects`
2. Add your token
3. Send
4. Find the available projects.

![](../assets/apis_and_resources/rest_get_projects.png)

## Conclusion

The REST API returns raw data meant for programs, not for people. Scripts usually wrap its calls in functions that do one task, such as listing the project names, and process the response. The [Python API](python.md) already does this for most endpoints, for example `ayon_api.get_projects()`.

More ways to call the REST API are in the forum guide [AYON REST API Guide](https://community.ynput.io/t/ayon-rest-api-guide/1268).
