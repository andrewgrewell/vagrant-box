import * as path from 'path';

export const consumerRootPath = process.cwd();
export const rootPath = path.resolve(__dirname, '../../');
export const envFilePath = `/tmp/env${consumerRootPath.replace(/\//g, '.').toLowerCase()}`