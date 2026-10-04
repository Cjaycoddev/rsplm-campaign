import fs from "fs";
import { spawnSync } from "child_process";

const skip = new Set(["DARAJA_CALLBACK_URL"]);
const pub = new Set([
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_DARAJA_SANDBOX",
  "NEXT_PUBLIC_MPESA_TILL",
]);

for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  if (!line || line.startsWith("#")) continue;
  const i = line.indexOf("=");
  if (i < 0) continue;
  const k = line.slice(0, i).trim();
  let v = line.slice(i + 1).trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }
  if (!k || !v || skip.has(k)) continue;
  const args = [
    "vercel",
    "env",
    "add",
    k,
    "production,preview,development",
    "--yes",
    "--force",
    "--value",
    v,
    pub.has(k) ? "--no-sensitive" : "--sensitive",
  ];
  const r = spawnSync("npx", args, { encoding: "utf8", windowsHide: true });
  process.stdout.write(`${k} ${r.status === 0 ? "ok" : "fail"}\n`);
  if (r.status !== 0) {
    process.stderr.write((r.stderr || r.stdout || "").slice(0, 400) + "\n");
  }
}
