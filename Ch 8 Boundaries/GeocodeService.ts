export interface Coordinates {
    latitude: string;
    longitude: string;
}

export interface GeocodeService {
    getCoordinates(place: string): Promise<Coordinates | null>;
}
