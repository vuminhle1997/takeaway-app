import React from 'react'
import { Container, Typography, makeStyles } from '@material-ui/core'
import { ItemObject } from '../../../utils/types'
import ProductItem from './ProductItem'

const useStyles = makeStyles({
    root: {
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column"
    },
    total: {
        padding: "1rem auto",
        lineHeight: 2
    }
})

interface IProductListProps {
    products: ItemObject[]
    total: number
}

export default function ProductList({
    total,
    products
}: IProductListProps) {
    const classes = useStyles()
    return (
        <>
            <div className={classes.root}>
                <Typography variant="h2" component="h2">
                    Your inventory
                </Typography>
                {
                    products.length > 0 && products.map(item => {
                        return <ProductItem
                            item={item}
                        />
                    })
                }
                {
                    products.length > 0 && <div>
                        <Typography className={classes.total} variant="h3" component="span">
                            Total: {
                                total
                            } €
                        </Typography>
                    </div>
                }
            </div>
        </>
    )
}
