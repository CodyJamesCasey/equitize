/** @jsx React.DOM */
var React   = require('react'),
    Router  = require('react-router');

// React-router variables
var Route           = Router.Route,
    RouteHandler    = Router.RouteHandler,
    Redirect        = Router.Redirect,
    DefaultRoute    = Router.DefaultRoute,
    NotFoundRoute   = Router.NotFoundRoute;

// Authentication related page components
var NotFound    = require('./components/404');
// Publicly accessible page components
var Public      = require('./components/public'),
    Header      = require('./components/public/header'),
    Footer      = require('./components/public/footer'),
    Landing      = require('./components/public/landing'),
    ListItem      = require('./components/public/list-item'),
    List      = require('./components/public/list'),
    MainPage      = require('./components/public/main-page'),
    Map      = require('./components/public/map'),
    Router      = require('./components/public/router');

// Authentication-required page components
// TODO make the internal pages a thing

// Routes representing the frontend
var sitemap = (
    <Route handler={RouteHandler}>
        <Route name="public" path="/" handler={Public}/>
            <Route name="header" handler={Header}/>
            <Route name="footer" handler={Footer}/>
            <Route name="listitem" handler={ListItem}/>
            <Route name="list" handler={List}/>
            <Route name="mainpage" handler={MainPage}/>
            <Route name="map" handler={Map}/>
            <Route name="router" handler={Router}/>
            <DefaultRoute name="landing" handler={Landing}/>
        <NotFoundRoute name="404" handler={NotFound}/>
    </Route>
);

// Bind the routes to the DOM
Router.run(sitemap, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
});
