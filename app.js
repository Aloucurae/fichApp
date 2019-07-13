// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

ip = '';

function ip_local() {

  var os = require('os');
  var ifaces = os.networkInterfaces();

  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      ip = iface.address;

    });
  });

  return ip;
}

ip_local();

server.listen(port, () => {
  console.log('Server listening at port %d', port);
  console.log(ip);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

// Chatroom

var numUsers = 0;
var users = [];
var sockets = [];
var personagens = {};

io.on('connection', (socket) => {

  console.log('nova conexao');

  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('message', (data) => {
    // we tell the client to execute 'new message'
    // somente master envia mensagem
    if (socket.id == users['master'].id) {
      socket.broadcast.emit('message', data);
    }
  });

  socket.on('chengeAssets', (data) => {
    if (socket.id == users['master'].id) {
      if (users[data.id]) {
        users[data.id].emit('chengeAssets', data);
      }
    }
  });

  // when the client emits 'setMaster', this listens and executes
  socket.on('setMaster', (master) => {
    users['master'] = socket;
    socket.emit('usuarios', { personagens: personagens, ip: ip });
  });

  socket.on('adduser', (perc) => {

    if (addedUser) return;

    users[perc.id] = socket;
    personagens[perc.id] = perc;
    sockets[socket.id] = perc.id;

    // we store the name in the socket session for this client
    socket.nome = perc['nome'];

    addedUser = true;

    socket.emit('login', {
      numUsers: users.length,
    });

    // echo globally (all clients) that a person has connected

    if (users['master']) {
      users['master'].emit('userjoined', {
        nome: socket.nome,
        perc: perc
      });
    }

  });


  // when the user disconnects.. perform this
  socket.on('disconnect', () => {

    users.splice(sockets[socket.id], 1);
    sockets.splice(socket.id, 1);

    if (addedUser) {

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        name: socket.name,
        numUsers: users.length
      });
    }
  });
});

