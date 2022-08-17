const User = require('../models/User')
const router = require('express').Router()
const bcrypt = require('bcrypt')

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if(req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)
      }
      catch(err) {
        return res.status(500).json(err)
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated")
    }
    catch(err) {
      return res.status(500).json(err)
    }
  }
  else {
    return res.status(403).json("You can only update your own account")
  }
});
//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted successfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only delete your own account!");
  }
});

//get user

router.get("/", async (req, res) => {
  // use queries for conditional routing that accepts multiple forms of user identification for more flexibility
  const userId = req.query.userId
  const username = req.query.username
  try{
    const user = userId 
      ? await User.findById(userId) 
      : await User.findOne({username: username})
    //create an object that enables you to return only the desired information from the user object (user._doc)
    const {password, updatedAt, ...other} = user._doc
    res.status(200).json(other)
  }
  catch(err
    ) {
    res.status(500).json(err)
  }
})

//get friends

router.get('/friends/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId)
      })
    )
    let friendList = []
    // destructure returned friends to contain only information relavent to TOP FRIEND display
    friends.map(friend => {
      const {_id, username, profilePicture} = friend
      friendList.push({_id, username, profilePicture})
    })
    res.status(200).json(friendList)
  }
  catch(err) {
    res.status(500).json(err)
  }
})
//follow a user

router.put('/:id/follow', async (req,res) => {
  if(req.body.userId !== req.params.id){
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({$push:{followers:req.body.userId}})
        await currentUser.updateOne({$push:{following:req.params.id}})
        res.status(200).json("User has been followed")
      }
      else {
        res.status(403).json("You are already following this person")
      }
    }
    catch {
      res.status(500).json(err)
    }
  }
  else {
    res.status(403).json("You can't follow yourself")
  }
})
//unfollow
router.put('/:id/unfollow', async (req,res) => {
  if(req.body.userId !== req.params.id){
    try {
      const user = await User.findById(req.params.id)
      const currentUser = await User.findById(req.body.userId)
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({$pull:{followers:req.body.userId}})
        await currentUser.updateOne({$pull:{following:req.params.id}})
        res.status(200).json("User has been unfollowed")
      }
      else {
        res.status(403).json("You are not currently following this person")
      }
    }
    catch {
      res.status(500).json(err)
    }
  }
  else {
    res.status(403).json("You can't unfollow yourself")
  }
})

module.exports = router