import express, { json } from 'express';
import { moviesRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';

// Config
const app = express();
app.disable('x-powered-by');
app.use(json());
app.use(corsMiddleware());

const PORT = process.env.PORT ?? 3000;

// Routes
// Here we are using a router to handle the movies routes in another file

app.use('/movies', moviesRouter);

// Start server

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
