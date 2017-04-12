/**
 * Created by senthil on 08/04/17.
 */
var mongoose = require('mongoose');
var mongooseDouble = require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;

var jmeterTestResultSchema = new Schema({
    test_execution_id : {type: Schema.ObjectId, ref: 'TestExecution'},
    test_id: {type: Schema.ObjectId, ref: 'Test'},
    project_id: {type: Schema.ObjectId, ref: 'Project'},
    component_id: {type: Schema.ObjectId, ref: 'Component'},
    group_id: {type: Schema.ObjectId, ref: 'Group'},
    project_name: { type: String },
    project_description: { type: String },
    environment: {type: Schema.ObjectId, ref: 'Environment'},
    type: { type: String },
    test_type: { type: String },
    version : { type: SchemaTypes.Double },
    group: { type: Boolean },
    file_name: { type: String },
    t: { type: Number },
    lt: { type: String },
    ts : {type:   Date},
    s: { type: Boolean},
    lb: { type: String },
    rc: { type: Number },
    rm: { type: String },
    tn: { type: String },
    dt: { type: String },
    by: {type : Number},
    start_time: {type: Date},
    end_time: {type: Date},
    property : {
        xs : {type : String},
        name : {type : String}
    },
    assertion_result : {
        fm : {type : String},
        error: { type: Boolean },
        failure: { type: Boolean }
    },
    status: { type: Boolean},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
}, { collection: 'test_results' });

jmeterTestResultSchema.pre('save', function(next) {
    if (!this.created) this.created = new Date;
    next();
});

module.exports = mongoose.model('TestExecution', jmeterTestResultSchema);