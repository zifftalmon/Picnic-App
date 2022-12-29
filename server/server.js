const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const {db} = require('./config/db.js')

dotenv.config()
const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(process.env.PORT||5000, () => {
    console.log(`run on port ${process.env.PORT}||5000`);
})

app.get('/provisions', (req,res) => {
    db('provisions')
    .select('name')
    .then(rows => {
        res.send(rows)
    })
})

app.post('/provisions', (req,res) => {
    db('provisions')
    .insert(req.body)
    .returning('*')
    .then(rows => {
        res.json(rows)
    })
})

app.delete('/provisions/', (req,res) => {
    db('provisions')
    .delete('*')
    .where(db['name'] = req.body)
    .returning('*')
    .then(rows => {
        res.send(rows)
    })
})

app.get('/recommendations', (req,res) => {
    db('recommendations')
    .select('*')
    .then(rows => {
        res.send(rows)
    })
})