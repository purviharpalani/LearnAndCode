import * as promptSync from 'prompt-sync';
const countryData: { [key: string]: { name: string; neighbors: string[] } } = {
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

function getCountryInfoByCode(countryCode: string): string {
    const codeUppercase  = countryCode.toUpperCase();
    const countryInfo = countryData[codeUppercase];
    if(!countryInfo){
        return "Invalid code";
    }
    const {name, neighbors} = countryInfo;
    if(neighbors.length === 0){
        return `${name} has no adjacent countries.`;
    }
    else{
        return `Adjacent countries of ${name}: ${neighbors.join(", ")}.`;
    }
}

function main(): void {
    const userInput = prompt("Enter a country code (e.g., IN, US, NZ):");

    if (userInput) {
        const countryInfo = getCountryInfoByCode(userInput.trim());  // to remove whitespaces
        console.log(countryInfo);
    } else {
        console.log("No input provided.");
    }
}

main();