import { Item } from '../types/fauna_types';

enum Payment {
    Cash = "Cash",
    Visa = "Visa",
    Bitcoin = "Bitcoin",
    MasterCard = "MasterCard",
    PayPal = "PayPal",
}

export interface IPaymentFormInput {
    name: string;
    email: string;
    telephone: string;
    message: string;
    payment: Payment;
}

export class Bill {
    name: string;
    email: string;
    telephone: string;
    message: string;
    payment: Payment;
    products: Item[];
    total: number;
    constructor(form: IPaymentFormInput, products: Item[]) {
        this.name = form.name
        this.email = form.email
        this.telephone = form.telephone
        this.message = form.message
        this.payment = form.payment
        this.products = products
        this.total = this.getTotal(this.products)
    }

    private getTotal(products: Item[]): number {
        let total = 0;
        products.forEach(product => {
            total += (product.price * product.count)
        })
        return total
    }
}
