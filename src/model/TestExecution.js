/**
 * Created by senthil on 08/04/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testExecutionSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    test: {type: Schema.ObjectId, ref: 'Test'},
    project: {type: Schema.ObjectId, ref: 'Project'},
    executedBy: {type: Schema.ObjectId, ref: 'User'},
    resultStatus: {type: Boolean, default: false},
    timeTaken: {type: Number, default: 0},
    executedComponents: [{type: Schema.ObjectId, ref: 'Component'}],
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
}, { collection: 'test_executions' });

testExecutionSchema.pre('save', function(next) {
    if (!this.created) this.created = new Date;
    next();
});

module.exports = mongoose.model('TestExecution', testExecutionSchema);