# graphql-export

This is a teeny tiny program that helps to export your graphql queries from the server to insomnia graphql requests

## Requirements
Yarn package manager

NodeJS

## Quick Use

```
yarn global add graphql-export

// For postman exports
graphql-export -u http://my-graph-ql-server-root -f postman

//For insomnia exports
graphql-export -u http://my-graph-ql-server-root -f insomnia
```

After running the command, an `export.json` file is generated which you can then import into insomnia api client


## Passing custom headers

You might need to pass headers to your graphql server, sometimes for authentication.
You can do that using the `-H` option.

Example

`graphql-export -u http://my-graph-ql-server-root -f insomnia -H "x-hasura-secret: xxx-xxx-xxx"`

If you need to pass multiple headers, you can follow the below sample

`graphql-export -u http://my-graph-ql-server-root -f insomnia -H "header1: value1" "header2: value2"`
