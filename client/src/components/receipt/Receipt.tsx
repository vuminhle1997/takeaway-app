import { Container, Paper, Typography, makeStyles } from '@material-ui/core'
import React from 'react'
import { IBill, IFaunaResponse, IItem, ItemObject, ProductData } from '../../utils/types'
import ReceiptItem from './item/ReceiptItem'

const useStyles = makeStyles({
    root: {
        margin: "2rem auto"
    }
})

interface IReceiptProps {
    bill: IBill | undefined
    products: IFaunaResponse<ProductData>[] | undefined
}

export default function Receipt({
    bill,
    products
}: IReceiptProps) {
    const classes = useStyles()

    const findProductInsideBill = (product: IFaunaResponse<ProductData>, bill: IBill): IItem => {
        let i: IItem = {
            id: "",
            count: 0,
            price: 0
        }
        bill.products.forEach(item => {
            const refID = product.ref["@ref"].id
            if (refID === item.id) {
                i = {
                    id: refID,
                    count: item.count,
                    price: product.data.price
                }
            }
        })

        return i
    }

    return (
        <>
            {
                bill && <Container className={classes.root}>
                    <Paper>
                        {
                            products && products.map(product => {
                                const item = findProductInsideBill(product, bill)
                                return <ReceiptItem
                                    item={item}
                                    product={product}
                                    key={product.ref["@ref"].id}
                                />
                            })
                        }
                        {
                            bill.total && <Typography variant="h4" component="p">
                                Total: {bill.total} €
                            </Typography>
                        }
                    </Paper>
                </Container>
            }
        </>
    )
}
