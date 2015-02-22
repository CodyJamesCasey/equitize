var React           = require('react');

var Map = React.createClass({
    renderMap: function() {
        var cred = "Ain9coRfttDIm04OT_fUE8LmCEKAl9moAugoxS9DyXc8VcEr5eBIYAwnQ2sgA20g";
        var map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), {
          credentials: cred
        });
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(locateSuccess, locateFail);
        } else {
          alert('Your browser does not support Geolocation : (  Jirani fails!');
        }
    },
    // React functions
    componentWillMount: function() {
    },
    componentWillUnmount: function() {
    },
    render: function() {
        return (
            <div id="mapDiv" className="map"></div>
        );
    }
});

module.exports = Map;
