/**
 * Created by novy on 24.04.15.
 */

var React = require('react');
var Jumbotron = require('react-bootstrap').Jumbotron;
var PageHeader = require('react-bootstrap').PageHeader;

var TemperatureManager = React.createClass({

  render: function () {
    return (
      <div>
        <br/><br/><br/>
        <PageHeader>Temperature</PageHeader>

        <Jumbotron>
          <p> Hello world from temperature manager! </p>
        </Jumbotron>
      </div>
    )
  }

});

module.exports = TemperatureManager;
