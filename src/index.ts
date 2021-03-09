import express from 'express';
import DB from './db/fauna';

import { query } from 'faunadb';

/* const createItemQ = DB.client.query(
    query.Create(query.Collection("products"), {
        data: {
            name: "Pho",
            description: "A vietnamese soup",
            price: 7.50,
            image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80"
        }
    })
);

createItemQ.then(res => {
    console.log(res);
}).catch(err => {
    console.error(err);
}) */
import app from './main';

const PORT = Number(process.env.PORT) || 80;
app.listen(PORT, () => {
    console.log(`App listening on > ${PORT}`);
});

