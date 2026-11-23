import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appRoot = path.resolve(path.join(__dirname, '../..'));

// Hostinger runs the app from hbuilds/versions/<id>/nodejs, a folder that is replaced on every
// deploy. Uploads must therefore live outside it, next to the domain, to survive a redeploy.
function findPersistentRoot() {
  if (process.env.UPLOADS_DIR) return null;

  let dir = appRoot;
  for (let i = 0; i < 8; i += 1) {
    const parent = path.dirname(dir);
    if (parent === dir) break;
    if (path.basename(dir) === 'hbuilds') return parent;
    dir = parent;
  }
  return null;
}

const persistentRoot = findPersistentRoot();

function listVersionUploadDirs() {
  if (!persistentRoot) return [];
  const versionsDir = path.join(persistentRoot, 'hbuilds/versions');
  try {
    return fs
      .readdirSync(versionsDir)
      .map((name) => path.join(versionsDir, name, 'nodejs/uploads'))
      .filter((dir) => fs.existsSync(dir))
      .map((dir) => ({ dir, mtime: fs.statSync(dir).mtimeMs }))
      .sort((a, b) => b.mtime - a.mtime)
      .map((entry) => entry.dir);
  } catch {
    return [];
  }
}

function dedupe(dirs) {
  return dirs
    .filter(Boolean)
    .map((dir) => path.resolve(dir))
    .filter((dir, i, arr) => arr.indexOf(dir) === i);
}

function fileCount(dir) {
  try {
    return fs.readdirSync(dir).length;
  } catch {
    return 0;
  }
}

export function getUploadsWriteDir() {
  const dir = process.env.UPLOADS_DIR
    ? path.resolve(process.env.UPLOADS_DIR)
    : persistentRoot
      ? path.join(persistentRoot, 'uploads')
      : path.join(appRoot, 'uploads');

  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

// Older deploy folders and manual File Manager uploads are read-only sources for legacy media.
export function getLegacyUploadDirs() {
  const writeDir = getUploadsWriteDir();
  return dedupe([
    persistentRoot && path.join(persistentRoot, 'public_html/uploads'),
    path.join(appRoot, 'uploads'),
    path.join(appRoot, 'public/uploads'),
    path.join(process.cwd(), 'uploads'),
    ...listVersionUploadDirs(),
  ]).filter((dir) => dir !== writeDir && fs.existsSync(dir));
}

export function getUploadsReadDirs() {
  return dedupe([getUploadsWriteDir(), ...getLegacyUploadDirs()]);
}

// Runs on boot so images uploaded before this change are not lost with their old deploy folder.
export function migrateLegacyUploads() {
  const writeDir = getUploadsWriteDir();
  const result = { writeDir, copied: 0, skipped: 0, failed: 0, sources: [] };

  for (const source of getLegacyUploadDirs()) {
    let copied = 0;
    let files = [];
    try {
      files = fs.readdirSync(source, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of files) {
      if (!entry.isFile()) continue;
      const target = path.join(writeDir, entry.name);
      if (fs.existsSync(target)) {
        result.skipped += 1;
        continue;
      }
      try {
        fs.copyFileSync(path.join(source, entry.name), target);
        copied += 1;
        result.copied += 1;
      } catch {
        result.failed += 1;
      }
    }

    result.sources.push({ dir: source, copied });
  }

  return result;
}

export function describeUploadsPaths() {
  const writeDir = getUploadsWriteDir();
  return {
    appRoot,
    cwd: process.cwd(),
    persistentRoot,
    writeDir,
    writeDirFiles: fileCount(writeDir),
    readDirs: getUploadsReadDirs().map((dir) => ({ dir, files: fileCount(dir) })),
  };
}
