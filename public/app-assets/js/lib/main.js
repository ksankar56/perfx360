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

function showToastr() {
    toastr.success('Have fun storming the castle!', 'With Close Button', {"closeButton": true});
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

    $(document.body).on('click', '.process-page', function() {
        var loadingBlock = $('.side-panel-wrap');
        $(loadingBlock).block({ message: '<h3>Loading... <div class="icon-spinner9 icon-spin icon-lg"></div></h3>',
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
        var title = $(this).data("title");

        if(title) {
            $('#slide-header-view').html(title);
        }

        fetchData($(this), loadingBlock);
    });


    function fetchData(currentObj, loadingBlock) {
        var url = currentObj.data("url");
        var data = {};
        var type = currentObj.data("method");
        var destination = currentObj.data("destination");
        var formSubmit = currentObj.data("form");

        console.info('url = ', url);

        if (destination == undefined) {
            destination = '#slide-result-view';
        }

        console.info('type = ', type);

        if (formSubmit) {
            var formElement = currentObj.closest('form');
            data = $(formElement).serialize();
            console.info('data = ', data);
        }

        $.ajax({
            url: url,
            data: data,
            error: function(err) {
                //$('#info').html('<p>An error has occurred</p>');
                //$.unblockUI();
                console.info('failed = ', err);
                $(loadingBlock).unblock();
            },
            success: function(data) {
                console.info('success');
                //$.unblockUI();
                $(destination).html(data);
                $(loadingBlock).unblock();
            },
            type: type
        });
    }

});


