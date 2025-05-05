import * as readline from "readline";
import { GeocodeAdapter } from "./GeocodeAdapter";
import { GeocodeService, Coordinates } from "./GeocodeService";

const geocodeService: GeocodeService = new GeocodeAdapter();

function getPlaceFromUser(): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question("Enter a place name: ", (place) => {
            rl.close();
            resolve(place);
        });
    });
}

function displayCoordinates(coordinates: Coordinates | null): void {
    if (!coordinates) {
        console.log("No results found for the given place.");
    } else {
        console.log(`Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}`);
    }
}

async function handleCoordinateLookup(service: GeocodeService) {
    try {
        const place = await getPlaceFromUser();
        const coordinates = await service.getCoordinates(place);
        displayCoordinates(coordinates);
    } catch (error) {
        console.error("Error:", error);
    }
}

handleCoordinateLookup(geocodeService);
