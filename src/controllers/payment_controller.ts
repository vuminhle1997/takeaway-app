import { Request, Response } from 'express';
import DB from '../db/fauna';
import STATUS from 'http-status-codes';
import { Bill, BillResponse, IPaymentFormInput, Item } from '../models/bill';
import {
    Paginate,
    query
} from 'faunadb'
import { IProductInput, Product } from '../models/product';
import { Reference } from '../models/bill';
const {
    Create,
    Get,
    Collection,
    Ref,
    Filter,
    Lambda
} = query;

export const submitPayment = async(req: Request, res: Response) => {
    const form: IPaymentFormInput = req.body.payment;
    const products: Item[] = req.body.products;

    const ids = products.map(item => item.id);

    console.log(ids, products)

    const queryIdExp = query.Filter(
        query.Map(
            query.Paginate(query.Documents(query.Collection(DB.PRODUCTS))),
            query.Lambda(doc => query.Select("id", query.Select("ref", query.Get(doc))))
        ),
        query.Lambda("id", query.ContainsValue(
                query.Var("id"),
                ids
            )
        )
    );

    const resolveExp = query.Map(
        queryIdExp,
        query.Lambda(id => query.Get(query.Ref(query.Collection(DB.PRODUCTS), id)))
    )

       
    // const items = DB.client.query(
    //     Filter(
    //         Paginate
    //     )
    // )
    
    // const bill = new Bill(form, products);

    // const createQuery = DB.client.query(
    //     Create(
    //         DB.BILLS,
    //         {
    //             data: bill
    //         }
    //     )
    // );

    // await createQuery.then((data: any) => {
    //     let response: BillResponse = data.ref;
    //     const date = new Date();
    //     date.setTime(date.getTime() + (1000 * 60 * 60 * 24));
    //     return res.status(STATUS.CREATED)
    //         .cookie("bill-id", response.ref['@ref'].id, { expires: date, httpOnly: true })
    //         .json(data);
    // }).catch(err => {
    //     console.error(err)
    //     res.status(STATUS.INTERNAL_SERVER_ERROR)
    //         .json(err)
    // })

    const queryIds: any = await DB.client.query(resolveExp)
    
    const productsResolved: any[] = queryIds.data;
    let buyedItems: Item[] = [];

    // productsResolved.forEach((product: any) => {
    //     const ref: Reference = product.ref;

    //     const getItem = products.find(item => item.id === ref['@ref'].id)
    //     if (getItem) {
    //         const item: Item = {
    //             count: getItem.count,
    //             id: getItem.id,
    //             price: product.price
    //         }
    //         buyedItems.push(item)
    //     }
    // })



    // const bill = new Bill(form, buyedItems)

    // const createBillExp = query.Create(
    //     query.Collection(DB.BILLS),
    //     {
    //         data: bill
    //     }
    // )

    // const createBillQuery: any = await DB.client.query(createBillExp)
    // const final: any = createBillQuery.data;

    res.send(queryIds)
}

