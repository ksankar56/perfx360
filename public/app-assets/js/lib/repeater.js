/**
 * Created by senthil on 23/05/17.
 */


$(document).ready(function () {

    //Global Header repeater add button click
    var currentGHItem = 1;
    $(document.body).on('click', '.add-global-header-values', function () {
        currentGHItem = $('#headerValueItems').val();
        currentGHItem++;
        $('#headerValueItems').val(currentGHItem);
        var html = '<div class="row wizard-row"><div class="col-md-5"><div class="form-group"><input type="text" class="form-control" id="headerModeKey' + currentGHItem + '" name="headerModeKey' + currentGHItem + '" placeholder="eg:- x-my-service-auth"></div></div><div class="col-md-5"><div class="form-group"><input type="text" class="form-control" id="headerModeValue' + currentGHItem + '" name="headerModeValue' + currentGHItem + '" placeholder="eg:- 45455534242342342445"></div></div><div class="col-md-2"><div class="form-group" id="remove-gh-button' + currentGHItem + '"><button type="button" class="btn btn-icon btn-danger remove-gh-button"><i class="icon-trash4"></i></button></div></div></div>';
        //var html = '<div class="row wizard-row"><div class="col-md-3"><div class="form-group"> <input type="text" class="form-control" id="configName' + currentItem + '" name="configName' + currentItem + '"></div></div><div class="col-md-2"><div class="form-group"> <input type="text" class="form-control" id="duration' + currentItem + '" name="duration' + currentItem + '"></div></div><div class="col-md-2"><div class="form-group"> <input type="text" class="form-control" id="arrivalRate' + currentItem + '" name="arrivalRate' + currentItem + '"></div></div><div class="col-md-2"><div class="form-group"> <input type="text" class="form-control" id="rampTo' + currentItem + '" name="rampTo' + currentItem + '"></div></div><div class="col-md-3"><div class="form-group" id="remove-button' + currentItem + '"> <button type="button" class="btn btn-icon btn-danger remove-button"><i class="icon-trash4"></i></button></div></div></div>';
        console.info('last child = ', $("#remove-gh-button" + (currentGHItem - 1)).html());
        $("#remove-gh-button" + (currentGHItem - 1)).html('');
        $('#globalHeaders').append(html).children(':last').hide().fadeIn(500);
    });

    //Phase repeater remove button click
    $(document.body).on('click', '.remove-gh-button', function () {
        console.info('parent = ', $(this).closest(".wizard-row"));
        $(this).closest(".wizard-row").fadeOut(500, function() {
            $(this).closest(".wizard-row").remove();
        });
        currentGHItem = $('#headerValueItems').val();
        console.info('last child = ', $("#remove-button" + (currentGHItem - 1)).html());
        var html = '<button type="button" class="btn btn-icon btn-danger remove-gh-button"><i class="icon-trash4"></i></button>';
        $("#remove-gh-button" + (currentGHItem - 1)).html(html);

        --currentGHItem;
        $('#headerValueItems').val(currentGHItem);
    });

    //Phase repeater add button click
    var currentItem = 1;
    $(document.body).on('click', '#addPhase', function () {
        currentItem = $('#phaseItems').val();
        currentItem++;
        $('#phaseItems').val(currentItem);
        var html = '<div class="row wizard-row"><div class="col-md-3"><div class="form-group"> <input type="text" class="form-control" id="configName' + currentItem + '" name="configName' + currentItem + '"></div></div><div class="col-md-2"><div class="form-group"> <input type="text" class="form-control" id="duration' + currentItem + '" name="duration' + currentItem + '"></div></div><div class="col-md-2"><div class="form-group"> <input type="text" class="form-control" id="arrivalRate' + currentItem + '" name="arrivalRate' + currentItem + '"></div></div><div class="col-md-2"><div class="form-group"> <input type="text" class="form-control" id="rampTo' + currentItem + '" name="rampTo' + currentItem + '"></div></div><div class="col-md-3"><div class="form-group" id="remove-button' + currentItem + '"> <button type="button" class="btn btn-icon btn-danger remove-button"><i class="icon-trash4"></i></button></div></div></div>';
        console.info('last child = ', $("#remove-button" + (currentItem - 1)).html());
        $("#remove-button" + (currentItem - 1)).html('')
        $('#phases').append(html).children(':last').hide().fadeIn(500);
    });

    //Phase repeater remove button click
    $(document.body).on('click', '.remove-button', function () {
        console.info('parent = ', $(this).closest(".wizard-row"));
        $(this).closest(".wizard-row").fadeOut(500, function() {
            $(this).closest(".wizard-row").remove();
        });
        currentItem = $('#phaseItems').val();
        console.info('last child = ', $("#remove-button" + (currentItem - 1)).html());
        $("#remove-button" + (currentItem - 1)).html('<button type="button" class="btn btn-icon btn-danger remove-button"><i class="icon-trash4"></i></button>');

        --currentItem;
        $('#phaseItems').val(currentItem);
    });

    //Payload repeater add button click
    var currentPayloadItem = 1;
    $(document.body).on('click', '#addPayload', function () {
        currentPayloadItem = $('#payloadItems').val();
        currentPayloadItem++;
        $('#payloadItems').val(currentPayloadItem);
        var html = '<div class="row wizard-row"><div class="col-md-3"><div class="form-group"> <input type="file" class="c-select form-control" id="file' + currentPayloadItem + '" name="file' + currentPayloadItem + '"></div></div><div class="col-md-3"><div class="form-group"> <input type="text" class="form-control" id="fieldsfile' + currentPayloadItem + '" name="fieldsfile' + currentPayloadItem + '" placeholder="eg:- username, password"></div></div><div class="col-md-3"><div class="form-group"> <select class="c-select form-control" id="order' + currentPayloadItem + '" name="order' + currentPayloadItem + '" aria-required="false"><option value="random" selected="selected">Random</option><option value="sequence">Sequence</option> </select></div></div><div class="col-md-3"><div class="form-group" id="remove-payload-button' + currentPayloadItem + '"> <button type="button" class="btn btn-icon btn-danger remove-payload-button"><i class="icon-trash4"></i></button></div></div></div>';
        console.info('last child = ', $("#remove-button" + (currentPayloadItem - 1)).html());
        $("#remove-payload-button" + (currentPayloadItem - 1)).html('');
        $('#payloads').append(html).children(':last').hide().fadeIn(500);
    });

    //Payload repeater remove button click
    $(document.body).on('click', '.remove-payload-button', function () {
        console.info('parent = ', $(this).closest(".wizard-row"));
        $(this).closest(".wizard-row").fadeOut(500, function() {
            $(this).closest(".wizard-row").remove();
        });
        currentPayloadItem = $('#payloadItems').val();
        console.info('last child = ', $("#remove-button" + (currentPayloadItem - 1)).html());
        $("#remove-payload-button" + (currentPayloadItem - 1)).html('<button type="button" class="btn btn-icon btn-danger remove-payload-button"><i class="icon-trash4"></i></button>');

        --currentPayloadItem;
        $('#payloadItems').val(currentPayloadItem);
    });

    //Scenario repeater add button click
    var currentScenarioItem = 1;
    $(document.body).on('click', '#addScenario', function () {
        currentScenarioItem = $('#scenarioItems').val();
        currentScenarioItem++;
        $('#scenarioItems').val(currentScenarioItem);
        var html = '<div id="scenario' + currentScenarioItem + 'heading1" class="card-header"> <a data-toggle="collapse" data-parent="#accordionWrap' + currentScenarioItem + '" href="#scenario' + currentScenarioItem + 'accordion1" aria-expanded="true" aria-controls="scenario' + currentScenarioItem + 'accordion1" class="card-title lead"><span class="tag tag-pill tag-glow tag-default tag-success" id="scenario' + currentScenarioItem + 'RequestCount">1</span> Scenario #' + currentScenarioItem + '</a><span id="remove-scenario-button' + currentScenarioItem + '"><button type="button" class="btn btn-icon btn-danger remove-scenario-button pull-right" data-scenario="' + currentScenarioItem + '"><i class="icon-trash4"></i></button></span></div><div id="scenario' + currentScenarioItem + 'accordion1" role="tabpanel" aria-labelledby="scenario' + currentScenarioItem + 'heading1" class="card-collapse collapse in" aria-expanded="false"><div class="card-body"><div class="card-block acc-card-block"><div id="scenario' + currentScenarioItem + '-flowWrapper" class="wizard-row flow-wrapper"><div class="row"><div class="col-md-3"><div class="form-group"> <label for="scenario' + currentScenarioItem + 'Name1" class="wizard-label"> Name : <span class="btn-pure success" data-wstooltip="A descriptive name of scenario."><i class="icon-info"></i></span> </label> <input type="text" class="form-control" id="scenario' + currentScenarioItem + 'Name1" name="scenario' + currentScenarioItem + 'Name1" placeholder="eg:- Search for a product"></div></div><div class="col-md-2"><div class="form-group"> <label for="scenario' + currentScenarioItem + 'Weight1" class="wizard-label">Weight : <span class="danger">*</span> <span class="btn-pure success" data-wstooltip="Weights allow you to specify that some scenarios should be picked more often than others"><i class="icon-info"></i></span> </label> <input type="text" class="form-control required" id="scenario' + currentScenarioItem + 'Weight1" name="scenario' + currentScenarioItem + 'Weight1" value="5"></div></div><div class="col-md-7"><div class="form-group"> <label for="scenario' + currentScenarioItem + 'addRequestUrl1" class="wizard-label"> &nbsp; </label><br/> <input type="button" class="btn btn-success scenario-request-url" id="scenario' + currentScenarioItem + 'addRequestUrl1" name="scenario' + currentScenarioItem + 'addRequestUrl1" value="Add Request URL"  data-scenario="' + currentScenarioItem + '"/> <input type="hidden" class="scenario-request-items" id="scenario' + currentScenarioItem + 'requestItems" name="scenario' + currentScenarioItem + 'requestItems" value="1" /></div></div></div><div id="scenario' + currentScenarioItem + 'flowRequestUrl"><div class="row card-block wizard-card-block"><div class="col-md-2"><div class="form-group"> <label for="scenario' + currentScenarioItem + 'RequestMethod1" class="wizard-label"> Method : <span class="btn-pure success" data-wstooltip="Request method."><i class="icon-info"></i></span> </label> <select class="c-select form-control" id="scenario' + currentScenarioItem + 'RequestMethod1" name="scenario' + currentScenarioItem + 'RequestMethod1" aria-required="false"><option value="GET" selected="selected">GET</option><option value="POST">POST</option><option value="PUT">PUT</option><option value="DELETE">DELETE</option> </select></div></div><div class="col-md-8"><div class="form-group"> <label for="scenario' + currentScenarioItem + 'RequestUrl1" class="wizard-label">Request URL : <span class="danger">*</span> <span class="btn-pure success" data-wstooltip="Exclude base url. {{id}} can be included if specified in payload fields."><i class="icon-info"></i></span> </label> <input type="text" class="form-control required" id="scenario' + currentScenarioItem + 'RequestUrl1" name="scenario' + currentScenarioItem + 'RequestUrl1" placeholder="eg:- /rest/api/v1/user/{{ id }}"></div></div><div class="col-md-2"><div class="form-group"> <label for="scenario' + currentScenarioItem + 'RequestPause1" class="wizard-label"> Pause : <span class="btn-pure success" data-wstooltip="Pause between request url."><i class="icon-info"></i></span> </label> <input type="text" class="form-control" id="scenario' + currentScenarioItem + 'RequestPause1" name="scenario' + currentScenarioItem + 'RequestPause1"></div></div></div><div class="row card-block wizard-card-block mb-1"><div class="col-md-12"><ul class="nav nav-tabs"><li class="nav-item"> <a class="nav-link" id="scenario' + currentScenarioItem + '-auth-tab1" data-toggle="tab" aria-controls="scenario' + currentScenarioItem + 'AuthTab1" href="#scenario' + currentScenarioItem + 'AuthTab1" aria-expanded="true"><span class="tag tag-pill tag-glow tag-default tag-success" id="scenario' + currentScenarioItem + 'AuthTagPill1"></span> Authentication</a></li><li class="nav-item"> <a class="nav-link" id="scenario' + currentScenarioItem + '-headers-tab1" data-toggle="tab" aria-controls="scenario' + currentScenarioItem + 'HeadersTab1" href="#scenario' + currentScenarioItem + 'HeadersTab1" aria-expanded="true"><span class="tag tag-pill tag-glow tag-default tag-success" id="scenario' + currentScenarioItem + 'HeadersTagPill1"></span> Headers</a></li><li class="nav-item"> <a class="nav-link" id="scenario' + currentScenarioItem + '-body-tab1" data-toggle="tab" aria-controls="scenario' + currentScenarioItem + 'BodyTab1" href="#scenario' + currentScenarioItem + 'BodyTab1" aria-expanded="true"><span class="tag tag-pill tag-glow tag-default tag-success" id="scenario' + currentScenarioItem + 'BodyTagPill1"></span> Body</a></li></ul><div class="tab-content px-1 pt-1"><div role="tabpanel" class="tab-pane" id="scenario' + currentScenarioItem + 'AuthTab1" aria-expanded="true" aria-labelledby="scenario' + currentScenarioItem + '-auth-tab1"><div class="row"><div class="col-md-3"><div class="form-group"> <label for="authMode1" class="wizard-label"> Method : </label> <select class="c-select form-control auth-mode-select" id="scenario' + currentScenarioItem + 'AuthMode1" name="scenario' + currentScenarioItem + 'AuthMode1" aria-required="false" data-scenario="' + currentScenarioItem + '" data-item="1"><option value="noAuth" selected="selected">No Auth</option><option value="basicAuth">Basic Auth</option> </select></div></div><div class="col-md-9"> <span id="scenario' + currentScenarioItem + 'AuthDetails1" style="display:none;"><div class="row"><div class="col-md-6"><div class="form-group"> <label for="scenario' + currentScenarioItem + 'AuthUserName1" class="wizard-label"> User Name : </label> <input type="text" class="form-control" id="scenario' + currentScenarioItem + 'AuthUserName1" name="scenario' + currentScenarioItem + 'AuthUserName1"></div></div><div class="col-md-6"><div class="form-group"> <label for="scenario' + currentScenarioItem + 'AuthPassword1" class="wizard-label"> Password : </label> <input type="password" class="form-control" id="scenario' + currentScenarioItem + 'AuthPassword1" name="scenario' + currentScenarioItem + 'AuthPassword1"></div></div></div> </span></div></div></div><div class="tab-pane" id="scenario' + currentScenarioItem + 'HeadersTab1" aria-labelledby="scenario' + currentScenarioItem + '-headers-tab2"><div class="row" id="scenario' + currentScenarioItem + 'HeadersHolder1"><div class="col-md-5"><div class="form-group"> <input type="text" class="form-control" id="scenario' + currentScenarioItem + 'HeaderModeKey1" name="scenario' + currentScenarioItem + 'HeaderModeKey1" placeholder="eg:- Content-Type"></div></div><div class="col-md-5"><div class="form-group"> <input type="text" class="form-control" id="scenario' + currentScenarioItem + 'HeaderModeValue1" name="scenario' + currentScenarioItem + 'HeaderModeValue1" placeholder="eg:- application/json"></div></div><div class="col-md-2"><div class="form-group"><input type="button" class="btn btn-success add-header-values" id="scenario' + currentScenarioItem + 'AddKeyValueHeader1" name="scenario' + currentScenarioItem + 'AddKeyValueHeader1" value="Add" data-scenario="' + currentScenarioItem + '" data-item="1"/> <input type="hidden" class="scenario-header-value-items" id="scenario' + currentScenarioItem + 'header1ValueItems" name="scenario' + currentScenarioItem + 'header1ValueItems" value="1" /></div></div></div></div><div class="tab-pane" id="scenario' + currentScenarioItem + 'BodyTab1" aria-labelledby="scenario' + currentScenarioItem + '-body-tab3"><div class="row"><div class="col-md-6"><div class="form-group"> <label for="scenario' + currentScenarioItem + 'BodyRaw1" class="wizard-label">Raw :</label><textarea name="scenario' + currentScenarioItem + 'BodyRaw1" id="scenario' + currentScenarioItem + 'BodyRaw1" rows="6" class="form-control" placeholder="eg:- {&#10;\'username\': \'{{ username }}\'&#10;}"></textarea></div></div><div class="col-md-6"><div class="form-group" class="wizard-label"> <label for="scenario' + currentScenarioItem + 'BodyCapture1" class="wizard-label">Capture : <span class="btn-pure success" data-wstooltip="Use this to capture values from the response body of a request and store those in variables."><i class="icon-info"></i></span> </label><textarea name="scenario' + currentScenarioItem + 'BodyCapture1" id="scenario' + currentScenarioItem + 'BodyCapture1" rows="6" class="form-control" placeholder="eg:- [{&#10;\'json\': \'$.results[0].id\',&#10;\'as\': \'id\'&#10;}]"></textarea></div></div></div></div></div></div></div></div></div></div></div></div>';
        //console.info('last child = ', $( "#remove-button" + (currentScenarioItem - 1)).html());
        $("#remove-scenario-button" + (currentScenarioItem - 1)).html('');
        $('#scenarioList').append(html).children(':last').hide().fadeIn(500);
    });

    //Scenario repeater remove button click
    $(document.body).on('click', '.remove-scenario-button', function () {
        var currentScenario = $(this).data('scenario');
        console.info('parent = ', $(this).closest(".wizard-row"));
        //$(this).closest(".wizard-row").remove();
        $('#scenario' + currentScenario + 'heading1').remove();
        $('#scenario' + currentScenario + 'accordion1').remove();

        currentScenarioItem = $('#scenarioItems').val();
        //console.info('last child = ', $( "#remove-button" + (currentScenarioItem - 1)).html());
        $("#remove-scenario-button" + (currentScenarioItem - 1)).html('<button type="button" class="btn btn-icon btn-danger remove-scenario-button pull-right" data-scenario="' + (currentScenarioItem - 1) + '"><i class="icon-trash4"></i></button>');

        --currentScenarioItem;
        $('#scenarioItems').val(currentScenarioItem);
    });


    //Request URL repeater add button click
    $(document.body).on('click', '.scenario-request-url', function () {
        var self = $(this);

        //Find Wrapper div
        var requestItems = $(this).parent().find(".scenario-request-items");
        var currentRequestItems = $(requestItems).val();
        var currentItem = $(requestItems).val();

        currentRequestItems++;
        $(requestItems).val(currentRequestItems);
        var currentScenario = $(this).data('scenario');

        var prevDeleteItem = $('#scenario' + currentScenario + 'removeItem' + (currentRequestItems - 1));
        if ($(prevDeleteItem)) {
            $(prevDeleteItem).html('');
        }
        $('#scenario' + currentScenario + 'RequestCount').html(currentRequestItems);
        var scenarioRequsthtml = $('<div id="scenario' + currentScenario + 'flowRequestUrl' + currentRequestItems + '"></div>');
        var requestHtml = '<div class="row card-block wizard-card-block"><div class="col-md-2"><div class="form-group"> <label for="scenario' + currentScenario + 'RequestMethod' + currentRequestItems + '" class="wizard-label"> Method : <span class="btn-pure success" data-wstooltip="Request method."><i class="icon-info"></i></span> </label> <select class="c-select form-control" id="scenario' + currentScenario + 'RequestMethod' + currentRequestItems + '" name="scenario' + currentScenario + 'RequestMethod' + currentRequestItems + '" aria-required="false"><option value="GET" selected="selected">GET</option><option value="POST">POST</option><option value="PUT">PUT</option><option value="DELETE">DELETE</option> </select></div></div><div class="col-md-7"><div class="form-group"> <label for="scenario' + currentScenario + 'RequestUrl' + currentRequestItems + '" class="wizard-label">Request URL : <span class="danger">*</span> <span class="btn-pure success" data-wstooltip="Exclude base url. {{id}} can be included if specified in payload fields."><i class="icon-info"></i></span> </label> <input type="text" class="form-control required" id="scenario' + currentScenario + 'RequestUrl' + currentRequestItems + '" name="scenario' + currentScenario + 'RequestUrl' + currentRequestItems + '" placeholder="eg:- /rest/api/v1/user/{{ id }}"></div></div><div class="col-md-2"><div class="form-group"> <label for="scenario' + currentScenario + 'RequestPause' + currentRequestItems + '" class="wizard-label"> Pause : <span class="btn-pure success" data-wstooltip="Pause between request url."><i class="icon-info"></i></span> </label> <input type="text" class="form-control" id="scenario' + currentScenario + 'RequestPause' + currentRequestItems + '" name="scenario' + currentScenario + 'RequestPause' + currentRequestItems + '"></div></div><div class="col-md-1"><div class="form-group" id="scenario' + currentScenario + 'removeItem' + currentRequestItems + '"> <label class="wizard-label"> &nbsp; </label><br/> <button type="button" class="btn btn-icon btn-danger remove-request-button" data-scenario="' + currentScenario + '" data-item="' + currentRequestItems + '" data-totalitems="#scenario' + currentScenario + 'requestItems"><i class="icon-trash4"></i></button></div></div></div>';
        var authHtml = '<div class="row card-block wizard-card-block mb-1"><div class="col-md-12"><ul class="nav nav-tabs"><li class="nav-item"> <a class="nav-link" id="scenario' + currentScenario + '-auth-tab' + currentRequestItems + '" data-toggle="tab" aria-controls="scenario' + currentScenario + 'AuthTab' + currentRequestItems + '" href="#scenario' + currentScenario + 'AuthTab' + currentRequestItems + '" aria-expanded="true"><span class="tag tag-pill tag-glow tag-default tag-success" id="scenario' + currentScenario + 'AuthTagPill' + currentRequestItems + '"></span> Authentication</a></li><li class="nav-item"> <a class="nav-link" id="scenario' + currentScenario + '-headers-tab' + currentRequestItems + '" data-toggle="tab" aria-controls="scenario' + currentScenario + 'HeadersTab' + currentRequestItems + '" href="#scenario' + currentScenario + 'HeadersTab' + currentRequestItems + '" aria-expanded="true"><span class="tag tag-pill tag-glow tag-default tag-success" id="scenario' + currentScenario + 'HeadersTagPill' + currentRequestItems + '"></span> Headers</a></li><li class="nav-item"> <a class="nav-link" id="scenario' + currentScenario + '-body-tab' + currentRequestItems + '" data-toggle="tab" aria-controls="scenario' + currentScenario + 'BodyTab' + currentRequestItems + '" href="#scenario' + currentScenario + 'BodyTab' + currentRequestItems + '" aria-expanded="true"><span class="tag tag-pill tag-glow tag-default tag-success" id="scenario' + currentScenario + 'BodyTagPill' + currentRequestItems + '"></span> Body</a></li></ul><div class="tab-content px-1 pt-1"><div role="tabpanel" class="tab-pane" id="scenario' + currentScenario + 'AuthTab' + currentRequestItems + '" aria-expanded="true" aria-labelledby="scenario' + currentScenario + '-auth-tab' + currentRequestItems + '"><div class="row"><div class="col-md-3"><div class="form-group"> <label for="authMode1" class="wizard-label"> Method : </label> <select class="c-select form-control auth-mode-select" id="scenario' + currentScenario + 'AuthMode' + currentRequestItems + '" name="scenario' + currentScenario + 'AuthMode' + currentRequestItems + '" aria-required="false" data-scenario="' + currentScenario + '" data-item="' + currentRequestItems + '"><option value="noAuth" selected="selected">No Auth</option><option value="basicAuth">Basic Auth</option> </select></div></div><div class="col-md-9"> <span id="scenario' + currentScenario + 'AuthDetails' + currentRequestItems + '" style="display:none;"><div class="row"><div class="col-md-6"><div class="form-group"> <label for="scenario' + currentScenario + 'AuthUserName' + currentRequestItems + '" class="wizard-label"> User Name : </label> <input type="text" class="form-control" id="scenario' + currentScenario + 'AuthUserName' + currentRequestItems + '" name="scenario' + currentScenario + 'AuthUserName' + currentRequestItems + '"></div></div><div class="col-md-6"><div class="form-group"> <label for="scenario' + currentScenario + 'AuthPassword' + currentRequestItems + '" class="wizard-label"> Password : </label> <input type="password" class="form-control" id="scenario' + currentScenario + 'AuthPassword' + currentRequestItems + '" name="scenario' + currentScenario + 'AuthPassword' + currentRequestItems + '"></div></div></div> </span></div></div></div><div class="tab-pane" id="scenario' + currentScenario + 'HeadersTab' + currentRequestItems + '" aria-labelledby="scenario' + currentScenario + '-headers-tab' + currentRequestItems + '"><div class="row" id="scenario' + currentScenario + 'HeadersHolder' + currentRequestItems + '"><div class="col-md-5"><div class="form-group"> <input type="text" class="form-control" id="scenario' + currentScenario + 'HeaderModeKey' + currentRequestItems + '" name="scenario' + currentScenario + 'HeaderModeKey' + currentRequestItems + '"  placeholder="eg:- Content-Type"></div></div><div class="col-md-5"><div class="form-group"> <input type="text" class="form-control" id="scenario' + currentScenario + 'HeaderModeValue' + currentRequestItems + '" name="scenario' + currentScenario + 'HeaderModeValue' + currentRequestItems + '" placeholder="eg:- application/json"></div></div><div class="col-md-2"><div class="form-group"><input type="button" class="btn btn-success add-header-values" id="scenario' + currentScenario + 'AddKeyValueHeader'+ currentRequestItems + '" name="scenario' + currentScenario + 'AddKeyValueHeader' + currentRequestItems + '" value="Add" data-scenario="' + currentScenario + '" data-item="' + currentRequestItems + '"/> <input type="hidden" class="scenario-header-value-items" id="scenario' + currentScenario + 'header' + currentRequestItems + 'ValueItems" name="scenario' + currentScenario + 'header' + currentRequestItems + 'ValueItems" value="1" /></div></div></div></div><div class="tab-pane" id="scenario' + currentScenario + 'BodyTab' + currentRequestItems + '" aria-labelledby="scenario' + currentScenario + '-body-tab' + currentRequestItems + '"><div class="row"><div class="col-md-6"><div class="form-group"> <label for="scenario' + currentScenario + 'BodyRaw' + currentRequestItems + '" class="wizard-label">Raw :</label><textarea name="scenario' + currentScenario + 'BodyRaw' + currentRequestItems + '" id="scenario' + currentScenario + 'BodyRaw' + currentRequestItems + '" rows="6" class="form-control" placeholder="eg:- {&#10;\'username\': \'{{ username }}\'&#10;}"></textarea></div></div><div class="col-md-6"><div class="form-group" class="wizard-label"> <label for="scenario' + currentScenario + 'BodyCapture' + currentRequestItems + '" class="wizard-label">Capture : <span class="btn-pure success" data-wstooltip="Use this to capture values from the response body of a request and store those in variables."><i class="icon-info"></i></span> </label><textarea name="scenario' + currentScenario + 'BodyCapture' + currentRequestItems + '" id="scenario' + currentScenario + 'BodyCapture' + currentRequestItems + '" rows="6" class="form-control" placeholder="eg:- [{&#10;\'json\': \'$.results[0].id\',&#10;\'as\': \'id\'&#10;}]"></textarea></div></div></div></div></div></div></div>';
        scenarioRequsthtml.append(requestHtml);
        scenarioRequsthtml.append(authHtml);
        $('#scenario' + currentScenario + '-flowWrapper').append(scenarioRequsthtml).children(':last').hide().fadeIn(500);
    });

    $(document.body).on('click', '.remove-request-button', function () {
        var currentScenario = $(this).data('scenario');
        var currentItem = $(this).data('item');
        var currentRequestItems = (currentItem - 1);
        var prevDeleteItem = $('#scenario' + currentScenario + 'removeItem' + currentRequestItems);
        var prevDeleteItemObj = '<label class="wizard-label"> &nbsp; </label><br/> <button type="button" class="btn btn-icon btn-danger remove-request-button" data-scenario="' + currentScenario + '" data-item="' + currentRequestItems + '" data-totalitems="#scenario' + currentScenario + 'requestItems"><i class="icon-trash4"></i></button>';
        $(prevDeleteItem).html(prevDeleteItemObj);

        var scenario1requestItemsId = $(this).data('totalitems');
        var scenario1requestItems = $(scenario1requestItemsId).val();
        $('#scenario' + currentScenario + 'flowRequestUrl' + currentItem).remove();
        $(scenario1requestItemsId).val(--scenario1requestItems);
        $('#scenario' + currentScenario + 'RequestCount').html(scenario1requestItems);
    });

    $(document.body).on('click', '.add-header-values', function() {
        var currentScenario = $(this).data('scenario');
        var currentItem = $(this).data('item');

        var headerItemCountObj = $('#scenario' + currentScenario + 'header' + currentItem + 'ValueItems');
        var headerHolder = $('#scenario' + currentScenario + 'HeadersTab' + currentItem);
        var currentHeaderItems = headerItemCountObj.val();

        console.info('currentScenario = ', currentScenario);
        console.info('currentHeaderItems = ', (currentHeaderItems));
        var prevDeleteItem = $('#scenario' + currentScenario + 'RemoveHolder' + currentHeaderItems);
        console.info('prevDeleteItem = ', prevDeleteItem);

        if ($(prevDeleteItem)) {
            $(prevDeleteItem).html('');
        }

        currentHeaderItems++;

        console.info('headerItemCountObj = ', headerItemCountObj.val());
        headerItemCountObj.val(currentHeaderItems);
        var html = '<div class="row" id="scenario' + currentScenario + 'HeadersHolder' + currentHeaderItems + '"><div class="col-md-5"><div class="form-group"> <input type="text" class="form-control" id="scenario' + currentScenario + 'HeaderModeKey' + currentHeaderItems + '" name="scenario' + currentScenario + 'HeaderModeKey' + currentHeaderItems + '" placeholder="eg:- Content-Type"></div></div><div class="col-md-5"><div class="form-group"> <input type="text" class="form-control" id="scenario' + currentScenario + 'HeaderModeValue' + currentHeaderItems + '" name="scenario' + currentScenario + 'HeaderModeValue' + currentHeaderItems + '" placeholder="eg:- application/json"></div></div><div class="col-md-2"><div class="form-group" id="scenario' + currentScenario + 'RemoveHolder' + currentHeaderItems + '"><button type="button" class="btn btn-icon btn-danger remove-header-value-items" data-scenario="' + currentScenario + '" data-item="' + currentHeaderItems + '" data-totalitems="#scenario' + currentScenario + 'header' + currentHeaderItems + 'ValueItems" data-requestitem="' + currentItem +'"><i class="icon-trash4"></i></button></div></div></div>';
        headerHolder.append(html).children(':last').hide().fadeIn(500);
    });

    $(document.body).on('click', '.remove-header-value-items', function() {
        var currentScenario = $(this).data('scenario');
        var currentItem = $(this).data('item');
        var totalItemsId = $(this).data('totalitems');
        var requestitem = $(this).data('requestitem');
        var headerValueItems = $('#scenario' + currentScenario + 'header' + requestitem + 'ValueItems');
        var headerValueItemsCount = $(headerValueItems).val();
        var prevHeaderValueItemsCount = --headerValueItemsCount;

        var totalItems = $(totalItemsId).val();
        console.info('currentScenario = ', currentScenario);
        console.info('currentItem = ', currentItem);
        console.info('totalItemsId = ', totalItemsId);
        console.info('totalItems = ', totalItems);
        var html = '<button type="button" class="btn btn-icon btn-danger remove-header-value-items" data-scenario="' + currentScenario + '" data-item="' + currentItem + '" data-totalitems="#scenario' + currentScenario + 'header' + currentItem + 'ValueItems" data-requestitem="' + requestitem + '"><i class="icon-trash4"></i></button>';
        var headerItemObj = $('#scenario' + currentScenario + 'header' + currentItem + 'ValueItems');
        //$('#scenario' + currentScenario + 'HeadersHolder' + currentItem).remove();
        $(this).parent().parent().parent().remove();
        $(headerValueItems).val(prevHeaderValueItemsCount);
        var prevDeleteItem = $('#scenario' + currentScenario + 'RemoveHolder' + prevHeaderValueItemsCount);
        $(prevDeleteItem).html(html);
        //var headersHolder = $(this).parent().parent().parent().parent();
        //var totalItems = $(headersHolder).find('.scenario-header-value-items');
        //console.info('totalItems after = ', totalItems);
        //$(totalItemsId).val(--totalItems);

    });

    //Auth Mode select
    $(document.body).on('change', '.auth-mode-select', function() {
        var currentScenario = $(this).data('scenario');
        var currentItem = $(this).data('item');

        console.info('$(this).val() = ', $(this).val());

        if ($(this).val() == 'basicAuth') {
            $('#scenario' + currentScenario + 'AuthDetails' + currentItem).css("display", "block").children(':last').hide().fadeIn(500);
        } else {
            $('#scenario' + currentScenario + 'AuthDetails' + currentItem).css("display", "none");
        }
    });

    /*$(document.body).on('change', '.request-method-select', function() {
        var currentScenario = $(this).data('scenario');
        var currentItem = $(this).data('item');

        console.info('$(this).val() = ', $(this).val());

        if ($(this).val() == 'GET') {
            $('#scenario' + currentScenario + '-body-tab' + currentItem).addClass( "disabled" );
        } else {
            $('#scenario' + currentScenario + '-body-tab' + currentItem).removeClass( "disabled" );
        }

    });*/
});