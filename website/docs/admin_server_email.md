---
id: admin_server_email
title: Configuring email
sidebar_label: Configuring email
---

Ayon server can be configured for sending emails to users, 
this may be used for the password recovery or by addons.


Using Ynput Cloud email service
-------------------------------

With an active Ynput cloud subscription, emails are sent using Ynput servers
and no configuration is necessary.


Using SMTP
----------

Without YnputCloud subscription, a working SMTP server is required. 
SMTP is configured using the environment variables of the server container:

- `AYON_EMAIL_FROM` Email sender address (example: `noreply@mystudio.com`)
- `AYON_EMAIL_SMTP_HOST` SMTP server hostname (example: `smtp.mystudio.com`)
- `AYON_EMAIL_SMTP_PORT` SMTP server port (example: `587`)
- `AYON_EMAIL_SMTP_TLS` Use SSL for SMTP connection (example: `true`)
- `AYON_EMAIL_SMTP_USER` SMTP server username (example: `mailuser`)
- `AYON_EMAIL_SMTP_PASS` SMTP server password (example: `supersecretpassword`)

When the environment variables are set properly and server is restarted, 
you should see a "Reset password" link on the login page. 

You may use that link to ensure that emails are sent 
(don't worry, your password won't be reset, unless you change it 
using a link in the email message).
