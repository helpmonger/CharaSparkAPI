  var mongoose = require('mongoose'),
      Schema = mongoose.Schema;

  var DonationSchema = new Schema({
      _donor: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true
      },
      _charity: {
          type: Schema.Types.ObjectId,
          ref: 'Charity',
          required: true
      },
      _wish: {
          type: Schema.Types.ObjectId,
          ref: 'Wish',
          required: true
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
