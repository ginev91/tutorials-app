const { Router } = require('express');
const { validationResult } = require('express-validator');
const { getUserStatus, checkAuthentication, verifyUser } = require('../controllers/user'); 
const validation = require('../controllers/validation'); 
const Play = require('../models/play');
const {getAllPlays, sortByLikes, getPlay} = require('../controllers/play')


const router = Router();

router.get('/',getUserStatus, async (req, res) => {  
 const play =  await sortByLikes()
const date = new Date()
const dateStart= date.toDateString()


    res.render('home', { 
       
    isLoggedIn:  req.isLoggedIn, 
    play,
    date
    
  
    });  
})

router.get('/create',getUserStatus, async (req, res) => {  
    res.render('create', { 
    isLoggedIn:  req.isLoggedIn, 

    });  
})  

    router.post('/create',checkAuthentication,validation, async (req, res) => {  

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.render('create',{ 
                message: errors.array()[0].msg
            })
        }        try{
       
         const {title, description ,imageUrl, duration} = req.body;
         const {_id} =req.user;
        
        console.log(title, description ,imageUrl, duration )
         const play = new Play({title, description ,imageUrl, duration,creator: _id})

         await play.save()
         res.redirect('/')
        
        }catch(err){
            console.log(err)
            res.redirect('/')
        }
        });    

        router.get('/details/:id',getUserStatus,checkAuthentication, async (req, res)=>{
try{
            const id = req.params.id
            const play = await getPlay(id)

            const isCreator = play.creator.toString() == req.user._id.toString()
            const isLiked = play.usersLiked.filter(x => x.toString() == req.user._id.toString())  
          res.render('details',{
            isLoggedIn: req.isLoggedIn,
            isCreator,
            isLiked,
            ...play
            })
        }catch(err){
            console.log(err)
            res.redirect('/')
        }
          
        })
        router.get('/like/:id',checkAuthentication, async (req,res)=>{

            const playId = req.params.id;
            const {_id} = req.user;
            await Play.findByIdAndUpdate(playId,{
                $addToSet: {
                    usersLiked: [_id]
                }
            })
            res.redirect(`/details/${playId}`)

        })
        router.get('/delete/:id' , checkAuthentication , async (req, res)=>{
                 
            const playId = req.params.id;
            
            await Play.findByIdAndDelete(playId)

            res.redirect('/')

        })

          
           router.get('/edit/:id', checkAuthentication ,getUserStatus,async (req, res) => {

            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.render('edit',{ 
                    message: errors.array()[0].msg
                })
       }

            const playId = req.params.id;

           const play = await Play.findById(playId).lean();
           
           res.render('edit', {
            isLoggedIn: req.isLoggedIn,
            ...play
               
           })
    })

           router.post('/edit/:id' , checkAuthentication ,getUserStatus, async (req, res)=>{

            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.render('edit',{ 
                    message: errors.array()[0].msg
                })
       }        try{
       
        const {title, description ,imageUrl, duration} = req.body;
        const playId = req.params.id;
    
        await Play.findByIdAndUpdate(playId ,{title, description ,imageUrl, duration})
        res.redirect('/')
       
       }catch(err){
           console.log(err)
           res.redirect('/edit/:id')
       }
       });    

 
        


module.exports = router;