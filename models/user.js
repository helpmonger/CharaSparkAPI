var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    cryptoUtil = require('../services/auth/cryptoUtil'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    user_name: {
        type: String
    },

    googleId: String,

    facebookId: String,

    status: {
        type: String,
        //valid values are: pending, active, disabled
        default: 'pending'
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
    },

    forgotPassword: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function() {
    var user = this.toObject();
    delete user.password;
    return user;
};

UserSchema.methods.comparePasswords = function(password, callback) {
    bcrypt.compare(password, this.password, callback);
}

UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified()) return next();

    cryptoUtil.hashPassword(user.password).then(function(data, err) {
        if(err){
            return next(err);
        } else {
            user.password = data; 
            next();
        }
    });
})

mongoose.model('User', UserSchema);
