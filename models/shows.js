const mongoose = require('mongoose')

const showSchema = mongoose.Schema({
    id:{type:String,require:true},
    username:{type:String,require:true},
    email:{type:String},
    password:{type:String,require:true},
    isDeleted: {type: Boolean,require:true}
})

module.exports = mongoose.model('shows',showSchema)