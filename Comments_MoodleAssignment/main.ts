import { fetchTumblrData } from "./tumblrApi.js";
import { parseTumblrData } from "./tumblrParser.js";
import * as promptSync from 'prompt-sync';
const prompt = promptSync();
async function main() {
    const blogName = prompt("Enter the Tumblr blog name:") || "";
    const rangeInput = prompt("Enter the range (start-end):") || "";
    
    const [start, end] = rangeInput.split("-").map(Number);
    if (isNaN(start) || isNaN(end) || start < 1 || end < start) {
        console.log("Invalid range input.");
        return;
    }
    
    const tumblrData = await fetchTumblrData(blogName, start, end);
    if (tumblrData) {
        parseTumblrData(tumblrData);
    }
}

main();