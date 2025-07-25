const http = require('node:http');
const fs = require('node:fs');

const port = process.env.PORT ?? 3000;

const processRequest = (req, res) => {
    //console.log('request received: ', req.url);
    
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    
    if (req.url === '/'){
        res.statusCode = 200;
        res.end('<h1>Bienvenido a mi página de inicio</h1>');
    } else if (req.url === '/image.png'){
        res.statusCode = 200; 
        res.setHeader('Content-Type', 'image/png');
        fs.readFile('./Kirby-nadando.png', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('<h1>Internal Server Error</h1>');
            } else {
                res.setHeader('Content-type', 'image/png');
                res.end(data);
            }
        });
    } else if (req.url === '/contacto') {
        res.statusCode = 200;
        res.end('<h1>Página de contacto</h1>');
    } else {
        res.statusCode = 404;
        res.end('<h1>Página no encontrada</h1>');
    }
};

const server = http.createServer(processRequest);

server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
});
