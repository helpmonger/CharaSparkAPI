var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var CharitySchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	address: {
	    address: String,
	    address_2:  String,
	    city: String,
	    state: String,
	    zipcode: String
	},
	phone: {
		type: String
	},
	createdDate: { 
		type: Date, 
		default: Date.now 
	},
	category: {
		type: String
	},
	gps: [Number],
	url: {
		type: String
	}
});

mongoose.model('Charity', CharitySchema);