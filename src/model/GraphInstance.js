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
        type: String,
        get: function(data) {
            try {
                return JSON.parse(data);
            } catch(err) {
                return data;
            }
        },
        set: function(data) {
            return JSON.stringify(data);
        }
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
    },
    instanceType : {type: String, default: "GRAPH"},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
}, { collection: 'graph_instances' });

graphInstanceSchema.pre('save', function(next) {
    if (!this.created) this.created = new Date;
    next();
});

module.exports = mongoose.model('GraphInstance', graphInstanceSchema);