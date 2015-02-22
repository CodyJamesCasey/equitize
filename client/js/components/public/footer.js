var React           = require('react');

var Footer = React.createClass({

    render: function() {

        return ( 
    		<footer>
    			<span>Made with</span> <span id="heart-icon"></span> <img src='../img/action/svg/design/ic_favorite_outline_24px.svg'></img> <span>by</span> <span id="tudev-icon"></span> <span>in Philadelphia</span>
            </footer>
        );
    }
});

module.exports = Footer;