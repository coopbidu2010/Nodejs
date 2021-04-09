const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {type: String},
    description: {type: String},
    image: {type: String},
    slug: { type: String, slug: 'name', unique: true },
    videoId: {type: String},
    gemRed: {type: String},
    gemViolet: {type: String},
    gemGreen: {type: String},
    imgSign: {type: String},
    imgEquipment: {type: String}
}, {
    timestamps: true,
});

// Custom query hrlpers
courseSchema.query.sortTable = function (req) {
    if(req.query.hasOwnProperty('_sort')){
        const isValidtype = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
          [req.query.column]: isValidtype ? req.query.type : 'desc',
        });
    }
    return this;
}

// Add plugin
mongoose.plugin(slug);
courseSchema.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Course', courseSchema);
