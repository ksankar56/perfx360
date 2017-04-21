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

/*$( document ).ready(function() {
    $.blockUI({
        message: '<div class="icon-spinner9 icon-spin icon-lg"></div>',
        timeout: 2000, //unblock after 2 seconds
        overlayCSS: {
            backgroundColor: '#FFF',
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            border: 0,
            padding: 0,
            backgroundColor: 'transparent'
        }
    });
});*/

// unblock when ajax activity stops
//$(document).ajaxStop($.unblockUI);

$(document).ready(function() {
    //var cardBlock = $('.card-block');

    $('.nav-link-expand').on('click', function(e) {
        if (typeof screenfull != 'undefined'){
            if (screenfull.enabled) {
                screenfull.toggle();
            }
        }
    });

    if (typeof screenfull != 'undefined'){
        if (screenfull.enabled) {
            $(document).on(screenfull.raw.fullscreenchange, function(){
                if(screenfull.isFullscreen){
                    $('.nav-link-expand').find('i').toggleClass('icon-contract icon-expand2');
                }
                else{
                    $('.nav-link-expand').find('i').toggleClass('icon-expand2 icon-contract');
                }
            });
        }
    }

    $('.fetch-data').on('click', function() {
        //$(cardBlock).blockUI({ message: "<h1>Remote call in progress...</h1>" });
        var block_ele = $('.side-panel-wrap');
        /*$(block_ele).block({
            message: '<h1>Fetching data...</h1>'
        });*/

        $(block_ele).block({ message: '<h3>Loading... <div class="icon-spinner9 icon-spin icon-lg"></div></h3>',
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.6,
                cursor: 'wait'
            },
            css: {
                border: 0,
                padding: 5,
                paddingTop: 10,
                opacity: 0.6,
                backgroundColor: '#000',
                color: '#b2b2b2'
            }});
        //$.ajax({ url: 'wait.php', cache: false });
        var url = $(this).data("url");
        var data = {};
        var type = $(this).data("type");

        $.ajax({
            url: url,
            data: data,
            error: function() {
                //$('#info').html('<p>An error has occurred</p>');
                //$.unblockUI();
                console.info('failed');
                $(block_ele).unblock();
            },
            success: function(data) {
                console.info('success');
                //$.unblockUI();
                $('#slide-result-view').html(data);
                $(block_ele).unblock();
            },
            type: type
        });
    });


    function fetchData(obj) {
        //$.ajax({ url: 'wait.php', cache: false });
        var url = '/project'; //obj.data("url");
        var data = {};
        var type = 'POST'; //obj.data("type");

        $.ajax({
            url: url,
            data: data,
            error: function() {
                //$('#info').html('<p>An error has occurred</p>');
                //$.unblockUI();
                console.info('failed');
                $.unblockUI('.card-bloc');
            },
            success: function(data) {
                console.info('success');
            },
            type: type
        });
        /*$.ajax({
         url: '',
         cache: false,
         complete: function() {
         // unblock when remote call returns
         $.unblockUI();
         }
         });*/
    }
});


