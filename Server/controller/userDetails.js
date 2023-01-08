const UserDetails = require('../model/userDetails')

exports.createUser = (req,res)=>{
    const signUpUser = new UserDetails({
        fullName: req.body.fullName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    })
    signUpUser.save((err, data)=>{
        if(err){
            console.log("error occurred while saving user details");
            res.status(500).json({
                error: err
            })
        } else{
            console.log("account created");
            res.status(200).json({
                data: data
            })
        }
    })
}


exports.getUser = (req,res)=>{
   
    const filtered={};
    if(req.body.userName && req.body.password){
        filtered.userName = req.body.userName;
        filtered.password = req.body.password;
    } else{
        filtered.userName = 'null';
    }
    // console.log(filtered);
    UserDetails.find(filtered)
    .then(
        result=>
        res.status(200).json({
            data:result
        })
    )
    .catch(error=>
        res.status(500).json({
            message:"error occurred in DB",
            error:error
        }))
}

