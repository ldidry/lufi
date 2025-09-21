import {buildCSS, buildJS} from "./bundler.ts"

console.info("Building css...")
await buildCSS.rebuild();
buildCSS.dispose();

console.info("Building javascript...")
await buildJS.rebuild();
buildJS.dispose();