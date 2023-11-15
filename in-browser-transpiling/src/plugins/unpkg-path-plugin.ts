import * as esbuild from "esbuild-wasm";
import axios from "axios";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // onReslove
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // console.log("onResole", args);
        return { path: args.path, namespace: "a" };
      });

      build.onLoad({ filter: /.*/, namespace: "a" }, async (args: any) => {
        // console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              import message from 'tiny-test-pkg';
              console.log(message);
            `,
          };
        }
        const { data } = await axios.get("https://unpkg.com/tiny-test-pkg");
        return {
          loader: "jsx",
          contents: data,
        };
      });
    },
  };
};
