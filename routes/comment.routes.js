const router = require("express").Router();
const Comment = require("../models/comment.js");

router.get("/", (req, res) => {
    Comment.find({})
        .then(data => res.json({ comments: data }))
        .catch(err => res.json({ message: err }));
});

router.get("/:cid", function (req, res) {
    Comment.findOne({ _id: req.params.cid }, function (err, comment) {
        if (err) { return res.json(err); }
        return res.json({ comment: comment});
    });
});

router.post("/", function (req, res) {
    const c = new Comment(req.body);
    c.save(function (err) {
        if (err) { res.send(err); }
        res.json({comment: c});
    });
});

router.put("/", function (req, res) {
    const cid = req.body.filter;
    const update = req.body.update;

    Comment.findOneAndUpdate({ _id: cid }, update, { new: true }, (err, result) => {
        if (err) { res.json(err); }
        res.json({comment: result});
    });
});

router.delete("/:cid", function (req, res) {
    Comment.findByIdAndDelete({ _id: req.params.cid })
        .then(() => res.json("deleted"))
        .catch(err => {
            res.json({message: err});
        });
});

module.exports = router;
