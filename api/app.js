const fs = require('fs');
const restify = require('restify');
const server = restify.createServer();

server.use(restify.plugins.bodyParser({
  mapParams: false,
}));

server.get('/\/(.*)?.*/', restify.plugins.serveStatic({
  directory: `${__dirname}/../dist`,
  default: './index.html',
  maxAge: 0
}));

server.post('/upload', (request, response) => {
  for (var key in request.files) {
    if (request.files.hasOwnProperty(key)) {
      fs.renameSync(request.files[key].path, `${__dirname}/../uploads/${request.files[key].name}`);
    }
  }
  response.send(202, { message: 'File uploaded' });
});

server.listen(3000, () => console.info('Restify server is up on port 3000'));