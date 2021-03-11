import React, { useState, useEffect } from 'react'
import { IBill, IFaunaResponse, ProductData } from '../../utils/types'
import Header from '../header/Header'
import Receipt from './Receipt'

interface IReceiptPageProps {
    bill: IBill | undefined
}

export default function ReceiptPage({
    bill = undefined
}: IReceiptPageProps) {
    const [products,setProducts] = useState<IFaunaResponse<ProductData>[]>([])
    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async() => {
        const productIds = bill?.products.map(product => product.id)

        if (productIds) {
            Promise.all(productIds.map(id => fetch(`http://localhost:80/api/products/${id}`).then(res => res.json())))
                .then(jsons => {
                    setProducts(jsons)
                }).catch(err => {
                    console.error(err)
                })
        }
    }

    return (
        <>
            <Header
                count={0}
                hasBill={bill ? true : false}
                bill={bill}
            />
            <Receipt
                bill={bill}
                products={products}
            />
        </>
    )
}
