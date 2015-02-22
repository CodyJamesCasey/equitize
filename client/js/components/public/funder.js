var React           = require('react');

var Funder = React.createClass({
  render: function(){
    var background = this.props.backgroundurl
    return (
      <div id={this.props.name} className="detailfunder" style="backgroundimage:url("+{background}+")"></div>
      <p className="foundername">{this.props.name}</div>
      <p className="founderDonated">{this.props.damount}</p>
      
    )
  }
});