/**
 * Created by novy on 23.04.15.
 */

var React = require('react');
var ActionCreator = require('../ActionCreator');
var Button = require('react-bootstrap').Button;
var Well = require('react-bootstrap').Well;

var RoomSwitcher = React.createClass({

  _switch: function() {
    ActionCreator.switchLight(
      this.props.name, this._negateState(this.props.state)
    );
  },

  _negateState: function(state) {
    return state === 'on' ? 'off' : 'on';
  },

  render: function () {
    return (

      <div className="container">
        <Well>
          <p>{this.props.name} : {this.props.state}</p>
          <Button bsStyle='primary' onClick={this._switch}>Switch!</Button>
        </Well>
      </div>

    );
  }

});

module.exports = RoomSwitcher;
