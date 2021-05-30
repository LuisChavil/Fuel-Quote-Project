const mongoose = require('./mongoose');
const bcrypt = require("bcryptjs"); // to hide password
const UserSchema = new mongoose.Schema({

fullname: {
    type: String,
    required: true,
    
},

email: {
    type: String,
    required: true,
    unique: true,
},

telephone: {
    type: String,
    required: true,
},


address: {
    type: String,
    required: true,
},

city: {
    type: String,
    required: true,
},

state: {
    type: String,
    required: true,
},

zip: {
    type: String,
    required: true,
},


username: {
    type: String,
    required: true,
    unique: true,
},

password: {
    type: String,
    required: true,
},

})


UserSchema.pre("save", function(next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password = bcrypt.hashSync(
        this.password,
        bcrypt.genSaltSync()
    );
    next();
})

UserSchema.methods.comparePassword = function(plaintext) {
    return bcrypt.compare(plaintext, this.password);
}

const User = mongoose.model("user", UserSchema);
module.exports = User;