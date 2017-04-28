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
    var testList = $('#test-list');
    console.info('test-list = ', testList);
    if($('#test-list')) {

        var testDataTable = $('#test-list').DataTable().reload();
        // Set the search textbox functionality in sidebar
        $('#search-list').on('keyup', function () {
            testDataTable.search(this.value).draw();
        });
    }

    if($('#environment-list')) {

        var envDataTable = $('#environment-list').DataTable().reload();
        // Set the search textbox functionality in sidebar
        $('#search-list').on('keyup', function () {
            envDataTable.search(this.value).draw();
        });
    }
});