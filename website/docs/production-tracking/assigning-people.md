---
title: Put the right people on it
sidebar_label: Assigning people
description: "Getting people onto the work of an AYON project: who can work on a project, teams with roles and leaders, assigning tasks one by one or in bulk, how artists find their assignments and hear about them, and handing work over from one person to another."
verified: 2026-11-17
---

# Put the right people on it

<!-- screenshot: Task progress of wing_it with the lighting tasks of the 020_tryout sequence selected and the assignee menu open -->

A task with no assignee is work nobody is doing. Assigning people turns the breakdown into a plan of who does what: it fills each artist's task list, tells them about new work, and lets producers see the load of each person. In AYON a task can have several assignees, and an assignment can be changed at any time, so work moves between people as the production needs. How much each person can take on, and when, is planned with the Planner; see [Planning](planning.md).

## Give people access to the project

<!-- screenshot: Project access tab with wing_it selected, the All users pane and the artist access group panel -->

Only people who can open a project can be assigned to its tasks. Admins and managers can open every project. Other users can open a project once they have an access group in it, given on the [Project access](../ayon/web-ui/project/project-access.md) tab, and only they appear in the assignee menus of that project, together with admins and managers. The access group also decides what each person can see and change in the project, for example only the folders that hold tasks assigned to them. See [Control who sees what](access.md) and [Permissions](../ayon/how-ayon-works/permissions.md).

Access groups can be given in several projects in one step, for example to put a new artist on every running show. A studio can also set default access groups for each user, which are given to them in every new project when it is created.

## Organize people into teams

<!-- screenshot: Teams tab of wing_it with the lighting team selected: its members, their roles and the leader shown in green -->

[Teams](../ayon/web-ui/project/teams.md) group the people of a project, for example by department or by vendor. Each member can have roles, such as `lighter` or `supervisor`, and a team can have one or more leaders. Teams make the structure of the crew visible: the project's details on Home list each team with its leaders and members, so anyone can see who leads lighting on a show.

Teams are also used to reach people:

- A comment can mention a whole team, and every member gets the message in their inbox.
- With the [Power Pack](../addons/production-tracking/power-pack/index.md), access lists such as comment categories, shared views and list access can name a team instead of each person.

Roles and leaders describe people; they grant no permissions. Tasks are assigned to people, not to teams.

## Assign tasks

<!-- screenshot: Overview of wing_it filtered to unassigned compositing tasks, with several Assignees cells selected and the assignee menu open -->

Assignees can be set wherever tasks are listed: in the cells of the [Project overview](../ayon/web-ui/production-tracking/overview.md), on the cards of [Task progress](../ayon/web-ui/production-tracking/task-progress.md) and in the [details panel](../ayon/web-ui/details-panel.md). With several tasks selected, one change applies to all of them. This makes assignment a bulk task rather than a task-by-task one:

- In the Overview, filtering the tasks with no assignee shows the work nobody has yet, and grouping by task type or folder shows where it is.
- In Task progress, selecting a column of cards, such as every lighting task of a sequence, assigns a lighter to all of them at once. With several tasks selected, adding or removing a person changes only that person on each task; their other assignees stay.

Assignees can also be part of a [hierarchy template](../addons/production-tracking/power-pack/index.md#hierarchy-templates) with the Power Pack, so a standard set of tasks comes with its usual people.

## How artists see their work

<!-- screenshot: Home tasks of one wing_it artist as a board by status, with a new assignment in Ready to start -->

An assigned artist finds the task in three places:

- **Home tasks:** the landing page of the web app shows the tasks assigned to the user across projects, as a board by status or as a list. See [Home tasks](../ayon/web-ui/home/tasks.md).
- **Inbox:** an assignment, and a removal from a task, sends a message to the **Important** tab of the [inbox](../ayon/web-ui/inbox/important.md), which can also notify with a desktop notification or a sound.
- **Launcher:** with the pipeline, the my tasks filter of the [Launcher](../pipeline/launcher.md) shows only the tasks assigned to the artist, ready to open in an application.

An assigned artist also becomes a watcher of the task, so comments, reviews and published versions on it reach their inbox from then on. See [Watchers](../ayon/web-ui/inbox/index.md#watchers).

## Hand work over

<!-- screenshot: Home tasks showing the boards of two wing_it artists side by side, grouped by assignee -->

People leave a show, go on holiday or get overloaded, and their work has to move to someone else. Producers and coordinators can open Home tasks for other users, or for all users, and see each person's tasks by status, to find someone with too much in progress or the open tasks of someone who is leaving. Changing the assignee of those tasks, one by one or in bulk, moves them to the new person's board and sends them the assignment message.

The history stays with the task. Its activity feed keeps the earlier comments, versions and assignee changes, so the new assignee sees what was done and what the notes were, without a separate handover document.

## Related

- [Project access](../ayon/web-ui/project/project-access.md)
- [Teams](../ayon/web-ui/project/teams.md)
- [Task progress](../ayon/web-ui/production-tracking/task-progress.md)
- [Home tasks](../ayon/web-ui/home/tasks.md)
- [Inbox and notifications](../ayon/web-ui/inbox/index.md)
- [Production workflow](../ayon/how-ayon-works/production-workflow.md#3-assign-people-and-statuses)
- [Planning](planning.md)
