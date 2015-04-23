/**
 * Created by novy on 23.04.15.
 */

var React = require("react");
var Jumbotron = require("react-bootstrap").Jumbotron;

var HelloComponent = React.createClass({

  render: function () {
    return (
      <Jumbotron>
        Hello world!
      </Jumbotron>
    );
  }
});

module.exports = HelloComponent;
