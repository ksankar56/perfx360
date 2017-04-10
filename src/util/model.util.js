/**
 * Created by senthil on 09/04/17.
 */

var constants = require('../../src/common/constants');
var Project = require('../../src/model/Project');
var Group = require('../../src/model/Group');
var Test = require('../../src/model/Test');
var TestExecution = require('../../src/model/TestExecution');
var Dashboard = require('../../src/model/Dashboard');
var DateUtil = require('./date.util');

var ModelUtil = function f(options) {
    var self = this;
};

ModelUtil.getProjectModel = function(req, res, projectJson) {
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

ModelUtil.getCompomentModel = function(req, res, componentJson) {
    var component = new Component({
        name: componentJson.name,
        description: componentJson.description,
        order : componentJson.order,
        status : componentJson.status,
        componentType: componentJson.componentType,
        perfLog : componentJson.perfLog,
        metricLog : componentJson.metricLog,
        networkLog : componentJson.networkLog
    });

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

ModelUtil.getTestModel = function (req, res, testJson) {
    var test = new Test({
        testId: testJson.testId,
        name: testJson.name,
        description: testJson.description,
        status: testJson.status,
        project: testJson.project,
        components: testJson.components,
        environment: testJson.environment,
        groups: testJson.groups,
        updatedBy: testJson.updatedBy
    });

    return test;
};

ModelUtil.getTestUpdateModel = function (req, res, test) {
    test.testId  = req.body.testId || test.testId;
    test.name  = req.body.name || test.name;
    test.description  = req.body.description || test.description;
    test.status  = req.body.status || test.status;
    test.project  = req.body.project || test.project;
    test.components  = req.body.components || test.components;
    test.environment  = req.body.environment || test.environment;
    test.groups  = req.body.groups || test.groups;
    test.updatedBy  = req.body.updatedBy || test.updatedBy;

    return test;
};

ModelUtil.getTestExecutionModel = function (req, testExecutionJson) {
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

module.exports = ModelUtil;