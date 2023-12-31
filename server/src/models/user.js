const mongoose = require("mongoose")





const applySchema = new mongoose.Schema(

{
    mandalname:{

        type: String,

        required: true

    },
    
   name:{

        type: String,

        required: true

    },

    phone:{

        type:Number,

        required: true

    },

    email:{

        type:String,

        required: true

    },
    address:{

        type:String,

        required: true

    },
    password:{

        type:String,

        required: true

    },
    status:{

        type:String,

        required: true

    },




},

{timestamp: true}

)

module.exports = mongoose.model('users', applySchema)