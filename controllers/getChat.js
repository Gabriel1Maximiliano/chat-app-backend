const Message = require('../models/Message');

const getChat = async( req, res ) => {

    const myId = req.uid;
    const messagesFrom = req.params.from;

    const last30 = await Message.find({
        $or:[
    
               { to:myId, from:messagesFrom},
               { to:messagesFrom, from:myId},

        ]
            
    }).sort( { createdAt:'desc' } )
      .limit( 30 );

  return res.status(200).json({
    ok:true,
    myId,
    msg:'soy getChat',
    messages:last30

  })
}

module.exports = getChat;
