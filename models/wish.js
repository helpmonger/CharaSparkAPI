var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var WishSchema = new Schema({
  _donor : { type: Number, ref: 'User' },
  _fulfiller : { type: Number, ref: 'User' },
  _charity: {type: Number, ref: 'Charity' },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  donationAmt: {
    type: String,
    required: true,
  },
  hasPaid: Boolean,
  wishStatus: String,
  createdDate: { type: Date, default: Date.now },
  location      : {
        longitude : String
      , latitude  : String
    }
});

mongoose.model('Wish', WishSchema);