---
title: Contribute to AYON development
sidebar_label: Contribute
description: "How to contribute to AYON: where to start a discussion or report a bug, and the branch, pull request and commit conventions of the addon repositories and of the server repositories."
verified: 2026-11-13
sources:
  - https://github.com/ynput/ayon-core/blob/develop/.pre-commit-config.yaml
  - https://github.com/ynput/ayon-core/blob/develop/.github/pull_request_template.md
  - https://github.com/ynput/ayon-core/blob/develop/.github/pr-branch-labeler.yml
  - https://github.com/ynput/ayon-core/blob/develop/.github/workflows/validate_pr_labels.yml
  - https://github.com/ynput/ayon-core/blob/develop/.github/workflows/pr_linting.yml
  - https://github.com/ynput/ayon-core/blob/develop/AGENTS.md
  - https://github.com/ynput/ops-repo-automation/blob/main/.github/workflows/validate_pr_labels.yml
  - https://github.com/ynput/ayon-backend/blob/develop/CONTRIBUTING.md
  - https://github.com/ynput/ayon-backend/blob/develop/.github/pull_request_template.md
  - https://github.com/ynput/ayon-frontend/blob/develop/CONTRIBUTING.md
---

# Contribute to AYON development

AYON is split into many repositories under [github.com/ynput](https://github.com/ynput). The conventions differ between the addon repositories and the server repositories.

## Where to start

| Goal | Where |
|---|---|
| Discuss an idea or ask a question | The [community forum](https://community.ynput.io/) or the [Discord server](https://discord.gg/ynput) |
| Request a feature | The [feedback portal](https://feedback.ayon.app/) |
| Report a bug | The GitHub issues of the relevant repository, for example [ayon-core](https://github.com/ynput/ayon-core/issues) or [ayon-maya](https://github.com/ynput/ayon-maya/issues). Search the existing issues first |
| Send a fix or a change | A pull request on the relevant repository |

For a larger change, a discussion on the forum first avoids duplicate work.

## Addon repositories

These rules apply to ayon-core and the addon repositories (`ayon-maya`, `ayon-deadline`, ...). ayon-core has no `CONTRIBUTING.md`; its [AGENTS.md](https://github.com/ynput/ayon-core/blob/develop/AGENTS.md) summarizes the rules.

| Topic | Rule |
|---|---|
| Target branch | `develop` |
| Branch name (ayon-core) | `<type>/<name>`, where type is `release`, `enhancement`, `feature`, `bugfix`, `documentation`, `tests`, `local` or `chore`. A pre-commit hook rejects commits on other branch names |
| Pull request description | The ayon-core template has the sections **Changelog Description**, **Additional info** and **Testing notes** |
| Labels | The `validate_pr_labels.yml` workflow fails without a label starting with `type: `. In ayon-core, branches named `feature/`, `enhancement/` and `bugfix/` get `type: feature`, `type: enhancement` and `type: bug` automatically |
| Linting | The `pr_linting.yml` workflow runs ruff on pull requests to `develop`, see [Code style](requirements.md#code-style) |
| Tests | ayon-core runs its unit tests on pull requests, see [Pipeline testing](pipeline-testing.md#addon-unit-tests) |

:::tip Pre-commit hooks
In ayon-core, `./tools/manage.sh create-env` creates the environment and installs the pre-commit hooks (`uv run pre-commit install`), which check the branch name, codespell and ruff before each commit.
:::

## Server repositories

[ayon-backend](https://github.com/ynput/ayon-backend) and [ayon-frontend](https://github.com/ynput/ayon-frontend) follow their `CONTRIBUTING.md`: [backend](https://github.com/ynput/ayon-backend/blob/develop/CONTRIBUTING.md), [frontend](https://github.com/ynput/ayon-frontend/blob/develop/CONTRIBUTING.md). Both target `develop`.

| Topic | Rule |
|---|---|
| Branch name | The issue number and a short name, lowercase and hyphen-separated, as suggested by the GitHub "create branch" button, for example `1234-fix-bug`. No prefixes such as `feature/` or `bugfix/`. Branches without an issue use a descriptive name, for example `fix-bug-in-auth` |
| Commits | Semantic commits: `<type>(<scope>): <summary>`, with type `build`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor` or `test`, for example `fix(auth): fix session expiration` |
| Pull request description | The ayon-backend template has a checklist (description, linked issue) and the sections **Description of changes**, **Technical details** and **Additional context** |

The frontend `CONTRIBUTING.md` also asks to keep a pull request as a draft while work is in progress and has UI rules. [ayon-docker](https://github.com/ynput/ayon-docker), which builds the server image, uses `main` as its default branch.
