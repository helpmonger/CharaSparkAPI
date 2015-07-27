var mongoose = require('mongoose')
Schema = mongoose.Schema;

var ChatSchema = Schema({

    session: {
        type: Schema.Types.ObjectId
    },
    messages: [{
        user_name: String,
        message: String,
        timestamp: Date
    }]

})

mongoose.model('Chat', ChatSchema);
