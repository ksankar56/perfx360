/**
 * Created by senthil on 26/03/17.
 */

function showToastr() {
    toastr.success('Have fun storming the castle!', 'With Close Button', {"closeButton": true});
}

$(document).ready(function() {
    //var cardBlock = $('.card-block');
    console.info('inside');

    var $popoverPanel = $('#shown-popover').popover({
        html: true,
        title: 'Execute Test &nbsp; <a href="#" class="close popover-close-btn" data-dismiss="alert">×</a>',
        content: '<div class="popover-all"><div class="popover-arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"></div></div></div>',
        trigger: 'click',
        placement: 'bottom'
    }).on('shown.bs.popover', function() {
        //alert('Shown event fired.');
        console.info('popover');
    }).on("hidden.bs.popover", function(e) {
        console.info('hidden');
    });

    /*$(document).on("click", ".popover .close" , function(){
        $(this).parents(".popover").popover('hide');
    });*/

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

    $(document.body).on('click', '.popover-close-btn', function() {
        $('#shown-popover').trigger( "click" );
    });

    $(document.body).on('click', '.process-page', function() {
        var loadingBlock = _enableLoadingBlock();
        var title = $(this).data("title");

        if(title) {
            $('#slide-header-view').html(title);
        }

        //if(loading == undefined) {
        fetchData($(this), loadingBlock);
        //}
    });

    $(document.body).on('click', '.execute-test', function() {
        var loadingBlock = $('.popover-content');

        console.info('loadingBlock = ', loadingBlock);
        $(loadingBlock).block({ message: '<h3>Executing... <div class="icon-spinner9 icon-spin icon-lg"></div></h3>',
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

        fetchData($(this), loadingBlock);
    });

    $(document.body).on('change', '#selected-test', function() {
        console.info('$(this).val() = ', $(this).val());
        if ($(this).val() != -1) {
            $('#shown-popover').removeAttr("disabled");
        } else {
            $('#shown-popover').attr('disabled', 'disabled');
        }
        console.info('selected');
    });

    function fetchData(currentObj, loadingBlock) {
        var url = currentObj.data("url");
        var data = {};
        var type = currentObj.data("method");
        var destination = currentObj.data("destination");
        var refreshurl = currentObj.data("refreshurl");
        var formSubmit = currentObj.data("form");
        var formType = currentObj.data("formtype");
        var datatableObj = currentObj.data("datatable");
        var formRepeaterObj = currentObj.data("formrepeater");
        var popover = currentObj.data("popover");

        if(popover) {
            $("div.overlay").toggleClass("on");
            currentObj.css("z-index","1");

            if (!$('.popover').hasClass('in')) {
                return;
            }

            var testId = $('#selected-test').val();
            console.info('testId  = ', testId);
            if (testId) {
                url = url + '/' + testId;
            }
            //console.info('hasopen = ', $('.popover').hasClass('in'));
        }
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

        console.info('url = ', url);
        console.info('data = ', data);
        console.info('type = ', type);
        
        $.ajax({
            url: url,
            data: data,
            error: function(err) {
                //$('#info').html('<p>An error has occurred</p>');
                //$.unblockUI();
                console.info('failed = ', err);
                $(destination).html('');
                $(loadingBlock).unblock();
            },
            success: function(data) {
                console.info('success');
                //$.unblockUI();
                if(popover) {
                    console.info('popover inside');
                    //var dataPopover = $popoverPanel.data('popover');
                    //$popoverPanel.find('.popover-content').html(data);
                    //addNewElement(data);
                    console.info('data = ', data);
                    $('.popover-content').html(data);
                } else {
                    if (refreshurl) {
                        //$(destination).html(data);
                        //window.location.href = refreshurl + '/' + data.testId;
                        var projectId = $('#selected-test').data('project');
                        $(location).attr('href', refreshurl + '/' + projectId);
                    } else {
                        $(destination).html(data);
                    }

                    if (datatableObj) {
                        enableDataTable(datatableObj);
                    }

                    if (formRepeaterObj) {
                        enableFormRepeater();
                    }
                }
                $(loadingBlock).unblock();
            },
            processData: false,
            type: type
        });
    }

    function addNewElement(data) {

        $('#shown-popover').popover({
            html: true,
            title: 'Popover Shown Event',
            content: '<div class="popover-all"><div class="popover-arrow"></div><div class="popover-inner"><h3 class="popover-title">Example</h3><div class="popover-content"><p> Clicks:0 </p></div></div></div>',
            trigger: 'click',
            placement: 'bottom'
        }).on('shown.bs.popover', function() {
            //alert('Shown event fired.');
            console.info('popover');
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


