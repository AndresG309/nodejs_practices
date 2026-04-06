-- eliminar DB si ya existe
DROP DATABASE IF EXISTS moviesdb;

-- Creación de base
CREATE DATABASE moviesdb;

-- usar
USE moviesdb;

-- Crear tablas
CREATE TABLE movie (
	id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT NOT NULL,
    rate DECIMAL(2, 1) UNSIGNED NOT NULL
);

CREATE TABLE genre (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genre (
	movie_id BINARY(16) REFERENCES movie(id),
    genre_id INT REFERENCES genre(id),
    PRIMARY KEY (movie_id, genre_id)
);

-- Insertar datos
INSERT INTO genre (name) VALUES
('Drama'),
('Action'),
('Sci-Fi'),
('Adventure'),
('Romance'),
('Crime');

INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
(UUID(), 'Inception', 2010, 'Christopher Nolan', 148, 'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg', 8.8),
(UUID(), 'The Dark Knight', 2008, 'Christopher Nolan', 152, 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg', 9.0),
(UUID(), 'Pulp Fiction', 1994, 'Quentin Tarantino', 154, 'https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg', 8.9);

INSERT INTO movie_genre (movie_id, genre_id) VALUES
((SELECT id FROM movie WHERE title='Inception'), (SELECT id FROM genre WHERE name='Sci-Fi')),
((SELECT id FROM movie WHERE title='Inception'), (SELECT id FROM genre WHERE name='Action')),
((SELECT id FROM movie WHERE title='Pulp Fiction'), (SELECT id FROM genre WHERE name='Action')),
((SELECT id FROM movie WHERE title='The Dark knight'), (SELECT id FROM genre WHERE name='Action'));

-- Revisar info creada
SELECT * from movie;