import {buildCSS, buildJS} from "./bundler.ts"

await buildCSS.watch();
await buildJS.watch();
console.info("esbuild is watching...")