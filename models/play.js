const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types; 

const PlaySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true

    },
    description: {
        type: String,
        required: true,
        maxLength: 50
    },

    imageUrl: {
        type: String,
        required: true,
        unique: true
    },

    usersLiked: [{
        type: ObjectId,
        ref: 'User'
    }],
    creator: {
        type: ObjectId,
        ref: 'User'
    },
    duration: {
        type: String,
        required: true,
        
    }
    
    
})

module.exports = mongoose.model('Play', PlaySchema);
