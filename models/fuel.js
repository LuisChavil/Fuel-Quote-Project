const mongoose = require('./mongoose');

const FuelQuoteSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now, 
        
    },

    firstentry: {
        type: Boolean,
        required: true,
    },

    // suggestedprice: {
    //     type: Number,
    //     required: true,
        
    // },

    // deliverydate: {
    //     type: Date,
    // },

    gallonsrequested: {
        type: Number,
        required: true,
        
    },

    userid: {
        type: mongoose.ObjectId,
        required: true,
    }

    // totalamount: {
    //     type: Number,
    //     required: true,
        
    // },
})

const FuelQuote = mongoose.model("fuelquote", FuelQuoteSchema);
module.exports = FuelQuote;