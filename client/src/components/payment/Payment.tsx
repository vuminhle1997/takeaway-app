import { Button, Container, FormControl, InputLabel, makeStyles, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { ItemObject, Category, Payment as PaymentType } from '../../utils/types';
import Notification from '../notification/Notification';
import ProductList from './productList/ProductList';

const useStyles = makeStyles((theme) => ({
    form: {
        margin: "2rem 5vw",
        padding: "2rem"
    },
    field: {
        margin: ".5rem auto"
    },
    formControl: {
        margin: theme.spacing(1),
    },
}));

interface IPaymentProps {
    products: ItemObject[];
}

interface IPaymentLocationState {
    products: ItemObject[]
}

interface IProductBody {
    id: string
    count: number
    price: number
}

interface IPaymentBodyInput {
    name: string
    email: string
    telephone: string
    payment: PaymentType
    message: string
}

interface IPaymentRequestBody {
    payment: IPaymentBodyInput
    products: IProductBody[]
}

export default function Payment() {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation<IPaymentLocationState>();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [message, setMessage] = useState("");
    const [total, setTotal] = useState<number>(0)
    const [items, setItems] = useState<ItemObject[]>([])
    const [payment, setPayment] = useState<PaymentType>(PaymentType.Cash)

    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        const {products} = location.state
        if (products.length > 0) {
            setItems(products)
            let sum = 0
            products.forEach(item => {
                sum += item.count * item.product.price
            })
            setTotal(sum)
        }
    }, [])

    const sendForm = async() => {
        let buyingItems: IProductBody[] = [];
        items.forEach(item => {
            const i: IProductBody = {
                id: item.product._id,
                count: item.count,
                price: item.product.price
            }
            buyingItems.push(i)
        })
        const _payment: IPaymentBodyInput = {
            name: name,
            message: message,
            telephone: telephone,
            email: email,
            payment: payment
        }
        const body: IPaymentRequestBody = {
            payment: _payment,
            products: buyingItems
        }

        const config: RequestInit = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: 'include'
        }
        let promise = await fetch("/api/payment/", config);

        if (promise.ok) {
            // let data = await promise.json();
            
            setSuccess(true)
            localStorage.removeItem("products")
            setTimeout(() => {
                history.push("/")
                window.location.reload()
            }, 2500)
        } else {
            setError(true)
            console.error("Something went wrong")
        }
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPayment(event.target.value as PaymentType);
    }

    return (
        <>
        <Container>
            <ProductList
                total={total}
                products={items}
            />
            <Paper>
                <form className={classes.form}>
                    <TextField className={classes.field} fullWidth variant="outlined" label="Name"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                    <TextField className={classes.field} fullWidth variant="outlined" label="Email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    
                    <TextField className={classes.field} fullWidth variant="outlined" label="Telephone"
                        onChange={e => setTelephone(e.target.value)}
                        value={telephone}
                    />
                    <FormControl
                        fullWidth
                    >
                        <InputLabel>Payment method</InputLabel>
                        <Select
                            value={payment}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value={PaymentType.Cash}>{PaymentType.Cash}</MenuItem>
                            <MenuItem value={PaymentType.Bitcoin}>{PaymentType.Bitcoin}</MenuItem>
                            <MenuItem value={PaymentType.MasterCard}>{PaymentType.MasterCard}</MenuItem>
                            <MenuItem value={PaymentType.PayPal}>{PaymentType.PayPal}</MenuItem>
                            <MenuItem value={PaymentType.Visa}>{PaymentType.Visa}</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField className={classes.field} fullWidth variant="outlined" label="Other" multiline rows={10} 
                        onChange={e => setMessage(e.target.value)}
                        value={message}
                    />

                    <Button onClick={() => sendForm()} color="primary" variant="contained">
                        Submit
                    </Button>
                </form>
            </Paper>
            <Notification
                success={success}
                error={error}
                setSuccess={setSuccess}
                setError={setError}
            />
        </Container>
        </>
    )
}
