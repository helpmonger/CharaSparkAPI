var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WishSchema = new Schema({

    _wishMaker: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _fulfiller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    _charity: {
        type: Schema.Types.ObjectId,
        ref: 'Charity',
        required: true
    },
    _donation: {
        type: Schema.Types.ObjectId,
        ref: 'Donation'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    //statuses:
    //new
    //pending (accepted by fulfiller, pending wish maker approval)
    //progressing
    //completed
    //cancelled (cancelled by wishmaker)
    //aborted (cancelled by fulfiller)

    wishStatus: {
        type: String,
        default: 'new'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    location: [Number],
    startDate: {
        type: Date
    },
    expireDate: {
        type: Date
    }
});

mongoose.model('Wish', WishSchema);
