import { Button, Container, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import Header from '../header/Header'
import CartItem from './cartItem/CartItem';

const useStyles = makeStyles({
    root: {
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column"
    }
})

export default function Cart() {
    const classes = useStyles();
    const history = useHistory();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getCartItems();
    }, []);

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    const getCartItems = () => {
        const products = JSON.parse(localStorage.getItem("products"));
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

    const increment = (product) => {
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

    const decrement = (product) => {
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

    const remove = (product) => {
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
                    products.length > 0 && <Button onClick={() => redirectPurchase()} fullWidth={false} variant="contained" color="primary">Buy food!</Button>
                }
            </Container>
        </>
    )
}
