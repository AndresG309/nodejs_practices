import {
    validateMovie,
    validateMoviePartially,
} from '../validations/movies.js';
import { MovieModel } from '../models/movie.js';

export class MovieController {
    static async getAll(req, res) {
        const { genre } = req.query;

        const movies = await MovieModel.getAll({ genre });

        res.send(movies);
    }

    static async getById(req, res) {
        const { id } = req.params;

        const movie = await MovieModel.getById(id);

        if (!movie) return res.status(404).json({ message: 'Movie not found' });

        res.json(movie);
    }

    static async create(req, res) {
        const result = validateMovie(req.body);

        if (result.error) {
            return res
                .status(400)
                .json({ error: JSON.parse(result.error.message) });
        }

        const newMovie = await MovieModel.create({ data: result.data });

        res.status(201).json(newMovie);
    }

    static async update(req, res) {
        const result = validateMoviePartially(req.body);

        if (!result.success) {
            return res
                .status(400)
                .json({ error: JSON.parse(result.error.message) });
        }

        const { id } = req.params;

        const updatedMovie = await MovieModel.update({
            id,
            input: result.data,
        });

        return res.json(updatedMovie);
    }

    static async delete(req, res) {
        //res.header('Access-Control-Allow-Origin', '*');

        const { id } = req.params;

        const deleted = await MovieModel.delete({ id });

        if (deleted === false)
            return res.status(404).json({ message: 'Movie not found' });

        return res.status(204).json({ message: 'Movie deleted' });
    }
}
