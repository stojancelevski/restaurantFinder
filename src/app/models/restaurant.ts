import {Menu} from './menu';

export interface Restaurant {
    key: string;
    name: string;
    img: string;
    email: string;
    latitude: number;
    longitude: string;
    menu: Menu[];
    contact: string;
    approved: boolean;
}
