# Neighbourhood Map Project

This project is based off Google's map and displays places of interest to me.

The app is mobile friendly with the option to filter the list of locations.

It displays the number of times people have checked-in to and number of tips given at these places of interest.

## Getting Started

To get the project running:
1. Simply clone or download the files from github
2. Open the **index.html** file in your browser.
3. Click on any marker to display information on that marker.

You can checkout a live version [here](https://twumm.github.io/neighbourhood-map/)

## Built With

* Google Maps API
* Foursquare API
* Bootstrap
* Knockout JS
* JQuery

## Project Files

* `index.html` - Renders the map in the browser.
* `app.js` - Contains the engine of the application. It makes the necessary calls to the Google and Foursquare API and aids in filtering the list of locations.
* `googleMapStyles.js` - For custom styling the Google maps.
* `sidebarController.js` - Controls the sidebar display/hide toggle.
* `knockout-3.2.0.js` - Used in rendering locations in the map and for creating the filter function.
* `style.css` - Contains the pages design styles.
* `README.md` - Explains what this neigbourhood maps project is about.

## Resources

* [Bootstrapious](https://bootstrapious.com/p/bootstrap-sidebar) for the sidebar