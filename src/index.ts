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
    .demandOption(['url', 'format'], 'Please provide both url and format arguments to work with this tool')
    .help()
    .alias('help', 'h')
    .argv;

convert(argv.url, argv.format);
