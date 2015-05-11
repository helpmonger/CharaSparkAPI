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
      required: true
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