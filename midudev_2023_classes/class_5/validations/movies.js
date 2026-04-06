import z from 'zod';

// Create a schema for the movies
const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required',
    }),
    //ZOD have validations in chain
    year: z.number().int().positive().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.url({
        message: 'Poster must be a valid url',
    }),
    genre: z.array(
        z.enum([
            'Action',
            'Comedy',
            'Drama',
            'Adventure',
            'Horror',
            'Fantasy',
            'Sci-Fi',
            'Documentary',
            'Crime',
        ]),
        {
            invalid_type_error: 'Genre must be an array of strings',
            required_error: 'Genre is required',
        }
    ),
});

export function validateMovie(movie) {
    return movieSchema.safeParse(movie);
}

export function validateMoviePartially(input) {
    return movieSchema.partial().safeParse(input);
}