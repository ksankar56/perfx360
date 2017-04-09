/**
 * Created by senthil on 08/04/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dashboardSchema = new Schema({
    dashboardId: {type: Number},
    name: {type: String, required: true},
    description: {type: String},
    order: {type: Number},
    status: {type: Boolean},
    system: {type: Boolean},
    project: {type: Schema.ObjectId, ref: 'Project'},
    component: {type: Schema.ObjectId, ref: 'Component'},
    dashboardType: {type: Schema.ObjectId, ref: 'DashboardType'},
    graphInstances: [{type: Schema.ObjectId, ref: 'GraphInstance'}],
    updatedBy: {type: Schema.ObjectId, ref: 'User'},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
}, { collection: 'dashboards' });

dashboardSchema.pre('save', function(next) {
    if (!this.created) this.created = new Date;
    next();
});

module.exports = mongoose.model('Dashboard', dashboardSchema);