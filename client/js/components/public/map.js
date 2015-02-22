var React           = require('react');
var GoogleMaps      = require('react-google-maps');

var GoogleMapsMixin = GoogleMaps.GoogleMapsMixin,
    GoogleMapMarker = GoogleMaps.Marker,
    GoogleMap       = GoogleMaps.Map;

var Map = React.createClass({
    mixins: [
        GoogleMapsMixin
    ],
    displayName: 'SimpleMap',
    // React functions
    getDefaultProps: function() {
        return {
            latitude: 39.941,
            longitude: -75.18300,
            funds: []
        };
    },
    getInitialState: function() {
        return {
            googleMapsApi: google.maps
        };
    },
    render: function() {
        var location = new google.maps.LatLng(this.props.latitude, this.props.longitude);
        var markers = [], currentFund;
        for (var i = 0; i < this.props.funds.length; i++) {
            currentFund = this.props.funds[i];
            markers.push(
                <GoogleMapMarker
                    position={{lat: parseFloat(currentFund.latitude), lng: parseFloat(currentFund.longitude)}}
                    key={currentFund.title + i}
                    icon={'http://maps.google.com/mapfiles/marker' + String.fromCharCode(65 + i) + '.png'}
                    animation={google.maps.Animation.DROP}
                    />
            );
        }

        return (
            <div id="map">
                <GoogleMap googleMapsApi={google.maps} style={{height: '100%', width: '100%'}} zoom={14} center={location} />
                {markers}
            </div>
        );
    }
});

module.exports = Map;
