const jwt = require('jsonwebtoken')

module.exports ={
    authentic: function(request, response, next){
        const token= request.headers.authorization;
        jwt.verify(token, process.env.SECRET_KEY, function(error, result){
            if(
                (error && error.name !== 'JsonWebTokenError')
            ){
                request.token = result;
                next();
            }else{
                request.token = result;
                next();
            }
        })
    }
}