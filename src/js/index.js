var React = require('react');
var RoomLightManager = require('./managing_lights/components/RoomLightManager');
var TemperatureManager = require('./managing_temperature/components/TemperatureManager');
var ConnectScreen = require('./connect/components/ConnectScreen');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;

var NavBar = require('./common/components/NavBar');

var routes = (
  <Route handler={NavBar} path="/">

    <DefaultRoute handler={ConnectScreen}/>
    <Route name="lights" path="lights/" handler={RoomLightManager}/>
    <Route name="temperatures" path="temperatures/" handler={TemperatureManager}/>
    <Route name="configuration" path="configuration/" handler={ConnectScreen}/>
  </Route>
);

Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
