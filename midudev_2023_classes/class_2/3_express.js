const express = require('express');

const app = express();

// Delete extra header "X-Powered-By" added by express
// This header could lead to security problems if it's seen by the wrong person
app.disable('x-powered-by');

const PORT = process.env.port ?? 3000;

const dittoJSON = require('./pokemons/ditto.json');

// ------------------------------- ROUTES

// MIDDLEWARE
// A middleware is a process that is done in the middle of the request and the response.
// 1) Get User request (url: /about, method: Get)
// 2) Execute Middleware
// 3) Send response with app.get('/about', () => {})
// When using a middleware it is REQUIRED to tell the process when to continue looking for the url
app.use((req, res, next) => {
    console.log('Executing middleware. Searching URL: ', req.url);
    // Do anything before sending the response
    // REMEMBER to call the NEXT param to continue the process
    next();
});
// If middleware for certain routes, use app.use('/routes', ()=>{})

// For example, we could use a middleware to deal with all POST request with json content
app.use((req, res, next) => {
    if (req.method !== 'POST') return next();
    if (req.headers['content-type'] !== 'application/json') return next();

    console.log('Executing JSON middleware');

    let body = '';
    // Listen to data event
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const data = JSON.parse(body);
        data.timestamp = new Date(Date.now()).toLocaleDateString();

        // MUTATE body of the request directly because it will pass on to the next route
        req.body = data;
        next();
    });
});

// In fact, we could implement this middleware directly with express using this:
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200);
    res.send('<h1>Mi página con express</h1>');
});

app.get('/use-json', (req, res) => {
    res.json({ message: 'Hola Mundo' });
});

app.get('/pokemon/ditto', (req, res) => {
    res.json(dittoJSON);
});

app.post('/create-pokemon', (req, res) => {
    res.status(201);
    res.json(req.body);
});

// HANDLE 404 NOT FOUND CORRECTLY ON EXPRESS
// Express is lineal. It means teh request will go one by one checking if matches with each route defined
// and if it don't get one route matching correctly, it means it is not found
// so we can define a "global" route to use in case any of the routes defined were the one searching
app.use((req, res) => {
    res.status(404);
    res.send('<h1>404 Not Found</h1>');
});

// -------------------------------- APP LISTEN
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
