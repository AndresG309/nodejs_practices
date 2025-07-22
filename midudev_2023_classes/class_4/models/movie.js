import { randomUUID } from 'node:crypto';
import movies from '../movies.json' with { type: 'json' };

export class MovieModel {
    static async getAll({ genre }) {
        if (genre) {
            return movies.filter((movie) => {
                return movie.genre.some((gen) => {
                    return gen.toLowerCase() === genre.toLowerCase();
                });
            });
        }
        return movies;
    }

    static async getById(id) {
        return movies.find((movie) => {
            return movie.id === id;
        });
    }

    static async create({ data }) {
        const newMovie = {
            id: randomUUID(), // Random uuid v4 (Universal Unique Identifier);
            ...data,
        };

        movies.push(newMovie);

        return newMovie;
    }

    static async update({ id, data }) {
        const movieIndex = movies.findIndex((movie) => {
            return movie.id === id;
        });

        if (movieIndex === -1) return {message: 'Movie not found'};

        movies[movieIndex] = {
            ...movies[movieIndex],
            ...data
        };

        return movies[movieIndex];
    }

    static async delete({ id }) {
        const movieIndex = movies.findIndex((movie) => {
            return movie.id === id;
        });

        if (movieIndex === -1) return false;

        movies.splice(movieIndex, 1);
        return true;
    }
}
