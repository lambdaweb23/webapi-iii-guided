const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// the three amigos - next passes it to the next middleware
function dateLogger(req, res, next) {
  console.log(new Date().toISOString());
  next();
}

function getReqUrl(req, res, next) {
  console.log(
    `${req.method} ${req.url}`
  );
  next();
}

server.use(helmet());// third party middleware
server.use(express.json());// built-in middleware
server.use(dateLogger);// custom middleware
server.use(getReqUrl);// custom middleware

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
