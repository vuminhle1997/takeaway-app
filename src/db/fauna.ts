import { Client } from 'faunadb';
const SECRET = process.env.FAUNADB || "fnAED33V5kACAaLdl8abYj7dy5e2By4qp4dPUg9T";

abstract class FaunaDB {
    public static client = new Client({ secret: SECRET });
    public static PRODUCTS: string = "products";    
}

export default FaunaDB;
