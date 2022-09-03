// FOR ALL JS USED IN users.html

// const { response } = require("express");

// Test if a string is JSON data
const isValidJSON = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

const clearResponseText = () => {
    document.getElementById("response").innerText = '';
}

const clearInputs = () => {
    // Update with HTML input fields
    document.getElementById("postId").value = ''
    document.getElementById("deletedId").value = '';
    document.getElementById("body").value = '';
    document.getElementById("email").value = '';
    document.getElementById("commentId").value = '';
    document.getElementById("name").value = '';
}

// GET all comments in SQL db
// Currently unused
// const getAllComments = () => {
//     const apiURL = "http://localhost:4500/api/comments/sql/all";
//     fetch(apiURL)
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById("responseAll").innerText = JSON.stringify(data, null, '\t');
//         })
//         .catch(error => console.log(error));
// }

// GET one comment from SQL db
// Currently unused
// const getComment = () => {
//     let id = document.getElementById("inputId").value;
//     const apiURL = `http://localhost:4500/api/comments/sql/id/${id}`;
//     fetch(apiURL)
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById("responseOne").innerText = JSON.stringify(data, null, '\t');
//     })
//     .catch(error => console.log(error));
// }

const postNewComment = () => {
    const apiURL = "http://localhost:4500/api";

    const postId = document.getElementById("postId").value;
    const name = document.getElementById("name").value;
    const body = document.getElementById("body").value;
    const email = document.getElementById("email").value;

    let errorMsg = []
    if (postId === '') errorMsg.push('Please enter a valid Post ID.')
    if (name === '') errorMsg.push('Please enter a valid name.')
    if (body === '') errorMsg.push('lease enter a valid body.')
    if (email === '') errorMsg.push('lease enter a valid email.')

    if (errorMsg.length > 0) {
        console.log(errorMsg);
        clearInputs();
        document.getElementById("response").innerText = errorMsg.join('\n');
    }

    fetch(`${apiURL}/comments/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            postId: postId,
            name: name,
            email: email,
            body:body
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

const reqAllComments = (method) => {
    const apiURL = "http://localhost:4500/api";

    if (!['GET', 'POST', 'DELETE'].includes(method)) {
        alert('Invalid method for reqAllComments()');
    }

    fetch(`${apiURL}/comments/sql/all`, {method: method})
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

const requestCommentId = (method) => {
    const apiURL = "http://localhost:4500/api";

    if (!['GET', 'DELETE'].includes(method)) {
        alert('Invalid method for requestPostId()');
        return;
    }

    if (method == 'DELETE') var commentId = parseInt(document.getElementById("deletedId").value);
     else var commentId = parseInt(document.getElementById("commentId").value);

     fetch(`${apiURL}/comments/sql/id/${commentId}`, {method: method})
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
        clearInputs();
     })
}

const updateComment = () => {
    const apiURL = "http://localhost:4500/api";

    const commentId = parseInt(document.getElementById("commentId").value);
    const postId = parseInt(document.getElementById("postId").value);
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const body = document.getElementById("body").value;

    let errorMsg = [];
    if (isNaN(commentId)) errorMsg.push('Please enter a valid comment ID. Must be a number.');
    else if (commentId < 1) errorMsg.push('Please enter a valid comment ID. Must be greater than 0.');

    if (errorMsg.length > 0) {
        console.log(errorMsg);
        document.getElementById("name").value = '';
        document.getElementById("commentId").value = '';
        document.getElementById("postId").value = '';
        document.getElementById("body").value = '';
        document.getElementById("email").value = '';
        document.getElementById("response").innerText = errorMsg.join('\n');
    }

    const updateBody = {
        id: commentId,
        postId: postId,
        name: name,
        body: body,
        email: email
    }

    fetch(`${apiURL}/comments/sql/id/${commentId}`, {
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