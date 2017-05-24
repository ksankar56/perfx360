/**
 * Created by senthil on 23/05/17.
 */


$(document).ready(function() {
    var currentItem = 1;
    $(document.body).on('click', '#addPhase', function () {
        currentItem = $('#phaseItems').val();
        currentItem++;
        $('#phaseItems').val(currentItem);
        var html = '<div class="row wizard-row"><div class="col-md-3"><div class="form-group"> <input type="text" class="form-control" id="configName' + currentItem + '" name="configName' + currentItem + '"></div></div><div class="col-md-2"><div class="form-group"> <input type="text" class="form-control" id="duration' + currentItem + '" name="duration' + currentItem + '"></div></div><div class="col-md-2"><div class="form-group"> <input type="text" class="form-control" id="arrivalRate' + currentItem + '" name="arrivalRate' + currentItem + '"></div></div><div class="col-md-2"><div class="form-group"> <input type="text" class="form-control" id="rampTo' + currentItem + '" name="rampTo' + currentItem + '"></div></div><div class="col-md-3"><div class="form-group" id="remove-button' + currentItem + '"> <button type="button" class="btn btn-icon btn-danger remove-button"><i class="icon-trash4"></i></button></div></div></div>';
        console.info('last child = ', $( "#remove-button" + (currentItem - 1)).html());
        $( "#remove-button" + (currentItem - 1)).html('');
        $('#phases').append(html);
    });

    $(document.body).on('click', '.remove-button', function() {
        console.info('parent = ', $(this).closest( ".wizard-row"));
        $(this).closest( ".wizard-row").remove();
        currentItem = $('#phaseItems').val();
        console.info('last child = ', $( "#remove-button" + (currentItem - 1)).html());
        $( "#remove-button" + (currentItem - 1)).html('<button type="button" class="btn btn-icon btn-danger remove-button"><i class="icon-trash4"></i></button>');

        --currentItem;
        $('#phaseItems').val(currentItem);
    });

    var currentPayloadItem = 1;
    $(document.body).on('click', '#addPayload', function () {
        currentPayloadItem = $('#payloadItems').val();
        currentPayloadItem++;
        $('#payloadItems').val(currentPayloadItem);
        var html = '<div class="row wizard-row"><div class="col-md-3"><div class="form-group"> <input type="file" class="c-select form-control" id="file' + currentPayloadItem + '" name="file' + currentPayloadItem + '"></div></div><div class="col-md-3"><div class="form-group"> <input type="text" class="form-control" id="fieldsfile' + currentPayloadItem + '" name="fieldsfile' + currentPayloadItem + '" placeholder="eg:- username, password"></div></div><div class="col-md-3"><div class="form-group"> <select class="c-select form-control" id="order' + currentPayloadItem + '" name="order' + currentPayloadItem + '" aria-required="false"><option value="random" selected="selected">Random</option><option value="sequence">Sequence</option> </select></div></div><div class="col-md-3"><div class="form-group" id="remove-payload-button' + currentPayloadItem + '"> <button type="button" class="btn btn-icon btn-danger remove-payload-button"><i class="icon-trash4"></i></button></div></div></div>';
        console.info('last child = ', $( "#remove-button" + (currentPayloadItem - 1)).html());
        $( "#remove-payload-button" + (currentPayloadItem - 1)).html('');
        $('#payloads').append(html);
    });

    $(document.body).on('click', '.remove-payload-button', function() {
        console.info('parent = ', $(this).closest( ".wizard-row"));
        $(this).closest( ".wizard-row").remove();
        currentPayloadItem = $('#payloadItems').val();
        console.info('last child = ', $( "#remove-button" + (currentPayloadItem - 1)).html());
        $( "#remove-payload-button" + (currentPayloadItem - 1)).html('<button type="button" class="btn btn-icon btn-danger remove-payload-button"><i class="icon-trash4"></i></button>');

        --currentPayloadItem;
        $('#payloadItems').val(currentPayloadItem);
    });
});