/**
 * Created by senthil on 09/04/17.
 */

var constants = require('../../src/common/constants');
var Project = require('../../src/model/Project');
var Group = require('../../src/model/Group');
var Component = require('../../src/model/Component');
var Test = require('../../src/model/Test');
var TestExecution = require('../../src/model/TestExecution');
var Dashboard = require('../../src/model/Dashboard');
var DateUtil = require('./date.util');

var ModelUtil = function f(options) {
    var self = this;
};

ModelUtil.getProjectModel = function(projectJson) {
    var project = new Project({
        name: projectJson.name,
        description: projectJson.description,
        status: projectJson.status,
        groups: projectJson.groups,
        components: projectJson.components,
        createdDate: DateUtil.getCurrentDate(),
        updatedDate: DateUtil.getCurrentDate(),
        createdBy: projectJson.createdBy
    });

    return project;
};

ModelUtil.updateProjectModel = function(req, project) {

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.status  = req.body.status || project.status;
    project.groups = req.body.groups || project.groups;
    project.components = req.body.components || project.components;
    project.createdDate = req.body.createdDate || project.createdDate;
    project.updatedDate = req.body.updatedDate || project.updatedDate;
    project.createdBy = req.body.createdBy || project.createdBy;

    return project;
};

ModelUtil.getGroupModel = function(req, res, groupJson) {
    var group = new Group({
        name: groupJson.name,
        description: groupJson.description,
        order: groupJson.order,
        status: groupJson.status,
        components: groupJson.components
    });

    return group;
};

ModelUtil.getCompomentModel = function(componentJson) {

    try {
        var component = new Component({
            name: componentJson.name,
            description: componentJson.description,
            order: componentJson.order,
            status: componentJson.status,
            componentType: componentJson.componentType,
            perfLog: componentJson.perfLog,
            metricLog: componentJson.metricLog,
            networkLog: componentJson.networkLog,
            group: componentJson.group,
            project: componentJson.project
        });
    } catch(err) {
        console.info('err = ', err);
    }

    return component;
};

ModelUtil.updateComponentModelFromFields = function(fields, component) {

    if (fields.name) {
        component.name = fields.name;
    }

    if (fields.description) {
        component.description = fields.description;
    }

    if (fields.order) {
        component.order = fields.order;
    }

    if (fields.status) {
        component.status = fields.status;
    }

    if (fields.componentType) {
        component.componentType = fields.componentType;
    }

    console.info('fields.perfLog = ', fields.perfLog);
    if (fields.perfLog) {
        component.perfLog = fields.perfLog;
    }

    console.info('fields.metricLog = ', fields.metricLog);
    if (fields.metricLog) {
        component.metricLog = fields.metricLog;
    }

    console.info('fields.networkLog = ', fields.networkLog);
    if (fields.networkLog) {
        component.networkLog = fields.networkLog;
    }

    if (fields.group) {
        component.group = fields.group;
    }

    if (fields.project) {
        component.project = fields.project;
    }


    return component;
};

ModelUtil.updateComponentModel = function(req, component) {

    component.name = req.body.name || component.name;
    component.description = req.body.description || component.description;
    component.order = req.body.order || component.order;
    component.status = req.body.status || component.status;
    component.componentType = req.body.componentType || component.componentType;
    component.perfLog = req.body.perfLog || component.perfLog;
    component.metricLog = req.body.metricLog || component.metricLog;
    component.networkLog = req.body.networkLog || component.networkLog;
    component.group = req.body.group || component.group;

    return component;
};

ModelUtil.getDashboardModel = function (req, res, dashboardJson) {
    var dashboard = new Dashboard({
        dashboardId: dashboardJson.dashboardId,
        name: dashboardJson.name,
        description: dashboardJson.description,
        order: dashboardJson.order,
        status: dashboardJson.status,
        system: dashboardJson.system,
        project: dashboardJson.project,
        component: dashboardJson.component,
        dashboardType: dashboardJson.dashboardType,
        graphInstances: dashboardJson.graphInstances,
        updatedBy: dashboardJson.updatedBy
    });


    return dashboard;
};

ModelUtil.getDashboardUpdateModel = function (req, res, dashboard) {

    dashboard.dashboardId  = req.body.dashboardId || dashboard.dashboardId;
    dashboard.name = req.body.name || dashboard.name;
    dashboard.description = req.body.description || dashboard.description;
    dashboard.order  = req.body.order || dashboard.order;
    dashboard.status  = req.body.status || dashboard.status;
    dashboard.system = req.body.system || dashboard.system;
    dashboard.project = req.body.project || dashboard.project;
    dashboard.component = req.body.component || dashboard.component;
    dashboard.dashboardType = req.body.dashboardType || dashboard.dashboardType;
    dashboard.graphInstances = req.body.graphInstances || dashboard.graphInstances;
    dashboard.updatedBy = req.body.updatedBy || dashboard.updatedBy;

    return dashboard;
};

ModelUtil.getEnvironmentModel = function (req, res, envJson) {
    var test = new Test({
        name: envJson.name,
        description: envJson.description,
        protocol: envJson.protocol,
        host: envJson.host,
        port: envJson.port,
        context: envJson.context,
        order: envJson.order,
        status: testJson.status,
        project: testJson.project
    });

    return test;
};

ModelUtil.getTestModel = function (testJson) {
    var test = new Test({
        name: testJson.name,
        description: testJson.description,
        status: testJson.status,
        project: testJson.project,
        components: testJson.components,
        environment: testJson.environment,
        groups: testJson.groups,
        updatedBy: testJson.updatedBy,
        virtualUsers: testJson.virtualUsers,
        rampUpPeriod: testJson.rampUpPeriod,
        iterations: testJson.iterations,
        duration: testJson.duration,
        forever: testJson.forever,
    });

    return test;
};

ModelUtil.getTestUpdateModel = function (req, res, test) {
    test.name  = req.body.name || test.name;
    test.description  = req.body.description || test.description;
    test.status  = req.body.status || test.status;
    test.project  = req.body.project || test.project;
    test.components  = req.body.components || test.components;
    test.environment  = req.body.environment || test.environment;
    test.groups  = req.body.groups || test.groups;
    test.updatedBy  = req.body.updatedBy || test.updatedBy;
    test.virtualUsers = req.body.virtualUsers || test.virtualUsers;
    test.rampUpPeriod = req.body.rampUpPeriod || test.rampUpPeriodl;
    test.iterations = req.body.iterations || test.iterations;
    test.duration = req.body.duration || test.duration;
    test.forever = req.body.forever || test.forever;

    return test;
};

ModelUtil.getTestExecutionModel = function (testExecutionJson) {
    var testExecution = new TestExecution({
        name: testExecutionJson.name,
        description: testExecutionJson.description,
        test: testExecutionJson.test,
        project: testExecutionJson.project,
        executedBy: testExecutionJson.executedBy,
        resultStatus: testExecutionJson.resultStatus,
        timeTaken: testExecutionJson.timeTaken,
        executedComponents: testExecutionJson.executedComponents
    });

    return testExecution;
};

ModelUtil.getTestExecutionUpdateModel = function (req, testExecution) {
    testExecution.name  = req.body.name || testExecution.name;
    testExecution.description  = req.body.description || testExecution.description;
    testExecution.test  = req.body.test || testExecution.test;
    testExecution.project  = req.body.project || testExecution.project;
    testExecution.executedBy  = req.body.executedBy || testExecution.executedBy;
    testExecution.executed  = testExecution.executed;
    testExecution.resultStatus  = req.body.resultStatus || testExecution.resultStatus;
    testExecution.timeTaken  = req.body.timeTaken || testExecution.timeTaken;
    testExecution.executedComponents  = req.body.executedComponents || testExecution.executedComponents;
    testExecution.updated  = new Date();

    return testExecution;
};

ModelUtil.getTestResultModel = function (paramObj, testResultJson, testExecution) {
    var testResult = new TestResult({
        test_execution_id : testExecution._id,
        test_id: testExecution.test._id,
        project_id: testExecution.project._id,
        component_id: paramObj.componentId,
        group_id: testResultJson.groupId,
        project_name: testResultJson.projectName,
        project_description: testResultJson.projectDescription,
        environment: testResultJson.environmentId,
        type: testResultJson.type,
        version : testResultJson.version,
        group: testResultJson.group,
        file_name: testResultJson.fileName,
        t: testResultJson.t,
        lt: testResultJson.lt,
        ts : testResultJson.ts,
        s: testResultJson.s,
        lb: testResultJson.lb,
        rc: testResultJson.rc,
        rm: testResultJson.rm,
        tn: testResultJson.tn,
        dt: testResultJson.dt,
        by: testResultJson.by,
        start_time: testResultJson.startTime,
        end_time: testResultJson.endTime,
        property : {
            xs : testResultJson.property.xs,
            name : testResultJson.property.name
        },
        assertion_result : {
            fm : testResultJson.assertionResult.fm,
            error: testResultJson.assertionResult.error,
            failure: testResultJson.assertionResult.failure
        },
        status: { type: Boolean},
    });

    return testExecution;
};

module.exports = ModelUtil;
