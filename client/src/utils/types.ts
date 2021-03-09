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

interface ProductData {
    name: string;
    price: number;
    image: string;
    description: string;
}

export interface Product {
    ref: Reference;
    ts: number;
    data: ProductData;
}

export class ProductObject {
    _id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    constructor(product: Product) {
        this._id = product.ref["@ref"].id;
        this.name = product.data.name;
        this.description = product.data.description;
        this.image = product.data.image;
        this.price = product.data.price;
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