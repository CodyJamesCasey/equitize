var React = require('react'),
  Router = require('react-router'),
  DetailPicture = require('./detail-picture');

var DetailPage = React.createClass({

  render: function () {

    return ( 
      <main id = "detail-page" >
        <DetailPicture imgUrl="http://www.independent.co.uk/incoming/article8465213.ece/alternates/w620/v2-cute-cat-picture.jpg" />
      </main>
    );
  }
});

module.exports = DetailPage;