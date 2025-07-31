import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware Order Matters!

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}));


// 2. Body parsers (for JSON and URL-encoded data)
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// 3. Static files (if needed)
app.use(express.static('public'));

// 4. Cookie parser (for JWT/refresh tokens)
app.use(cookieParser());


// Routes
import userRouter from './routes/user.routes.js';
app.use('/api/v1/users', userRouter);

app.get('/', (req,res) =>{
  res.send('Hello World')
})


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});


export { app };