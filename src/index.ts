import DB from './db/fauna';
import app from './main';
const SECRET = process.env.FAUNADB;

const PORT = Number(process.env.PORT) || 80;

if (!SECRET) {
    console.error("FAUNADB env is missing")
    process.exit(-1)
}
    

DB.client.ping().then(res => {
    console.log("Connection to DB succesful ",res)
}).catch(err => {
    console.error("Failed to connect to DB: ", err)
    process.exit(-1)
})

app.listen(PORT, () => {
    console.log(`App listening on > ${PORT}`);
});

