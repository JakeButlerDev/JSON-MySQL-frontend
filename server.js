// Requiring in JS is equivalent to using our import statements in Java, here we're importing express module
const express = require('express')

// Creating an instance of express (creating the server)
const app = express()

// Allows frontend to serve static files
app.use(express.static('public'))

// Creating a route for the root path
app.get('/test', function (req, res) {
  res.send('Test')
})

// Sets the port to listen on
app.listen(3500, () => {
    console.log('Server running on port 3500...');
})