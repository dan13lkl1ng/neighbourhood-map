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
    this.searchOption = ko.observable("");


    // Function to display map centered on Accra, Ghana
    this.initMap = function() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 37.418825,
                lng: -122.080894
            },
            zoom: 15,
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
                // Pass the latlng vars here to enable easy calls from the
                // foursquare API URL
                lat: this.locationLat,
                lng: this.locationLng,
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

            // Foursquare API starts here
            var fourSquareApiURL = 'https://api.foursquare.com/v2/venues/search?ll=' +
                marker.lat + ',' + marker.lng + '&client_id=' + fourSquareClientID +
                '&client_secret=' + fourSquareClientSecret + '&query=' + marker.title + '&v=20171209';

            $.getJSON(fourSquareApiURL, function(marker) {
                var response = marker.response.venues[0];
                self.checkinsCount = response.stats.checkinsCount;
                self.tipCount = response.stats.tipCount;
                self.category = response.categories[0].name;
                // infowindow.setContent('<div>' + self.checkinsCount + '</div>')
            }).fail(function() {
                alert("There was an error with the Foursquare API call.Please refresh the page and try again ")
            });
            infowindow.setContent('<div><h4>' + marker.title + '</h4><p>Type of place: ' +
                self.category + '</p><p>Times people have been here: ' + self.checkinsCount +
                '</p><p>Tips people have given: ' + self.tipCount + '</p></div>');
            infowindow.open(map, marker);
            // console.log(fourSquareApiURL);
        }
    }

    // // Call the map function
    this.initMap();

    // Check this before final push
    this.myLocationsFilter = ko.computed(function() {
        var result = [];
        for (var i = 0; i < this.markers.length; i++) {
            var markerLocation = this.markers[i];
            if (markerLocation.title.toLowerCase().includes(this.searchOption()
                    .toLowerCase())) {
                result.push(markerLocation);
                this.markers[i].setVisible(true);
            } else {
                this.markers[i].setVisible(false);
            }
        }
        return result;
    }, this);
}

function runApp() {
    ko.applyBindings(new mapView());
}