import { Client } from 'faunadb';
const SECRET = process.env.FAUNADB;

abstract class FaunaDB {
    public static client = new Client({secret: SECRET!})
    public static PRODUCTS: string = "products";  
    public static BILLS: string = "bills";  
}

export default FaunaDB;
