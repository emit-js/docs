import { pathExists, readJson } from "fs-extra"
import { basename, join, resolve } from "path"

module.exports = function(dot) {
  if (dot.docs) {
    return
  }

  dot.state.docs = {
    args: {},
    dependencies: {},
    returns: {},
  }

  dot.any("args", args)
  dot.any("dependencies", dependencies)
  dot.any("returns", returns)

  dot("args", "docs", {
    path: {
      alias: ["_", "p"],
      default: process.cwd(),
    },
  })

  dot("dependencies", "docs", {
    arg: ["@dot-event/args", "@dot-event/glob"],
  })

  dot.any("docs", docs)
}

async function docs(prop, arg, dot) {
  let { path } = arg

  path = resolve(Array.isArray(path) ? path[0] : path)

  const pkgJsonPath = join(path, "package.json")
  const readmePath = join(path, "README.md")

  if (
    !(await pathExists(pkgJsonPath)) ||
    !(await pathExists(readmePath))
  ) {
    return
  }

  const pkgPath = (await readJson(pkgJsonPath)).main

  require(join(path, pkgPath))(dot)

  const paths = await dot.glob(prop, {
    absolute: true,
    pattern: join(path, "docs/*.md"),
  })

  for (const doc of paths) {
    const event = basename(doc, ".md")
    const args = dot.state.docs.args[event]
    const dependencies = dot.state.docs.dependencies[event]
    const returns = dot.state.docs.returns[event]

    dot("log", "info", event, "dependencies", {
      arg: dependencies,
    })
    dot("log", "info", event, "args", args)
    dot("log", "info", event, "returns", returns)
  }
}

function args(prop, arg, dot) {
  const state = dot.state.docs.args
  state[prop[0]] = arg
}

function dependencies(prop, arg, dot) {
  const state = dot.state.docs.dependencies
  state[prop[0]] = arg
}

function returns(prop, arg, dot) {
  const state = dot.state.docs.returns
  state[prop[0]] = arg
}
