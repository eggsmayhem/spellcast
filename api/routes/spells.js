const router = require('express').Router();
const Spell = require('../models/Spell')
const User = require('../models/User')
const Entity = require('../models/Entity')
// const Entity = require('../models/Entity')

// router.get('/', (req, res) => {
//     console.log('post page')
// })

//create a spell
//when create a spell, you should 
//a. add coordinates (find a way to abstract the user from thi
//update relevant entities with spell id)
//update all relevant Entities (and other Classes eventually) with the spells ID so they can be rendered in the entities feed

router.post("/", async (req, res) => {
    const newSpell = new Spell(req.body) 
    try {
        const savedSpell = await newSpell.save()
        console.log('test')

        //test to add spell id to all entities
        const ents = savedSpell.entities.length
        if (ents > 0) {
            const addSpellsToEntities = await Promise.all(
                savedSpell.entities.map(entity=> {
                    const ent = Entity.findOne({entityname: entity})
                    return ent.updateOne({$push: {spellIds: savedSpell._id.valueOf()} })
                }))
        }
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
            res.status(403).json("You can only update your own posts")
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
            res.status(403).json("You can only delete your own Spell")
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
            res.status(200).json("Spell has been liked")
        }
        else {
            await spell.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("This Spell has been disliked")
        }
    }
    catch(err) {
        res.status(500).json(err)
    }
} )

//dislike a post
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

//get all spells relating to an entity

router.get("/allspells/:entityname", async (req, res) => {
    try {
        //return all spells whose entities array contain the entityname
        const spells = await Spell.find({entities: { $in: [req.params.entityname]},
        })
        res.status(200).json(spells)

    }
    catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;