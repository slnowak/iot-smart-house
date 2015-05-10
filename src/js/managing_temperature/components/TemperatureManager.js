/**
 * Created by novy on 24.04.15.
 */

var React = require('react');
var Jumbotron = require('react-bootstrap').Jumbotron;
var PageHeader = require('react-bootstrap').PageHeader;
var SystemSensorCoordinator = require('./SystemSensorCoordinator');
var RoomTemperatureCoordinator = require('./RoomTemperatureCoordinator');
var GlobalTemperatureDisplayer = require('./GlobalTemperatureDisplayer');
var TemperatureStore = require('../TemperatureStore');
var ActionCreator = require('../ActionCreator');
var ConfigurationMixin = require('../../common/ConfigurationMixin');

var TemperatureManager = React.createClass({

  mixins: [ConfigurationMixin],

  getInitialState: function () {
    //return {
    //  rooms: TemperatureStore.newestTemperatureData()
    //};

    return {
      rooms: [
        {
          roomName: "Kitchen",
          desiredTemperature: 20
        },
        {
          roomName: "Bedroom",
          desiredTemperature: 30
        },
        {
          roomName: "Laundry",
          desiredTemperature: 25
        }
      ],
      sensors: [
        {
          name: 'Central Heating',
          state: 'off'
        },
        {
          name: 'AirConditioning',
          state: 'on'
        }
      ],
      currentTemperature: 66
    }
  }
  ,

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
      rooms: TemperatureStore.desiredTemperature(),
      currentTemperature: TemperatureStore.currentGlobalTemperature()
    });
  },

  _createRoomTemperatureHandlers: function () {

    return this.state.rooms.map(function (room) {
      console.log(room);
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
