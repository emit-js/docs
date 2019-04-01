# @dot-event/docs

[dot-event](https://github.com/dot-event/dot-event#readme) automatic documentation

![docs](docs.gif)

## Install

```bash
npm install @dot-event/docs @dot-event/args @dot-event/glob @dot-event/log
```

## Setup

```js
var dot = require("dot-event")()
require("@dot-event/args")(dot)
require("@dot-event/glob")(dot)
require("@dot-event/log")(dot)
require("@dot-event/docs")(dot)
```

## Usage

```js
await dot.docs({ path: process.cwd() })
```
