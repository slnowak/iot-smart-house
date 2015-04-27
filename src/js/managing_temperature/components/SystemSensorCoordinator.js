/**
 * Created by novy on 26.04.15.
 */

var React = require('react');
var SystemSensor = require('./SystemSensor');
var Well = require('react-bootstrap').Well;

var SystemSensorCoordinator = React.createClass({

  _createSensors: function () {
    return this.props.systemSensors.map(function (systemSensor) {
      return (
        <Well key={systemSensor.name}>
          <SystemSensor name={systemSensor.name} state={systemSensor.state}/>
        </Well>
      )
    });
  },

  render: function () {

    return (

      <div className='container'>
        {this._createSensors()}
      </div>

    );
  }

});

module.exports = SystemSensorCoordinator;
