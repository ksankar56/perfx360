/**
 * Created by senthil on 08/04/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
    testId: {type: Number},
    name: {type: String, required: true},
    description: {type: String},
    status: {type: Boolean, default: true},
    system: {type: Boolean, default: false},
    project: {type: Schema.ObjectId, ref: 'Project'},
    components: [{type: Schema.ObjectId, ref: 'Component'}],
    groups: [{type: Schema.ObjectId, ref: 'Group'}],
    environment: {type: Schema.ObjectId, ref: 'Environment'},
    updatedBy: {type: Schema.ObjectId, ref: 'User'},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
}, { collection: 'tests' });

testSchema.pre('save', function(next) {
    if (!this.created) this.created = new Date;
    next();
});

module.exports = mongoose.model('Test', testSchema);