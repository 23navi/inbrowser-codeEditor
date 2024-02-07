import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

// Initally this service will be undefined but after first run, it will be set to esbuild.startSerive()
let service: esbuild.Service | undefined = undefined;

const bundler = async (rawCode: string) => {
  // we want to initialize service only once
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm", // we have it in public folder
    });
  }

  const buildResult = await service.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      "process.env.NODE_ENV": "'production'",
      global: "window",
    },
  });
  const outputCode = buildResult.outputFiles[0].text;
  return outputCode;
};

export default bundler;
