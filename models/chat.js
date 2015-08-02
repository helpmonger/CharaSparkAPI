var mongoose = require('mongoose')
Schema = mongoose.Schema;

var ChatSchema = Schema({

    session: {
        type: Schema.Types.ObjectId
    },
    messages: [{
        user_name: String,
        message: String,
        timestamp: {
            type: Date,
            default: Date.now
        },
        delivered: Boolean
    }]

})

mongoose.model('Chat', ChatSchema);
