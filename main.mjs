import { debug, getInput, info, setOutput } from "@actions/core";
import { context } from "@actions/github";
import { normalize, trimTailDotVim } from "./normalize";

const main = () => {
  info("Start main process");
  debug(JSON.stringify(context.repo));
  const stripDotVim =
    getInput("trim-tail-dot-vim", { required: false }) === "true";
  if (stripDotVim) {
    info(`You specify trim-tail-dot-vim.`);
  }
  info("Complete main process");
  const normalized = stripDotVim
    ? trimTailDotVim(normalize(context.repo.repo))
    : normalize(context.repo.repo);
  debug(`normalized is "${normalized}"`);
  setOutput("normalizedName", normalized);
};

main();
