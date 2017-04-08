/**
 * Created by senthil on 04/04/17.
 */

module.exports = Object.freeze({
    //Error Response Name
    USER_OBJ_EMPTY: "USER_OBJ_EMPTY",
    USER_DUPLICATE : "USER_DUPLICATE",
    USER_PASSWORD_NOT_MATCH : "USER_PASSWORD_NOT_MATCH",

    COMPONENT_TYPE_OBJ_EMPTY: "COMPONENT_TYPE_OBJ_EMPTY",
    COMPONENT_TYPE_DUPLICATE : "COMPONENT_TYPE_DUPLICATE",

    COMPONENT_OBJ_EMPTY: "COMPONENT_OBJ_EMPTY",
    COMPONENT_DUPLICATE : "COMPONENT_DUPLICATE",

    GRAPH_TYPE_OBJ_EMPTY: "GRAPH_TYPE_OBJ_EMPTY",
    GRAPH_TYPE_DUPLICATE : "GRAPH_TYPE_DUPLICATE",

    GRAPH_OBJ_EMPTY: "GRAPH_OBJ_EMPTY",
    GRAPH_DUPLICATE : "GRAPH_DUPLICATE",

    GRAPH_INSTANCE_OBJ_EMPTY: "GRAPH_INSTANCE_OBJ_EMPTY",
    GRAPH_INSTANCE_DUPLICATE : "GRAPH_INSTANCE_DUPLICATE",

    ENVIRONMENT_OBJ_EMPTY: "ENVIRONMENT_OBJ_EMPTY",
    ENVIRONMENT_DUPLICATE : "ENVIRONMENT_DUPLICATE",

    //Error Response Message
    USER_OBJ_EMPTY_MSG : "User Object is Empty",
    USER_DUPLICATE_MSG : "Username already in use",
    USER_PASSWORD_NOT_MATCH_MSG : "Password Invalid!",

    COMPONENT_TYPE_DUPLICATE_MSG : "Duplicate Component Type",
    COMPONENT_DUPLICATE_MSG : "Duplicate Component",

    GRAPH_TYPE_DUPLICATE_MSG : "Duplicate Graph Type",
    GRAPH_DUPLICATE_MSG : "Duplicate Graph",
    GRAPH_INSTANCE_DUPLICATE_MSG : "Duplicate Graph Instance",
    ENVIRONMENT_DUPLICATE_MSG : "Duplicate Environment",

    /* HTTP Response Codes */
    HTTP_OK: 200,
    HTTP_CREATED: 201,
    HTTP_ACCEPTED: 202,
    HTTP_NON_AUThORITATIVE: 203,
    HTTP_NO_CONTENT: 202,

    HTTP_BAD_REQUEST: 400,
    HTTP_UNAUTHORIZED: 401,
    HTTP_PAYMENT_REQUIRED: 402,
    HTTP_FORBIDDEN: 403,
    HTTP_NOT_FOUND: 404,

    /* SMS */
    SMS_URL: '' ,
    SMS_USER_NAME: '',
    SMS_SENDER: '',
    SMS_SEC_KEY: '',

    CONTENT_TYPE: 'application/json',
    METHOD_POST : 'POST',
    UPDATED_DATE: 'updated_date',

    /* JMeter Constants
     */

    JMETER_TARGET_RESULT_PATH : '/target/jmeter/results',

});

