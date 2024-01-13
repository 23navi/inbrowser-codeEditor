import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "fileCache",
});

export const fetchPlugin = (userCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        // Check if the data is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) {
          return cachedResult;
        }

        // Fetch the data from unpkg.com. We need to fetch the data from unpkg.com because we are not using the cache.
        const { data, request } = await axios.get(args.path);

        // this will be only used for css files. We need to return the contents of the css file.
        const escapedData = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
            const style = document.createElement('style');
            style.innerText = '${escapedData}';
            document.head.appendChild(style);
            `;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        // Cache the result
        await fileCache.setItem(args.path, result);

        // return the result
        return result;
      });

      build.onLoad({ filter: /^index\.js$/ }, async (args: any) => {
        return {
          loader: "jsx",
          contents: userCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // Check if the data is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        if (cachedResult) {
          return cachedResult;
        }

        // Fetch the data from unpkg.com. We need to fetch the data from unpkg.com because we are not using the cache.
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        // Cache the result
        await fileCache.setItem(args.path, result);

        // return the result
        return result;
      });
    },
  };
};
