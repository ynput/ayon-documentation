---
id: ayon_launcher_admin
title: AYON Launcher - Desktop Application
sidebar_label: AYON Launcher
---

The desktop application, AYON launcher, is the entry point to allow artists work within AYON system. It should be installed locally on the artist's workstation. It is self-contained (frozen) software that includes all the required dependencies to run itself.

The AYON launcher contains the logic for connecting to the AYON server and distribution of addons, dependency packages and different versions of AYON launcher. Distribution is based on bundles that are set on server.


## Distribution & Installation

AYON server is used to distribute AYON launcher where artists can login to AYON webUI and find download button. 

Launcher Binaries names looks like: 
- Windows: `AYON-1.0.0-win-setup.exe`
- Linux: `AYON-1.0.0-linux.tar.gz`
- Mac: `AYON-1.0.0-Installer.dmg`

Installing AYON launcher on individual workstation as mentioned in [Artist Getting Started: Installation](artist_getting_started.md#installation).

And, when the AYON launcher is starting. When an artist is running the `tray`, it is periodically checked for new updates in the current bundle. e.g. launching launcher in production mode, will fetch updates from your production bundle including addons distribution requires downloading, validating, and extracting to the user's machine to be able to use them.

:::info Updating Pipeline to latest Release

[Updating Pipeline to latest Release](admin_server_updating_pipeline.md) this tool automatically detects which addons need updates and identifies the platforms you’re already using (whether it’s MacOS, Windows, or Linux).

This is useful if you don't have any Launcher available for downloading on your AYON server.
:::

:::tip Automate installation on windows
Check FAQ, see [Automate launcher installation on Windows Machines](#automate-launcher-installation-on-windows-machines)
:::

:::info [Win] Install for all users

On <span style={{color:'#1c2026',backgroundColor:'#00a2ed', borderRadius: '4px', padding: '2px 4px'}}>Windows</span> , When installing for "All Users". It is installed to Program files by default, which requires admin permissions.
:::

## Upload Launcher binaries to AYON server

On [Bundles Tab](admin_server_bundles_and_addons.md#bundles-tab), you can upload new launcher via clicking **Upload Launcher** button.

:::tip

To use the launcher, in your pipeline you have to add it to your bundle.
:::

## AYON Launcher Builds

:::info Build AYON Launcher

**Unless you know what you are doing,** 
Building your own AYON Launcher is mostly useful to get unreleased launcher versions. More info see [Building AYON Desktop application](dev_launcher.md#building-ayon-desktop-application)

Also, you can find the all official launcher builds in [ayon-launcher/releases | Github](https://github.com/ynput/ayon-launcher/releases) wher eyou can download them directly.

Keep in mind, You can extend AYON launcher using a custom addon where e.g. you can extend AYON [tray menu](ayon_launcher_artist_basic.md#tray-menu) to add your own actions, extend the [launcher actions](ayon_launcher_artist_basic.md#launcher-ui) to add your own actions.
:::

## Run AYON

Running AYON should be as mentioned in [Run AYON Launcher](artist_getting_started.md#run-ayon-launcher).

Also, here are additional information

### Pipeline Modes
AYON pipeline works allows working in different pipeline modes, AYON launcher provides a set arguments to specify the pipeline mode to work in and also allows specifying a bundle to work in.
For more information, check
- [Pipeline Modes](admin_server_bundles_and_addons.md#pipeline-modes)
- [Launch in different Pipeline Modes](ayon_launcher_artist_advanced.md#launch-in-different-pipeline-modes)
- [How to use different bundles with different projects? | Ynput Forums](https://community.ynput.io/t/how-to-use-different-bundles-with-different-projects/1096) 

### AYON Launcher Updates

AYON launcher on startup when a connection to the server is made, AYON will get various information from the server - one among them is updates of add-ons. If add-ons are missing or outdated, the right versions are downloaded, validated, and extracted to the artist workstation.

### Runtime provided environment variables

See [Environment variables](dev_launcher.md#environment-variables) for information about environment variables set during start up.


## Additional Information
### Site ID
After installing AYON launcher on a machine, a unique id will be assigned to that machine.
This id is usually a funny name consisting of 3 parts. e.g. `military-mouse-of-jest`. 

Site ID is used for setting site settings.

More info about settings categories in AYON. see,[Addon Settings Categories](admin_server_bundles_and_addons.md#addon-settings-categories).

:::info where site id is saved

It's saved in a file called `site_id` located in the path saved in the `AYON_LAUNCHER_LOCAL_DIR`.
based on OS, by defaults to:
- Windows: `%LOCALAPPDATA%\Ynput\AYON`
- Linux: `~/.local/share/AYON`
- macOS: `~/Library/Application Support/AYON`
:::

:::tip Customize Site ID

Check FAQ, see [How to set custom site id](#how-to-set-custom-site-id)
:::

### Shims

Shims are meant to help with registering of path to AYON launcher. 
Right now you can point to a single version of AYON launcher, which would stop to work when the version is uninstalled because new version is available. Only think which shim does is to find an existing ayon launcher and execute it, it does not download it or handle logic.

AYON launcher has new argument handling. When `init-ayon-launcher` is passed it just stores information about executable and deploys shims without any other action.

The shim is also used for custom `ayon-launcher://` protocol scheme, that is different based on OS. With this support we can start to use webactions.


## FAQ

### Where login credentials are saved

When you start AYON for the first time, the login UI will show up to ask you for the server URL and credentials. It will then save it securely to your system's keyring - on Windows, it is **Credential Manager**, on macOS, it will use its **Keychain**, on Linux, it can be **GNOME Keyring** or other software, depending on your distribution.

This can also be set beforehand with the environment variable `AYON_SERVER_URL`. If set, it takes precedence over the one set in the keyring.

### Automate launcher installation on Windows Machines
You can crate a `.bat` file with the following specs and run it on all machines through deadline.

The installer build for Windows is built using InnoSetup - so any of [its default command line flags](https://jrsoftware.org/ishelp/index.php?topic=setupcmdline) apply.

```shell
set INSTALLER=/path/to/installer
set LOGFILE=/path/to/output/log.txt

# start installation
"%INSTALLER%" /NOCANCEL /VERYSILENT /CURRENTUSER /VERYSILENT /SP /SUPPRESSMSGBOXES /LOG="%LOGFILE%"
```

For reference, here community post where the question was asked
- [Automating AYON Launcher Installation on User Machines Using the Command Line | Ynput Forums](https://community.ynput.io/t/automating-ayon-launcher-installation-on-user-machines-using-the-command-line/1836)

### Use shared location for AYON launcher and addons

This is done by leveraging `AYON_LAUNCHER_STORAGE_DIR` environment variable.
For more information about it, See [Launcher Environment variables](dev_launcher.md#environment-variables).

Here's a community step by step guide
- [Use shared location for AYON launcher and addons | Ynput Forums](https://community.ynput.io/t/use-shared-location-for-ayon-launcher-and-addons/1175).


### AYON Launcher versioning convention

AYON version control for addons and desktop applications is based on semantic versioning ([click here for more details](https://semver.org/)).


For studios customizing the source code of AYON, a practical approach could be to build by adding a name and a number after the PATCH and not to deploy 1.0.0 from the original AYON repository. 
For example, your builds will be: `1.0.0` < `1.0.0-yourstudio.1` < `1.0.0-yourstudio.2` < `1.0.1-yourstudio.1`.

### How to set custom site id


Setting custom site id can be beneficial to set site id to a sensible names which makes it easy to navigate.
It also allows control machines in your farm in settings with single site by giving them all the same site id.

To set custom site id there are two possible solutions: feel free to pick either on.
- You can set an env var on the machine, like e.g. `AYON_SITE_ID=my-cool-machine`.
- Modify the site-id file where we look.

:::caution
Be aware not to do that if the machines are artist machines not dedicated farm machine.
Also, keep in mind these machines should also have the same OS.
:::