import React from 'react'
import { IFaunaResponse, IItem, ItemObject, ProductData } from '../../../utils/types'
import { ButtonGroup, makeStyles, Paper, Typography, Button } from '@material-ui/core'

interface IReceiptItemProps {
    product: IFaunaResponse<ProductData> | undefined
    item: IItem | undefined
}

const useStyles = makeStyles({
    root: {
        display: "flex",
        height: "150px",
        width: "90%",
        margin: ".5rem auto",
        "padding": "1rem auto",
        "justifyContent": "space-between"
    },
    img: {
        maxWidth: "150px",
        minWidth: "150px",
        objectFit: "cover"
    },
    div: {
        display: "flex",
        flexDirection: "column",
        margin: "auto 1rem",
    },
    buttons: {
        margin: "auto 2rem",
    }
});

export default function ReceiptItem({
    product,
    item
}: IReceiptItemProps) {
    const classes = useStyles();
    let _product = product?.data
    return (
        <>
        {
                item && product && _product && <div className={classes.root}>
                    <img className={classes.img} src={_product.image} />
                    <div className={classes.div}>
                        <Typography component="h4" variant="h6">
                            {_product.name}
                        </Typography>
                        <Typography component="span" variant="body2">
                            {_product.category}
                        </Typography>
                        <Typography component="p" variant="subtitle2">
                            {_product.description}
                        </Typography>
                        <Typography component="p" variant="subtitle2">
                            Count: {item.count}
                        </Typography>
                        <Typography component="p" variant="subtitle2">
                            Price: {_product.price} €
                        </Typography>
                    </div>
                    <div></div>
                </div>
        }
        </>
    )
}
