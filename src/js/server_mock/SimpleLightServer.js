/**
 * Created by novy on 23.04.15.
 */

/**
 * Created by novy on 23.04.15.
 */

var lodash = require("lodash");
var express = require('express');
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

server.listen(9090);

function randomState() {
  var states = ['off', 'on'];
  return states[lodash.random(0, 1)];
}

function randomConfiguration() {
  return [
    {
      name: 'room1',
      state: randomState()
    },
    {
      name: 'room2',
      state: randomState()
    },
    {
      name: 'room3',
      state: randomState()
    },
    {
      name: 'room4',
      state: randomState()
    }
  ]
}

function sendRandomLightConfiguration(socket) {
  console.log('sending new light configuration');
  socket.emit("lights_changed", randomConfiguration());
}

io
  .on("connection", function (socket) {

    sendRandomLightConfiguration(socket);

    var interval = setInterval(function () {
      sendRandomLightConfiguration(socket);
    }, 15000);

    socket
      .on("disconnect", function () {
        clearInterval(interval)
      })
      .on('switch_light', function (room) {
        console.log('got change from room ' + room.name);
        console.log('resending received room state');

        socket.emit('light_changed', room);
      })

  });
