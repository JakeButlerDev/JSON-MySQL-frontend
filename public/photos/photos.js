// FOR ALL JS USED IN photos.html

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
    document.getElementById("photoId").value = ''
    document.getElementById("deletedId").value = '';
    document.getElementById("url").value = '';
    document.getElementById("thumbnailUrl").value = '';
    document.getElementById("title").value = '';
    document.getElementById("albumId").value = '';
    // document.getElementsByTagName("input").value = '';
    // document.getElementsByName("input").value = '';
}

// GET all photos in SQL db
// Currently unused
// const getAllPhotos = () => {
//     const apiURL = "http://localhost:4500/api/photos/sql/all";
//     fetch(apiURL)
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById("responseAll").innerText = JSON.stringify(data, null, '\t');
//         })
//         .catch(error => console.log(error));
// }

// GET one photo in SQL db
// Currently unused
// const getPhoto = () => {
//     let id = document.getElementById("inputId").value;
//     const apiURL = `http://localhost:4500/api/photos/sql/id/${id}`;
//     fetch(apiURL)
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById("responseOne").innerText = JSON.stringify(data, null, '\t');
//     })
//     .catch(error => console.log(error));
// }

const requestPhotoId = (method) => {
    const apiURL = "http://localhost:4500/api";

    if (!['GET', 'DELETE'].includes(method)) {
        alert('Invalid method for requestPhotoId()');
        return;
    }

    if (method == 'DELETE') var photoId = parseInt(document.getElementById("deletedId").value);
     else var photoId = parseInt(document.getElementById("photoId").value);

     fetch(`${apiURL}/photos/sql/id/${photoId}`, {method: method})
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
        document.getElementById("photoId").value = '';
    })
}

const reqAllPhotos = (method) => {
    const apiURL = "http://localhost:4500/api";

    if (!['GET', 'POST', 'DELETE'].includes(method)) {
        alert('Invalid method for reqAllPosts()');
    }

    fetch(`${apiURL}/photos/sql/all`, {method: method})
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

const postNewPhoto = () => {
    const apiURL = "http://localhost:4500/api";

    const albumId = document.getElementById("albumId").value;
    const title = document.getElementById("title").value;
    const url = document.getElementById("url").value;
    const thumbnailUrl = document.getElementById("thumbnailUrl").value;

    let errorMsg = []
    if (albumId === '') errorMsg.push('Please enter a valid Album ID.')
    if (title === '') errorMsg.push('Please enter a valid title.')
    if (url === '') errorMsg.push('lease enter a valid url.')
    if (thumbnailUrl === '') errorMsg.push('lease enter a valid thumbnail url.')

    if (errorMsg.length > 0) {
        console.log(errorMsg);
        clearInputs();
        document.getElementById("response").innerText = errorMsg.join('\n');
    }

    fetch(`${apiURL}/photos/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            albumId: albumId,
            title: title,
            url: url,
            thumbnailUrl: thumbnailUrl
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

const updatePhoto = () => {
    const apiURL = "http://localhost:4500/api";

    const photoId = parseInt(document.getElementById("photoId").value);
    const albumId = document.getElementById("albumId").value;
    const title = document.getElementById("title").value;
    const url = document.getElementById("url").value;
    const thumbnailUrl = document.getElementById("thumbnailUrl").value;

    let errorMsg = [];
    if (isNaN(photoId)) errorMsg.push('Please enter a valid photo ID. Must be a number.');
    else if (photoId < 1) errorMsg.push('Please enter a valid photo ID. Must be greater than 0.');

    if (errorMsg.length > 0) {
        console.log(errorMsg);
        document.getElementById("title").value = '';
        document.getElementById("albumId").value = '';
        document.getElementById("url").value = '';
        document.getElementById("thumbnailUrl").value = '';
        document.getElementById("response").innerText = errorMsg.join('\n');
    }

    const updateBody = {
        id: photoId,
        albumId: albumId,
        title: title,
        url: url,
        thumbnailUrl: thumbnailUrl
    }

    fetch(`${apiURL}/photos/sql/id/${photoId}`, {
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