import {buildCSS, buildJS} from "./bundler.ts"

console.debug("Building css...")
await buildCSS.rebuild();
buildCSS.dispose();

console.debug("Building javascript...")
await buildJS.rebuild();
buildJS.dispose();