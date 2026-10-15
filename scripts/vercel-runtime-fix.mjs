// Post-build fix for @astrojs/vercel v7 (Astro 4) + current Vercel runtimes.
//
// The v7 adapter only knows Node 18 / 20 and writes one of those into each
// serverless function's `.vc-config.json`. Vercel has since removed both
// runtimes for new deployments, so every deploy fails instantly with
// "Deployment has failed" before the build logs show anything useful.
//
// Until the project migrates to Astro 5 + @astrojs/vercel v8+ (which emit a
// supported runtime natively), this script rewrites the emitted runtime to the
// current default. Run it right after `astro build`.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const TARGET_RUNTIME = 'nodejs22.x';
const FUNCTIONS_DIR = '.vercel/output/functions';

function findConfigs(dir) {
  let out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out = out.concat(findConfigs(p));
    else if (name === '.vc-config.json') out.push(p);
  }
  return out;
}

let patched = 0;
for (const file of findConfigs(FUNCTIONS_DIR)) {
  const cfg = JSON.parse(readFileSync(file, 'utf8'));
  if (cfg.runtime && cfg.runtime !== TARGET_RUNTIME) {
    console.log(`  ${file}: ${cfg.runtime} -> ${TARGET_RUNTIME}`);
    cfg.runtime = TARGET_RUNTIME;
    writeFileSync(file, JSON.stringify(cfg, null, 2));
    patched++;
  }
}
console.log(`vercel-runtime-fix: patched ${patched} function config(s) to ${TARGET_RUNTIME}`);
