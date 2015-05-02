/**
 * Created by novy on 24.04.15.
 */

var React = require('react');
var Jumbotron = require('react-bootstrap').Jumbotron;
var PageHeader = require('react-bootstrap').PageHeader;
var SystemSensorCoordinator = require('./SystemSensorCoordinator');
var RoomTemperatureCoordinator = require('./RoomTemperatureCoordinator');
var TemperatureStore = require('../TemperatureStore');
var ActionCreator = require('../ActionCreator');
var ConfigurationMixin = require('../../common/ConfigurationMixin');

var TemperatureManager = React.createClass({

  mixins: [ConfigurationMixin],

  getInitialState: function () {
    return {
      rooms: TemperatureStore.newestTemperatureData()
    };
  },

  componentWillMount: function () {
    ActionCreator.init();
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
        <Jumbotron key={room.roomName}>
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
