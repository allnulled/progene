# Progene

![](https://img.shields.io/badge/progene-v1.0.0-green.svg) ![](https://img.shields.io/badge/tests-passing-green.svg) ![](https://img.shields.io/badge/coverage-98%25-green.svg) 

Customize and reuse parametrizable Node.js commands accessible from terminal across software projects.

[![NPM](https://nodei.co/npm/progene.png?stars&downloads)](https://www.npmjs.com/package/progene)

## Index

1. [Installation](#installation)
2. [Usage](#installation)
3. [Commands](#installation)
4. [How it works](#how-it-works)
5. [API](#api)
6. [Issues](#issues)
7. [License](#license)
8. [Collaboration](#collaboration)

## Installation

`$ npm i --g progene`

## Usage

To see the help of a command, run `progene` or any of its commands with the `--help` flag.

### Explanation

1. you write your own Node.js commands (separated by a namespace).

2. you start `progene` in any project you are developing.

3. you add your created `progene` command namespaces.

4. you run any of the commands you have coded before, comfortably from your fresh project.

## Commands

`[...]`: optional parameters.

`<...>`: required parameters.

```
progene init [directory]
progene add <namespace-path> [options]
progene run <namespace/command> [options]
progene remove <namespace> [options]
```

### Initialize progene

`$ progene init .`

### Write commands

File: `commands/namespace/progene.json`

Contents:

```js
{}
```

---

File: `commands/namespace/first.js`

Contents:

```js
module.exports = function(options) {
  console.log(options.one + " - " + options.two);
};
```

---

File: `commands/namespace/hello.js`

Contents:

```js
module.exports = function(options) {
  console.log("Hello " + (options.name || "world") + "!");
};
```

### Add commands

`$ progene add commands/namespace`

### Run commands

`$ progene run namespace/first --one 1 2 3 --two a b c`

It prints: `1 2 3 - a b c`

`$ progene run namespace/hello --name developer`

It prints: `Hello developer!`

## How it works

Progene creates a `.progene` folder when you run `progene init`.

Under the `.progene` folder, you find the **namespaces** of your commands.

Under each **namespace** folder, you find its corresponding **commands**, as `*.js` files.

Under each **namespace** folder, you also find its corresponding `progene.json` metadata file.

The `progene.js` only has to be a valid JSON file, nothing is required inside.

This way, one can reuse all the commands that it writes in one project, for different projects.

### Workflow

The idea is that you start having:

  - `path/to/project`

And, on the other hand, your commands:

  - `path/to/commands/namespace/progene.json`: a valid JSON file.
  - `path/to/commands/namespace/command-1.js`: a `module.exports = function(options) {...}` file.
  - `path/to/commands/namespace/command-2.js`: a `module.exports = function(options) {...}` file.
  - `path/to/commands/namespace/command-3.js`: a `module.exports = function(options) {...}` file.

Then you initialize `progene`:

  - `$ cd path/to/project`
  - `$ progene init`

...in order to have:

  - `path/to/project/.progene`: a folder for all the currently available commands in a project.

Then you add `progene` command namespaces:

  - `progene add path/to/commands/namespace`

...in order to have:

  - `path/to/project/.progene/namespace`: a namespace of commands.
  - `path/to/project/.progene/namespace/command-1.js`: a command.
  - `path/to/project/.progene/namespace/command-2.js`: a command.
  - `path/to/project/.progene/namespace/command-3.js`: a command.

Then you run `progene` commands:

  - `$ progene run namespace/command-1 --one 1 --two 2 --three 3`
  - `$ progene run namespace/command-2 --one 1 --two 2 --three 3`
  - `$ progene run namespace/command-3 --one 1 --two 2 --three 3`

This way, you can reuse your commands across projects, polluting the least your projects' workspace.

## API

You can also use the programmatic API.

### Usage

The API module works almost the same way that the command-line interface, but passing objects to every method, instead.

#### 1. Import module

```js
const Progene = require("progene");
```

#### 2. Use the commands as static methods

##### To initialize a project:

```js
Progene.init();
```

Or, alternatively, specify the directory:

```js
Progene.init({
  base: __dirname + "/my/project" // 'base' is by default: process.cwd()
});
```

##### To add commands to the project:

```js
Progene.add({ 
  command: "/path/of/commands/namespace",
  base: __dirname + "/my/project" // 'base' is by default: process.cwd()
});
```

##### To run a command:

```js
Progene.add({ 
  command: "namespace/command",
  base: __dirname + "/my/project", // 'base' is by default: process.cwd()
  name: "Nobody",
  surname: "None",
  age: 88,
  place: "The World"
});
```

Note: what the function at `/my/project/.progene/namespace/command.js` returns is what this method will return.

##### To remove a command:

```js
Progene.remove({ 
  command: "namespace/command",
  base: __dirname + "/my/project", // 'base' is by default: process.cwd()
});
```

----

All the methods are chainable because they return the `Progene` class again. 

All the methods are chainable, except the `Progene.run({ ... })`, which returns what the specified command itself returns, letting you use your own command-line interface also as programmatic APIs.

## Issues 

Expose any issue [here](https://github.com/allnulled/progene/issues/new).

Visit open issues [here](https://github.com/allnulled/progene/issues).

## License

This is a project under [WTFL](https://es.wikipedia.org/wiki/WTFPL), which means basically that you can do whatever you want with it.

## Collaboration

Feel free to create your own branches.