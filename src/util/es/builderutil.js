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
                    environment: { type: "string" },
                    test_id: { type: "string" },
                    test_execution_id : { type: "string" },
                    execution_time : {type: "date", format: "yyyyMMdd'T'HHmmssZ"},
                    version : { type: "float" },
                    group: { type: "boolean" },
                    file_name: { type: "string" },
                    t: { type: "long" },
                    lt: { type: "string" },
                    ts : {type:   "date", format: "epoch_millis"},
                    s: { type: "boolean"},
                    lb: { type: "string" },
                    rc: { type: "long" },
                    rm: { type: "string" },
                    tn: { type: "string" },
                    dt: { type: "string" },
                    by: {type : "long"},
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
                    status: { type: "boolean", index : "not_analyzed" }
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
                    test_execution_id : { type: "string" },
                    test_type: { type: "string" },
                    execution_time : {type: "date", format: "yyyyMMdd'T'HHmmssZ"},
                    version : { type: "float" },
                    group: { type: "boolean" },
                    file_name: { type: "string" },
                    t: { type: "long" },
                    lt: { type: "string" },
                    ts : {type:   "date", format: "epoch_millis"},
                    s: { type: "boolean"},
                    lb: { type: "string" },
                    rc: { type: "long" },
                    rm: { type: "string" },
                    tn: { type: "string" },
                    dt: { type: "string" },
                    by: {type : "long"},
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
                    status: { type: "boolean", index : "not_analyzed" }
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
                    test_execution_id : { type: "string" },
                    test_type: { type: "string" },
                    execution_time : {type: "date", format: "yyyyMMdd'T'HHmmssZ"},
                    version : { type: "float" },
                    group: { type: "boolean" },
                    file_name: { type: "string" },
                    t: { type: "long" },
                    lt: { type: "string" },
                    ts : {type:   "date", format: "epoch_millis"},
                    s: { type: "boolean"},
                    lb: { type: "string" },
                    rc: { type: "long" },
                    rm: { type: "string" },
                    tn: { type: "string" },
                    dt: { type: "string" },
                    by: {type : "long"},
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
                    status: { type: "boolean", index : "not_analyzed" }
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
                    test_execution_id : { type: "string" },
                    test_type: { type: "string" },
                    execution_time : {type: "date", format: "yyyyMMdd'T'HHmmssZ"},
                    version : { type: "float" },
                    group: { type: "boolean" },
                    file_name: { type: "string" },
                    t: { type: "long" },
                    lt: { type: "string" },
                    ts : {type:   "date", format: "epoch_millis"},
                    s: { type: "boolean"},
                    lb: { type: "string" },
                    rc: { type: "long" },
                    rm: { type: "string" },
                    tn: { type: "string" },
                    dt: { type: "string" },
                    by: {type : "long"},
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
                    status: { type: "boolean", index : "not_analyzed" }
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
                    test_execution_id : { type: "string" },
                    test_type: { type: "string" },
                    execution_time : {type: "date", format: "yyyyMMdd'T'HHmmssZ"},
                    version : { type: "float" },
                    group: { type: "boolean" },
                    file_name: { type: "string" },
                    t: { type: "long" },
                    lt: { type: "string" },
                    ts : {type:   "date", format: "epoch_millis"},
                    s: { type: "boolean"},
                    lb: { type: "string" },
                    rc: { type: "long" },
                    rm: { type: "string" },
                    tn: { type: "string" },
                    dt: { type: "string" },
                    by: {type : "long"},
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
                    status: { type: "boolean", index : "not_analyzed" }
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
                    test_execution_id : { type: "string" },
                    test_type: { type: "string" },
                    execution_time : {type: "date", format: "yyyyMMdd'T'HHmmssZ"},
                    version : { type: "float" },
                    group: { type: "boolean" },
                    file_name: { type: "string" },
                    t: { type: "long" },
                    lt: { type: "string" },
                    ts : {type:   "date", format: "epoch_millis"},
                    s: { type: "boolean"},
                    lb: { type: "string" },
                    rc: { type: "long" },
                    rm: { type: "string" },
                    tn: { type: "string" },
                    dt: { type: "string" },
                    by: {type : "long"},
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
                    status: { type: "boolean", index : "not_analyzed" }
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
                    test_execution_id : { type: "string" },
                    test_type: { type: "string" },
                    execution_time : {type: "date", format: "yyyyMMdd'T'HHmmssZ"},
                    version : { type: "float" },
                    group: { type: "boolean" },
                    file_name: { type: "string" },
                    t: { type: "long" },
                    lt: { type: "string" },
                    ts : {type:   "date", format: "epoch_millis"},
                    s: { type: "boolean"},
                    lb: { type: "string" },
                    rc: { type: "long" },
                    rm: { type: "string" },
                    tn: { type: "string" },
                    dt: { type: "string" },
                    by: {type : "long"},
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
                    status: { type: "boolean", index : "not_analyzed" }
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
                    execution_time : {type: "date", format: "yyyyMMdd'T'HHmmssZ"},
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