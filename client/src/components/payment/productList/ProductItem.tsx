import React from 'react'
import { ItemObject } from '../../../utils/types'
import { ButtonGroup, makeStyles, Paper, Typography, Button } from '@material-ui/core'

interface IProductItemProps {
    item: ItemObject
}

const useStyles = makeStyles({
    root: {
        display: "flex",
        height: "150px",
        width: "100%",
        margin: ".5rem auto",
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

export default function ProductItem({
    item
}: IProductItemProps) {
    const classes = useStyles();
    const { product, count } = item
    return (
        <Paper className={classes.root}>
            <img className={classes.img} src={product.image} />
            <div className={classes.div}>
                <Typography component="h3" variant="h6">
                    {product._id}
                </Typography>
                <Typography component="h4" variant="h6">
                    {product.name}
                </Typography>
                <Typography component="span" variant="body2">
                    {product.category}
                </Typography>
                <Typography component="p" variant="subtitle2">
                    {product.description}
                </Typography>
                <Typography component="p" variant="subtitle2">
                    Count: {count}
                </Typography>
                <Typography component="p" variant="subtitle2">
                    Price: {product.price} €
                </Typography>
            </div>
            <div></div>
        </Paper>
    )
}
