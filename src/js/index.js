var React = require('react');
var RoomLightManager = require('./managing_lights/components/RoomLightManager');
var TemperatureManager = require('./managing_temperature/components/TemperatureManager');
var ConnectScreen = require('./connect/components/ConnectScreen');

var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteConstants = require('./common/Constants').Routes;

var NavBar = require('./common/components/NavBar');

var routes = (
  <Route handler={NavBar} path={RouteConstants.ROOT}>

    <DefaultRoute handler={RoomLightManager}/>
    <Route name="lights" path={RouteConstants.LIGHTS} handler={RoomLightManager}/>
    <Route name="temperatures" path={RouteConstants.TEMPERATURE} handler={TemperatureManager}/>
    <Route name="configuration" path={RouteConstants.CONFIGURATION} handler={ConnectScreen}/>
  </Route>
);

Router.run(routes, Router.HashLocation, function (Handler) {
  React.render(<Handler/>, document.body);
});
