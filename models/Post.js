const mongoose = require('mongoose')
const Schema = mongoose.Schema

//tao model

const postSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    text:{
        
    },
    date:{
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('baiviet', postSchema)