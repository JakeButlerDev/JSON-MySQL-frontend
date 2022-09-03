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

// Clear all inout fields, to be called when other methods are finished
const clearInputs = () => {
    document.getElementById("postId").value = ''
    document.getElementById("deletedId").value = '';
    document.getElementById("body").value = '';
    document.getElementById("title").value = '';
    document.getElementById("userId").value = '';
    // document.getElementsByTagName("input").value = '';
    // document.getElementsByName("input").value = '';
}

// GET all posts in SQL db
// Currently unused
// const getAllPosts = () => {
//     const apiURL = "http://localhost:4500/api/posts/sql/all";
//     fetch(apiURL)
//         .then(response => response.json())
//         .then(data => {
//             // const parsedJSON = JSON.parse(data)
//             document.getElementById("response").innerText = JSON.stringify(data, null, '\t');
//         })
//         .catch(error => console.log(error));
// }

// GET one post by id from SQL db
// Currently unused
// const getPost = () => {
//     let id = document.getElementById("inputId").value;
//     const apiURL = `http://localhost:4500/api/posts/sql/id/${id}`;
//     fetch(apiURL)
//     .then(response => response.json())
//     .then(data => {
//         const parsedJSON = JSON.parse(data)
//         document.getElementById("response").innerText = JSON.stringify(parsedJSON, null, '\t');
//     })
//     .catch(error => console.log(error));
// }

// Create a new post and add to db
const postNewPost = () => {
    const apiURL = "http://localhost:4500/api";

    const userId = document.getElementById("userId").value;
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    let errorMsg = []
    if (userId === '') errorMsg.push('Please enter a valid User ID.')
    if (title === '') errorMsg.push('Please enter a valid title.')
    if (body === '') errorMsg.push('lease enter a valid body.')

    if (errorMsg.length > 0) {
        console.log(errorMsg);
        clearInputs();
        document.getElementById("response").innerText = errorMsg.join('\n');
    }

    fetch(`${apiURL}/posts/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            title: title,
            body: body
        })
    })
    .then(response => response.text())
    .then(data => {
        if (isValidJSON) {
            const parsedJSON = JSON.parse(data);
            document.getElementById("response").innerText = JSON.stringify(parsedJSON, null, '\t');
        } else {
            document.getElementById("response").innerText = data;
        }
    })
    .catch(error => {
        console.log(error);
        document.getElementById("response").innerText = error;
    })
    .finally(() => {
        clearInputs();
    })
}

// PUT one post by id with new input data
const updatePost = () => {
    const apiURL = "http://localhost:4500/api";

    const postId = parseInt(document.getElementById("postId").value);
    const userId = document.getElementById("userId").value;
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    let errorMsg = [];
    if (isNaN(postId)) errorMsg.push('Please enter a valid post ID. Must be a number.');
    else if (postId < 1) errorMsg.push('Please enter a valid post ID. Must be greater than 0.');

    if (errorMsg.length > 0) {
        console.log(errorMsg);
        document.getElementById("name").value = '';
        document.getElementById("username").value = '';
        document.getElementById("email").value = '';
        document.getElementById("response").innerText = errorMsg.join('\n');
    }

    const updateBody = {
        id: postId,
        userId: userId,
        title: title,
        body: body
    }

    fetch(`${apiURL}/posts/sql/id/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateBody)
    })
    .then(response => response.text())
    .then(data => {
        if (isValidJSON) {
            const parsedJSON = JSON.parse(data);
            document.getElementById("response").innerText = JSON.stringify(parsedJSON, null, '\t');
        } else {
            document.getElementById("response").innerText = data;
        }
    })
    .catch(error => {
        console.log(error);
        document.getElementById("response").innerText = error;
    })
    .finally(() => {
        clearInputs();
    })
}

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

// GET, POST, DELETE all posts
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

// Clear current data shown in div "response"
const clearResponseText = () => {
    document.getElementById("response").innerText = '';
}