import { debug, error, info, setOutput } from "npm:@actions/core@1.10.1";
import { normalize, trimTailDotVim } from "./normalize.ts";
import { parseArgs } from "jsr:@std/cli@1.0.19/parse-args";

const main = (args: string[]) => {
  info("Start main process");
  const a = parseArgs(args, {
    boolean: ["trim-tail-dot-vim"],
  });
  const target = a._.at(0);
  if (target == null || typeof target !== "string") {
    error(
      `You must specify a target repository name as the first argument. Received: ${
        JSON.stringify(
          target,
        )
      }`,
    );
    Deno.exit(1);
  }
  debug(target);
  // const stripDotVim =
  //   getInput("trim-tail-dot-vim", { required: false }) === "true";
  const stripDotVim = a["trim-tail-dot-vim"];
  if (stripDotVim) {
    info(`You specify trim-tail-dot-vim.`);
  }
  const normalized = stripDotVim
    ? trimTailDotVim(normalize(target))
    : normalize(target);
  info("Complete main process");
  debug(`normalized is "${normalized}"`);
  setOutput("normalizedName", normalized);
};

main(Deno.args);
