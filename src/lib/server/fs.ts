import { promises as fs, constants } from 'node:fs';
import { fileURLToPath, type URL } from 'node:url';
import { dirname, resolve } from 'node:path';

export const error = (e: unknown) => console.error(e);

export const __dirname = (url: string | URL) => dirname(fileURLToPath(url));

export function rootpath(...args: string[]): string {
  return resolve(process.cwd(), ...args);
}

export async function readSubdirs(src: string): Promise<string[] | void> {
  return await fs
    .stat(src)
    .then(
      async () =>
        await fs
          .readdir(src, { withFileTypes: true })
          .then((val) => val.filter((val) => val.isDirectory()).map((val) => val.name))
          .catch(error)
    )
    .catch(error);
}

export async function makeDir(src: string) {
  return fs.stat(src).catch(async () => await fs.mkdir(src, { recursive: true }).catch(error));
}

export async function readFile(src: string, flag = 'r'): Promise<string | void> {
  return await fs
    .stat(src)
    .then(async () => await fs.readFile(src, { flag, encoding: 'utf-8' }).catch(error))
    .catch(error);
}

export async function writeFile(file: string, data: string, flag = 'w') {
  return await fs.writeFile(file, data, { flag, encoding: 'utf-8' }).catch(error);
}

export async function copyFile(src: string, dest: string) {
  return await fs
    .stat(src)
    .then(async () => await fs.copyFile(src, dest).catch(error))
    .catch(error);
}

export async function access(src: string, callback?: () => void) {
  return await fs.access(src, constants.F_OK).catch(callback);
}

export async function remove(src: string) {
  return await fs
    .stat(src)
    .then(
      async (stats) =>
        await (
          stats.isFile() ? fs.unlink(src) : fs.rm(src, { recursive: true, force: true })
        ).catch(error)
    )
    .catch(error);
}
