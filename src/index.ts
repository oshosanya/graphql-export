#!/usr/bin/env node

import { convert } from './exporters'
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

clear();
console.log(
    chalk.green(
        figlet.textSync('graphql-export', { horizontalLayout: 'full' })
    )
);

const yargs = require('yargs');
const argv = yargs
    .option('url', {
        description: 'the graphql server root url',
        alias: 'u',
        type: 'string',
    })
    .option('format', {
        description: 'The export format',
        alias: 'f',
        type: 'string',
        choices: ['insomnia', 'postman']
    })
    .option('custom-headers', {
        description: 'Custom headers to pass with the request to the graphql server, should be passed in form "header-name:header-value"',
        alias: 'H',
        type: "array",
        default: []
    })
    .demandOption(['url', 'format'], 'Please provide both url and format arguments to work with this tool')
    .help()
    .alias('help', 'h')
    .argv;

convert(argv.url, argv.format, argv['custom-headers']);
