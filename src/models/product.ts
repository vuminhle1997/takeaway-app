
enum Category {
    Food = "Food",
    Appetizer = "Appetizer",
    Drinks = "Drinks",
    Snack = "Snack",
    Extra = "Extra",
    Soup = "Soup"
}

export class Product {
    name: string;
    description: string;
    image: string;
    category: Category;
    price: number;
    constructor(name: string, description: string, image: string = "", 
        category: Category, price: number) {
            this.name = name;
            this.description = description;
            this.image = image;
            this.category = category;
            this.price = price;
    }
}

export interface IProductInput {
    name: string;
    description: string;
    image: string;
    category: Category;
    price: number;
}



