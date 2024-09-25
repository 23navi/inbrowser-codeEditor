import { Command } from "commander";
import path from "path";
import server from "local-api";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Serve a notebook")
  .option("-p, --port <number>", "Port number", "3000")
  .option("-s, --silent", "Disable logging", false)
  .option("-d, --debug", "Enable debug mode", false)
  .action(async (filename = "default.js", options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    server(parseInt(options.port), path.basename(filename), dir);
  });
