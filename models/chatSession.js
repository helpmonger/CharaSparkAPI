var mongoose = require('mongoose')
Schema = mongoose.Schema;

var ChatSessionSchema = Schema({

    timestamp: Date,
    user1: String,
    user2: String
})

mongoose.model('ChatSession', ChatSessionSchema);
