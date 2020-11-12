const Play = require('../models/play');

const getAllPlays = async (callback) => { 
    const play = await Play.find().lean();    
    return play;
}
const sortByLikes = async () => {
    const plays = await getAllPlays()
    
   const playsSorted = plays.sort((a, b) => b.usersLiked.length - a.usersLiked.length)
    return playsSorted
}

const getPlay = async (id)=>{

    const play = await Play.findById(id).lean()
    return play
}


module.exports = {
    getAllPlays,
    sortByLikes,
    getPlay
}