var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.get('/.test', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/*', function(request, response) {
  response.end(request.path.slice(1));
});
io.sockets.on('connection', function (socket) {
  console.log('connected')
  socket.on('echo', function (data) {
    console.log('echo', data);
    socket.emit('echo', data);
  });
});
var port = process.env.PORT || 3000;
server.listen(port);
console.log('Listening on ' + port);
