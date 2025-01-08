"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromptSync = require("prompt-sync");
var countryData = {
    IN: { name: "India", neighbors: ["Pakistan", "China", "Nepal", "Bangladesh", "Bhutan", "Myanmar"] },
    US: { name: "United States", neighbors: ["Canada", "Mexico"] },
    NZ: { name: "New Zealand", neighbors: [] },
    UK: { name: "United Kingdom", neighbors: ["Ireland"] },
    AU: { name: "Australia", neighbors: [] },
    CA: { name: "Canada", neighbors: ["United States"] },
    FR: { name: "France", neighbors: ["Belgium", "Luxembourg", "Germany", "Switzerland", "Italy", "Spain", "Andorra", "Monaco"] },
    DE: { name: "Germany", neighbors: ["Denmark", "Poland", "Czech Republic", "Austria", "Switzerland", "France", "Luxembourg", "Belgium", "Netherlands"] },
    JP: { name: "Japan", neighbors: [] },
    CN: { name: "China", neighbors: ["India", "Pakistan", "Nepal", "Russia", "Mongolia", "Vietnam", "Laos", "Myanmar"] }
};
var prompt = PromptSync();
function getCountryNameByCode(countryCode) {
    var countryCodeUppercase = countryCode.toUpperCase();
    var countryInfo = countryData[countryCodeUppercase];
    if (!countryInfo) {
        return "Invalid code";
    }
    var name = countryInfo.name, neighbors = countryInfo.neighbors;
    if (neighbors.length === 0) {
        return "".concat(name, " has no adjacent countries.");
    }
    else {
        return "Adjacent countries of ".concat(name, ": ").concat(neighbors.join(", "), ".");
    }
}
function main() {
    var userInput = prompt("Enter a country code (e.g., IN, US, NZ):");
    if (userInput) {
        var countryInfo = getCountryNameByCode(userInput.trim()); // to remove whitespaces
        console.log(countryInfo);
    }
    else {
        console.log("No input provided.");
    }
}
main();
