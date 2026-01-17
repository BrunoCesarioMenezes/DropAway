import { Day } from "./Day";

export interface City {
    name: string;
    lat: number;
    lng: number;
    days: number;
    day_array: Day[];
}
