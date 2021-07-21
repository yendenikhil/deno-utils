import { log } from "./logger.ts";
import { debounce } from "https://deno.land/std/async/mod.ts";

const filename = Deno.args[0];
let p: Deno.Process;

log.info(`running program with -A and --unstable flag`);
log.info(`deno run -A --unstable ${filename}`);

const run = async () => {
  log.info("restarting...");
  if (p) {
    p.close();
  }
  p = Deno.run({
    cmd: ["deno", "run", "-A", "--unstable", filename],
  });
};
const runDebounced = debounce(run, 1000);
runDebounced();

const tsRe = new RegExp(/.+\.ts$/);
const isTsFile = (name: string) => tsRe.test(name);

const watcher = Deno.watchFs(".", { recursive: true });
for await (const e of watcher) {
  if (e.paths.some(isTsFile)) {
    runDebounced();
  }
}
