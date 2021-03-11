interface Reference {
    "@ref": {
        id: string;
        collection: {
            "@ref": {
                id: string;
                collection: {
                    "@ref": {
                        id: string;
                    }
                }
            }
        }
    }
}

interface IItem {
    count: number
    id: string
    price: number
}

export interface IBill {
    name: string
    telephone: string
    email: string
    message: string
    payment: Payment
    products: IItem[]
    total: number
}

export enum Category {
    Food = "Food",
    Appetizer = "Appetizer",
    Drinks = "Drinks",
    Snack = "Snack",
    Extra = "Extra",
    Soup = "Soup"
}

export enum Payment {
    Cash = "Cash",
    Visa = "Visa",
    Bitcoin = "Bitcoin",
    MasterCard = "MasterCard",
    PayPal = "PayPal",
}

export interface ProductData {
    _id: string;
    name: string;
    price: number;
    image: string;
    category: Category;
    description: string;
}

export interface IFaunaProduct {
    ref: Reference;
    ts: number;
    data: ProductData;
}

export interface IFaunaResponse<T> {
    ref: Reference
    ts: number
    data: T
}

export class ProductObject {
    _id: string;
    name: string;
    description: string;
    image: string;
    category: Category;
    price: number;
    constructor(product: IFaunaProduct) {
        this._id = product.ref["@ref"].id;
        this.name = product.data.name;
        this.description = product.data.description;
        this.image = product.data.image;
        this.price = product.data.price;
        this.category = product.data.category;
    }
}

export class ItemObject {
    product: ProductObject;
    count: number;
    constructor(product: ProductObject, count: number){
        this.product = product;
        this.count = count;
    }
}