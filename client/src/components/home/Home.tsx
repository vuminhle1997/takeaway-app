import React, { useEffect, useState } from 'react'
import ProductContainer from '../ProductContainer/ProductContainer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Product, ProductObject } from '../../utils/types';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin: "2rem auto"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
}));

export default function Home() {
    const classes = useStyles();
    const [products, setProducts] = useState<any[]>([]);

    const [personalItems, setPersonalItems] = useState<any[]>([]);

    useEffect(() => {
        fetchProducts();
        getShoppingCart();
        
    }, []);

    useEffect(() => {
        if (personalItems.length > 0)
            localStorage.setItem("products", JSON.stringify(personalItems));
    }, [personalItems]);

    const addItem = (product: any, count: number) => {
        const item = {
            product: product,
            count: count
        }
        setPersonalItems(prev => [...prev, item]);
    }

    const removeItem = (product: any) => {
        setPersonalItems(personalItems.filter(item => item.product._id !== product._id));
    }

    const editItem = (index: number, count: number) => {
        if (personalItems.length > 0) {
            let newArray = [...personalItems];
            newArray[index].count = count;
            setPersonalItems(newArray);
        }
    }

    const getIndexOfItem = (product: any) => {
        let index = personalItems.findIndex((item, index) => {
            const id = product._id;
            const itemId = item.product._id;

            if (itemId === id) {
                console.log(index);
                return index;
            }
        });

        return index;
    }

    const isAlreadyInCart = (product: any) => {
        let isInside = false;
        let count = 1;

        personalItems.forEach(item => {
            if (item.product._id === product._id) {
                isInside = true;
                count = item.count;
            }
        });

        return {
            inside: isInside,
            count: count
        }
    }

    const fetchProducts = async() => {
        const promise = await fetch("http://localhost:80/api/products", {
            credentials: 'include'
        });

        if (promise.ok) {
            const val = await promise.json();
            const products: Product[] = val.data;
            const mappedProducts = products.map(product => new ProductObject(product));

            setProducts(mappedProducts);
            //console.log(products);
        } else {
            console.error(promise.status);
        }
    }

    const getShoppingCart = () => {
        const store = localStorage.getItem("products");
        const products = store ? JSON.parse(store) : [];
        
        if (products) setPersonalItems(products);
    }

    return (
        <>  
            <Header count={personalItems?.length || 0}/>
            <Container className={classes.root}>
            {
                <Grid container spacing={3}>
                    
                        {
                            products.map(product => {
                                return <ProductContainer
                                    id={""}
                                    key={product._id}
                                    product={product}
                                    addItem={addItem}
                                    removeItem={removeItem}
                                    editItem={editItem}
                                    getIndexOfItem={getIndexOfItem}
    
                                    isAlreadyInCart={isAlreadyInCart}
                                />
                            })
                        }
                    
                </Grid> 
            }
            </Container>
            <Footer />
        </>
    )
}
