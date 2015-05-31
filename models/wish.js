  var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var WishSchema = new Schema({
    _wishMaker : { 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    _fulfiller : { 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    _charity: {
      type: Schema.Types.ObjectId, 
      ref: 'Charity' 
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
    wishStatus: {
      type: String,
      default: 'new'      //other statuses are: pending (accepted by fulfiller, pending wish maker approval) , proceeding, completed, cancelled (cancelled by wishmaker), aborted (cancelled by fulfiller)
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

  WishSchema.methods.hasPaid = function (password, callback) {
  bcrypt.compare(password, this.password, callback);
}

  mongoose.model('Wish', WishSchema);