const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
    username:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    isDeleted:{type:String,require:true},
    addTime:{type:String,require:true}
})

module.exports = mongoose.model('bookings',bookingSchema)