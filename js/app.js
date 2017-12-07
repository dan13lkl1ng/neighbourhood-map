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
        // alert('this gets called and runs');


        // Create an info window
        this.largeInfowindow = new google.maps.InfoWindow();

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
                animation: google.maps.Animation.DROP,
                // icon: defaultIcon,
            });

            // Push the marker after each loop into the array of markers declared above
            this.markers.push(this.marker);
            // Click listener to bounce the marker(animation)
            this.marker.addListener('click', self.animateMarker);
            // 
            // this.marker.addListener('click', this.populateInfoWindow);

        }
    };

    // Animate marker by bouncing
    this.animateMarker = function() {
        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout((function() {
            this.setAnimation(null);
        }).bind(this), 1400);
    };

    // This function populates the infowindow when the marker is clicked
    // this.populateInfoWindow = function(marker, infowindow) {
    //     if (infowindow.marker != marker) {
    //         infowindow.setContent('<div>' + marker.title + '</div>');
    //         infowindow.marker = marker;
    //         // infowindow.open(map, marker);
    //         // Close the infowindow if user clicks on the close button
    //         infowindow.addListener('closeclick', function() {
    //             infowindow.setMarker(null);
    //         });
    //     }
    // }

    // Call the map function
    this.initMap();
}

function runApp() {
    ko.applyBindings(new mapView());
}