---
id: admin_server_configuration
title: Server configuration
sidebar_label: Server configuration
---

This documentation provides detailed information about each configuration option available for the Ayon server. 
Configuration parameters can be set through environment variables, prefixed with `AYON_`.

### HTTP Server Settings

- **HTTP Listen Address**
  - Environment Variable: `AYON_HTTP_LISTEN_ADDRESS`
  - Default: `0.0.0.0`
  - Description: An address the API server listens on.

- **HTTP Listen Port**
  - Environment Variable: `AYON_HTTP_LISTEN_PORT`
  - Default: `5000`
  - Description: A port the API server listens on.

### Directory Paths

- **API Modules Directory**
  - Environment Variable: `AYON_API_MODULES_DIR`
  - Default: `api`
  - Description: Path to the directory containing the API modules.

- **Addons Directory**
  - Environment Variable: `AYON_ADDONS_DIR`
  - Default: `/addons`
  - Description: Absolute path to the directory containing the addons.

- **Frontend Directory**
  - Environment Variable: `AYON_FRONTEND_DIR`
  - Default: `/frontend`
  - Description: Path to the directory containing the frontend files.

### Authentication Settings

- **Authentication Password Pepper**
  - Environment Variable: `AYON_AUTH_PASS_PEPPER`
  - Default: `supersecretpasswordpepper`
  - Description: A secret string used to salt the password hash.

- **Minimum Password Length**
  - Environment Variable: `AYON_AUTH_PASS_MIN_LENGTH`
  - Default: `8`
  - Description: Minimum password length.

- **Password Complexity Requirement**
  - Environment Variable: `AYON_AUTH_PASS_COMPLEX`
  - Default: `True`
  - Description: Enforce using a complex password.

### Database and Session Management

- **Redis URL**
  - Environment Variable: `AYON_REDIS_URL`
  - Default: `redis://redis/`
  - Description: Connection string for Redis.
  - Example: `redis://user:password123@redis.example.com:6379`

- **Redis Channel**
  - Environment Variable: `AYON_REDIS_CHANNEL`
  - Default: `pype:c`
  - Description: Redis channel name for system messages.

- **Postgres URL**
  - Environment Variable: `AYON_POSTGRES_URL`
  - Default: `postgres://ayon:ayon@postgres/ayon`
  - Description: Connection string for Postgres.
  - Example: `postgres://user:password123@postgres.example.com:5432/ayon`

- **Session TTL**
  - Environment Variable: `AYON_SESSION_TTL`
  - Default: `86400` (24 hours)
  - Description: Session lifetime in seconds.

### Security and Logging

- **Max Failed Login Attempts**
  - Environment Variable: `AYON_MAX_FAILED_LOGIN_ATTEMPTS`
  - Default: `10`
  - Description: Maximum number of failed login attempts.

- **Failed Login Ban Time**
  - Environment Variable: `AYON_FAILED_LOGIN_BAN_TIME`
  - Default: `600`
  - Description: Interval in seconds to ban IP addresses with too many failed login attempts.

- **Message of the Day (MOTD)**
  - Environment Variable: `AYON_MOTD`
  - Default: `None`
  - Description: Message of the day.
  - Example: `Welcome to Ayon!`

- **MOTD Path**
  - Environment Variable: `AYON_MOTD_PATH`
  - Default: `/storage/motd.md`
  - Description: Path to the MOTD file.
