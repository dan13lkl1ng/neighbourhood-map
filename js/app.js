// Declare global variables for this application
var map;

function mapView() {
    var self = this;
    // Empty markers array to load all markers from the markers.js file
    // to be displayed on the map
    this.markers = [];

    // Function to display map centered on Accra, Ghana
    this.initMap = function() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 5.603717,
                lng: -0.186964
            },
            zoom: 13,
            styles: styles,
            mapTypeControl: false
        });
    };

    // Call the map function
    this.initMap();
}

function runApp() {
    ko.applyBindings(new mapView());
}