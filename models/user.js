var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
  user_id: {
		type: String,
		required: true
	},
  email: {
		type: String,
		unique: true,
		required: true,
	},
  first_name: String,
  last_name: String,
  password: {
		type: String,
		required: true,
	},
  phone: String,
  createdDate: { 
  	type: Date, 
  	default: Date.now 
  }
});

mongoose.model('User', UserSchema);