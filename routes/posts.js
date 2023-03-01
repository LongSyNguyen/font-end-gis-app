const express = require('express')
const router = express.Router()

// Load model
const Post = require('../models/Post')


// Hien thi form de tao bai viet moi
router.get('/add', (req, res) => {
  res.render('posts/add')
})

// Tao post moi
router.post('/', async (req, res) => {
  const { title, text } = req.body

  let errors = []

  if (!title) errors.push({ msg: 'Title required' })
  if (!text) errors.push({ msg: 'Text required' })
  if (errors.length > 0) res.render('posts/add', { title, text })
  else {
    const newPostData = { title, text }
    const newPost = new Post(newPostData)
    await newPost.save()
    res.redirect('/posts')
  }
})
module.exports = router
