const User = require('../models/Users');
const Message = require('../models/Message');
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
    console.log('user en  desconectado ' )
    
 return user;
 
}

const getUsers = async () =>{

    const users = await User.find().sort('-onLine');

    return users;
}

const recordMessage = async( payload ) =>{

    try {

        const message = new Message( payload );;
        await message.save();
        return message;
        
    } catch (error) {
 console.log(error);
        return false;
    }

}  


module.exports = {  
    userConnected,
    userDisconnected,
    getUsers,
    recordMessage  
};