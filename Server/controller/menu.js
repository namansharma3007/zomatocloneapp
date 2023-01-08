const Menu=require('../model/menu')


exports.getMenu=(req,res)=>{
    let filtered={restaurantName:req.params.rName}
    Menu.find(filtered)
    .then(
        result=>
        res.status(200).json({
            message:"Menu fetched successfully",
            data:result
        })
    )
    .catch(error=>
        res.status(500).json({
            message:"error occurred in DB",
            error:error
        }))
}