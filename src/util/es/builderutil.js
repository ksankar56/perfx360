/**
 * Created by senthil on 05/04/17.
 */

'use strict';

var bodybuilder = require('bodybuilder');
var options;

// Constructor builderutil
var builderutil = function f(options) {
    var self = this;
    self.options = options;
};

builderutil.constructIndex = function(req) {
    var constructIndex = { index: global.config.elasticSearch.perfx360Index };
    return constructIndex;
};

//TODO : have to rework using builder
builderutil.constructMappings = function(req) {
    var body = {
        mappings: {
            REST_JSON: {
                properties: {
                    project_id: { type: "string"},
                    component_id: { type: "string" },
                    group_id: { type: "string" },
                    project_name: { type: "string" },
                    project_description: { type: "string" },
                    environment_id: { type: "string" },
                    environment_name: { type: "string" },
                    test_id: { type: "string" },
                    test_name: { type: "string" },
                    test_execution_id : { type: "string" },
                    execution_time : { type: "integer" },
                    version : { type: "float" },
                    group: { type: "boolean" },
                    file_name: { type: "string" },
                    t: { type: "integer" },
                    it: { type: "integer" },
                    lt: { type: "string" },
                    ct: { type: "integer" },
                    ts : {type:   "string"},
                    s: { type: "boolean"},
                    lb: { type: "string" },
                    rc: { type: "integer" },
                    rm: { type: "string" },
                    tn: { type: "string" },
                    dt: { type: "string" },
                    de: { type: "string" },
                    by: {type : "long"},
                    sby: {type : "long"},
                    sc: { type: "integer" },
                    ec: { type: "integer" },
                    ng: { type: "integer" },
                    na: { type: "integer" },
                    hn: { type: "string" },
                    requestHeader : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "binary", index : "no"}
                        }
                    },
                    responseData : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "binary", index : "no"}
                        }
                    },
                    responseFile : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    cookies : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    method : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "string", index : "not_analyzed"}
                        }
                    },
                    queryString : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    redirectLocation : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "string", index : "not_analyzed"}
                        }
                    },
                    url: { type: "string" },
                    start_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
                    end_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
                    property : {
                        type : "object",
                        properties : {
                            xs : {type : "string", index : "not_analyzed"},
                            name : {type : "string", index : "not_analyzed"}
                        }
                    },
                    assertion_result : {
                        type : "object",
                        properties : {
                            fm : {type : "string", index : "not_analyzed"},
                            error : {type : "boolean", index : "not_analyzed"},
                            failure : {type : "boolean", index : "not_analyzed"}
                        }
                    },
                    binary: { type: "string" }
                }
            },
            REST_XML: {
                properties: {
                    project_id: { type: "string"},
                    component_id: { type: "string" },
                    group_id: { type: "string" },
                    project_name: { type: "string" },
                    project_description: { type: "string" },
                    environment: { type: "string" },
                    test_id: { type: "string" },
                    test_name: { type: "string" },
                    test_execution_id : { type: "string" },
                    execution_time : { type: "integer" },
                    version : { type: "float" },
                    group: { type: "boolean" },
                    file_name: { type: "string" },
                    t: { type: "integer" },
                    it: { type: "integer" },
                    lt: { type: "string" },
                    ct: { type: "integer" },
                    ts : {type:   "string"},
                    s: { type: "boolean"},
                    lb: { type: "string" },
                    rc: { type: "integer" },
                    rm: { type: "string" },
                    tn: { type: "string" },
                    dt: { type: "string" },
                    de: { type: "string" },
                    by: {type : "long"},
                    sby: {type : "long"},
                    sc: { type: "integer" },
                    ec: { type: "integer" },
                    ng: { type: "integer" },
                    na: { type: "integer" },
                    hn: { type: "string" },
                    requestHeader : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "binary", index : "no"}
                        }
                    },
                    responseData : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "binary", index : "no"}
                        }
                    },
                    responseFile : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    cookies : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    method : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "string", index : "not_analyzed"}
                        }
                    },
                    queryString : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    redirectLocation : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "string", index : "not_analyzed"}
                        }
                    },
                    url: { type: "string" },
                    start_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
                    end_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
                    property : {
                        type : "object",
                        properties : {
                            xs : {type : "string", index : "not_analyzed"},
                            name : {type : "string", index : "not_analyzed"}
                        }
                    },
                    assertion_result : {
                        type : "object",
                        properties : {
                            fm : {type : "string", index : "not_analyzed"},
                            error : {type : "boolean", index : "not_analyzed"},
                            failure : {type : "boolean", index : "not_analyzed"}
                        }
                    },
                    binary: { type: "string" }
                }
            },
            SOAP: {
                properties: {
                    project_id: { type: "string"},
                    component_id: { type: "string" },
                    group_id: { type: "string" },
                    project_name: { type: "string" },
                    project_description: { type: "string" },
                    environment: { type: "string" },
                    test_id: { type: "string" },
                    test_name: { type: "string" },
                    test_execution_id : { type: "string" },
                    execution_time : { type: "integer" },
                    version : { type: "float" },
                    group: { type: "boolean" },
                    file_name: { type: "string" },
                    t: { type: "integer" },
                    it: { type: "integer" },
                    lt: { type: "string" },
                    ct: { type: "integer" },
                    ts : {type:   "string"},
                    s: { type: "boolean"},
                    lb: { type: "string" },
                    rc: { type: "integer" },
                    rm: { type: "string" },
                    tn: { type: "string" },
                    dt: { type: "string" },
                    de: { type: "string" },
                    by: {type : "long"},
                    sby: {type : "long"},
                    sc: { type: "integer" },
                    ec: { type: "integer" },
                    ng: { type: "integer" },
                    na: { type: "integer" },
                    hn: { type: "string" },
                    requestHeader : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "binary", index : "no"}
                        }
                    },
                    responseData : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "binary", index : "no"}
                        }
                    },
                    responseFile : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    cookies : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    method : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "string", index : "not_analyzed"}
                        }
                    },
                    queryString : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    redirectLocation : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "string", index : "not_analyzed"}
                        }
                    },
                    url: { type: "string" },
                    start_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
                    end_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
                    property : {
                        type : "object",
                        properties : {
                            xs : {type : "string", index : "not_analyzed"},
                            name : {type : "string", index : "not_analyzed"}
                        }
                    },
                    assertion_result : {
                        type : "object",
                        properties : {
                            fm : {type : "string", index : "not_analyzed"},
                            error : {type : "boolean", index : "not_analyzed"},
                            failure : {type : "boolean", index : "not_analyzed"}
                        }
                    },
                    binary: { type: "string" }
                }
            },
            WEBUI: {
                properties: {
                    project_id: { type: "string"},
                    component_id: { type: "string" },
                    group_id: { type: "string" },
                    project_name: { type: "string" },
                    project_description: { type: "string" },
                    environment: { type: "string" },
                    test_id: { type: "string" },
                    test_name: { type: "string" },
                    test_execution_id : { type: "string" },
                    execution_time : { type: "integer" },
                    version : { type: "float" },
                    group: { type: "boolean" },
                    file_name: { type: "string" },
                    t: { type: "integer" },
                    it: { type: "integer" },
                    lt: { type: "string" },
                    ct: { type: "integer" },
                    ts : {type:   "string"},
                    s: { type: "boolean"},
                    lb: { type: "string" },
                    rc: { type: "integer" },
                    rm: { type: "string" },
                    tn: { type: "string" },
                    dt: { type: "string" },
                    de: { type: "string" },
                    by: {type : "long"},
                    sby: {type : "long"},
                    sc: { type: "integer" },
                    ec: { type: "integer" },
                    ng: { type: "integer" },
                    na: { type: "integer" },
                    hn: { type: "string" },
                    requestHeader : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "binary", index : "no"}
                        }
                    },
                    responseData : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "binary", index : "no"}
                        }
                    },
                    responseFile : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    cookies : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    method : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "string", index : "not_analyzed"}
                        }
                    },
                    queryString : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    redirectLocation : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "string", index : "not_analyzed"}
                        }
                    },
                    url: { type: "string" },
                    start_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
                    end_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
                    property : {
                        type : "object",
                        properties : {
                            xs : {type : "string", index : "not_analyzed"},
                            name : {type : "string", index : "not_analyzed"}
                        }
                    },
                    assertion_result : {
                        type : "object",
                        properties : {
                            fm : {type : "string", index : "not_analyzed"},
                            error : {type : "boolean", index : "not_analyzed"},
                            failure : {type : "boolean", index : "not_analyzed"}
                        }
                    },
                    binary: { type: "string" }
                }
            },
            WEBPAGE: {
                properties: {
                    project_id: { type: "string"},
                    component_id: { type: "string" },
                    group_id: { type: "string" },
                    project_name: { type: "string" },
                    project_description: { type: "string" },
                    environment: { type: "string" },
                    test_id: { type: "string" },
                    test_name: { type: "string" },
                    test_execution_id : { type: "string" },
                    execution_time : { type: "integer" },
                    version : { type: "float" },
                    group: { type: "boolean" },
                    file_name: { type: "string" },
                    t: { type: "integer" },
                    it: { type: "integer" },
                    lt: { type: "string" },
                    ct: { type: "integer" },
                    ts : {type:   "string"},
                    s: { type: "boolean"},
                    lb: { type: "string" },
                    rc: { type: "integer" },
                    rm: { type: "string" },
                    tn: { type: "string" },
                    dt: { type: "string" },
                    de: { type: "string" },
                    by: {type : "long"},
                    sby: {type : "long"},
                    sc: { type: "integer" },
                    ec: { type: "integer" },
                    ng: { type: "integer" },
                    na: { type: "integer" },
                    hn: { type: "string" },
                    requestHeader : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "binary", index : "no"}
                        }
                    },
                    responseData : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "binary", index : "no"}
                        }
                    },
                    responseFile : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    cookies : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    method : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "string", index : "not_analyzed"}
                        }
                    },
                    queryString : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    redirectLocation : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "string", index : "not_analyzed"}
                        }
                    },
                    url: { type: "string" },
                    start_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
                    end_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
                    property : {
                        type : "object",
                        properties : {
                            xs : {type : "string", index : "not_analyzed"},
                            name : {type : "string", index : "not_analyzed"}
                        }
                    },
                    assertion_result : {
                        type : "object",
                        properties : {
                            fm : {type : "string", index : "not_analyzed"},
                            error : {type : "boolean", index : "not_analyzed"},
                            failure : {type : "boolean", index : "not_analyzed"}
                        }
                    },
                    binary: { type: "string" }
                }
            },
            WEB_AUTOMATION: {
                properties: {
                    project_id: { type: "string"},
                    component_id: { type: "string" },
                    group_id: { type: "string" },
                    project_name: { type: "string" },
                    project_description: { type: "string" },
                    environment: { type: "string" },
                    test_id: { type: "string" },
                    test_name: { type: "string" },
                    test_execution_id : { type: "string" },
                    execution_time : { type: "integer" },
                    version : { type: "float" },
                    group: { type: "boolean" },
                    file_name: { type: "string" },
                    t: { type: "integer" },
                    it: { type: "integer" },
                    lt: { type: "string" },
                    ct: { type: "integer" },
                    ts : {type:   "string"},
                    s: { type: "boolean"},
                    lb: { type: "string" },
                    rc: { type: "integer" },
                    rm: { type: "string" },
                    tn: { type: "string" },
                    dt: { type: "string" },
                    de: { type: "string" },
                    by: {type : "long"},
                    sby: {type : "long"},
                    sc: { type: "integer" },
                    ec: { type: "integer" },
                    ng: { type: "integer" },
                    na: { type: "integer" },
                    hn: { type: "string" },
                    requestHeader : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "binary", index : "no"}
                        }
                    },
                    responseData : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "binary", index : "no"}
                        }
                    },
                    responseFile : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    cookies : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    method : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "string", index : "not_analyzed"}
                        }
                    },
                    queryString : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    redirectLocation : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "string", index : "not_analyzed"}
                        }
                    },
                    url: { type: "string" },
                    start_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
                    end_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
                    property : {
                        type : "object",
                        properties : {
                            xs : {type : "string", index : "not_analyzed"},
                            name : {type : "string", index : "not_analyzed"}
                        }
                    },
                    assertion_result : {
                        type : "object",
                        properties : {
                            fm : {type : "string", index : "not_analyzed"},
                            error : {type : "boolean", index : "not_analyzed"},
                            failure : {type : "boolean", index : "not_analyzed"}
                        }
                    },
                    binary: { type: "string" }
                }
            },
            MOBILE_AUTOMATION: {
                properties: {
                    project_id: { type: "string"},
                    component_id: { type: "string" },
                    group_id: { type: "string" },
                    project_name: { type: "string" },
                    project_description: { type: "string" },
                    environment: { type: "string" },
                    test_id: { type: "string" },
                    test_name: { type: "string" },
                    test_execution_id : { type: "string" },
                    execution_time : { type: "integer" },
                    version : { type: "float" },
                    group: { type: "boolean" },
                    file_name: { type: "string" },
                    t: { type: "integer" },
                    it: { type: "integer" },
                    lt: { type: "string" },
                    ct: { type: "integer" },
                    ts : {type:   "string"},
                    s: { type: "boolean"},
                    lb: { type: "string" },
                    rc: { type: "integer" },
                    rm: { type: "string" },
                    tn: { type: "string" },
                    dt: { type: "string" },
                    de: { type: "string" },
                    by: {type : "long"},
                    sby: {type : "long"},
                    sc: { type: "integer" },
                    ec: { type: "integer" },
                    ng: { type: "integer" },
                    na: { type: "integer" },
                    hn: { type: "string" },
                    requestHeader : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "binary", index : "no"}
                        }
                    },
                    responseData : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "binary", index : "no"}
                        }
                    },
                    responseFile : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    cookies : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    method : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "string", index : "not_analyzed"}
                        }
                    },
                    queryString : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"}
                        }
                    },
                    redirectLocation : {
                        type : "object",
                        properties : {
                            class : {type : "string", index : "not_analyzed"},
                            t : {type : "string", index : "not_analyzed"}
                        }
                    },
                    url: { type: "string" },
                    start_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
                    end_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
                    property : {
                        type : "object",
                        properties : {
                            xs : {type : "string", index : "not_analyzed"},
                            name : {type : "string", index : "not_analyzed"}
                        }
                    },
                    assertion_result : {
                        type : "object",
                        properties : {
                            fm : {type : "string", index : "not_analyzed"},
                            error : {type : "boolean", index : "not_analyzed"},
                            failure : {type : "boolean", index : "not_analyzed"}
                        }
                    },
                    binary: { type: "string" }
                }
            },
            ACCESSIBILITY: {
                properties: {
                    project_id: { type: "string"},
                    component_id: { type: "string" },
                    group_id: { type: "string" },
                    project_name: { type: "string" },
                    project_description: { type: "string" },
                    environment: { type: "string" },
                    test_id: { type: "string" },
                    test_execution_id : { type: "string" },
                    test_type: { type: "string" },
                    execution_time : { type: "integer" },
                    version : { type: "float" },
                    test_url : { type: "string" },
                    code: { type: "string" },
                    context: { type: "string" },
                    message: { type: "string" },
                    selector: { type: "string" },
                    type: { type: "string" },
                    typeCode: { type: "integer" },
                    start_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
                    end_time: {type: "date", format: "YYYY-MM-DD'T'HH:mm:ssZ"},
                    status: { type: "boolean", index : "not_analyzed" }
                }
            }
        }
    };

    return {
        index: global.config.elasticSearch.index.perfx360Index,
        body: JSON.stringify(body)
    };
};

module.exports = builderutil;