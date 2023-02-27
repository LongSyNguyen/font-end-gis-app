const {MongoClient} = require('mongodb')

let dbConnection 

module.exports={
    connectToDb:(cb) =>{
        MongoClient.connect('mongodb+srv://long:1234@cluster0.angauf4.mongodb.net/mydb')
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () =>dbConnection
}