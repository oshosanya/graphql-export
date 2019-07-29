import { convert } from './exporters'

const yargs = require('yargs');
const argv = yargs
    .option('url', {
        description: 'the graphql server root url',
        alias: 'u',
        type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv.url) {
    convert(argv.url, 'insomnia');
    process.exit()
}

yargs.showHelp();
