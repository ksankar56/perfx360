/*=========================================================================================
    File Name: users-contacts.js
    Description: Users contacts configurations
    ----------------------------------------------------------------------------------------
    Item Name: Robust - Responsive Admin Theme
    Version: 1.2
    Author: GeeksLabs
    Author URL: http://www.themeforest.net/user/geekslabs
==========================================================================================*/

$(document).ready(function(e) {
    e.preventDefault();
    var appDataTable = $('#application-list').DataTable().reload();
    // Set the search textbox functionality in sidebar
    $('#search-list').on( 'keyup', function () {
        appDataTable.search( this.value ).draw();
    });
});