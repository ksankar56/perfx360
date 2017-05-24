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

    $(document.body).on('mouseover', '.bs-tooltip', function() { $('.bs-tooltip').tooltip(); });

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

    /*$(document.body).on('submit', '#loginSubmit', function() {
        $("#loginSubmit").validate({

            // Specify the validation rules
            rules: {
                firstname: "required",
                lastname: "required",
                email: {
                    required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 5
                },
                agree: "required"
            },

            // Specify the validation error messages
            messages: {
                firstname: "Please enter your first name",
                lastname: "Please enter your last name",
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                email: "Please enter a valid email address",
                agree: "Please accept our policy"
            },

            submitHandler: function(form) {
                //form.submit();
                console.info('validated')
            }
        });
        //return
    });*/

    $('#login-form').validate({
        errorClass: 'errors',
        submitHandler: function(form) {
            var loadingBlock = $('#loginSubmit').data('destination');

            console.info('loadingBlock = ', loadingBlock);
            $(loadingBlock).block({ message: '<h5>Loading... <div class="icon-spinner9 icon-spin icon-lg"></div></h5>',
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
                    color: '#b2b2b2',
                    borderRadius: 10,
                    width:200,
                    minHeight: 40
                }});
            form.submit();
            //$('#login-form').submit();
        }
    });

    function stepsValidation() {
        var form = $(".steps-validation").show();

        $(".steps-validation").steps({
            headerTag: "h6",
            bodyTag: "fieldset",
            transitionEffect: "fade",
            titleTemplate: '<span class="step">#index#</span> #title#',
            labels: {
                finish: 'Submit'
            },
            onStepChanging: function (event, currentIndex, newIndex)
            {
                // Allways allow previous action even if the current form is not valid!
                if (currentIndex > newIndex)
                {
                    return true;
                }
                // Forbid next action on "Warning" step if the user is to young
                if (newIndex === 3 && Number($("#age-2").val()) < 18)
                {
                    return false;
                }
                // Needed in some cases if the user went back (clean up)
                if (currentIndex < newIndex)
                {
                    // To remove error styles
                    form.find(".body:eq(" + newIndex + ") label.error").remove();
                    form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
                }
                form.validate().settings.ignore = ":disabled,:hidden";
                return form.valid();
            },
            onFinishing: function (event, currentIndex)
            {
                form.validate().settings.ignore = ":disabled";
                return form.valid();
            },
            onFinished: function (event, currentIndex)
            {
                alert("Submitted!");
            }
        });

// Initialize validation
        $(".steps-validation").validate({
            ignore: 'input[type=hidden]', // ignore hidden fields
            errorClass: 'danger',
            successClass: 'success',
            highlight: function(element, errorClass) {
                $(element).removeClass(errorClass);
            },
            unhighlight: function(element, errorClass) {
                $(element).removeClass(errorClass);
            },
            errorPlacement: function(error, element) {
                error.insertAfter(element);
            },
            rules: {
                email: {
                    email: true
                }
            }
        });

        //$('#validation').show();
        /*var options = {
            sortable: true,

            filters: [{
                id: 'core_ID',
                type: 'integer',
                operators: ['equal', 'not_equal', 'in', 'not_in']
            }, {
                id: 'store_id',
                label: 'Store ID',
                type: 'string',
                operators: ['equal', 'not_equal', 'in', 'not_in']
            }]
        };
        $('#builder').queryBuilder(options);*/
    }


    $(document.body).on('click', '.box-loading', function() {
        var loadingBlock = $(this).data('destination');

        console.info('loadingBlock = ', loadingBlock);
        $(loadingBlock).block({ message: '<h5 >Loading... <div class="icon-spinner9 icon-spin icon-lg"></div></h5>',
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
                color: '#b2b2b2',
                borderRadius: 10,
                width:200,
                minHeight: 40
            }});

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
        var pageEvent = currentObj.data("event");

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

            if(formType == 'multipart') {
                data = getMultiPartData(formElement);
            } else {
                data = $(formElement).serialize();
            }
        }
        $.ajax({
            url: url,
            data: data,
            error: function(err) {
                $(destination).html('');
                $(loadingBlock).unblock();
            },
            success: function(data) {
                if(popover) {
                    $('.popover-content').html(data);
                } else {
                    if (refreshurl) {
                        var projectId = $('#selected-test').data('project');
                        if (projectId) {
                            refreshurl = refreshurl + '/' + projectId;
                        }
                        refreshurl = refreshurl + "?testId=" + $('#selected-test').val();
                        //console.info('destination = ', destination);
                        //$('#test-execution-message').css('display','block');
                        toastr.success('Message!', 'Executed Successfully');
                        setTimeout(function(){
                            $(location).attr('href', refreshurl);
                        }, 3000)

                    } else {
                        $(destination).html(data);
                    }

                    if (datatableObj) {
                        enableDataTable(datatableObj);
                    }

                    if (formRepeaterObj) {
                        enableFormRepeater();
                    }

                    if (pageEvent) {
                        if (pageEvent == 'stepsValidation') {
                            console.info('stepsValidation');
                            stepsValidation();
                        }
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
                color: '#b2b2b2',
                borderRadius: 10,
                width:200,
                minHeight: 40
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

    function _enableLoading() {
        var loadingBlock = $('body');
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
                color: '#b2b2b2',
                borderRadius: 10,
                width:200,
                minHeight: 40
            }});

        return loadingBlock;
    }

    $(document.body).on('click', '.cancel-button', function() {
        var _self = $(this);
        var url = _self.data('url');
        var method = _self.data('method');
        var refreshurl = _self.data("refreshurl");

        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this object!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#F6BB42",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel please!",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function(isConfirm) {
            if (isConfirm) {
                var loadingBlock = _enableLoading();
                $.ajax({
                    url: url,
                    data: '',
                    error: function(err) {
                        console.info('failed = ', err);
                        $(loadingBlock).unblock();
                    },
                    success: function(data) {

                        $(location).attr('href', refreshurl + "?m=3");
                    },
                    processData: false,
                    type: method
                });
                swal("Deleted!", "Your object has been deleted.", "success");
            } else {
                swal("Cancelled", "Your object is safe :)", "error");
            }
        });

    });

});

