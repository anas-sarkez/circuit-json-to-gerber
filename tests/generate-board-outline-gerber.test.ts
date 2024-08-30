import { test, expect } from "bun:test"
import { convertSoupToGerberCommands } from "src/convert-soup-to-gerber-commands"
import {
  stringifyGerberCommandLayers,
  stringifyGerberCommands,
} from "src/stringify-gerber"
import { maybeOutputGerber } from "tests/fixtures/maybe-output-gerber"
import gerberToSvg from "gerber-to-svg"
import { toMatchGerberSnapshot } from "./fixtures/preload"
// If you're trying to test this, I would recommend opening up Kicad's Gerber
// Viewer and loading in the files from the generated directory "gerber-output"
// that's produced if OUTPUT_GERBER=1 when you do `npx ava ./tests/gerber/generate-gerber-with-trace.test.ts`
// You can generate the files then hit reload in the Gerber Viewer to see that
// everything looks approximately correct
test("Generate simple gerber with a single trace", async () => {
  const gerber_cmds = convertSoupToGerberCommands([
    {
      type: "pcb_board",
      width: 20,
      height: 20,
      center: { x: 10, y: -10 },
    },
  ])
  const edgecut_gerber = stringifyGerberCommands(gerber_cmds.Edge_Cuts)
  // console.log("Gerber")
  // console.log("----------------------------------------------")
  // console.log(edgecut_gerber)

  // TODO parse gerber to check for correctness

  const gerberOutput = stringifyGerberCommandLayers(gerber_cmds)

  await maybeOutputGerber(gerberOutput)

  const gerbersArray =await toMatchGerberSnapshot(gerberOutput, import.meta.path, "simple1")
  for(const gerber of gerbersArray) {
  expect(gerberOutput)
  }

  // gerberToSvg(gerberOutput.Edge_Cuts, {}, (err, svg) => {
  //   expect(svg).toMatchSvgSnapshot(import.meta.path, "gerber-edge-cuts")
  // })

  // render(
})
