/**
 * Created by novy on 24.04.15.
 */

var React = require('react');
var Jumbotron = require('react-bootstrap').Jumbotron;
var Well = require('react-bootstrap').Well;
var PageHeader = require('react-bootstrap').PageHeader;
var SystemSensorCoordinator = require('./SystemSensorCoordinator');
var RoomTemperatureCoordinator = require('./RoomTemperatureCoordinator');

var TemperatureManager = React.createClass({

  getInitialState: function () {
    return {
      rooms: [
        {
          name: 'Kitchen',
          currentTemperature: 20,
          desiredTemperature: 22,
          sensors: [
            {
              name: 'Central Heating',
              state: 'off'
            },
            {
              name: 'Air Conditioning',
              state: 'on'
            }
          ]
        },
        {
          name: 'Bedroom',
          currentTemperature: 25,
          desiredTemperature: 22,
          sensors: [
            {
              name: 'Central Heating',
              state: 'off'
            },
            {
              name: 'Air Conditioning',
              state: 'on'
            }
          ]
        }
      ]

    };
  },

  _createRoomTemperatureHandlers: function () {

    return this.state.rooms.map(function (room) {
      return (
        <Jumbotron key={room.name}>
          <RoomTemperatureCoordinator
            name={room.name}
            currentTemperature={room.currentTemperature}
            desiredTemperature={room.desiredTemperature}
            />
          <SystemSensorCoordinator systemSensors={room.sensors}/>
        </Jumbotron>
      );
    });

  },

  render: function () {
    return (
      <div>
        <br/><br/><br/>
        <PageHeader>Temperature</PageHeader>

        {this._createRoomTemperatureHandlers()}
      </div>
    )
  }

});

module.exports = TemperatureManager;
