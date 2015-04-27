/**
 * Created by novy on 24.04.15.
 */

var React = require('react');
var Jumbotron = require('react-bootstrap').Jumbotron;
var Well = require('react-bootstrap').Well;
var PageHeader = require('react-bootstrap').PageHeader;
var SystemSensorCoordinator = require('./SystemSensorCoordinator');
var RoomTemperatureCoordinator = require('./RoomTemperatureCoordinator');
var TemperatureStore = require('../TemperatureStore');

var TemperatureManager = React.createClass({

  getInitialState: function () {
    return {
      rooms: TemperatureStore.newestTemperatureData()
    };
  },

  componentDidMount: function () {
    TemperatureStore.addChangeListener(this._onTemperatureDataChanged);
  },

  componentWillUnmount: function () {
    TemperatureStore.removeChangeListener(this._onTemperatureDataChanged);
  },

  _onTemperatureDataChanged: function () {
    this.setState({
      rooms: TemperatureStore.newestTemperatureData()
    });
  },

  _createRoomTemperatureHandlers: function () {

    return this.state.rooms.map(function (room) {
      return (
        <Jumbotron key={room.name}>
          <RoomTemperatureCoordinator
            name={room.roomName}
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
