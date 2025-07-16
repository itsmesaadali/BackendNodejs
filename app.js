require('dotenv').config()
const express = require('express')

const app = express()


app.get('/', (req,res) =>{
    res.send('Hello World')
})

app.get('/twitter', (req,res) =>{
    res.send('Hello twitter World Saad Ali')
})

app.get('/login',(req,res) =>{
    res.send('<h1>Please Login </h1>')
})

app.listen(process.env.PORT, () =>{
    console.log(`App Run => http://localhost:${process.env.PORT}`)
})