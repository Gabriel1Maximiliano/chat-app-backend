const { response } = require("express");
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const { generateJwt }=require('../helpers/jwt');

const createUser = async( req, res = response )=>{

    const { email, password } = req.body;

    try {

        const isEmail = await User.findOne( { email } );
        

        if( isEmail ){ 
            return res.status(400).json({
                ok:false,
                msg:'The email already exists',
            })
        }
   
const user = new User( req.body );

const salt = bcrypt.genSaltSync();

user.password = bcrypt.hashSync( password, salt );

await user.save();

const token = await generateJwt( user.id );

return res.status(200).json({
    ok:true,
    user,
    token
    
})
        
    } catch (error) {

        return res.status(500).json({
            ok:false,
            msg:'Talk to the administrator',
        
        })
    }

};

const loginUser = async( req, res = response )=>{

    
   
    const { email, password } = req.body;

    try {

        const userDb = await User.findOne( { email } );

        if( !userDb ){
            return  res.status(404).json({
                ok:false,
                msg:'Ups something wrong with your email and password ',
            })  

        }

        const validPassword = bcrypt.compareSync( password, userDb.password );

        if( !validPassword ){
            return  res.status(400).json({
                ok:false,
                msg:'Ups something wrong with your email and password',
            }) 
        }

        const token = await generateJwt( userDb.id );

        return  res.status(200).json({
            ok:true,
            user:userDb,
            token,
        }) 
        
    } catch (error) {
        console.log(error);
        return  res.status(500).json({
            ok:true,
            msg:'Talk to the administrator',
        })  
    }

    
};

const renewToken = async( req, res = response )=>{

    const uid = req.uid;
    
    try {
        
        const token = await generateJwt( uid );

        const user  = await User.findById( uid );

        return res.status(200).json({
            ok:true,
            user,
            token,
        })
       
        
    } catch (error) {

        return res.status(401).json({
            ok:false,
            msg:'Invalid token',
        })
    }

   
};

module.exports = {

    createUser,
    loginUser,
    renewToken,


}