import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from './auth0/passport.js';

const app = express();

// Middleware Order Matters!
// 1. CORS first (to allow cross-origin requests)
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // Required for cookies/auth
}));

// 2. Body parsers (for JSON and URL-encoded data)
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// 3. Static files (if needed)
app.use(express.static('public'));

// 4. Cookie parser (for JWT/refresh tokens)
app.use(cookieParser());

// 5. Passport (for Google OAuth)
app.use(passport.initialize());

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