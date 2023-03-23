const mongoose = require('mongoose');

const dbConnection = async()=>{

    try {

       await mongoose.connect( process.env.DB_CONNEXTION_STRING,{
            
        });

        console.log('Db online!!');
        
    } catch (error) {
        console.log(error);
        throw Error('Error in database please check logs')

    }


}

module.exports = {
    dbConnection,
}