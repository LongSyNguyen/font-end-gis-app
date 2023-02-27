const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb} = require('./db.js')
const { connectDB }  =  require('./mongodb.js')
const app = express()

app.use(express.json())
let db

connectToDb((err)=>{
    if (!err){
        app.listen(3000, () => {
            console.log('app listen on port 3000')
        })
        db = getDb()
    }
})

//routes
app.get('/books', (req, res)=>{
    const page = req.query.p || 0
    const BooksPerPage = 1

    let bookstore=[]
    db.collection('bookstore') 
    .find()
    .sort({ author: 1 })
    .skip(page*BooksPerPage)
    .limit(BooksPerPage)
    .forEach(book=> bookstore.push(book))
    .then(()=>{
        res.status(200).json(bookstore)
    })
    .catch(()=>{
        res.status(500).json({error:"Could not feacth the documents"})
    })
    // res.json({mssg: "Wellcome"})
})
app.get('/books/:id',(req, res)=>{
    if (ObjectId.isValid(req.params.id)){
        db.collection('bookstore')
            .findOne({_id: new ObjectId(req.params.id)})
            .then(doc =>{
                res.status(200).json(doc)
            })
            .catch(err=>{
                res.status(500).json({error:"Could not find the document"})
            })
    }else{
        res.status(500).json({error:"Invalid ID"})
    }
})

app.post('/books', (req, res)=>{
    const book = req.body
    db.collection('bookstore')
    .insertOne(book)
    .then(result =>{
        res.status(201).json(result)
    })
    .catch(err=>{
        res.status(500).json({err:"Error inserting the document"})
    })
})

app.delete('/books/:id', (req,res) =>{
    if (ObjectId.isValid(req.params.id)){
        db.collection('bookstore')
            .deleteOne({_id: new ObjectId(req.params.id)})
            .then(result =>{
                res.status(200).json(result)
            })
            .catch(err=>{
                res.status(500).json({error:"Could not find the document"})
            })
    }else{
        res.status(500).json({error:"Invalid ID"})
    }
})

app.patch('/books/:id', (req, res)=>{
    const updates  = req.body
    if (ObjectId.isValid(req.params.id)){
        db.collection('bookstore')
            .updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
            .then(result =>{
                res.status(200).json(result)
            })
            .catch(err=>{
                res.status(500).json({error:"Could update the document"})
            })
    }else{
        res.status(500).json({error:"Invalid ID"})
    }
})

const hostname = 'localhost'
const port = 8017


app.get('/', (req, res)=>{
    res.end('<h1> Hello word</h1>')
})

app.listen(port, hostname, ()=>{
    console.log('hello long, Im running at '+  hostname + ':'+ port )
})