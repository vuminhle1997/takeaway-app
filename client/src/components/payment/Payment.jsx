import { Button, Container, makeStyles, Paper, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    form: {
        margin: "2rem 5vw",
        padding: "2rem"
    },
    field: {
        margin: ".5rem auto"
    }
})

export default function Payment({products}) {
    const classes = useStyles();
    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        console.log(history.location.state);
    }, [])

    const sendForm = async() => {
        const products = history.location.state.products;
        let promise = await fetch("", {
            method: "POST",
            body: JSON.stringify(products),
        });

        if (promise.ok) {
            let data = await promise.json();
            console.log(data);

            setTimeout(() => {
                history.push("/");
            }, 1500);
        } else {
            console.error(promise.status);
        }
    }

    return (
        <>
        <Container>
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
                    <TextField className={classes.field} fullWidth variant="outlined" label="Other" multiline rows={10} 
                        onChange={e => setMessage(e.target.value)}
                        value={message}
                    />

                    <Button onClick={() => sendForm()} color="primary" variant="contained">
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
        </>
    )
}
