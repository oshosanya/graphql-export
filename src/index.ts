#!/usr/bin/env node

import { convert } from './exporters'
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const yargs = require('yargs');

console.log(
    chalk.green(
        figlet.textSync('graphql-export', { horizontalLayout: 'full' })
    )
);

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
    .option('query-name', {
        description: 'the name of your root query field',
        alias: 'q',
        type: 'string'
    })
    .option('mutation-name', {
        description: 'the name of your root mutation field',
        alias: 'm',
        type: 'string'
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

if (argv['query-name'] == null) {
    const defaultValue = "RootQueryType"
    console.info(
        chalk.cyan(
            'Argument' + chalk.italic(' query-name ') +
            'was not supplied. Using default value: ' +
            chalk.italic.bgCyan.black(` ${defaultValue} `)
        )
    )

    argv['query-name'] = defaultValue

}

if (argv['mutation-name'] == null) {
    const defaultValue = "RootMutationType"
    console.info(
        chalk.cyan(
            'Argument' + chalk.italic(' mutation-name ') +
            'was not supplied. Using default value: ' +
            chalk.italic.bgCyan.black(` ${defaultValue} `)
        )
    )
    argv['mutation-name'] = defaultValue
}

convert(argv['url'], argv['format'], argv['query-name'], argv['mutation-name'], argv['custom-headers']);
