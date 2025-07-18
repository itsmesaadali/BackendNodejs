import dotenv from 'dotenv'
import connectDB from './db/index.js'

dotenv.config({
    path: './env'
})



connectDB()
.then(() =>{
        
    app.on('error', (error) =>{
            console.log('Server isNot running =>', error)
            throw error
       })

    app.listen(process.env.PORT, () =>{
        console.log(`Server in running => ${process.env.PORT}`)
    })
})
.catch((error) =>{
    console.log('MongoDb connection failed', error)
})
