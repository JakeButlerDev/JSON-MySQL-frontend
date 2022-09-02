// FOR ALL JS USED IN posts.html

// TODO: Better error handling in reqAllPosts(), requestPostId()

// const { response } = require("express");
// const res = require("express/lib/response");

const isValidJSON = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

// GET all posts in SQL db
const getAllPosts = () => {
    const apiURL = "http://localhost:4500/api/posts/sql/all";
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            // const parsedJSON = JSON.parse(data)
            document.getElementById("response").innerText = JSON.stringify(data, null, '\t');
        })
        .catch(error => console.log(error));
}

// GET one post by id from SQL db
const getPost = () => {
    let id = document.getElementById("inputId").value;
    const apiURL = `http://localhost:4500/api/posts/sql/id/${id}`;
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        const parsedJSON = JSON.parse(data)
        document.getElementById("response").innerText = JSON.stringify(parsedJSON, null, '\t');
    })
    .catch(error => console.log(error));
}

// postNewPost

// updatePost

// GET, POST, DELETE one post by id
const requestPostId = (method) => {
    const apiURL = "http://localhost:4500/api";

    if (!['GET', 'DELETE'].includes(method)) {
        alert('Invalid method for requestPostId()');
        return;
    }

    if (method == 'DELETE') var postId = parseInt(document.getElementById("deletedId").value);
     else var postId = parseInt(document.getElementById("postId").value);

    // const postId = parseInt(document.getElementById("postId").value);

    // Would like to handle errors better, seek improvement over in-class structure
    // let errorMsg = []

    fetch(apiURL + '/posts/sql/id/' + postId, {method: method})
    .then(response => response.text())
    .then(data => {
        if (isValidJSON(data)) {
            const parseJSON = JSON.parse(data);
            document.getElementById("response").innerText = JSON.stringify(parseJSON, null, '\t');
        }
        else {
            document.getElementById("response").innerText = data;

        }
    })
    .catch(error => {
        console.log(error)
        document.getElementById("response").innerText = error
    })
    .finally(() => {
        document.getElementById("deletedId").value = '';
        document.getElementById("postId").value = '';
        // document.getElementById("response").innerText = '';
    })
}

const reqAllPosts = (method) => {
    const apiURL = "http://localhost:4500/api";

    if (!['GET', 'POST', 'DELETE'].includes(method)) {
        alert('Invalid method for reqAllPosts()');
    }

    fetch(`${apiURL}/posts/sql/all`, {method: method})
    .then(response => response.text())
    .then(data => {
        if (isValidJSON(data)) {
            const parseJSON = JSON.parse(data);
            document.getElementById("response").innerText = JSON.stringify(parseJSON, null, '\t');
        }
        else {
            document.getElementById("response").innerText = data;

        } 
    })
    .catch(error => {
        console.log(error)
        document.getElementById("response").innerText = error
    })
}

const clearResponseText = () => {
    document.getElementById("response").innerText = '';
}