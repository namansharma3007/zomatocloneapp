const mongoose=require('mongoose')


const locationSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    city_id:{
        type:String,
        require:true
    },   
    location_id:{
        type:String,
        require:true
    },
    country_name:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model('Locations',locationSchema,"location")