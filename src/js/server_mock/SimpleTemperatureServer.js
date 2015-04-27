/**
 * Created by novy on 27.04.15.
 */

var lodash = require("lodash");
var express = require('express');
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

server.listen(9091);

var _rooms = [
  'room1', 'room2', 'room3', 'room4'
];

var _desiredTemperatures = {
  room1: 15,
  room2: 16,
  room3: 17,
  room4: 18
};


function randomTemperature() {
  return lodash.random(10, 30);
}

function randomState() {
  var states = ['off', 'on'];
  return states[lodash.random(0, 1)];
}

function randomConfiguration() {
  return [
    {
      roomName: 'room1',
      currentTemperature: randomTemperature(),
      desiredTemperature: _desiredTemperatures['room1'],
      sensors: [
        {
          name: 'Air Conditioning',
          state: randomState()
        },
        {
          name: 'Central Heating',
          state: randomState()
        }
      ]
    },
    {
      roomName: 'room2',
      currentTemperature: randomTemperature(),
      desiredTemperature: _desiredTemperatures['room2'],
      sensors: [
        {
          name: 'Air Conditioning',
          state: randomState()
        },
        {
          name: 'Central Heating',
          state: randomState()
        }
      ]
    },
    {
      roomName: 'room3',
      currentTemperature: randomTemperature(),
      desiredTemperature: _desiredTemperatures['room3'],
      sensors: [
        {
          name: 'Air Conditioning',
          state: randomState()
        },
        {
          name: 'Central Heating',
          state: randomState()
        }
      ]
    },
    {
      roomName: 'room4',
      currentTemperature: randomTemperature(),
      desiredTemperature: _desiredTemperatures['room4'],
      sensors: [
        {
          name: 'Air Conditioning',
          state: randomState()
        },
        {
          name: 'Central Heating',
          state: randomState()
        }
      ]

    }
  ]
}

function sendRandomTemperatureChange(socket) {
  var roomName = _rooms[lodash.random(0, 3)];
  var randomTemp = randomTemperature();
  console.log('sending random temperature ' + randomTemp + ' to room ' + roomName);

  socket.emit('temperature_changed', {
    roomName: roomName,
    temperature: randomTemp
  });
}

function sendRandomSystemSensorChange(socket) {
  var roomName = _rooms[lodash.random(0, 3)];
  var sensorName = lodash.random(0, 1) === 0 ? 'Air Conditioning' : 'Central Heating';
  var sensorState = randomState();

  console.log('sending random sensor state for sensor ' + sensorName + ' ' + sensorState + ' to room ' + roomName);

  socket.emit('sensor_changed', {
    roomName: roomName,
    sensor: {
      name: sensorName,
      state: sensorState
    }
  });
}

function sendRandomLightConfiguration(socket) {
  console.log('sending new complete temperature configuration');
  socket.emit("temperatures", randomConfiguration());
}

io
  .on("connection", function (socket) {

    sendRandomLightConfiguration(socket);

    var temperatureInterval = setInterval(function(){
      sendRandomTemperatureChange(socket)
    }, 5000);

    var systemSensorInterval = setInterval(function () {
      sendRandomSystemSensorChange(socket);
    }, 20000);

    socket
      .on("disconnect", function () {
        clearInterval(temperatureInterval);
        clearInterval(systemSensorInterval);
      })
      .on('desired_temperature_changed', function (change) {
        console.log('got desired temp ' + change.temperature + ' change from ' + change.roomName);
        _desiredTemperatures[change.roomName] = change.temperature;
      })

  });
