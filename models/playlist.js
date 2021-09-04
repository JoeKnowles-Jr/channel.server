const mongoose = require("mongoose");

// PlayList Schema
const PlayListSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }]
}, { timestamps: true });

PlayListSchema.methods.addVideo = function (vid) {
    this.videos.push(vid);
    this.save();
}

PlayListSchema.methods.removeVideo = function (vid) {
    const idx = this.videos.indexOf(vid);
    if (idx > -1) {
        this.videos.splice(idx, 1);
    }
    this.save();
}

module.exports = mongoose.model('PlayList', PlayListSchema);
