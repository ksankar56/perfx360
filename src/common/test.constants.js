/**
 * Created by senthil on 04/04/17.
 */

module.exports = Object.freeze({

    PROJECT_ID : 'projectId',
    ID : 'id',
    NAME : 'name',
    COMPONENT_TYPE : 'componentType',
    DESCRIPTION : 'description',
    PERF_LOG : 'perfLog',
    METRIC_LOG : 'metricLog',
    NETWORK_LOG : 'networkLog',

    GLOBAL_HEADER_KEY : 'headerModeKey%d',
    GLOBAL_HEADER_VALUE : 'headerModeValue%d',
    GLOBAL_HEADER_TOTAL_COUNT : 'headerValueItems',

    PHASE_TOTAL_COUNT : 'phaseItems',
    PHASE_CONFIG_NAME : 'configName%d',
    PHASE_CONFIG_DURATION : 'duration%d',
    PHASE_CONFIG_ARRIVAL_RATE : 'arrivalRate%d',
    PHASE_CONFIG_ARRIVAL_COUNT : 'arrivalCount%d',
    PHASE_CONFIG_RAMP_TO : 'rampTo%d',
    PHASE_CONFIG_PAUSE : 'pause%d',
    PHASE_CONFIG_ORDER : 'order%d',

    PAYLOAD_TOTAL_COUNT : 'payloadItems',
    PAYLOAD_FIELDS : 'fieldsfile%d',
    PAYLOAD_ORDER : 'order%d',

    SCENARIO_TOTAL_COUNT : 'scenarioItems',
    SCENARIO : 'scenario',
    SCENARIO_NAME : 'scenario%dName%d',
    SCENARIO_WEIGHT : 'scenario%dWeight%d',
    SCENARIO_REQUEST_COUNT : 'scenario%drequestItems',

    SCENARIO_REQUEST_METHOD : 'scenario%dRequestMethod%d', //GET
    SCENARIO_REQUEST_URL : 'scenario%dRequestUrl%d', // /rest/api/users

    SCENARIO_REQUEST_PAUSE : 'scenario%dRequestPause%d',
    SCENARIO_REQUEST_AUTH_MODE : 'scenario%dAuthMode%d', //basicAuth
    SCENARIO_REQUEST_AUTH_USERNAME : 'scenario%dAuthUserName%d', //user1
    SCENARIO_REQUEST_AUTH_PASSWORD : 'scenario%dAuthPassword%d', //password
    SCENARIO_REQUEST_AUTH_KEY : 'scenario%dHeaderModeKey', //Content-Type
    SCENARIO_REQUEST_AUTH_VALUE : 'scenario%dHeaderModeValue%d', //application/json
    SCENARIO_REQUEST_HEADER_TOTAL_COUNT : 'scenario%dheader%dValueItems',

    SCENARIO_HEADER_MODE_KEY : 'scenario%dHeaderModeKey%d',
    SCENARIO_HEADER_MODE_VALUE : 'scenario%dHeaderModeValue%d',

    SCENARIO_REQUEST_BODY_RAW : 'scenario%dBodyRaw%d',
    SCENARIO_REQUEST_BODY_CAPTURE : 'scenario%dBodyCapture%d',


    CONFIG_NAME : 'name',
    DURATION : 'duration',
    ARRIVAL_RATE : 'arrivalRate',
    ARRIVAL_COUNT : 'arrivalCount',
    RAMP_TO : 'rampTo',
    PAUSE : 'pause',
    SEQUENCE : 'sequence'
});

