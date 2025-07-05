const net = require('node:net');

function findAvailablePort(desiredPort) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();

        server.listen(desiredPort, () => {
            const { port } = server.address();
            server.close(() => {
                resolve(port);
            });
        });

        server.on('error', (err) => {
            if (err.code == 'EADDRINUSE') {
                // this error is thrown when the port is already in use
                // EADDRINUSE: Error Address in use
                console.log(`Port ${desiredPort} is in use, trying to find another one...`);
                server.close();
                findAvailablePort(0).then((port) => resolve(port));
            }
        });
    });
}

module.exports = { findAvailablePort };
