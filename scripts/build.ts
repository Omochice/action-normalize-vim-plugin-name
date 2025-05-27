import { build, emptyDir } from "https://deno.land/x/dnt@0.38.1/mod.ts";
// @deno-types="https://deno.land/x/esbuild@v0.25.5/mod.d.ts"
import * as esbuild from "https://deno.land/x/esbuild@v0.25.5/mod.js";

console.debug("Start dnt ...");

const outDir = "./npm";
await emptyDir(outDir);
await build({
  entryPoints: ["./src/main.ts"],
  outDir,
  typeCheck: false,
  test: false,
  declaration: false,
  esModule: false,
  shims: {
    deno: true,
  },
  package: {
    // Dummy package.json
    name: "@Omochice/action-normalize-vim-plugin-name",
    version: "0.1.0",
    private: true,
    description: "Dummy package for action-normalize-vim-plugin-name",
  },
});

console.log("Start esbuild ...");
const distDir = "./dist";
await emptyDir(distDir);

await esbuild.build({
  entryPoints: ["./npm/src/main.ts"],
  outdir: distDir,
  bundle: true,
  platform: "node",
  target: "node20",
  format: "cjs",
  minify: false,
  sourcemap: false,
}).finally(() => {
  esbuild.stop();
});

console.log("Complete!");
