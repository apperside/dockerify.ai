dockerify
=================

A cli to instantly make your project docker-ready


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dockerify.svg)](https://npmjs.org/package/dockerify)
[![Downloads/week](https://img.shields.io/npm/dw/dockerify.svg)](https://npmjs.org/package/dockerify)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g dockerify
$ dockerify COMMAND
running command...
$ dockerify (--version)
dockerify/0.0.0 darwin-x64 node-v18.20.3
$ dockerify --help [COMMAND]
USAGE
  $ dockerify COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dockerify hello PERSON`](#dockerify-hello-person)
* [`dockerify hello world`](#dockerify-hello-world)
* [`dockerify help [COMMAND]`](#dockerify-help-command)
* [`dockerify plugins`](#dockerify-plugins)
* [`dockerify plugins add PLUGIN`](#dockerify-plugins-add-plugin)
* [`dockerify plugins:inspect PLUGIN...`](#dockerify-pluginsinspect-plugin)
* [`dockerify plugins install PLUGIN`](#dockerify-plugins-install-plugin)
* [`dockerify plugins link PATH`](#dockerify-plugins-link-path)
* [`dockerify plugins remove [PLUGIN]`](#dockerify-plugins-remove-plugin)
* [`dockerify plugins reset`](#dockerify-plugins-reset)
* [`dockerify plugins uninstall [PLUGIN]`](#dockerify-plugins-uninstall-plugin)
* [`dockerify plugins unlink [PLUGIN]`](#dockerify-plugins-unlink-plugin)
* [`dockerify plugins update`](#dockerify-plugins-update)

## `dockerify hello PERSON`

Say hello

```
USAGE
  $ dockerify hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ dockerify hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/apperside/dockerify/blob/v0.0.0/src/commands/hello/index.ts)_

## `dockerify hello world`

Say hello world

```
USAGE
  $ dockerify hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ dockerify hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/apperside/dockerify/blob/v0.0.0/src/commands/hello/world.ts)_

## `dockerify help [COMMAND]`

Display help for dockerify.

```
USAGE
  $ dockerify help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for dockerify.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.3/src/commands/help.ts)_

## `dockerify plugins`

List installed plugins.

```
USAGE
  $ dockerify plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ dockerify plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/index.ts)_

## `dockerify plugins add PLUGIN`

Installs a plugin into dockerify.

```
USAGE
  $ dockerify plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into dockerify.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the DOCKERIFY_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the DOCKERIFY_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ dockerify plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ dockerify plugins add myplugin

  Install a plugin from a github url.

    $ dockerify plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ dockerify plugins add someuser/someplugin
```

## `dockerify plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ dockerify plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ dockerify plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/inspect.ts)_

## `dockerify plugins install PLUGIN`

Installs a plugin into dockerify.

```
USAGE
  $ dockerify plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into dockerify.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the DOCKERIFY_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the DOCKERIFY_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ dockerify plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ dockerify plugins install myplugin

  Install a plugin from a github url.

    $ dockerify plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ dockerify plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/install.ts)_

## `dockerify plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ dockerify plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ dockerify plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/link.ts)_

## `dockerify plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ dockerify plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dockerify plugins unlink
  $ dockerify plugins remove

EXAMPLES
  $ dockerify plugins remove myplugin
```

## `dockerify plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ dockerify plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/reset.ts)_

## `dockerify plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ dockerify plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dockerify plugins unlink
  $ dockerify plugins remove

EXAMPLES
  $ dockerify plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/uninstall.ts)_

## `dockerify plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ dockerify plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dockerify plugins unlink
  $ dockerify plugins remove

EXAMPLES
  $ dockerify plugins unlink myplugin
```

## `dockerify plugins update`

Update installed plugins.

```
USAGE
  $ dockerify plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.2/src/commands/plugins/update.ts)_
<!-- commandsstop -->
