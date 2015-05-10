/**
 * Created by novy on 10.05.15.
 */

var React = require('react');
var Well = require('react-bootstrap').Well;

var GlobalTemperatureDisplayer = React.createClass({

  render: function () {
    return (
      <Well>
        <p>
          <span> Current temperature: </span>
          <span> {this.props.temperature} </span>
        </p>
      </Well>
    );
  }

});

module.exports = GlobalTemperatureDisplayer;
