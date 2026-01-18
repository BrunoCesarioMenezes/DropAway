export interface Activity{
    place_id: string;
    name: string;
    rating?: number;
    priceLevel?: number;
    cost: {min: number, max: number};
    address?: string;
}
