import { GeocodeAdapter } from './GeocodeAdapter';
import { GeocodeAPIClass } from './GeocodeAPIClass';
import { GeocodeService } from './GeocodeService';
import * as readline from 'readline';

async function promptUserInput(question: string): Promise<string> {
    const inputReader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        inputReader.question(question, (answer) => {
            inputReader.close();
            resolve(answer);
        });
    });
}

async function main() {
    const place = await promptUserInput('Enter a place name: ');

    const apiClient = new GeocodeAPIClass();
    const geocodeService: GeocodeService = new GeocodeAdapter(apiClient);

    const coordinates = await geocodeService.getCoordinates(place);

    if (coordinates) {
        console.log(`Coordinates of "${place}":`, coordinates);
    } else {
        console.log(`No coordinates found for "${place}".`);
    }
}

main().catch((err) => console.error('Unhandled error in main:', err));
