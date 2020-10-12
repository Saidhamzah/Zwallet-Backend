const authModel = require('../model/auth')
const helper = require('../helper')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')

dotenv.config()

module.exports={
    authentication: async function(request, response){
        try{
            const {email, password} = req.body
            const result = await authModel.login(email)

            if(result[0] !=''){
                const token = jwt.sign({
                    email : result[0],email,
                    id : result[0].id,
                    name : result[0].name
                }, process.env.SECRET_KEY
                )
                bcrypt.compare(password, result[0].password, (err, result)=>{
                    if(result){
                        result.status(200).send({
                            message: token
                        })
                    }else{
                        res.status(401).send({
                            message: 'Email or Password not valid'
                        })
                    }
                })
            }

        }
        catch(error){
            res.status(500).send({
                message: error.message
            })
        }
    }
}