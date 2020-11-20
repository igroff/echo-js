var app = require('express')();
var server = require('http').createServer(app);
var WebSocketServer = require('ws').Server;

function handleRequest(request, response){
  response.send(JSON.stringify(
    {
      params: request.params,
      cookies: request.cookies,
      hostname: request.hostname,
      body: request.body,
      query: request.query,
      method: request.method,
      protocol: request.protocol,
      path: request.path,
      environ: process.env,
      version: process.version
    }
  )).end();
}

app.get('/.test', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/*', handleRequest);
app.post('/*', handleRequest);

var port = process.env.PORT || 3000;

var wsserver = new WebSocketServer({server: server});
wsserver.on('connection', function(socket){
  socket.on('message', function(data){
    console.log(data);
    socket.send(data);
  });
});

server.listen(port);
console.log('Listening on ' + port);
