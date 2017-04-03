/**
 * Created by senthil on 26/03/17.
 */

function getResults(url, parameters, callback) {

    $.get( url, parameters, function(data) {
        callback(data);
    });
}

function getData() {
    getResults('/info', 100, function(data) {
       console.info('data =', data);
    });
}

function showPartials(url, parameters, callback) {
}

$('#click').on( "click", function() {
    var url = $(this).data("url");
    var parameters = 'param';
    var resultContainerClass = '.content-body';
    var callback = new EJS({url: 'features/dashboard/crm.ejs'}).update('.content-body');

    getResults('/info', parameters, callback);

});

