const router = require('express').Router();
const Spell = require('../models/Spell')
const User = require('../models/User')

// router.get('/', (req, res) => {
//     console.log('post page')
// })

//create a post

router.post("/", async (req, res) => {
    const newSpell = new Spell(req.body) 
    try {
        const savedSpell = await newSpell.save()
        res.status(200).json(savedSpell)
    }
    catch(err) {
        res.status(500).json(err)
    }
})
//update a post
router.put("/:id", async (req, res) => {
    try {
        const spell = await Spell.findById(req.params.id)
        if (spell.userId === req.body.userId) {
            await spell.updateOne({$set:req.body})
            res.status(200).json("The Spell has been updated")

        }
        else {
            res.status(403).json("You can only update your own spells")
        }

    }
    catch(err) {
        res.status(500).json(err)
    }
})
//delete a post
router.delete("/:id", async (req, res) => {
    try {
        const spell = await Spell.findById(req.params.id)
        if (spell.userId === req.body.userId) {
            await spell.deleteOne()
            res.status(200).json("The Spell has been deleted")

        }
        else {
            res.status(403).json("You can only delete your own spells")
        }

    }
    catch(err) {
        res.status(500).json(err)
    }
})
//like a post

router.put("/:id/like", async(req, res) =>{
    try {
        const spell = await Spell.findById(req.params.id)
        if (!spell.likes.includes(req.body.userId)) {
            await spell.updateOne({$push: {likes: req.body.userId}})
            res.status(200).json("Post has been liked")
        }
        else {
            await spell.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("This post has been disliked")
        }
    }
    catch(err) {
        res.status(500).json(err)
    }
} )
//get a post
router.get("/:id", async(req, res) => {
    try {
        const spell = await Spell.findById(req.params.id)
        res.status(200).json(spell)
    }
    catch(err) {
        res.status(500).json(err)
    }
})
//got LB, we could just add everyone within the radius to a user's followings (and delete everyone who is not within the radius. Not sure how often I should update this to be efficient, though. )
//get timeline (all posts of users that are followed)
//if you are getting data from a get, using params is a good choice 
router.get("/timeline/:userId", async(req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const userSpells = await Spell.find({userId: currentUser._id})
        const friendSpells = await Promise.all(
            currentUser.following.map(friendId=> {
                return Spell.find({userId: friendId})
            })
        )
        res.status(200).json(userSpells.concat(...friendSpells))
    }
    catch(err) {
        res.status(500).json(err)
    }
})

//get all of a single user's spells
router.get("/profile/:username", async(req, res) => {
    try {
        const user = await User.findOne({username: req.params.username})
        const spells = await Spell.find({userId: user._id})
        res.status(200).json(spells)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;