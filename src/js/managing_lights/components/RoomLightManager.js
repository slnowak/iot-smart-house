/**
 * Created by novy on 23.04.15.
 */

var React = require('react');
var LightStore = require('../LightStore');
var PageHeader = require('react-bootstrap').PageHeader;
var RoomSwitcher = require('./RoomLightSwitcher');
var ActionCreator = require('../ActionCreator');
var ConfigurationMixin = require('../../common/ConfigurationMixin');

var Manager = React.createClass({

  mixins: [ConfigurationMixin],

  getInitialState: function () {
    return {
      rooms: LightStore.newestLightData()
    }
  },

  componentWillMount: function () {
    ActionCreator.init();
  },

  componentDidMount: function () {
    LightStore.addChangeListener(this._onRoomConfigurationChanged)
  },

  componentWillUnmount: function () {
    LightStore.removeChangeListener(this._onRoomConfigurationChanged)
  },

  _onRoomConfigurationChanged: function () {
    this.setState({
      rooms: LightStore.newestLightData()
    })
  },

  _createRoomLightSwitchers: function () {
    return this.state.rooms.map(function (room) {
      return (
        <RoomSwitcher key={room.name} name={room.name} state={room.state}/>
      );
    });
  },

  render: function () {

    return (
      <div>
        <br/><br/><br/>
        <PageHeader>Light</PageHeader>
        {this._createRoomLightSwitchers()}
      </div>
    );
  }

});

module.exports = Manager;
