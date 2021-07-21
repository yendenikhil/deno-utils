import * as log from "https://deno.land/std@0.102.0/log/mod.ts";

await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG", {
      formatter: (lr) => {
        const now = new Date();
        return `[${lr.levelName}] ${now.toLocaleTimeString()} - ${lr.msg}`;
      },
    }),
  },
  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["console"],
    },
  },
});

export { log };
