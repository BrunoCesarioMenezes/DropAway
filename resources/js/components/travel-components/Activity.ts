export interface Activity{
    place_id: string;
    name: string;
    lat?: number;
    lng?: number;
    rating?: number;
    priceLevel?: number;
    cost: {min: number, max: number};
    address?: string;
}
