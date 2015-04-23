/**
 * Created by novy on 23.04.15.
 */

var React = require('react');
var ActionCreator = require('../ActionCreator');
var Button = require('react-bootstrap').Button;
var Well = require('react-bootstrap').Well;

var RoomSwitcher = React.createClass({

  _switch: function () {
    ActionCreator.switchLight(
      this.props.name, this._negateState(this.props.state)
    );
  },

  _negateState: function (state) {
    return state === 'on' ? 'off' : 'on';
  },

  // todo: temporary
  _cssColor: function () {
    return this.props.state === 'on' ? 'green' : 'red';
  },

  render: function () {
    var style = {
      color: this._cssColor()
    };

    return (
      <div className="container">
        <Well>
          <p>
            <span>{this.props.name} : </span>
            <span style={style}>{this.props.state}</span>
          </p>
          <Button bsStyle='primary' onClick={this._switch}>Switch!</Button>
        </Well>
      </div>

    );
  }

});

module.exports = RoomSwitcher;
