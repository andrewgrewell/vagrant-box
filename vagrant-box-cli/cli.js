#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

const consumerRootPath = process.cwd();
const rootPath = path.resolve(__dirname, '../');
const args = process.argv.slice(2);

spawn('vagrant', args, {
    cwd: consumerRootPath,
    stdio: 'inherit',
    env: {
        ...process.env,
        VAGRANT_CWD: rootPath
    }
});