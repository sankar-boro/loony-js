const outfile = 'build/bundle.js'

require('esbuild').build({
    entryPoints: ['index.ts'],
    outfile: outfile,
    platform: "node",
    bundle: true,
    minify: true,
    sourcemap: true, // Optional, useful for debugging
}).catch(() => process.exit(1));

console.log("ES_BUILD completed under directory:", outfile)
