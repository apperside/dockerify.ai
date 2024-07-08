dockerify.ai
=================

Instantly make your project docker ready


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dockerify.ai.svg)](https://npmjs.org/package/dockerify.ai)
[![Downloads/week](https://img.shields.io/npm/dw/dockerify.ai.svg)](https://npmjs.org/package/dockerify.ai)


<!-- toc -->
* [Usage](#usage)
* [How it works](#how-does-it-work)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npx dockerify.ai@latest


USAGE
  $ dockerify  [--openAiApiKey <value>] [-c] [-P <value>]

FLAGS
  -P, --path=<value>          The root path of the project you want to generate the docker configuration for
  -c, --clean                 Clean the project
      --openAiApiKey=<value>  OpenAI API key

DESCRIPTION
  Generates a working docker configuration
```
<!-- usagestop -->

# How does it work?

This is a very basic protptype of the project, it will be developed over time with new features and behaviours.

At the moment what it will do is the following:
- first it will read the files at the root of your project (<b><u>not their content</u></b>) and will send to openai to get an idea of the project type
- many of the times some particular file or folder can be enough to let the ai understand what kind of project it is (for example, if your project contains a `package.json` file and a `.next` folder, most probably it is a NextJS project)
- if it cannot manage to guess what kind of project it is, it will ask you the content of one or more file (<b><u>you will be asked for permissions before it happens</u></b>)
- it eventually will ask you some kind of clarification
- in the end, it will generate a docker file and a docker compose file