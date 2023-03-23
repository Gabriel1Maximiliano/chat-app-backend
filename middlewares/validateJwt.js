const jwt = require('jsonwebtoken');


const validateJwt = ( req, res, next ) => {

    try {

        const token = req.header('x-token');

         
        if( !token ){
            return res.status(401).json({
                ok:false,
                msg:'There is no token in request'

            });
        }
        const payload = jwt.verify( token, process.env.JWT_KEY );

        req.uid = payload.uid;

       
        next();
        
    } catch (error) {

        return res.status(400).json({
            ok:false,
            msg:'Invalid token'
        })
        
    }
  return {

  }
}
module.exports = validateJwt; 