import { GeocodeService, Coordinates } from "./GeocodeService";

export class GeocodeAdapter implements GeocodeService {
    private readonly apiKey = "681834beda8f4675343599bqv1891b6";

    async getCoordinates(place: string): Promise<Coordinates | null> {
        const encodedPlace = encodeURIComponent(place);
        const url = `https://geocode.maps.co/search?q=${encodedPlace}&api_key=${this.apiKey}&format=json`;

        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const locations = await response.json();

        if (locations.length === 0) {
            return null;
        }

        const { lat, lon } = locations[0];
        return { latitude: lat , longitude: lon };
    }
}
