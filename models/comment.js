const mongoose = require("mongoose");

// Comment Schema
const CommentSchema = mongoose.Schema({
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: false
    },
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
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: []
    }]
}, { timestamps: true });

CommentSchema.methods.addLikedBy = function (uid) {
    this.likedBy.push(uid);
    this.save();
}

CommentSchema.methods.removeLikedBy = function (uid) {
    const idx = this.likedBy.indexOf(uid);
    if (idx > -1) {
        this.likedBy.splice(idx, 1);
        this.save();
    }
}

CommentSchema.methods.addDislikedBy = function (uid) {
    this.dislikedBy.push(uid);
    this.save();
}

CommentSchema.methods.removeDislikedBy = function (uid) {
    const idx = this.dislikedBy.indexOf(uid);
    if (idx > -1) {
        this.dislikedBy.splice(idx, 1);
        this.save();
    }
}

CommentSchema.methods.addReply = function (cid) {
    this.replies.push(cid);
    this.save();
}

CommentSchema.methods.removeReply = function (cid) {
    const idx = this.replies.indexOf(cid);
    if (idx > -1) {
        this.replies.splice(idx, 1);
        this.save();
    }
}

module.exports = mongoose.model('Comment', CommentSchema);
