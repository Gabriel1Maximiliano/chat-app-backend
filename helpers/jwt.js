const jwt = require('jsonwebtoken');

const generateJwt = ( uid )=>{

return new Promise( ( resolve, reject ) => {
    const payload = { uid };

    jwt.sign( payload, process.env.JWT_KEY, {
        expiresIn: '24h'
        
    } ,( err, token )=>{
        if( err ) {
            console.log( err );
            reject( 'We can not generate jwt' );
        }else{
            resolve( token );
        }
    })
} )

}

const verifyJwt = ( token='' ) =>{

    try {

         const { uid }  = jwt.verify( token, process.env.JWT_KEY );
         


        return [ true, uid ]
        
    } catch (error) {
        return [false];
    }

}

module.exports = {
    generateJwt,
    verifyJwt
}