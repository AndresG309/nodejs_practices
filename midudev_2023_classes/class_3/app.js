const express = require('express');
const app = express();
const crypto = require('node:crypto');

// Config
app.disable('x-powered-by');
app.use(express.json()); // Middleware to deal with json in req.body

const PORT = process.env.port ?? 3000;

// Resources
const movies = require('./movies.json');
const {
    validateMovie,
    validateMoviePartially,
} = require('./schemas/movies.js');
const { error } = require('node:console');

// Routes

app.get('/', (req, res) => {
    res.json({ message: 'hola mundo' });
});

app.get('/movies', (req, res) => {
    // RESOLVE CORS (Cross Origin Resource Sharing) ERROR
    res.header('Access-Control-Allow-Origin', '*');
    // * means all origins, but it can be defined to only someones

    const { genre } = req.query;
    if (genre) {
        const filteredMovies = movies.filter((movie) => {
            // This fails if string differs in its cases. Action != action
            //return movie.genre.includes(genre);
            return movie.genre.some((gen) => {
                return gen.toLowerCase() === genre.toLowerCase();
            });
        });
        return res.send(filteredMovies);
    }
    res.send(movies);
});

app.get('/movies/:id', (req, res) => {
    const { id } = req.params;

    let movie = movies.find((movie) => {
        return movie.id === id;
    });
    if (movie) return res.json(movie);

    res.status(404).json({ message: 'Movie not found' });
});

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body);

    if (result.error) {
        return res
            .status(400)
            .json({ error: JSON.parse(result.error.message) });
    }

    const newMovie = {
        id: crypto.randomUUID(), // Random uuid v4 (Universal Unique Identifier);
        ...result.data,
    };

    // This is not REST because we are saving info on memory.
    // In next class with Databases, it's getting fixed
    movies.push();

    res.status(201).json(newMovie);
});

app.patch('/movies/:id', (req, res) => {
    const result = validateMoviePartially(req.body);
    if (result.error)
        return res
            .status(404)
            .json({ error: JSON.parse(result.error.message) });

    const { id } = req.params;
    const movieIndex = movies.findIndex((movie) => {
        return movie.id === id;
    });

    if (movieIndex === -1)
        return res.status(404).json({ message: 'Movie not found' });

    const movieUpdated = {
        ...movies[movieIndex],
        ...result.data,
    };

    movies[movieIndex] = movieUpdated;
    return res.status(205).json(movieUpdated);
});

// FIXING CORS IN COMPLEX METHODS
// delete, patch, put are complex methods
// get, post, head are simple methods
// In complex methods exist a 'preflight' request
// To fix CORS in complex methods, we need to add a special petition called OPTIONS

// Allow all origins
app.options('/movies/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.send();
});

/*
// Allow specific origins
const ACCEPTED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:5500', // Using LIVE SERVER
];

app.options('/movies/:id', (req, res) => {
    const origin = req.header('Origin');
    // When petition is made from the same origin, 'Origin' header is not sent
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, PATCH, DELETE'
        );
    }
    res.send();
});
*/

app.delete('/movies/:id', (req, res) => {
    // Allow CORS. The preflight request does not pass the header here, so we need to add it too
    res.header('Access-Control-Allow-Origin', '*');

    const { id } = req.params;
    const movieIndex = movies.findIndex((movie) => {
        return movie.id === id;
    });

    if (movieIndex === -1)
        return res.status(404).json({ message: 'Movie not found' });

    movies.splice(movieIndex, 1);
    return res.status(204).json({ message: 'Movie deleted' });
});

// We can handle CORS issues with a package also
// npm install cors
const cors = require('cors');
// This is a middleware that allows us to deal with CORS issues
// The we can use it like this
app.use(cors());
// Or we can use it like this, to allow only some origins
app.use(
    cors({
        origin: (origin, callback) => {
            const ACCEPTED_ORIGINS = [
                'http://localhost:8080',
                'http://127.0.0.1:5500', // Using LIVE SERVER
            ];

            if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
                return callback(null, true);
            }

            return callback(new Error('Not allowed by CORS'));
        },
    })
);

//
// Start server
//

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
