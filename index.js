const express = require("express");
const mongoose = require("mongoose");
const persoRoutes = require('./routes/personRoutes')
require('dotenv').config();

const app = express();


app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json());



app.get('/', (req, res) => {

    res.json({message: 'teste!'})
})

app.use('/person', persoRoutes);

const port = process.env.PORT || 3000;

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.bqvxgjr.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
.then(() => {
    console.log("conectamos ao MongoDB!")
    app.listen(port)
})
.catch((err) => console.log(err))



