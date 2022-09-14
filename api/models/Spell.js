const mongoose = require('mongoose')

const SpellSchema = new mongoose.Schema({
    //to enable cross-schema convos, I am currenly making a space for it in the Schema, then manually entering in, say, the userId in the JSON request body 
    userId: {
        type: String,
        required: true,
    },
    // name helps users keep track of multi-day spells
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    iframe: {
        type: String,
    },
    sigil: {
        type: String
    },
    otherImgs: {
        type: Array
    },
    likes: {
        type: Array,
        default: [],
    },
    dislikes: {
        type: Array,
        default: [],
    },
    likeCount: {

    },
    //eventually practice getting user geolocation, or letting them override and set manually
    location: {
        type: String,
    },
    direction: {
        type: String,
    },
    //recommend that user Search to see if their entity already has a page. If so, use the standardized spelling. If not, they can create one. 

    //when they post spell with entity, we will need to manually search through all entities to see if we have a name match, then put that entityId in a separate array
    entities: {
        type: Array,
        require: false,
    },
    entityIds: {
        type: Array,
    },
    materials: {
        type: Array,
        require: false,
    },
    source: {
        type: String,
        require: true,
    },
    schools: {
        type: Array,
        require: true,
    },
    images: {
        type: Array,
    },
    //we'll start with Youtube iframes for video, perhaps eventually move over to self-host, but this is the best cost-solution for now 
    videos: {
        type: Array,
    },
    desc: {
        type: String,
        require: true,
        max: 1500,
    },
    astronomy: {
        type: Array,
        require: false,
    },
    time: {
        type: Array,
        require: false
    },
    results: {
        type: String,
        require: false
    },
    furtherReading: {
        type: String,
        require: false
    },
    friendliness: {
        type: Number,
        require: false,
    },
    private: {
        type: Boolean,
        require: true,
    },
    coordinates: {
        type: Array
    }
},
{timestamps:true}
)
module.exports = mongoose.model('Spell', SpellSchema);