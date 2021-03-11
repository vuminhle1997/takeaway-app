import { Request, Response } from 'express';
import DB from '../db/fauna';
import STATUS from 'http-status-codes';
import { Bill,  IPaymentFormInput } from '../models/bill';
import {
    query
} from 'faunadb'
import { Product } from '../models/product';
import { FaunaResponse } from '../types/fauna_types';
import { Item } from '../types/fauna_types';

export const submitPayment = async(req: Request, res: Response) => {
    const form: IPaymentFormInput = req.body.payment;
    const products: Item[] = req.body.products;

    const ids = products.map(item => item.id);

    // queries expression
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
    )
    const resolveExp = query.Map(
        queryIdExp,
        query.Lambda(id => query.Get(query.Ref(query.Collection(DB.PRODUCTS), id)))
    )

    // execution query
    const queryIds: any = await DB.client.query(resolveExp)
    
    const productsResolved: FaunaResponse<any, Product>[] = queryIds.data;
    let buyedItems: Item[] = [];

    for(const product of productsResolved) {
        const ref = product.ref
        const id: string = await DB.client.query(query.Select("id", ref))
        const obj = products.find(item => item.id === id)
        if (obj) {
            const item: Item = {
                id: id,
                count: obj.count,
                price: product.data.price
            }
            buyedItems.push(item)
        }
    }

    // bill creation
    const bill = new Bill(form, buyedItems)
    const createBillExp = query.Create(
        query.Collection(DB.BILLS),
        {
            data: bill
        }
    )

    // query execution and response
    const billResponse: FaunaResponse<query.ExprVal, Bill> = await DB.client.query(createBillExp)
    const billId = await DB.client.query(query.Select("id", billResponse.ref))
    const date = new Date()
    date.setDate(date.getTime() + (1000 * 60 * 60 * 24))
    res
        .cookie("bill-id", billId, { expires: date, httpOnly: true })
        .send(billResponse) 
}

export const getBill = async(req: Request, res: Response) => {
    const billId = req.cookies["bill-id"]

    if (billId) {
        const getBillExp = query.Get(
            query.Ref(query.Collection(DB.BILLS), billId)
        )

        const queryExe: FaunaResponse<query.ExprVal, Bill> = await DB.client.query(getBillExp)
    
        res.status(STATUS.OK)
            .json(queryExe)
    } else {
        res.status(STATUS.NOT_ACCEPTABLE).json({err: "missing cookie"})
    }
}

