/**
 * Created by novy on 30.04.15.
 */

var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var ActionCreator = require('../ActionCreator');


var ConnectScreen = React.createClass({

  getInitialState: function () {
    return {
      remoteUrl: ''
    }
  },

  handleUrlChange: function (event) {
    this.setState({
      remoteUrl: event.target.value
    })
  },

  handleConnectionConfirmed: function() {
    ActionCreator.saveRemoteUrl(
      this.state.remoteUrl
    );
  },

  render: function () {
    return (
      <Modal
        title='Connecting...'
        bsStyle='primary'
        backdrop={false}
        animation={true}
        closeButton={false}
        >
        <div className='modal-body'>
          <form className="form" onSubmit={this.handleConnectionConfirmed}>
            <Input type="url"
                   placeholder="Enter remote device address"
                   label="Remote Address"
                   value={this.state.remoteUrl}
                   onChange={this.handleUrlChange}
                   required
              />

            <div className='modal-footer'>
              <Button bsStyle='primary' type="submit">Connect!</Button>
            </div>
          </form>
        </div>

      </Modal>
    )
  }

});

module.exports = ConnectScreen;
