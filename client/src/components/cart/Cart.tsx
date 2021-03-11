import { Button, Container, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { ItemObject, ProductObject } from '../../utils/types';
import Header from '../header/Header'
import CartItem from './cartItem/CartItem';

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
});

interface ICartProps {

}

export default function Cart({

}: ICartProps) {
    const classes = useStyles();
    const history = useHistory();

    const [products, setProducts] = useState<ItemObject[]>([]);

    useEffect(() => {
        getCartItems();
    }, []);

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    const getCartItems = () => {
        const store = localStorage.getItem("products")
        const products: ItemObject[] = store ? JSON.parse(store) : [];
        setProducts(products);
    }

    const redirectPurchase = () => {
        history.push({
            pathname: "/pay",
            state: {
                products: products
            }
        });
    }

    const increment = (product: ProductObject) => {
        for (let i = 0; i < products.length; i++) {
            const item = products[i];

            if (item.product._id === product._id) {
                let newArray = [...products];
                console.log(newArray[i]);

                newArray[i].count++;
                setProducts(newArray);
                break;
            }
        }
    }

    const decrement = (product: ProductObject) => {
        for (let i = 0; i < products.length; i++) {
            const item = products[i];

            if (item.product._id === product._id) {
                let newArray = [...products];
                newArray[i].count--;
                setProducts(newArray);
                break;
            }
        }
    }

    const remove = (product: ProductObject) => {
        for (let i = 0; i < products.length; i++) {
            const item = products[i];

            if (item.product._id === product._id) {
                let newArray = [...products];
                newArray.splice(i, 1);
                setProducts(newArray);
                break;
            }
        }
    }

    let total = 0
    if (products.length > 0) {
        products.forEach(item => {
            total += item.count * item.product.price
        })
    }

    return (
        <>
            <Header count={0}/>
            <Container className={classes.root}>
                {
                    products.length > 0 && products.map(item => {
                        return <CartItem
                            product={item.product}
                            count={item.count}

                            increment={increment}
                            decrement={decrement}
                            remove={remove}
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
                {
                    products.length > 0 && <Button onClick={() => redirectPurchase()} fullWidth={false} variant="contained" color="primary">Buy food!</Button>
                }
            </Container>
        </>
    )
}
