import { Bill } from "../models/bill";
import { Product } from "../models/product";

export interface Item {
    id: string;
    count: number;
    price: number;
}

export interface Reference<T> {
    "@ref": {
        id: T;
        // ...  
        value: {
            id: string;
        }
    }
}

export interface FaunaResponse<T1, T2> {
    ref: T1
    ts: number
    data: T2
}