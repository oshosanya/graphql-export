import { convert } from './exporters'

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
