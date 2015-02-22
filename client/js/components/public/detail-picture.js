var React           = require('react');

var DetailPicture = React.createClass({
  
  render: function(){
    var divStyle = {
      backgroundImage: 'url(' + this.props.imgUrl + ')',
    };
    return (
     <div className="detailpic" style={divStyle}></div> 
    );
  }
});

module.exports = DetailPicture;