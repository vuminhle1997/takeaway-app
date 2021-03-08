import { ButtonGroup, makeStyles, Paper, Typography, Button } from '@material-ui/core'
import React from 'react'

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
        margin: "auto 1rem"
    },
    buttons: {
        margin: "auto 2rem",
    }
})

export default function CartItem({
    product, count,

    increment,
    remove,
    decrement
}) {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <img className={classes.img} src={product.image} />
            <div className={classes.div}>
                <Typography component="h3" variant="h6">
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
            </div>
            <div className={classes.buttons}>
                <ButtonGroup>
                    <Button onClick={() => decrement(product)}>
                        -
                    </Button>
                    <Button onClick={() => increment(product)}>
                        +
                    </Button>
                    <Button color="secondary" onClick={() => remove(product)}>
                        X
                    </Button>
                </ButtonGroup>
            </div>
        </Paper>
    )
}
