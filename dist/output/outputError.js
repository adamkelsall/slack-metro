"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
function outputError(error) {
    const warning = chalk.red("ERROR!");
    const title = "Metro Disruptions";
    console.error(`${warning} ${title}\n`);
    console.error(errorRow("Type", error.name));
    console.error(errorRow("Message", error.message));
    console.error(errorStack(error.stack));
}
exports.outputError = outputError;
function errorRow(title, content) {
    const indent = 10;
    const padding = " ".repeat(indent - (title.length + 1));
    const label = chalk.cyan(`${title}:`);
    return content
        .split("\n")
        .map((line, index) => index ? `${" ".repeat(indent)}${line}` : `${label}${padding}${line}`)
        .join("\n");
}
function errorStack(stack) {
    const stackLines = stack
        .split("\n")
        .slice(1)
        .map((line) => line.trim())
        .join("\n");
    return errorRow("Stack", stackLines);
}
