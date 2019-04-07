# @emit-js/docs

[emit](https://github.com/emit-js/emit#readme) documentation generator

![docs](docs.gif)

## Install

```bash
npm install @emit-js/docs @emit-js/args @emit-js/glob @emit-js/log
```

## Setup

```js
var emit = require("@emit-js/emit")()
require("@emit-js/args")(emit)
require("@emit-js/glob")(emit)
require("@emit-js/log")(emit)
require("@emit-js/docs")(emit)
```

## Usage

```js
await emit.docs({ path: process.cwd() })
```
