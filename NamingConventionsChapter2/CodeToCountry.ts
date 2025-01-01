import PromptSync = require("prompt-sync");
const countryMapping: { [key: string]: string } = {
    IN: "India",
    US: "United States",
    NZ: "New Zealand",
    UK: "United Kingdom",
    AU: "Australia",
    CA: "Canada",
    FR: "France",
    DE: "Germany",
    JP: "Japan",
    CN: "China"
};

const prompt = PromptSync();

function getCountryNameByCode(countryCode: string): string {
    const countryCodeUppercase  = countryCode.toUpperCase();
    return countryMapping[countryCodeUppercase] || "Invalid code";

}

function main(): void {
    const userInput = prompt("Enter a country code (e.g., IN, US, NZ):");

    if (userInput) {
        const countryName = getCountryNameByCode(userInput.trim());  // to remove whitespaces
        console.log(`Country Name: ${countryName}`);
    } else {
        console.log("No input provided.");
    }
}

main();

