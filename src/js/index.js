var React = require('react');
var RoomLightManager = require('./managing_lights/components/RoomLightManager');
var TemperatureManager = require('./managing_temperature/components/TemperatureManager');

var Router = require('react-router');
var Route = Router.Route;
var Redirect = Router.Redirect;

var NavBar = require('./common/components/NavBar');

var routes = (
  <Route handler={NavBar} path="/">
    <Route name="lights" path="lights/" handler={RoomLightManager}/>
    <Route name="temperatures" path="temperatures/" handler={TemperatureManager}/>
    <Redirect from="/" to="lights"/>
  </Route>
);

Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
