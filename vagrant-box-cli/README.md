vagrant-box-cli
===============

cli for managing vagrant development box

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/vagrant-box-cli.svg)](https://npmjs.org/package/vagrant-box-cli)
[![Downloads/week](https://img.shields.io/npm/dw/vagrant-box-cli.svg)](https://npmjs.org/package/vagrant-box-cli)
[![License](https://img.shields.io/npm/l/vagrant-box-cli.svg)](https://github.com/andrewgrewell/vagrant-box/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g vagrant-box-cli
$ vagrant-box COMMAND
running command...
$ vagrant-box (-v|--version|version)
vagrant-box-cli/0.0.1 darwin-x64 node-v12.18.3
$ vagrant-box --help [COMMAND]
USAGE
  $ vagrant-box COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`vagrant-box hello [FILE]`](#vagrant-box-hello-file)
* [`vagrant-box help [COMMAND]`](#vagrant-box-help-command)

## `vagrant-box hello [FILE]`

describe the command here

```
USAGE
  $ vagrant-box hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ vagrant-box hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/andrewgrewell/vagrant-box/blob/v0.0.1/src/commands/hello.ts)_

## `vagrant-box help [COMMAND]`

display help for vagrant-box

```
USAGE
  $ vagrant-box help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
