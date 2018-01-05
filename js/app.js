/** 
 * This application runs by opening the google maps, pinning
 * pre-defined markers(fetched from the markers.js file), fetching
 * some information about the markers from foursquare and displaying
 * these information when a user clicks on a maps.
 */

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

        // List of markers
        var myLocations = [{
                title: 'Google Building 41',
                lat: 37.422408,
                lng: -122.085609
            },
            {
                title: 'Google Android Lawn Statues',
                lat: 37.418439,
                lng: -122.088029
            },
            {
                title: 'Computer History Museum',
                lat: 37.414278,
                lng: -122.077417
            },
            {
                title: 'NASA Advanced Supercomputing Division',
                lat: 37.420992,
                lng: -122.065015
            },
            {
                title: 'Shoreline Athletic Fields',
                lat: 37.427723,
                lng: -122.094240
            },
            {
                title: 'NASA Ames Research Center',
                lat: 37.416476,
                lng: -122.064017
            },
            {
                title: 'Stevens Creek Trail',
                lat: 37.403384,
                lng: -122.069611
            }
        ];

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
            // On click, bounce and populate the marker
            this.marker.addListener('click', self.infowindowAndBounceMarker);
        }
    };

    // Merge populateInfoWindow function and marker animation for
    // an easy call in the front end
    this.infowindowAndBounceMarker = function() {
        self.populateInfoWindow(this, self.largeInfowindow);
        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout((function() {
            this.setAnimation(null);
        }).bind(this), 3050);
    };

    // Create an info window
    this.largeInfowindow = new google.maps.InfoWindow();

    // This function populates the infowindow when the marker is clicked
    this.populateInfoWindow = function(marker, infowindow) {
        if (infowindow.marker != marker) {
            infowindow.setContent('');
            infowindow.marker = marker;

            // Foursquare API starts here. Code from the ajax course
            var fourSquareApiURL = 'https://api.foursquare.com/v2/venues/search?ll=' +
                marker.lat + ',' + marker.lng + '&client_id=' + fourSquareClientID +
                '&client_secret=' + fourSquareClientSecret + '&query=' + marker.title + '&v=20171209';

            $.getJSON(fourSquareApiURL).done(function(marker) {
                var response = marker.response.venues[0];
                self.checkinsCount = response.stats.checkinsCount;
                self.tipCount = response.stats.tipCount;
                self.category = response.categories[0].name;
                // infowindow.setContent('<div>' + self.checkinsCount + '</div>')

                infowindow.setContent(self.markerTitle + '<div><p>Type of place: ' +
                    self.category + '</p><p>Times people have been here: ' + self.checkinsCount +
                    '</p><p>Tips people have given: ' + self.tipCount + '</p></div>');
            }).fail(function() {
                alert("There was an error with the Foursquare API call.Please try again ")
            });

            this.markerTitle = ('<h4>' + marker.title + '</h4>')
            infowindow.open(map, marker);
            // console.log(fourSquareApiURL);
        }
    }

    // Call the map function
    this.initMap();

    // Searches the location and appends the location to a list
    this.markerSearch = ko.computed(function() {
        var returnedList = [];
        for (var i = 0; i < this.markers.length; i++) {
            // Compare user input to marker title in lower case
            if (this.markers[i].title.toLowerCase().includes(this.searchOption()
                    .toLowerCase())) {
                returnedList.push(this.markers[i]);
                this.markers[i].setVisible(true);
            } else {
                this.markers[i].setVisible(false);
            }
        }
        return returnedList;
    }, this);
}

function runApp() {
    ko.applyBindings(new mapView());
}