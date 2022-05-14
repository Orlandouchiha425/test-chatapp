
const Schema = require('mongoose').Schema;

const messageSchema= new Schema({
    userName:{type: String, required:true},
    room:{type:Number, required: true},
    message:{type:String,required:true}

}, {
    timestamps:true
})

module.exports=messageSchema