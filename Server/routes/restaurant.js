const express=require('express')
const restaurantController=require('../controller/restaurant')


// this will even work without calling in router : const router = express(); => this is also correct
const router=express.Router();



router.get('',restaurantController.getAllRestaurants)


// router.get('/:cName',restaurantController.getRestaurantsByCity)
router.get('/:cID',restaurantController.getRestaurantsByCityID)

router.get('/details/:rName',restaurantController.getRestaurantByName)

router.post('',restaurantController.addRestaurant)

router.post('/filter/:pageNo',restaurantController.getRestaurantsByFilter)

router.put('',restaurantController.updateRestaurant)


router.delete('',(req,res)=>{
    res.send("you have called restaurant route delete method")
})




module.exports=router;