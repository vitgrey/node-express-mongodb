const express = require('express')
const User = require('../models/User')
const Post = require('../models/Post')
const router = express.Router()

router.post('/create', async (req, res) => {
  // Create a new post
  try {
    const post = new Post(req.body)
    res.status(201).send('New post create!')
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/register', async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ token })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/login', async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken()
    res.send({ token })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/admin-auth', async (req, res) => {
  //Checking admin succes
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken()
    res.send({ token })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/home', async (req, res) => {
  return res.send('Hello from server side!');
});

module.exports = router