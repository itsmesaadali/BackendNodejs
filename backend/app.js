
import express from 'express'

const port = process.env.PORT || 3000

const app = express()


app.get('/', (req,res) =>{
    res.send('Hello World')
})

app.get('/api/jokes',(req,res) =>{
    const jokes = [
        {
            id:1,
            title:'A joke',
            content:'This is a Joke'
        },
        {
            id:2,
            title:'A joke',
            content:'This is a Joke'
        },
        {
            id:3,
            title:'A joke',
            content:'This is a Joke'
        },
        {
            id:4,
            title:'A joke',
            content:'This is a Joke'
        },
        {
            id:5,
            title:'A joke',
            content:'This is a Joke'
        },
    ]
    res.send(jokes)
})



app.listen(port, () =>{
    console.log(`App Run => http://localhost:${port}`)
})