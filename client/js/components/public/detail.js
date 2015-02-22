var React = require('react'),
  Router = require('react-router'),
  mui = require('material-ui'),
  Paper = mui.Paper,
  DetailPicture = require('./detail-picture'),
  FunderList = require('./funderlist'),
  Information = require('./information');

var DetailPage = React.createClass({

  render: function () {

    return ( 
      <main id = "detail-page" >
        <DetailPicture imgUrl="http://www.independent.co.uk/incoming/article8465213.ece/alternates/w620/v2-cute-cat-picture.jpg" />
        <FunderList />
        <Paper z-Depth={2}>
            <Information />
        </Paper>
        </main>
    );
  }
});

module.exports = DetailPage;
