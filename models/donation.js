  var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var DonationSchema = new Schema({
    _donor : { 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },    
    _charity: {
      type: Schema.Types.ObjectId, 
      ref: 'Charity' 
    },
    _wish: {
      type: Schema.Types.ObjectId, 
      ref: 'Wish' 
    },
    amount: {
      type: Number,
      required: true
    },
    paidDate: {
      type: Date,
      default: null
    },
    createdDate: { 
      type: Date, 
      default: Date.now 
    } 
  });

  mongoose.model('Donation', DonationSchema);