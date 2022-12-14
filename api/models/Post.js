const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    //to enable cross-schema convos, I am currenly making a space for it in the Schema, then manually entering in, say, the userId in the JSON request body 
    userId: {
        type: String,
        required: true,
    },
    //name helps users keep track of multi-day spells
    // name: {
    //     type: String,
    // },
    // type: {
    //     type: String,
    // },
    // sigil: {
    //     type: String
    // },
    // otherImgs: {
    //     type: Array
    // },
    likes: {
        type: Array,
        default: [],
    },
    likesCount: {
        type: Number,
        default: 0,
    },
    //eventually practice getting user geolocation, or letting them override and set manually
    // location: {
    //     type: String,
    // },
    // entity: {
    //     type: String,
    //     require: false,
    // },
    // materials: {
    //     type: Array,
    //     require: false,
    // },
    // source: {
    //     type: String,
    //     require: true,
    // },
    // schools: {
    //     type: Array,
    //     require: true,
    // },
    img: {
        type: String,
    },
    desc: {
        type: String,
        require: true,
        max: 1500,
    },
    // astronomy: {
    //     type: Array,
    //     require: false,
    // },
    // time: {
    //     type: Array,
    //     require: false
    // },
    // results: {
    //     type: String,
    //     require: false
    // },
    // furtherReading: {
    //     type: String,
    //     require: false
    // },
    // friendliness: {
    //     type: Number,
    //     require: true
    // },
    // private: {
    //     type: Boolean,
    //     require: true,
    // },
},
{timestamps:true}
)
module.exports = mongoose.model('Post', PostSchema);