const express=require('express')
const menuController=require('../controller/menu')



const router=express.Router();


router.get('/:rName',menuController.getMenu);


module.exports=router;