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

    //Error Response Message
    USER_OBJ_EMPTY_MSG : "User Object is Empty",
    USER_DUPLICATE_MSG : "Username already in use",
    USER_PASSWORD_NOT_MATCH_MSG : "Password Invalid!",

    COMPONENT_TYPE_DUPLICATE_MSG : "Duplicate Component Type",
    COMPONENT_DUPLICATE_MSG : "Component Type Component",

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

});

