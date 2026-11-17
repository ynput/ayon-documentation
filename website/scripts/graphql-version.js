// Puts the server version into the GraphQL API reference homepage, after `graphql-to-doc`.
//
// The schema address is the `schema` option of the GraphQL plugin in docusaurus.config.js. Its first line is a
// comment with the server title and version, for example `# Ayon server 1.17.6`; SDL has no version field,
// unlike `info.version` in openapi.json. The generated homepage (graphql/graphql-homepage.md) has the
// placeholder %AYON_SERVER%, replaced here with `Ayon server (1.17.6)`, as the REST API reference shows it.

const fs = require("fs");
const path = require("path");

const config = require("../docusaurus.config.js");
const plugin = config.plugins.find((entry) => Array.isArray(entry) && entry[0] === "@graphql-markdown/docusaurus");
const url = plugin[1].schema;
const homepage = path.join(__dirname, "..", "graphql", "graphql-homepage.md");

(async () => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`GraphQL schema: ${url} answered ${response.status} ${response.statusText}`);
    }
    const schema = await response.text();
    const match = schema.match(/^#\s*(.+?)\s+(\d+\.\d+\.\d+\S*)\s*$/m);
    const server = match ? `${match[1]} (${match[2]})` : "AYON server";
    fs.writeFileSync(homepage, fs.readFileSync(homepage, "utf-8").replaceAll("%AYON_SERVER%", server));
    console.log(`GraphQL API reference homepage: ${server}`);
})().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
