/**
 * Created by novy on 26.04.15.
 */

var React = require('react');
var Input = require('react-bootstrap').Input;
var Well = require('react-bootstrap').Well;
var ActionCreator = require('../ActionCreator');

var RoomTemperatureCoordinator = React.createClass({

  _onDesiredTemperatureChanged: function (event) {
    ActionCreator.changeDesiredTemperature(
      this.props.name, event.target.value
    );
  },

  render: function () {
    return (
      <Well>
        <h2>{this.props.name}</h2>

        <div className="row">
          <div className="col-md-4">
            <Input type="range" className="slider" value={this.props.desiredTemperature}
                   onChange={this._onDesiredTemperatureChanged}/>
          </div>

          <div className="col-md-8">
            <p>
              <span>Desired temperature: </span>
              <span>{this.props.desiredTemperature}</span>
            </p>
          </div>
        </div>
      </Well>
    );
  }

});

module.exports = RoomTemperatureCoordinator;
