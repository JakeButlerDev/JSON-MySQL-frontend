// Requiring in JS is equivalent to using our import statements in Java, here we're importing express module
const express = require('express')
const path = require('path')

// Creating an instance of express (creating the server)
const app = express()
// Defining our port
const port = 3500

// Allows frontend to serve static files
app.use(express.static('public'))
app.use('/users', express.static('users'))
app.use('/photos', express.static('photos'))
app.use('/posts', express.static('posts'))
app.use('/comments', express.static('comments'))
app.use('/albums', express.static('albums'))
app.use('/todos', express.static('todos'))

// Creating a route for the root path
app.get('/test', function (req, res) {
  res.send('Test')
})

// Trying to split each endpoint with its own route
app.get('/users', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/users/users.html'))
})

app.get('/photos', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/photos/photos.html'))
})

app.get('/posts', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/posts/posts.html'))
})

app.get('/comments', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/comments/comments.html'))
})

app.get('/albums', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/albums/albums.html'))
})

app.get('/todos', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/todos/todos.html'))
})

// Sets the port to listen on
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
})