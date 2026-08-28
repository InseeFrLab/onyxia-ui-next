import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const sourceDir = path.join(repoRoot, "src/assets");
const targetDir = path.join(repoRoot, "dist/assets");

if (!existsSync(sourceDir)) {
    process.exit(0);
}

rmSync(targetDir, {
    recursive: true,
    force: true,
});
mkdirSync(path.dirname(targetDir), {
    recursive: true,
});
cpSync(sourceDir, targetDir, {
    recursive: true,
});
