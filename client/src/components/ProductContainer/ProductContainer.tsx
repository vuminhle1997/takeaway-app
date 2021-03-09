import { Button, ButtonGroup, Card, CardActionArea, CardActions, CardContent, CardMedia, Fab, Grid, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveIcon from '@material-ui/icons/Remove';

interface IProductContainerProps {
    key: string;
    id: string;
    product: any;
    addItem: (product: any, count: number) => void;
    removeItem: any;
    editItem: any;
    getIndexOfItem: any;
    isAlreadyInCart: any;
}

export default function ProductContainer({
    addItem,
    editItem,
    getIndexOfItem,
    id,
    isAlreadyInCart,
    key,
    product,
    removeItem
}: IProductContainerProps) {
    const [checked, setChecked] = useState<boolean>(false);
    const [count, setCount] = useState<number>(1);

    useEffect(() => {
        const obj = isAlreadyInCart(product);
        
        setChecked(obj.inside);
        setCount(obj.count);
    }, []);

    const handleClick = () => {
        if (checked) {
            setChecked(false);
            setCount(1);
            removeItem(product);
        } else {
            setChecked(true);

            addItem(product, count);
        }
    }

    const handleDecrement = () => {
        if (count === 1) return;
        
        const dec = count -1;
        const idx = getIndexOfItem(product) > 0 ? getIndexOfItem(product) : 0;
        setCount(dec);

        console.log(idx, "Decrement");
        editItem(idx, dec);
    }

    const handleIncrement = () => {
        const inc = count+1;
        let idx = getIndexOfItem(product) > 0 ? getIndexOfItem(product) : 0;
        setCount(inc);

        console.log(idx, "Increment");
        editItem(idx, inc);
    }

    return (
        <Grid item xs={12} sm={4}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="250"
                        image={product.image}
                        title={product.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h3">
                            {product.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="span">
                            {product.category}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {product.description}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary" component="span">
                            {product.price} €
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {
                            !checked ? <Fab color="primary" onClick={handleClick}>
                                <AddShoppingCartIcon />
                            </Fab> : <Fab color="secondary" onClick={handleClick}>
                                <RemoveIcon />
                            </Fab>
                        }
                        {
                            checked && <ButtonGroup size="small">
                                {
                                    checked && <Button disabled>
                                        {count}
                                    </Button>
                                }
                                <Button onClick={handleDecrement}>
                                    -
                                </Button>
                                <Button onClick={handleIncrement}>
                                    +
                                </Button>
                            </ButtonGroup> 
                        }
                    </CardActions>
                </CardActionArea>
            </Card>
        </Grid>
    )
}
