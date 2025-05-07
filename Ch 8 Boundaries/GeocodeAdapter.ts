import { GeocodeService, Coordinates } from "./GeocodeService";
import { GeocodeAPIClass } from "./GeocodeAPIClass";

export class GeocodeAdapter implements GeocodeService {
    constructor(private readonly apiClient: GeocodeAPIClass) {}

    async getCoordinates(place: string): Promise<Coordinates | null> {
        const locations = await this.apiClient.fetchGeocodeData(place);

        if (!locations || locations.length === 0) {
            return null;
        }

        const { lat, lon } = locations[0];
        return { latitude: lat, longitude: lon };
    }
}
