/* eslint-env jest */

test("docs", async () => {
  const emit = require("@emit-js/emit")()
  require("@emit-js/args")(emit)
  require("@emit-js/glob")(emit)
  require("@emit-js/log")(emit)
  require("../")(emit)

  emit("args", "test", {
    paths: {
      alias: ["_", "p"],
      default: [],
    },
  })

  emit("returns", "test", "string")
  await emit.docs()
})
