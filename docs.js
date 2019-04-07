import { pathExists, readJson } from "fs-extra"
import { basename, join, resolve } from "path"

module.exports = function(emit) {
  if (emit.docs) {
    return
  }

  emit.state.docs = {
    args: {},
    dependencies: {},
    returns: {},
  }

  emit.any("args", args)
  emit.any("dependencies", dependencies)
  emit.any("returns", returns)

  emit("args", "docs", {
    path: {
      alias: ["_", "p"],
      default: process.cwd(),
    },
  })

  emit("dependencies", "docs", [
    "@emit-js/args",
    "@emit-js/glob",
  ])

  emit.any("docs", docs)
}

async function docs(arg, prop, emit) {
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

  const paths = await emit.glob(prop, {
    absolute: true,
    pattern: join(path, "docs/*.md"),
  })

  if (!paths.length) {
    return
  }

  const pkgPath = (await readJson(pkgJsonPath)).main
  require(join(path, pkgPath))(emit)

  for (const doc of paths) {
    const event = basename(doc, ".md")
    const args = emit.state.docs.args[event]
    const dependencies = emit.state.docs.dependencies[event]
    const returns = emit.state.docs.returns[event]

    var output = `### ${event}\n\n`

    emit("log", event, "dependencies", dependencies)

    output += "#### Dependencies\n\n"
    output += dependencies
      .sort()
      .map(d => "`" + d + "`")
      .join(", ")

    emit("log", event, "args", args)
    emit("log", event, "returns", returns)

    // eslint-disable-next-line no-console
    console.log(output)
  }
}

function args(arg, prop, emit) {
  const state = emit.state.docs.args
  state[prop[0]] = arg
}

function dependencies(arg, prop, emit) {
  const state = emit.state.docs.dependencies
  state[prop[0]] = arg
}

function returns(arg, prop, emit) {
  const state = emit.state.docs.returns
  state[prop[0]] = arg
}
