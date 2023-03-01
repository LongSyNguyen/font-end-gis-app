const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async()=>{
    mongoose.set('strictQuery', true)
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("da ket noi csdl")
    }catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
 
module.exports = connectDB