const MealTypes=require('../model/mealtype')


exports.getAllMealtypes=(req,res)=>{
    MealTypes.find()
    .then(
        result=>
        res.status(200).json({
            message:"Mealtypes fetched successfully",
            data:result
        })
    )
    .catch(error=>
        res.status(500).json({
            message:"error occurred in DB",
            error:error
        }))
}