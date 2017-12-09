// Declare global variables for this application
var map;
// Foursquare clientID and client secret
var fourSquareClientID = "104SKXFLB12DD0RLZUEO3CX5EWPN0WF1TM4C5VL2QRBVJRDY";
var fourSquareClientSecret = "DPYGYHCAMDDMK0UYINKVXHLYQNXLOOMJYUKB55R2NCVJIQCN";

function mapView() {
    var self = this;
    // Create an empty markers array to load all markers from the markers.js file
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
        // alert('this gets called and runs');


        // Run through array of markers
        for (var i = 0; i < myLocations.length; i++) {
            this.locationTitle = myLocations[i].title;
            this.locationLat = myLocations[i].lat;
            this.locationLng = myLocations[i].lng

            // Create a marker for each location
            this.marker = new google.maps.Marker({
                map: map,
                title: this.locationTitle,
                position: {
                    lat: this.locationLat,
                    lng: this.locationLng
                },
                animation: google.maps.Animation.DROP
            });

            // Push the marker after each loop into the array of markers declared above
            this.markers.push(this.marker);
            // On click, bounce the marker(animation)
            this.marker.addListener('click', self.animateMarker);
            // On click, display the infowindow with information about the location
            this.marker.addListener('click', function() {
                self.populateInfoWindow(this, self.largeInfowindow);
            });
        }
    };

    // Animate marker by bouncing
    this.animateMarker = function() {
        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout((function() {
            this.setAnimation(null);
        }).bind(this), 5000);
    };


    // Create an info window
    this.largeInfowindow = new google.maps.InfoWindow();

    // This function populates the infowindow when the marker is clicked
    this.populateInfoWindow = function(marker, infowindow) {
        if (infowindow.marker != marker) {
            infowindow.setContent('');
            infowindow.marker = marker;

            infowindow.setContent('<div id="info-window">' + marker.title + '</div>');
            infowindow.open(map, marker);

            // Close the infowindow if user clicks on the close button
            // infowindow.addListener('closeclick', function() {
            //     infowindow.this.marker(null);
            // });

            // Foursquare API starts here
            var fourSquareApiURL = 'https://api.foursquare.com/v2/venues/search?ll=' +
                marker.position["lat"] + ',' + marker.position["lng"] + '&client_id=' + fourSquareClientID +
                '&client_secret=' + fourSquareClientSecret + '&query=' + marker.title + '&v=20171209';

            $.getJSON(fourSquareApiURL, function(marker) {});
            // alert(typeof(marker.position));
        }

    }

    // Call the map function
    this.initMap();
}

function runApp() {
    ko.applyBindings(new mapView());
}