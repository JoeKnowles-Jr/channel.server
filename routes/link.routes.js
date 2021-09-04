const router = require("express").Router();
const Link = require("../models/link.js");

router.get("/", (req, res) => {
    Link.aggregate([
        {
            $group: {
                _id: '$category',
                links: {$push: '$$ROOT'}
            }
        }
    ])
        .then(data => res.json({ links: data }))
        .catch(err => res.json({ message: err }));
});

// router.get("/", (req, res) => {
//     Link.find({})
//         .then(data => res.json({links: data}))
//         .catch(err => res.json({message: err}));
// });

router.get("/:lid", function (req, res) {
    Link.findOne({ _id: req.params.lid }, function (err, link) {
        if (err) { return res.json(err); }
        return res.json(link);
    });
});

router.post("/", function (req, res) {
    Link.create(req.body)
        .then(l => {
            Link.aggregate([
                {
                    $group: {
                        _id: '$category',
                        links: { $push: '$$ROOT' }
                    }
                }
            ])
                .then(data => res.json({ links: data }))
                .catch(err => res.json({ message: err }));
        })
        .catch(err => res.json(err))
});

router.put("/", function (req, res) {
    const { lid, update } = req.body;
    Link.findOneAndUpdate({ _id: lid }, update, { new: true })
        .then(result => {
            Link.find({})
                .then((err, links) => {
                    res.json({ links: links, message: 'Link updated' });
                })
                .catch(err => res.json({ message: err }))
        })
        .catch(err => console.log(err))
});

router.delete("/:lid", function (req, res) {
    Link.findByIdAndDelete({ _id: req.params.lid })
        .then(() => {
            Link.find({})
                .then((err, links) => {
                    res.json({ message: "Link deleted", data: links })
                })
                .catch(err => res.json({message: err}))            
        })
        .catch(err => {
            res.json(err);
        });
});

module.exports = router;
