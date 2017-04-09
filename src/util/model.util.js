/**
 * Created by senthil on 09/04/17.
 */

var constants = require('../../src/common/constants');
var Project = require('../../src/model/Project');
var Group = require('../../src/model/Group');
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

module.exports = ModelUtil;