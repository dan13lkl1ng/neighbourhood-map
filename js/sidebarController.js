$(document).ready(function() {

    // opening the sidebar
    $('#sidebar-collapse').on('click', function() {
        // open sidebar
        $('#sidebar').addClass('active');
    });

    // if dismiss or overlay is clicked
    $('#dismiss, #map').on('click', function() {
        // hide the sidebar
        $('#sidebar').removeClass('active');
    });
});