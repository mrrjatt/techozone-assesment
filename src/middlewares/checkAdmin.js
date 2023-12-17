function checkAdmin (req , res , next){
    if(req.authUser.role == 'admin'){
        next();
    }else{
        res.status(403).send({
            status:false,
            message:"Only admin can access this route!"
        })
    }
};

module.exports = checkAdmin