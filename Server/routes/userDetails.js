const express=require('express')
const userController=require('../controller/userDetails')



const router=express.Router();


router.post('/createUser',userController.createUser);
router.post('/getUser',userController.getUser);



module.exports=router;