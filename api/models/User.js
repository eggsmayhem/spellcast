const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50, 
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min:8,
    },
    profilePicture: {
        type: String,
        default:"",
    },
    coverPicture: {
        type: String,
        default:"",
    },
    followers: {
        type: Array,
        default: [],
    },
    // magicalSchools: {
    //     type: Array,
    //     default: []
    // },
    following: {
        type: Array,
        default: [],
    },
    entitiesFollowing: {
        type: Array,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50,
    },
    from: {
        type: String,
        max: 50,
    },
    relationship: {
        type: Number, 
        default: 0,
        enum: [0,1,2],
    },
    baseCoordinates: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    }
},
{ timestamps: true}
)

module.exports = mongoose.model('User', UserSchema);