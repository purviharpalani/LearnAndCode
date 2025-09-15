import { GEOCODE_API } from "./constants";

export class GeocodeAPIClass{
    async fetchGeocodeData(place: string): Promise<any[]> {
        const encodedPlace = encodeURIComponent(place);
        const url = `${GEOCODE_API.BASE_URL}?q=${encodedPlace}&api_key=${GEOCODE_API.API_KEY}&format=json`;

        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
}