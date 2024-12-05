import {buildCSS, buildJS} from "./bundler.ts"

await buildCSS.watch();
await buildJS.watch();
console.debug("esbuild is watching...")