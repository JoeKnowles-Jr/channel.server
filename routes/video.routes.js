const router = require("express").Router();
const Video = require("../models/video.js");

router.get("/", (req, res) => {
    Video.find({}).sort({ number: "desc" })
        .then(data => res.json(data))
        .catch(err => res.json(err));
});

router.get("/:vid", function (req, res) {
    Video.findOne({ _id: req.params.vid }, function (err, video) {
        if (err) { return res.json(err); }
        return res.json(video);
    });
});

router.get("/vidpop/:year", function (req, res) {
    Video.find({})
        .populate('links')
        .populate('likedBy')
        .populate('dislikedBy')
        .populate('comments')
    .then(videos => {
        const filtered = videos.filter(v => {
            return v.date.endsWith(req.params.year)
        })
            return res.json(filtered);
        })
        .catch(err => {
            return res.json(err);
        })

   
}); 
 
router.post("/", function (req, res) {
    Video.create(req.body)
        .then(v => {
            Video.find({})
                .then(videos => {
                    res.json({ message: 'Video inserted!', videos: videos })
                })
                .catch(err => console.log(err))
        })
        .catch(err => res.json(err))
});

router.put("/", function (req, res) {
    const vid = req.body.filter;
    const update = req.body.update;

    Video.findOneAndUpdate({ _id: vid }, update, { new: true })
        .then((err, result) => {
            if (err) { res.json(err); }
            res.json(result);
        })
        .catch(err => console.log(err))
});

router.delete("/:vid", function (req, res) {
    Video.findByIdAndDelete({ _id: req.params.vid })
        .then((err) => {
            Video.find({})
                .then(videos => {
                    res.json({ message: "deleted", videos: videos });
                })
                .catch(err => console.log(err));
        })
        .catch(err => { res.json(err); });
});

module.exports = router;
