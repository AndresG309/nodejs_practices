const http = require('node:http');
const { findAvailablePort } = require('./6_free-port');

const port = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
    console.log('request received: ', req.url);
    res.end('Hola mundo');
});

// Hack: If using port '0', it automatically search the first port available
// Do not use this for real deployment

findAvailablePort(port).then((port) => {
    server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});
