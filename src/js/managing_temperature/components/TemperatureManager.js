/**
 * Created by novy on 24.04.15.
 */

var React = require('react');
var PageHeader = require('react-bootstrap').PageHeader;
var SystemSensorCoordinator = require('./SystemSensorCoordinator');
var RoomTemperatureCoordinator = require('./RoomTemperatureCoordinator');
var GlobalTemperatureDisplayer = require('./GlobalTemperatureDisplayer');
var TemperatureStore = require('../TemperatureStore');
var SensorStore = require('../SensorStore');
var ActionCreator = require('../ActionCreator');
var ConfigurationMixin = require('../../common/ConfigurationMixin');


var TemperatureManager = React.createClass({

  mixins: [ConfigurationMixin],

  getInitialState: function () {
    return {
      rooms: TemperatureStore.desiredTemperature(),
      currentTemperature: TemperatureStore.currentGlobalTemperature(),
      sensors: SensorStore.sensorState()
    }
  },

  componentWillMount: function () {
    ActionCreator.init();
  },

  componentDidMount: function () {
    TemperatureStore.addChangeListener(this._onTemperatureDataChanged);
    SensorStore.addChangeListener(this._onSensorDataChanged);
  },

  componentWillUnmount: function () {
    TemperatureStore.removeChangeListener(this._onTemperatureDataChanged);
    SensorStore.removeChangeListener(this._onSensorDataChanged);
  },

  _onTemperatureDataChanged: function () {
    this.setState({
      rooms: TemperatureStore.desiredTemperature(),
      currentTemperature: TemperatureStore.currentGlobalTemperature()
    });
  },

  _onSensorDataChanged: function () {
    this.setState({
      sensors: SensorStore.sensorState()
    });
  },

  _createRoomTemperatureHandlers: function () {

    return this.state.rooms.map(function (room) {
      return (
        <div className='container' key={room.roomName}>
          <RoomTemperatureCoordinator
            name={room.roomName}
            desiredTemperature={room.temperature}
            />
        </div>
      );
    });

  },

  render: function () {
    return (
      <div>
        <br/><br/><br/>
        <PageHeader>Temperature</PageHeader>

        <SystemSensorCoordinator systemSensors={this.state.sensors}/>

        <div className='container'>
          <GlobalTemperatureDisplayer temperature={this.state.currentTemperature}/>
        </div>

        {this._createRoomTemperatureHandlers()}
      </div>
    )
  }

});

module.exports = TemperatureManager;
