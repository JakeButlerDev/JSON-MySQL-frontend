// FOR ALL JS USED IN albums.html

// const { application } = require("express");

// GET all albums in SQL db
// Unused
// const getAllAlbums = () => {
//     const apiURL = "http://localhost:4500/api/albums/sql/all";
//     fetch(apiURL)
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById("responseAll").innerText = JSON.stringify(data, null, '\t');
//     })
//     .catch(error=> console.log(error));
// }

// GET one album in SQL db
// Unused
// const getAlbum = () => {
//     let id = document.getElementById("inputId").value;
//     const apiURL = `http://localhost:4500/api/albums/sql/id/${id}`;
//     fetch(apiURL)
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById("responseOne").innerText = JSON.stringify(data, null, '\t');
//     })
//     .catch(error => console.log(error));
// }

const isValidJSON = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

const clearInputs = () => {
    document.getElementById("albumId").value = ''
    document.getElementById("deletedId").value = '';
    document.getElementById("title").value = '';
    document.getElementById("userId").value = '';
    // document.getElementsByTagName("input").value = '';
    // document.getElementsByName("input").value = '';
}

const clearResponseText = () => {
    document.getElementById("response").innerText = '';
}

const reqAlbumId = (method) => {
    const apiURL = "http://localhost:4500/api";

    if (!['GET', 'DELETE'].includes(method)) {
        alert('Invalid method for requestPostId()');
        return;
    }

    if (method == 'DELETE') var albumId = parseInt(document.getElementById("deletedId").value);
     else var albumId = parseInt(document.getElementById("albumId").value);

     fetch(`${apiURL}/albums/sql/id/${albumId}`, {method: method})
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
        console.log(error);
        document.getElementById("response").innerText = error;
     })
     .finally(() => {
        document.getElementById("deletedId").value = '';
        document.getElementById("albumId").value = '';
    })
}

const reqAllAlbums = (method) => {
    const apiURL = "http://localhost:4500/api";

    if (!['GET', 'POST', 'DELETE'].includes(method)) {
        alert('Invalid method for reqAllPosts()');
    }

    fetch(`${apiURL}/albums/sql/all`, {method: method})
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
        console.log(error);
        document.getElementById("response").innerText = error;
    })
}

const postNewAlbum = () => {
    const apiURL = "http://localhost:4500/api";

    const userId = document.getElementById("userId").value;
    const title = document.getElementById("title").value;

    let errorMsg = []
    if (userId === '') errorMsg.push('Please enter a valid User ID.')
    if (title === '') errorMsg.push('Please enter a valid title.')

    if (errorMsg.length > 0) {
        console.log(errorMsg);
        clearInputs();
        document.getElementById("response").innerText = errorMsg.join('\n');
    }

    const updateBody = {
        userId: userId,
        title: title
    }

    fetch(`${apiURL}/albums/`, {
        method: 'POST',
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

const updateAlbum = () => {
    const apiURL = "http://localhost:4500/api";

    const albumId = parseInt(document.getElementById("albumId").value);
    const userId = document.getElementById("userId").value;
    const title = document.getElementById("title").value;

    let errorMsg = [];
    if (isNaN(albumId)) errorMsg.push('Please enter a valid album ID. Must be a number.');
    else if (albumId < 1) errorMsg.push('Please enter a valid album ID. Must be greater than 0.');

    if (errorMsg.length > 0) {
        console.log(errorMsg);
        document.getElementById("title").value = '';
        document.getElementById("userId").value = '';
        document.getElementById("albumId").value = '';
        document.getElementById("response").innerText = errorMsg.join('\n');
    }

    const updateBody = {
        id: albumId,
        userId: userId,
        title: title
    }

    fetch(`${apiURL}/albums/sql/id/${albumId}`, {
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