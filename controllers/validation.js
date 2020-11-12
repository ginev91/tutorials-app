const { body } = require('express-validator');
 
module.exports = [
    body('title', 'The title should not be empty')
    .custom((value) => {
      
        if( value ==="") {
            throw new Error (`The title should not be empty`)
        }
        return true;

    })  ,
    body('description', 'The description should  be at least 200 characters')
    .custom((value) => {
        
        if( value ==="") {
            throw new Error (`The description should  be at least 200 characters`)
        }
        return true;

    }),
    body('imageUrl', 'The imageUrl should not be empty')
    .custom((value) => {
       
        if( value ==="") {
            throw new Error (`The imageUrl should not be empty`)
        }
        return true;

    })
     
]