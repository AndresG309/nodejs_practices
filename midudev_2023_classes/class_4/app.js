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

// We are using the MVC pattern, so we have controllers and models separated
// Routes are the views that call the controller defined for each action
// Then the controller calls the model respectively
// View -> what the user sees (or can use)
// Controller -> Defines what to do with the request
// Model -> Defines how to interact with the data (database, files, etc.)

// Start server

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
