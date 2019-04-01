/* eslint-env jest */

test("docs", async () => {
  const dot = require("dot-event")()
  require("@dot-event/args")(dot)
  require("@dot-event/glob")(dot)
  require("@dot-event/log")(dot)
  require("../")(dot)

  dot("args", "test", {
    paths: {
      alias: ["_", "p"],
      default: [],
    },
  })

  dot("returns", "test", { arg: "string" })
  await dot.docs()
})
