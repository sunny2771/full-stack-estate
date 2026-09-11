import { copyFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const dist = join(dirname(fileURLToPath(import.meta.url)), "dist");
const index = join(dist, "index.html");
const routes = [
  "register",
  "login",
  "list",
  "profile",
  "profile/update",
  "add",
];

for (const route of routes) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(index, join(dir, "index.html"));
}
