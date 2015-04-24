/**
 * Created by novy on 23.04.15.
 */

var React = require('react');
var ActionCreator = require('../ActionCreator');
var Button = require('react-bootstrap').Button;
var Well = require('react-bootstrap').Well;
var Label = require('react-bootstrap').Label;

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
  style: function () {
    return this.props.state === 'on' ? 'success' : 'danger';
  },

  render: function () {
    var style = this.style();

    return (
      <div className="container">
        <Well>
          <p>
            <span>{this.props.name} </span>
            <Label bsStyle={style}>
              {this.props.state}
            </Label>
          </p>
          <Button bsStyle='primary' onClick={this._switch}>Switch!</Button>
        </Well>
      </div>

    );
  }

});

module.exports = RoomSwitcher;
