import axios from 'axios';
import Insomnia from './insomnia/insomnia';
import Postman from './postman/postman';
import { instrospectionQueryString } from "./introspection_query";

const fs = require('fs');
const chalk = require('chalk');

const convert = async function (url: string, converter: string, rootQueryName: string, rootMutationName: string, headers: Array<string>) {
    let requestHeaders: Record<string, string> = {};
    headers.forEach(header => {
        const [key, value] = header.split(':');
        requestHeaders[key.trim()] = value.trim();
    });

    const formatConverter = require(`./${converter}/${converter}`);

    try {
        let response = await getSchema(url, instrospectionQueryString, requestHeaders);
        const converter: Insomnia | Postman = Object.create(formatConverter.default.prototype)
        let data = converter.convert(response.data, url, rootQueryName, rootMutationName)
        fs.writeFileSync('export.json', data);
        console.log("File saved to export.json");
    } catch (err) {
        if (err.isAxiosError) {
            console.info(chalk.red('Response from server: ' + chalk.italic.bgRed.black(` ${err.response.data} `)));
            process.exit(1);
        }
        console.log(err)
        console.log('Could not introspect graphql server, please check the root url')
    }
}

const getSchema = (url: string, query: string, requestHeaders: object) => {
    return axios.post(url, {
        query: query
    }, { headers: requestHeaders })
}

export { convert };
