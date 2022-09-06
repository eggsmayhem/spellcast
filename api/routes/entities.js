const router = require('express').Router()
const Entity = require('../models/Entity')
const User = require('../models/User')


//create an entity
router.post("/", async (req, res) => {
    //add logic to prevent duplicates, send user to already existing entity
    const newEntity = new Entity(req.body) 
    try {
        const savedEntity = await newEntity.save()
        res.status(200).json(savedEntity)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

//get an entity 

router.get("/", async(req, res) => {
    const entityId = req.query.entityId
    const entityname = req.query.entityname
    try {
        const entity = entityId
            ? await Entity.findById(entityId)
            : await Entity.findOne({entityname: entityname})
        res.status(200).json(entity)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

//update entity
router.put("/:id", async (req, res) => {

    try {
        const entity = await Entity.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        })
        res.status(200).json("entity has been updated")
    }
    catch(err) {
        console.log(err)
    }
  });
//get syncretisms

router.get('/syncretisms/:entityId', async (req, res) => {
    try {
        const entity = await Entity.findById(req.params.entityId)
        const syncretisms = await Promise.all(
        entity.syncretisms.map((entityname) => {
            return Entity.findOne({entityname: entityname})
        })
    )
    let syncretismsList = []
    syncretisms.map(entity => {
        const {_id, entityname, profileImg} = entity
        syncretismsList.push({_id, entityname, profileImg})
    })
    res.status(200).json(syncretismsList)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

//follow an entity (become a practitioner)

router.put('/:id/follow', async (req,res) => {
    if(req.body.userId !== req.params.id){
      try {
        const entity = await Entity.findById(req.params.id)
        const currentUser = await User.findById(req.body.userId)
        if (!entity.practitioners.includes(req.body.userId)) {
          await entity.updateOne({$push:{practitioners:req.body.userId}})
          await currentUser.updateOne({$push:{entitiesFollowing:req.params.id}})
          res.status(200).json("Entity has been followed")
        }
        else {
          res.status(403).json("You are already following this entity")
        }
      }
      catch(err) {
        res.status(500).json(err)
      }
    }
    else {
      res.status(403).json("You can't follow yourself")
    }
  })
  //un

module.exports = router