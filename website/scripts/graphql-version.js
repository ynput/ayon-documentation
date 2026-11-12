// Puts the server version into the GraphQL API reference homepage, after `graphql-to-doc`.
//
// The first line of static/schema.graphql is a comment with the server title and version,
// for example `# Ayon server 1.17.4`, as the server writes it at /schema.graphql
// (ynput/ayon-backend#1277). SDL has no version field, unlike `info.version` in openapi.json.
// The generated homepage (graphql/graphql-homepage.md) has the placeholder %AYON_SERVER%,
// replaced here with `Ayon server (1.17.4)`, as the REST API reference shows it.

const fs = require("fs");
const path = require("path");

const site = path.join(__dirname, "..");
const schema = fs.readFileSync(path.join(site, "static", "schema.graphql"), "utf-8");
const match = schema.match(/^#\s*(.+?)\s+(\d+\.\d+\.\d+\S*)\s*$/m);
const server = match ? `${match[1]} (${match[2]})` : "AYON server";
const homepage = path.join(site, "graphql", "graphql-homepage.md");
fs.writeFileSync(homepage, fs.readFileSync(homepage, "utf-8").replaceAll("%AYON_SERVER%", server));
console.log(`GraphQL API reference homepage: ${server}`);
