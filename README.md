dockerify.ai
=================

Instantly make your project docker ready


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dockerify.ai.svg)](https://npmjs.org/package/dockerify.ai)
[![Downloads/week](https://img.shields.io/npm/dw/dockerify.ai.svg)](https://npmjs.org/package/dockerify.ai)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g dockerify.ai
$ dockerify-ai COMMAND
running command...
$ dockerify-ai (--version)
dockerify.ai/0.0.0 darwin-x64 node-v18.20.3
$ dockerify-ai --help [COMMAND]
USAGE
  $ dockerify-ai COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dockerify-ai hello PERSON`](#dockerify-ai-hello-person)
* [`dockerify-ai hello world`](#dockerify-ai-hello-world)
* [`dockerify-ai help [COMMAND]`](#dockerify-ai-help-command)
* [`dockerify-ai plugins`](#dockerify-ai-plugins)
* [`dockerify-ai plugins add PLUGIN`](#dockerify-ai-plugins-add-plugin)
* [`dockerify-ai plugins:inspect PLUGIN...`](#dockerify-ai-pluginsinspect-plugin)
* [`dockerify-ai plugins install PLUGIN`](#dockerify-ai-plugins-install-plugin)
* [`dockerify-ai plugins link PATH`](#dockerify-ai-plugins-link-path)
* [`dockerify-ai plugins remove [PLUGIN]`](#dockerify-ai-plugins-remove-plugin)
* [`dockerify-ai plugins reset`](#dockerify-ai-plugins-reset)
* [`dockerify-ai plugins uninstall [PLUGIN]`](#dockerify-ai-plugins-uninstall-plugin)
* [`dockerify-ai plugins unlink [PLUGIN]`](#dockerify-ai-plugins-unlink-plugin)
* [`dockerify-ai plugins update`](#dockerify-ai-plugins-update)

## `dockerify-ai hello PERSON`

Say hello

```
USAGE
  $ dockerify-ai hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ dockerify-ai hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/apperside/dockerify.ai/blob/v0.0.0/src/commands/hello/index.ts)_

## `dockerify-ai hello world`

Say hello world

```
USAGE
  $ dockerify-ai hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ dockerify-ai hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/apperside/dockerify.ai/blob/v0.0.0/src/commands/hello/world.ts)_

## `dockerify-ai help [COMMAND]`

Display help for dockerify-ai.

```
USAGE
  $ dockerify-ai help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for dockerify-ai.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.4/src/commands/help.ts)_

## `dockerify-ai plugins`

List installed plugins.

```
USAGE
  $ dockerify-ai plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ dockerify-ai plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.3/src/commands/plugins/index.ts)_

## `dockerify-ai plugins add PLUGIN`

Installs a plugin into dockerify-ai.

```
USAGE
  $ dockerify-ai plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

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
  Installs a plugin into dockerify-ai.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the DOCKERIFY_AI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the DOCKERIFY_AI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ dockerify-ai plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ dockerify-ai plugins add myplugin

  Install a plugin from a github url.

    $ dockerify-ai plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ dockerify-ai plugins add someuser/someplugin
```

## `dockerify-ai plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ dockerify-ai plugins inspect PLUGIN...

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
  $ dockerify-ai plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.3/src/commands/plugins/inspect.ts)_

## `dockerify-ai plugins install PLUGIN`

Installs a plugin into dockerify-ai.

```
USAGE
  $ dockerify-ai plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

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
  Installs a plugin into dockerify-ai.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the DOCKERIFY_AI_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the DOCKERIFY_AI_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ dockerify-ai plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ dockerify-ai plugins install myplugin

  Install a plugin from a github url.

    $ dockerify-ai plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ dockerify-ai plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.3/src/commands/plugins/install.ts)_

## `dockerify-ai plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ dockerify-ai plugins link PATH [-h] [--install] [-v]

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
  $ dockerify-ai plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.3/src/commands/plugins/link.ts)_

## `dockerify-ai plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ dockerify-ai plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dockerify-ai plugins unlink
  $ dockerify-ai plugins remove

EXAMPLES
  $ dockerify-ai plugins remove myplugin
```

## `dockerify-ai plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ dockerify-ai plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.3/src/commands/plugins/reset.ts)_

## `dockerify-ai plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ dockerify-ai plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dockerify-ai plugins unlink
  $ dockerify-ai plugins remove

EXAMPLES
  $ dockerify-ai plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.3/src/commands/plugins/uninstall.ts)_

## `dockerify-ai plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ dockerify-ai plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dockerify-ai plugins unlink
  $ dockerify-ai plugins remove

EXAMPLES
  $ dockerify-ai plugins unlink myplugin
```

## `dockerify-ai plugins update`

Update installed plugins.

```
USAGE
  $ dockerify-ai plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.3/src/commands/plugins/update.ts)_
<!-- commandsstop -->
