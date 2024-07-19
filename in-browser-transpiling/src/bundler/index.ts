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

  try {
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
    return { code: outputCode, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { code: "", error: error.message };
    }
    throw error;
  }
};

export default bundler;
