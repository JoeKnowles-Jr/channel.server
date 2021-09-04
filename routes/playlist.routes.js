const router = require("express").Router();
const PlayList = require("../models/playlist");

router.get("/", (req, res) => {
    PlayList.find({})
        .then(playlists =>  res.json({playlists: playlists}))
        .catch(err => res.json(err));
});

router.get("/:plid", function(req, res) {
    PlayList.findOne({_id: req.params.plid}, function(err, playlist) {
        if (err) { return res.json(err); }
        return res.json({ playlist: playlist});
    });
});

router.post("/", function(req, res) {
    PlayList.create(req.body)
        .then(pl => {
            PlayList.find({})
                .then(playlists => {
                    return res.json({ playlists: playlists });
                })
                .catch(err => console.log(err));
        })

});

router.delete("/:plid", function(req, res) {
     PlayList.findByIdAndDelete({_id: req.params.plid})
         .then(() => {
             PlayList.find({})
                 .then(playlists => {
                     res.json({ playlists: playlists, message: "Playlist deleted" });
                 })
                 .catch(err => console.log(err));
         })
     .catch(err => {
        res.json(err);
     });
});

module.exports = router;