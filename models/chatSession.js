var mongoose = require('mongoose')
Schema = mongoose.Schema;

var ChatSessionSchema = Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    // user1: String,
    // user2: String
    users: [String]
})

mongoose.model('ChatSession', ChatSessionSchema);
