var map;

function mapView() {
    var self = this;

    this.markers = [];

    this.initMap = function() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 40.7413549,
                lng: -73.9980244
            },
            zoom: 13,
            // styles: styles,
            mapTypeControl: false
        });
    };

    // Call the map function
    this.initMap();
}

function runApp() {
    ko.applyBindings(new mapView());
}