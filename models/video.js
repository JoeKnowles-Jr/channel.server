const mongoose = require("mongoose");

// Video Schema
const VideoSchema = mongoose.Schema({
    number: {
        type: Number, unique: true, required: true
    },
    title: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    date: {
        type: String, required: false
    },
    videofile: {
        type: String, required: false
    },
    thumbfile: {
        type: String, required: false
    },
    commentsLocked: {
        type: Boolean, default: false
    },
    commentsHidden: {
        type: Boolean, default: false
    },
    views: {
        type: Number,
        default: 0
    },
    tags: [{ type: String, default: [] }],
    links: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Link",
        default: []
    }],
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    dislikedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: []
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: []
    }]
}, { timestamps: true });

VideoSchema.methods.addTag = function (tag) {
    this.tags.push(tag);
    this.save();
}

VideoSchema.methods.removeTag = function (tag) {
    const idx = this.tags.indexOf(tag);
    if (idx > -1) {
        this.tags.splice(idx, 1);
        this.save();
    }
}

VideoSchema.methods.addLink = function (lid) {
    this.links.push(lid);
    this.save();
}

VideoSchema.methods.removeLink = function (lid) {
    const idx = this.links.indexOf(lid);
    if (idx > -1) {
        this.links.splice(idx, 1);
        this.save();
    }
}

VideoSchema.methods.addLikedBy = function (uid) {
    this.likedBy.push(uid);
    this.save();
}

VideoSchema.methods.removeLikedBy = function (uid) {
    const idx = this.likedBy.indexOf(uid);
    if (idx > -1) {
        this.likedBy.splice(idx, 1);
        this.save();
    }
}

VideoSchema.methods.addDislikedBy = function (uid) {
    this.dislikedBy.push(uid);
    this.save();
}

VideoSchema.methods.removeDislikedBy = function (uid) {
    const idx = this.dislikedBy.indexOf(uid);
    if (idx > -1) {
        this.dislikedBy.splice(idx, 1);
        this.save();
    }
}

VideoSchema.methods.addComment = function (cid) {
    this.comments.push(cid);
    this.save();
}

VideoSchema.methods.removeComment = function (cid) {
    const idx = this.comments.indexOf(cid);
    if (idx > -1) {
        this.comments.splice(idx, 1);
        this.save();
    }
}

module.exports = mongoose.model('Video', VideoSchema);
