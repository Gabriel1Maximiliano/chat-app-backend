const User = require('../models/Users');

const userConnected = async( uid='' )=>{
    
    const user = await User.findById( uid );
 

 user.onLine = true;

 await User.findOneAndUpdate(uid, { onLine :true })

 return user;
 
}
const userDisconnected = async( uid='' )=>{
    
    const user = await User.findById( uid );
    
    
    user.onLine = false;
    
    await User.findOneAndUpdate(uid, { onLine :false })
    console.log('user en  desconectado '+user )
    
 return user;
 
}



module.exports = { 
    userConnected,
    userDisconnected,  
};