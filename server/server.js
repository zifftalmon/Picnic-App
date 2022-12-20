const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const {db} = require('./config/db.js')

dotenv.config()
const app = express()

app.use(cors())


app.listen(process.env.PORT||5000, () => {
    console.log(`run on port ${process.env.PORT}||5000`);
})

app.get('/sites', (req,res) => {
    db('reserves')
    .select('name','area')
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err);
    })
})