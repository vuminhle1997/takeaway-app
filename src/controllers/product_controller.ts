import DB from '../db/fauna';
import { Request, Response } from 'express';
import { IProductInput,Product } from '../models/product';
import { IsInteger, query } from 'faunadb';
import STATUS from 'http-status-codes';

export const createProduct = async(req: Request, res: Response) => {
    const input: IProductInput = req.body.product;
    const {
        category,
        description,
        image,
        name,
        price
    } = input;

    const countQuery = DB.client.query(
        query.Count(
            query.Documents(query.Collection(DB.PRODUCTS))
        )
    );

    const length = await countQuery.then((num) => {
        return num;
    }).catch(err => {
        console.error(err);
        return 999999;
    });

    if (length > 20 && typeof length === 'number') {
        return res.status(STATUS.NOT_ACCEPTABLE).json({err: "too many"});
    } else {
        const product: Product = new Product(name, description, image, category, price);
        const createQuery = DB.client.query(
            query.Create(DB.PRODUCTS, {
                data: product
            })
        );

        await createQuery.then(data=> {
            console.log(`Created Product: >`, data);
            return res.status(STATUS.CREATED).json({product: data});
        }).catch(err => {
            console.error(err);
            return res.status(STATUS.INTERNAL_SERVER_ERROR).json({err: err});
        });
    }
}

export const getProducts = async(req: Request, res: Response) => {
    const queryGetProductsExp = query.Map(
        query.Paginate(query.Documents(query.Collection(DB.PRODUCTS))),
        query.Lambda(doc => query.Get(doc))
    );

    await DB.client.query(queryGetProductsExp)
        .then(data => {
            res.status(STATUS.OK).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(STATUS.INTERNAL_SERVER_ERROR).json(err);
        });
}

export const getProductById = async(req: Request, res: Response) => {
    const id = req.params.id;

    const getQueryId = DB.client.query(
        query.Get(
            query.Ref(
                query.Collection(DB.PRODUCTS),
                id
            )
        )
    );

    await getQueryId.then(data => {
        return res.status(STATUS.OK).json(data);
    }).catch(err => {
        console.error(err);
        res.status(STATUS.INTERNAL_SERVER_ERROR).json(err);
    });
}
