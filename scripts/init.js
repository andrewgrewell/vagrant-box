#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const consumerRootPath = process.cwd();
const rootPath = path.resolve(__dirname);

const valuesPath = path.resolve(rootPath, './values.yml');
const customerValuesPath = path.resolve(consumerRootPath, './values.yml');
const examplePath = path.resolve(rootPath, './example_provision_play.yml');
const consumerExamplePath = path.resolve(consumerRootPath, './example_provision_play.yml')

if (!fs.existsSync(customerValuesPath)) {
    spawn('cp', [valuesPath, customerValuesPath]);
    console.log('Created values.yml');
}

if (!s.existsSync(customerValuesPath)) {
    spawn('cp', [examplePath, consumerExamplePath])
    console.log('Created example provision play');
}


const packageJsonPath = path.resolve(consumerRootPath, 'package.json');
let packageJson;
try {
    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
} catch (err) {
    packageJson = {}
}

packageJson.scripts = {
    ...packageJson.scripts,
    "vb": "vagrant-box",
    "vb-up": "yarn run vb up --provision",
    "vb-down": "yarn run vb destroy -f",
    "vb-provision": "yarn run vb provision",
    "vb-ssh": "yarn run vb ssh workspace"
};

try {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));
    console.log("Added scripts to package.json")
} catch {

}