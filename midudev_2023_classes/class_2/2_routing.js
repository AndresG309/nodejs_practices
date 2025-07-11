//THIS FILE SHOWS HOW EXPRESS WORKS INSIDE

const { utimes } = require('node:fs');
const http = require('node:http');

// in CommonJS we can import JSON directly
const dittoJSON = require('./pokemons/ditto.json');

const processRequest = (req, res) => {
    const { method, url } = req;

    switch (method) {
        case 'GET':
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            switch (url) {
                case '/': {
                    res.statusCode = 200;
                    return res.end('<h1>Bienvenido a mi página de inicio</h1>');
                }
                case '/pokemon/ditto': {
                    res.statusCode = 200;
                    res.setHeader(
                        'Content-Type',
                        'application/json; charset=utf-8'
                    );
                    return res.end(JSON.stringify(dittoJSON));
                }
                default: {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    return res.end('<h1>404</h1>');
                }
            }
        case 'POST':
            switch (url) {
                case '/create-pokemon': {
                    let body = '';
                    // Listen to data event
                    req.on('data', (chunk) => {
                        body += chunk.toString();
                    });

                    req.on('end', () => {
                        const data = JSON.parse(body);
                        // Do things like save info in Database
                        data.timestamp = new Date(Date.now()).toLocaleDateString();
                        // status 201 -> Created
                        res.writeHead(201, {
                            'Content-type': 'application/json, charset=utf-8',
                        });
                        res.end(JSON.stringify(data));
                    });

                    // IMPORTANT -> break command to stop the process.
                    // if not used, will give errors
                    break;
                }
                default: {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    return res.end('<h1>404</h1>');
                }
            }
    }
};

const server = http.createServer(processRequest);

server.listen(3000, () => {
    console.log('Server listening on port http://localhost:3000');
});
