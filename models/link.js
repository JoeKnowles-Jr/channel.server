const mongoose = require("mongoose");

// User Schema
const LinkSchema = mongoose.Schema({
    url: { type: String, required: true },
    display: { type: String, required: true },
    description: { type: String, required: false },
    category: { type: String, required:false },
    tags: [{ type: String }]
}, { timestamps: true });

LinkSchema.methods.addTag = function (tag) {
    this.tags.push(tag);
    this.save();
}

LinkSchema.methods.removeTag = function (tag) {
    const idx = this.tags.indexOf(tag);
    if (idx > -1) {
        this.tags.splice(idx, 1);
        this.save();
    }
}

module.exports = mongoose.model('Link', LinkSchema);
