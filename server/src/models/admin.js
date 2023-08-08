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

    registration:{

        type: Number,

        required: true

    },

    phone:{

        type:Number,

        required: true

    },
    address:{

        type:String,

        required: true

    },
    pincode:{

        type:Number,

        required: true

    },
    email:{

        type:String,

        required: true

    },
    password:{

        type:String,

        required: true

    },
    active:{

        type:String,

        required: true

    },
},

{timestamp: true}

)

module.exports = mongoose.model('admin', applySchema)