<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">DOCKERIFY.AI</h1>
</p>
<p align="center">
    <em>Dockerify.AI: generate docker and docker-compose files with just one command!</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/apperside/dockerify.ai?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/apperside/dockerify.ai?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/apperside/dockerify.ai?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/apperside/dockerify.ai?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" alt="npm">
	<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white" alt="YAML">
	<img src="https://img.shields.io/badge/Chai-A30701.svg?style=flat&logo=Chai&logoColor=white" alt="Chai">
	<img src="https://img.shields.io/badge/Mocha-8D6748.svg?style=flat&logo=Mocha&logoColor=white" alt="Mocha">
	<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/OpenAI-412991.svg?style=flat&logo=OpenAI&logoColor=white" alt="OpenAI">
	<img src="https://img.shields.io/badge/SemVer-3F4551.svg?style=flat&logo=SemVer&logoColor=white" alt="SemVer">
	<img src="https://img.shields.io/badge/Lodash-3492FF.svg?style=flat&logo=Lodash&logoColor=white" alt="Lodash">
	<br>
	<img src="https://img.shields.io/badge/Flat-3481FE.svg?style=flat&logo=Flat&logoColor=white" alt="Flat">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat&logo=ts-node&logoColor=white" alt="tsnode">
	<img src="https://img.shields.io/badge/Yarn-2C8EBB.svg?style=flat&logo=Yarn&logoColor=white" alt="Yarn">
	<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=flat&logo=Docker&logoColor=white" alt="Docker">
	<img src="https://img.shields.io/badge/Ajv-23C8D2.svg?style=flat&logo=Ajv&logoColor=white" alt="Ajv">
	<img src="https://img.shields.io/badge/Buffer-231F20.svg?style=flat&logo=Buffer&logoColor=white" alt="Buffer">
	<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=flat&logo=GitHub-Actions&logoColor=white" alt="GitHub%20Actions">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

##  Quick Links

> - [ Overview](#-overview)
> - [ Features](#-features)
> - [ Repository Structure](#-repository-structure)
> - [ Modules](#-modules)
> - [ Getting Started](#-getting-started)
>   - [ Installation](#-installation)
>   - [ Running dockerify.ai](#-running-dockerify.ai)
>   - [ Tests](#-tests)
> - [ Project Roadmap](#-project-roadmap)
> - [ Contributing](#-contributing)
> - [ License](#-license)
> - [ Acknowledgments](#-acknowledgments)

---

##  Overview

Dockerify.ai leverages Docker, AI, and TypeScript to enhance the creation of docker related files. 
With OpenAI integration, it allows interactive user inquiries and streamlines the creation of a docker file and a docker-compose file.

---

##  How does it work

This is a super early stage version of the project, it will be developed over time with new features and behaviours.

At the moment what it will do is the following:
- first it will read the files at the root of your project (<b><u>not their content</u></b>) and will send to openai to get an idea of the project type
- many of the times some particular file or folder can be enough to let the ai understand what kind of project it is (for example, if your project contains a `package.json` file and a `.next` folder, most probably it is a NextJS project)
- if it cannot manage to guess what kind of project it is, it will ask you the content of one or more file (<b><u>you will be asked for permissions before it happens</u></b>)
- it eventually will ask you some kind of clarification
- in the end, it will generate a docker file and a docker compose file


---

##  Repository Structure

```sh
└── dockerify.ai/
    ├── .github
    │   └── workflows
    │       ├── onPushToMain.yml
    │       ├── onRelease.yml
    │       └── test.yml
    ├── Dockerfile
    ├── README.md
    ├── bin
    │   ├── dev.cmd
    │   ├── dev.js
    │   ├── run.cmd
    │   └── run.js
    ├── docker-compose.yml
    ├── package.json
    ├── src
    │   ├── ai
    │   │   ├── ai.ts
    │   │   └── impl
    │   │       └── openai.impl.ts
    │   ├── api.ts
    │   ├── appConfig.ts
    │   ├── commands
    │   │   └── index.ts
    │   └── index.ts
    ├── test
    │   ├── commands
    │   │   └── hello
    │   │       ├── index.test.ts
    │   │       └── world.test.ts
    │   └── tsconfig.json
    ├── tsconfig.json
    └── yarn.lock
```

---

##  Modules

<details closed><summary>.</summary>

| File                                                                                           | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---                                                                                            | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| [docker-compose.yml](https://github.com/apperside/dockerify.ai/blob/master/docker-compose.yml) | This code utilizes Docker to create a production-ready environment for the AI application, making it consistent and easily distributable. The configuration file docker-compose.yml is central to running the application inside a Docker container. It sets up an app service, links the application codebase to the Docker environment, and excludes node_modules from synchronizing to improve performance.                                                                                                                                               |
| [Dockerfile](https://github.com/apperside/dockerify.ai/blob/master/Dockerfile)                 | The Dockerfile is key to creating a Docker container for the dockerify.ai application. Upon building, it installs the necessary Node dependencies and bundles the app source. After successful compilation, the application will start execution from run.js in the bin directory. This setup encapsulates the entire application for seamless deployment and ensures consistent runtime environment.                                                                                                                                                        |
| [tsconfig.json](https://github.com/apperside/dockerify.ai/blob/master/tsconfig.json)           | The tsconfig.json file in the provided repository is a configuration file for TypeScript, a scripting language used for the development. It primarily informs TypeScript compiler to generate JavaScript files from TypeScript, the compilation version, root directory of the project, and where to output the compiled JavaScript files.                                                                                                                                                                                                                   |
| [package.json](https://github.com/apperside/dockerify.ai/blob/master/package.json)             | This code segment is the package.json file, a crucial part of the Dockerify.ai repository. It's responsible for outlining the metadata about the project, including project dependencies, scripts commands, and main entry point. The project primarily facilitates making any project Docker-ready instantly, while housing the fundamental run-command for the application (./bin/run.js). Considerable dependencies, including axios, openAI, and inquirer, hint at network requests, interaction with AI toolkit, and terminal user-input, respectively. |
| [yarn.lock](https://github.com/apperside/dockerify.ai/blob/master/yarn.lock)                   | This code snippet represents the Dockerify.ai repository structure, crucial for organizing project's workflows, Docker configurations, and documentation. It enables automated actions upon code release and pushes to main branch as well as testing, aiding in continuous integration and delivery (CI/CD).                                                                                                                                                                                                                                                |

</details>

<details closed><summary>bin</summary>

| File                                                                         | Summary                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---                                                                          | ---                                                                                                                                                                                                                                                                                                                                                                                                                 |
| [run.cmd](https://github.com/apperside/dockerify.ai/blob/master/bin/run.cmd) | This code is part of the `dockerify.ai` repository's execution scripts in the `bin` directory. It represents a Windows-specific command script `run.cmd`, which aims at initiating the Node.js runtime environment to run the `run` script with provided arguments. It links to the overall project's operation by facilitating script execution, thus contributing to the application's functionality.             |
| [dev.js](https://github.com/apperside/dockerify.ai/blob/master/bin/dev.js)   | The bin/dev.js file is a crucial part of the dockerify.ai repository. It is essentially a development script executed via Node.js, facilitating the running of the application in a development environment. This script uses the oclif core's execute function for command processing and entry point of the application. Consequently, it plays a critical role in the workflow of the entire software structure. |
| [dev.cmd](https://github.com/apperside/dockerify.ai/blob/master/bin/dev.cmd) | This code snippet from bin/dev.cmd in the dockerify.ai repository serves to bootstrap a development environment. When triggered, it sets off a Node process with TypeScript Node as the module loader, suppressing experimental warnings. This is a foundational part of the repo's architectural setup, enabling smoother and more consistent development workflows.                                               |
| [run.js](https://github.com/apperside/dockerify.ai/blob/master/bin/run.js)   | This code snippet resides in the `run.js` file within the bin directory of the dockerify.ai repository. Its primary function is to perform script execution in the Oclif CLI framework hence facilitating the command-line operations of this AI-based application. Subsequently, this contributes significantly to the overall runtime execution in the project's architecture.                                    |

</details>

<details closed><summary>.github.workflows</summary>

| File                                                                                                         | Summary                                                                                                                                                                                                                                                                                                                                                                          |
| ---                                                                                                          | ---                                                                                                                                                                                                                                                                                                                                                                              |
| [onPushToMain.yml](https://github.com/apperside/dockerify.ai/blob/master/.github/workflows/onPushToMain.yml) | This code is responsible for the continuous integration of the dockerify.ai repository. It triggers automated tasks defined in the onPushToMain.yml script whenever changes are pushed to the main branch. These tasks include testing and building the software to ensure code quality and functionality before any release process.                                            |
| [onRelease.yml](https://github.com/apperside/dockerify.ai/blob/master/.github/workflows/onRelease.yml)       | The onRelease.yml file, located in the.github/workflows directory, is central to the continuous integration/continuous delivery (CI/CD) pipeline of the dockerify.ai repository. Upon new releases, it triggers automated processes such as code testing, building Docker images, and pushing these to a Docker repository, thereby ensuring streamlined updates and deployment. |
| [test.yml](https://github.com/apperside/dockerify.ai/blob/master/.github/workflows/test.yml)                 | The code in test.yml is a GitHub Actions workflow. It supports the dockerify.ai repository by executing tests when specific events occur. The workflow is crucial for automated software quality assurance, helping validate changes before they're merged into the main codebase.                                                                                               |

</details>

<details closed><summary>test</summary>

| File                                                                                      | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---                                                                                       | ---                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [tsconfig.json](https://github.com/apperside/dockerify.ai/blob/master/test/tsconfig.json) | This tsconfig.json file in the test directory forms an essential part of the project's test suite configuration. It extends the base TypeScript config file with specific options for testing purposes, ensuring no new JavaScript files are generated during the testing process, and linking to the source code in the parent directory. This plays a pivotal role in enabling type safety checks and tooling support during automated testing. |

</details>

<details closed><summary>test.commands.hello</summary>

| File                                                                                                     | Summary                                                                                                                                                                                                                                                                                                                                                          |
| ---                                                                                                      | ---                                                                                                                                                                                                                                                                                                                                                              |
| [index.test.ts](https://github.com/apperside/dockerify.ai/blob/master/test/commands/hello/index.test.ts) | The highlighted code snippet is a component of the test suite within the dockerify.ai repository-specifically, it tests the hello command functionality. The code confirms the successful execution and correct output of the hello command, contributing to the repository's overall reliability and maintainability.                                           |
| [world.test.ts](https://github.com/apperside/dockerify.ai/blob/master/test/commands/hello/world.test.ts) | The code snippet, from the test/commands/hello/world.test.ts file, is a unit test for the hello world command in the repository. It checks whether running the command yields the expected hello world! output. This helps verify the correct functionality of the command within the broader microservice-oriented docker-based architecture of the repository. |

</details>

<details closed><summary>src</summary>

| File                                                                                   | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---                                                                                    | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| [appConfig.ts](https://github.com/apperside/dockerify.ai/blob/master/src/appConfig.ts) | The appConfig.ts file in the src directory of the dockerify.ai repository plays a key role in maintaining application-specific configuration using Configstore. It creates an instance of Configstore named dockerify.ai, providing a centralized store for configurations which aids in altering application behavior without code changes.                                                                                                                                     |
| [api.ts](https://github.com/apperside/dockerify.ai/blob/master/src/api.ts)             | The `api.ts` file primarily functions as the communication bridge between the user and the AI assistant module. It facilitates user interactions by receiving user messages, sending them to the AI module, and delivering AI responses back to the user. Notably, it also manages a user-friendly spinner indicator to reveal when the AI is processing the request. This file streamlines user-AI discourse while maintaining user experience.                                 |
| [index.ts](https://github.com/apperside/dockerify.ai/blob/master/src/index.ts)         | The src/index.ts file in the dockerify.ai repository serves as an entry point for the application. Its main function is to export the run command from the @oclif/core library, which is crucial in handling command-line interface operations. This supports the modular and command-based architecture of the project. The codebase's overall structure indicates a Docker-based ecosystem, facilitating AI applications development using TypeScript and automated workflows. |

</details>

<details closed><summary>src.ai</summary>

| File                                                                        | Summary                                                                                                                                                                                                                                                                                       |
| ---                                                                         | ---                                                                                                                                                                                                                                                                                           |
| [ai.ts](https://github.com/apperside/dockerify.ai/blob/master/src/ai/ai.ts) | The code in ai.ts provides an abstraction layer to interact with different AI engines, using an interface IAI. Currently, it implements OpenAI as the default AI engine. This approach gives the system flexibility to easily replace or add new AI services by changing the implementations. |

</details>

<details closed><summary>src.ai.impl</summary>

| File                                                                                               | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---                                                                                                | ---                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [openai.impl.ts](https://github.com/apperside/dockerify.ai/blob/master/src/ai/impl/openai.impl.ts) | This code is part of an AI bot application and leverages the OpenAI API. The `AppOpenAi` class, housed in the `openai.impl.ts` file, provides the core chat interaction with a user. It enables creating, running, and managing asynchronous conversations with the AI assistant, obtaining user inputs, and returning AI-generated replies. The class utilizes an API key for authentication, stored in an application configuration file. |

</details>

<details closed><summary>src.commands</summary>

| File                                                                                    | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---                                                                                     | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [index.ts](https://github.com/apperside/dockerify.ai/blob/master/src/commands/index.ts) | The code in src/commands/index.ts defines a MainCommand class responsible for generating Docker configurations for a project. This process uses user interaction to provide specific inputs needed, such as files' contents or project details required for Dockerization, acquired via interactive inquiries. The code also extends capabilities for project cleaning, specification of project path, and uses OpenAI's API for interactions, underpinning the core functionality of the dockerify.ai repository's architecture. |

</details>

---

##  Getting Started

***Istant usage without installation***

```
npx dockerify.api@latest
```

## Usage 

```sh-session
USAGE
  $ dockerify  [--openAiApiKey <value>] [-c] [-P <value>]

FLAGS
  -P, --path=<value>          The root path of the project you want to generate the docker configuration for
  -c, --clean                 Clean the project
      --openAiApiKey=<value>  OpenAI API key

DESCRIPTION
  Generates a working docker configuration

```
###  Installation

1. Clone the dockerify.ai repository:

```sh
git clone https://github.com/apperside/dockerify.ai
```

2. Change to the project directory:

```sh
cd dockerify.ai
```

3. Install the dependencies:

```sh
npm install
```

###  Running dockerify.ai

Use the following command to run dockerify.ai:

```sh
./bin/dev.js
```



##  Project Roadmap

- [ ] `► Add tests`
- [ ] `► Improve project type detection `
- [ ] `► Handle more complicated scenarios (like monorepos)`
- [x] `► Custom prompt to add any required customization (like requesting to add some database to the docker compose file or any other publicily known docker image)`


---

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/apperside/dockerify.ai/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/apperside/dockerify.ai/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/apperside/dockerify.ai/issues)**: Submit bugs found or log feature requests for Dockerify.ai.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone https://github.com/apperside/dockerify.ai
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

##  License

This project is protected under the [MIT](https://choosealicense.com/licenses/mit/) License. For more details, refer to the [LICENSE](https://github.com/apperside/dockerify.ai/blob/main/LICENSE) file.

---

##  Acknowledgments

- [OCLIF](https://oclif.io/)
- [OpenAI](https://github.com/openai/openai-node)

[**Return**](#-quick-links)

---
