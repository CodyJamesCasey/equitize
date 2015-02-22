var React           = require('react'),
    Router          = require('react-router');

var ListItem            = require('./list-item');

var List = React.createClass({

	render: function(){
		var rows = [];
		numrows = 3;
		for (var i=0; i < numrows; i++) {
			rows.push(<ListItem />);
		}
		return <div id="list">{rows}</div>;
	}
});

module.exports = List;