/**
 * Created by senthil on 09/04/17.
 */

var constants = require('../../src/common/constants');
var Project = require('../../src/model/Project');
var Group = require('../../src/model/Group');
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

module.exports = ModelUtil;