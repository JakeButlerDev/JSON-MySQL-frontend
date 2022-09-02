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
    // document.getElementById("postId").value = ''
    // document.getElementById("deletedId").value = '';
    // document.getElementById("body").value = '';
    // document.getElementById("title").value = '';
    // document.getElementById("userId").value = '';
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

// const postNewComment = () => {

// }

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

// const updateComment = () => {

// }