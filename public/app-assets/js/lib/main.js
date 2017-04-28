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

    function _enableLoadingBlock() {
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

        return loadingBlock;
    }

    $(document.body).on('click', '.process-page', function() {
        var loadingBlock = _enableLoadingBlock();
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
        var formType = currentObj.data("formtype");
        var datatableObj = currentObj.data("datatable");
        var formRepeaterObj = currentObj.data("formrepeater");

        console.info('url = ', url);

        if (destination == undefined) {
            destination = '#slide-result-view';
        }

        console.info('type = ', type);

        if (formSubmit) {
            var formElement = currentObj.closest('form');
            console.info('formType = ', formType);

            if(formType == 'multipart') {
                data = getMultiPartData(formElement);
            } else {
                data = $(formElement).serialize();
            }
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

                if (datatableObj) {
                    enableDataTable(datatableObj);
                }

                if (formRepeaterObj) {
                    enableFormRepeater();
                }
                $(loadingBlock).unblock();
            },
            processData: false,
            type: type
        });
    }

    function enableDataTable(id) {
        var userDataTable = $('#' + id).DataTable();
        // Set the search textbox functionality in sidebar
        $('#search-contacts').on( 'keyup', function () {
            userDataTable.search( this.value ).draw();
        });

        // Checkbox & Radio 1
        $('.input-chk').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
        });

        userDataTable.on( 'draw.dt', function () {
            // Checkbox & Radio 1
            $('.input-chk').iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue',
            });
        });
    }

    function enableFormRepeater() {
        $('.repeater-default').repeater();

        // Custom Show / Hide Configurations
        $('.file-repeater, .contact-repeater').repeater({
            show: function () {
                $(this).slideDown();
            },
            hide: function(remove) {
                if (confirm('Are you sure you want to remove this item?')) {
                    $(this).slideUp(remove);
                }
            }
        });
    }

    function getMultiPartData(obj) {
        /* ADD FILE TO PARAM AJAX */
        var formData = new FormData();
        $.each($(obj).find("input[type='file']"), function(i, tag) {
            $.each($(tag)[0].files, function(i, file) {
                formData.append(tag.name, file);
            });
        });
        /*var params = $(obj).serializeArray();
        $.each(params, function (i, val) {
            formData.append(val.name, val.value);
        });*/

        var o = {};
        var a = $(obj).serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });

        formData.append('values', o);

        return formData;
    };

    // Variable to store your files
    var files;

    // Add events
    $(document.body).on('change', 'input[type=file]', function(event) {
        files = event.target.files;
        console.info('files = ', files);
    });

    $(document.body).on('submit', '#ajax-upload-form', function(event) {
        event.stopPropagation(); // Stop stuff happening
        event.preventDefault(); // Totally stop stuff happening
        var loadingBlock = _enableLoadingBlock();

        // Create a formdata object and add the files
        var data = new FormData($("#ajax-upload-form")[0]);
        /*$.each(files, function(key, value)  {
            data.append(key, value);
        });*/

        console.info('data = ', data);

        $.ajax({
            url: '/application/upload',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function(data, textStatus, jqXHR) {
                if(typeof data.error === 'undefined')  {
                    // Success so call function to process the form
                    //submitForm(event, data);
                    console.info('success = ', data);
                    $('#success-message-alert-wrapper').show();
                    $("#ajax-upload-form")[0].reset();
                    $('#success-message-alert').html(data.status.message);
                    $(loadingBlock).unblock();
                }  else  {
                    // Handle errors here
                    console.log('ERRORS: ', data.error);
                    $('#error-message-alert-wrapper').show();
                    $('#error-message-alert').html(data.status.message);
                    $(loadingBlock).unblock();
                }
            },
            error: function(jqXHR, textStatus, errorThrown)  {
                // Handle errors here
                console.log('ERRORS: ' + textStatus);
                $('#error-message-alert-wrapper').show();
                $('#error-message-alert').html(textStatus);
                $(loadingBlock).unblock();
                // STOP LOADING SPINNER
            }
        });
    });

    $(document.body).on('click', '.ajax-form-submit', function() {
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

        var url = currentObj.data("url");
        var data = {};
        var type = currentObj.data("method");
        var destination = currentObj.data("destination");
        var datatableObj = currentObj.data("datatable");
        var formRepeaterObj = currentObj.data("formrepeater");

        console.info('url = ', url);

        if (destination == undefined) {
            destination = '#slide-result-view';
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

                if (datatableObj) {
                    enableDataTable(datatableObj);
                }

                if (formRepeaterObj) {
                    enableFormRepeater();
                }
                $(loadingBlock).unblock();
            },
            processData: false,
            type: type
        });
    });
});


