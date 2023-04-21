---
id: dev_contribute
title: Contribute to AYON development
sidebar_label: Contribute
---

Thanks for taking the time and effort to contribute back to Ayon!

We follow a set of rules to ensure the project is in a healthy state and avoid duplicating efforts or avoid unnecessary development, in oreder to achieve that if you **found a bug** or are thinking on **developing** a new feature it's highly encouraged that you check with the community first:
 - [Ynput Community](https://community.ynput.io/): Open forums where all things Ayon are discussed, best place to propose new features or ask questions about the project.
 - [Discord](https://discord.gg/ynput): Discord Server for a more asyncronous conversation and memes.

After checking with the above, situations that might arise:

## You want to extend Ayon with a new feature
- Open a new thread in the [Ynput Community](https://community.ynput.io/)
- Do not open issue until the suggestion is discussed. We will convert accepted suggestions into backlog and point them to the relevant discussion thread to keep the context. Then depending on the outcome of the conversations you can then:
    - Open a [Github Issue](#you-found-a-bug)
    - Open a [Github Pull Request](#you-wrote-a-patch-that-fixes-a-bug)

## You found a bug
1. Check in the [Github Issues](https://github.com/ynput/OpenPype/issues) to make sure it wasn't reported already.
2. If it is a bug, you'll be asked to Create a new [Github Issue](https://github.com/ynput/OpenPype/issues/new/choose).
3. Bonus: Make a [Pull Request? :)](#you-wrote-a-patch-that-fixes-a-bug)


## You wrote a patch that fixes a bug
1. Open a new [GitHub Pull Request](https://github.com/ynput/OpenPype/compare) with the patch against the `develop` branch .
2. Ensure the PR description clearly describes the problem and solution and instructions to test the patch. Include the relevant issue number if applicable.

We might also change the target of you PR to and intermediate branch, rather than `develop` if we feel it requires some extra work on our end. That way, we preserve all your commits so you don't lose out on the contribution credits.


## Contribution Guidelines

### Branching Strategy

Ayon loosely follows Git Flow for branching, and there are three important (protected) branches:
- `main` - Production branch with the latest stable realase. Each release being a new tag.
- `develop` - Development branch, all Pull Requests target this branch.
- `release/3.x.x` - Testing branch for a release, once a release branch is created, no new features are accepted for the given release.

When creating new branches from `develop` follow these naming:
 - `feature/{Issue#}-{Issue_name}` - Development of new features
 - `bugfix/{Issue#}-{Issue_name}`- Striclty for bugfixes.
 - `hotfix/{Issue#}-{Issue_name}`- Production critical hotfixes (always branched from `main`).


