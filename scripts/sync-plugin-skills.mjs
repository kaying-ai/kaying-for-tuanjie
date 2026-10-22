#!/usr/bin/env node
/**
 * Sync the repository's `skills/` tree into the platform packages that cannot
 * reference it by relative path (their manifests forbid `..` outside the
 * plugin root): `for-claude/plugins/tuanjie/skills/` and
 * `for-codex/plugins/tuanjie/skills/`.
 *
 *   node scripts/sync-plugin-skills.mjs          # copy changed files, remove stale ones
 *   node scripts/sync-plugin-skills.mjs --check  # verify in sync; write nothing (CI)
 *
 * `skills/` stays the single source of truth — never hand-edit a generated copy.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "skills");
const DESTS = [
  path.join(ROOT, "for-claude", "plugins", "tuanjie", "skills"),
  path.join(ROOT, "for-codex", "plugins", "tuanjie", "skills"),
  path.join(ROOT, "for-zcode", "plugins", "tuanjie", "skills"),
  path.join(ROOT, "for-kayingcode", "plugins", "tuanjie", "skills"),
];

const SKIP = new Set([".DS_Store", "Thumbs.db", "node_modules", ".git"]);
const CHECK = process.argv.includes("--check");
const log = (...parts) => console.log("[sync-plugin-skills]", ...parts);

function walk(dir, base = dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, base));
    else if (entry.isFile()) out.push(path.relative(base, full));
  }
  return out;
}

const hash = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");

let failed = false;
for (const dest of DESTS) {
  const rel = path.relative(ROOT, dest);
  const srcFiles = new Set(walk(SRC).map((p) => p.split(path.sep).join("/")));
  const destFiles = new Set(
    (fs.existsSync(dest) ? walk(dest) : []).map((p) => p.split(path.sep).join("/")),
  );

  if (CHECK) {
    const problems = [];
    for (const f of srcFiles) {
      if (!destFiles.has(f)) problems.push(`missing: ${f}`);
      else if (hash(path.join(SRC, f)) !== hash(path.join(dest, f))) problems.push(`differs: ${f}`);
    }
    for (const f of destFiles) if (!srcFiles.has(f)) problems.push(`stale: ${f}`);
    if (problems.length > 0) {
      failed = true;
      log(`${rel}: ${problems.length} drifted`);
      for (const p of problems.slice(0, 20)) log(`  ${p}`);
      if (problems.length > 20) log(`  … and ${problems.length - 20} more`);
    } else {
      log(`${rel}: in sync (${srcFiles.size} files)`);
    }
    continue;
  }

  fs.mkdirSync(dest, { recursive: true });
  let copied = 0;
  for (const f of srcFiles) {
    const from = path.join(SRC, f);
    const to = path.join(dest, f);
    if (!fs.existsSync(to) || hash(from) !== hash(to)) {
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.copyFileSync(from, to);
      copied += 1;
    }
  }
  let removed = 0;
  for (const f of destFiles) {
    if (!srcFiles.has(f)) {
      fs.unlinkSync(path.join(dest, f));
      removed += 1;
    }
  }
  log(`${rel}: +${copied} ~0 -${removed}`);
}

if (CHECK && failed) {
  console.error("[sync-plugin-skills] drift detected — run `npm run build:plugins`");
  process.exit(1);
}
