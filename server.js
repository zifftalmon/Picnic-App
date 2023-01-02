const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const {db} = require('./config/db.js')
const path = require('path')

dotenv.config()
const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
 
app.use(express.static(path.join(__dirname, './picnic_app/build'))) 
 
app.get('/', (req,res)=>{ 
  res.sendFile(path.join(__dirname, 'build','index.html')) 
})

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
        res.send(rows)
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

app.get('/lists', (req,res) => {
    db('provisions_lists')
    .select('*')
    .then(rows => {
        res.send(rows)
    })
})

app.get('/lists/:id', (req,res) => {
    db('provisions_lists')
    .select('*')
    .where(db['id'] = req.params)
    .then(rows => {
        res.send(rows)
    })
})


app.post('/lists',(req,res) => {
    db('provisions_lists')
    .insert(req.body)
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

app.get('/recommendations/:id', (req,res) => {
    db('recommendations')
    .select('*')
    .where(db['id'] = req.params)
    .then(rows => {
        res.send(rows)
    })
})

app.post('/recommendations', (req,res) => {
    db('recommendations')
    .insert(req.body)
    .returning('*')
    .then(rows => {
        res.send(rows)
    })
})

app.get('/favorites', (req,res) => {
    db('favorites')
    .select('*')
    .then(rows => {
        res.send(rows)
    })
})

app.get('/favorites/:id', (req,res) => {
    db('favorites')
    .select('*')
    .where(db['id'] = req.params)
    .then(rows => {
        res.send(rows)
    })
})

app.post('/favorites', (req,res) => {
    db('favorites')
    .insert(req.body)
    .returning('*')
    .then(rows => {
        res.send(rows)
    })
})