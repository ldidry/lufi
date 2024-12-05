// deno-lint-ignore-file
import * as esbuild from "npm:esbuild";
import { fontawesomeSubset } from "fontawesome-subset";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader";

const themeDir = "./themes/default";

fontawesomeSubset(
  [
    "circle-plus",
    "close",
    "copy",
    "download",
    "envelope",
    "eraser",
    "eye",
    "eye-slash",
    "file",
    "file-zipper",
    "globe",
    "lock",
    "recycle",
    "right-from-bracket",
    "right-to-bracket",
    "trash",
    "upload",
  ],
  `${themeDir}/public/webfonts`,
  {}
);

const ignoreFontsPlugin: esbuild.Plugin = {
  name: "file",
  setup(build) {
    build.onResolve({ filter: /\.woff2|ttf$/ }, (args) => ({
      external: true,
    }));
  },
};

export const buildCSS = await esbuild.context({
  plugins: [ignoreFontsPlugin],
  entryPoints: [`${themeDir}/public/css/main.css`],
  outfile: `${themeDir}/public/css/main.min.css`,
  loader: {
    ".ttf": "file",
    ".woff2": "file",
  },
  bundle: true,
  minify: true,
  sourcemap: false,
  allowOverwrite: true,
  target: ["deno2", "chrome67", "firefox68"],
});

export const buildJS = await esbuild.context({
  plugins: [...denoPlugins()],
  entryPoints: [`${themeDir}/public/js/*.js`],
  outdir: `${themeDir}/public/js/minified`,
  entryNames: "[dir]/[name].min",
  bundle: true,
  minify: false,
  sourcemap: false,
  allowOverwrite: true,
  format: "esm",
  target: ["deno2", "chrome67", "firefox68"],
});
