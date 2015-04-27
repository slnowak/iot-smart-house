/**
 * Created by novy on 26.04.15.
 */


var React = require('react');
var Label = require('react-bootstrap').Label;

var SystemSensor = React.createClass({

  style: function () {
    return this.props.state === 'on' ? 'success' : 'danger';
  },

  render: function () {

    var style = this.style();

    return (
      <div>
        <p>
          <span>{this.props.name}  </span>
          <Label bsStyle={style}>
            {this.props.state}
          </Label>
        </p>
      </div>
    );
  }

});

module.exports = SystemSensor;
