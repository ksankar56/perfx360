/**
 * Created by senthil on 08/04/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var graphInstanceSchema = new Schema({
    graphInstanceId: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    graph: {type: Schema.ObjectId, ref: 'Graph'},
    order: {
        type: Number
    },
    status: {
        type: Boolean
    },
    autoRefresh: {
        type: Boolean
    },
    autoRefreshDefSec : {
        type: Number
    },
    esQuery: {
        type: Object
    },
    xAxis : {
        type: String
    },
    xAxisCaption: {
        type: String
    },
    y1Axis : {
        type: String
    },
    y1AxisCaption: {
        type: String
    },
    y2Axis : {
        type: String
    },
    y2AxisCaption: {
        type: String
    },
    createdDate: {
        type: Date
    },
    updatedDate: {
        type: Date
    },
    updatedBy: {
        type: String
    }
}, { collection: 'graph_instances' });

module.exports = mongoose.model('GraphInstance', graphInstanceSchema);