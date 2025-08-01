import { Router } from 'express';
import { MovieController } from '../controllers/movie.js';

export const moviesRouter = Router();

// Routes

moviesRouter.get('/', MovieController.getAll);

moviesRouter.get('/:id', MovieController.getById);

moviesRouter.post('/', MovieController.create);

moviesRouter.patch('/:id', MovieController.update);

moviesRouter.delete('/:id', MovieController.delete);
