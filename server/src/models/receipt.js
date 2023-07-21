const mongoose = require("mongoose")





const applySchema = new mongoose.Schema(

{
    
   name:{

        type: String,

        required: true

    },

    address:{

        type:String,

        required: true

    },

    amount:{

        type:Number,

        required: true

    },
    date:{

        type:String,

        required: true

    },
    group_id:{
        type: String
    },
    receiver:{
        type: String
    }



},

{timestamp: true}

)

module.exports = mongoose.model('receipt', applySchema)