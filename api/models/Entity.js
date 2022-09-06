const mongoose = require('mongoose')

const EntitySchema = new mongoose.Schema({
    //to enable cross-schema convos, I am currenly making a space for it in the Schema, then manually entering in, say, the userId in the JSON request body 
    entityname: {
        type: String,
        require: true,
    },
    profileImg: {
        type: String,
    },
    coverImg: {
        type: String,
    },
    desc: {
        type: String,
    },
    placesOfOrigin: {
        type: Array,
    },
    schoolsOfMagic: {
        type: Array,
    },
    languageGroup: {
        type: Array,
    },
    textualSources: {
        type: Array,
    },
    inMedia: {
        type: Array,
    },
    //a list of user ids for all who are working with the Entity 
    practitioners: {
        type: Array,
    },
    //list of all spells working with an entity
    //might not be necessary
    spellIds: {
        type: Array,
    },
    //list of all general posts relating to a particular entity, may not be necessary
    postIds: {
        type: Array,
    },
    //for now doing these by name, might switch to entityId
    syncretisms: {
        type: Array,
    },
    friendliness: {
        type: Number,
        default: 0,
        enum: [1,2,3,4,5,6,7]
    },
    holyDays: {
        type: Array,
    },
},
{timestamps:true}
)
module.exports = mongoose.model('Entity', EntitySchema);