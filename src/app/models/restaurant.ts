import {Menu} from './menu';

export interface Restaurant {
    id: string;
    name: string;
    img: string;
    email: string;
    latitude: number;
    longitude: string;
    food: Menu[];
    contact: string;
}
