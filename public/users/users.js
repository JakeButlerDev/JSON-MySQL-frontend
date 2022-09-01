// FOR ALL JS USED IN users.html


// Test response type to make sure we're not parsing plain text
const isValidJSON = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

// GET all users in SQL db
const getAllUsers = () => {
    const apiURL = "http://localhost:4500/api/users/sql/all"
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            document.getElementById("responseAll").innerText = JSON.stringify(data, null, '\t');
        })
        .catch(error => console.log(error));
}

const requestUserId = (method) => {
    if (!['GET', 'DELETE'].includes(method)) {
        alert('Invalid method used for requestAllUsers.');
        return
    }

    const userId = parseInt(document.getElementById("userId").value);

    let errorMsg = '';
    if (isNaN(userId)) errorMsg = 'Please enter a valid user ID. Must be a number.';
    else if (userId < 1) errorMsg = 'Please enter a valid user ID. Must be greater than 0.';

    if (errorMsg !== '') {
        document.getElementById("userId").value = '';
        document.getElementById("response").innerText = errorMsg;
        return;
    }

    fetch(apiURL + '/users/sql/id' + userId, {method: method})
    .then(response => response.text())
    .then(data => {
        if (isValidJSON(data)) {
            const parseJSON = JSON.parse(data);
            document.getElementById("response").innerText = JSON.stringify(data, null, '\t');
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
        document.getElementById("userName").value = '';
    })
}

// REQUEST ALL USERS - GABE METHOD
const reqAllUsers = (method /* GET, POST, DELETE */ ) => {
    const apiURL = "http://localhost:4500/api";

    if (!['GET', 'POST', 'DELETE'].includes(method)) {
        alert('Invalid method used with fetch.');
    }
    
    fetch(apiURL + '/users/sql/all', {method: method})
    .then(response => response.text())
    .then(data => {
        if (isValidJSON(data)) {
            const parseJSON = JSON.parse(data);
            document.getElementById("response").innerText = JSON.stringify(data, null, '\t');
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

// GET one user by id in SQL db
const getUser = () => {
    let id = document.getElementById("inputId").value;
    const apiURL = `http://localhost:4500/api/users/sql/id/${id}`;
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        document.getElementById("responseOne").innerText = JSON.stringify(data, null, '\t');
    })
    .catch(error => console.log(error));
}

// DELETE one user by id in SQL db
const deleteUser = () => {
    let id = document.getElementById("deleteId").value;
    const apiURL = `http://localhost:4500/api/users/sql/id/${id}`;
    // What is delete equivalent of fetch?
}

// DELETE all users in SQL db

// CURRENTLY, Frontend not set up to understand backend messages i.e. 'User not found', 'Must be an integer', etc.                Data is stored in entire table fields, IDs do not correspond to data type and therefore when user is entering IDs can be confusing to enter correct value

const clearResponseText = () => {
    document.getElementById("responseAll").innerText = '';
}

const postNewUser = () => {
    const userName = document.getElementById("username").value;
    const userEmail = document.getElementById("email").value;

    console.log(userName, userEmail);

    let errorMsg = [];

    if (userName === '') errorMsg.push('Please enter a valid username. ')
    if (userEmail === '') errorMsg.push('lease enter a valid email.')

    if (errorMsg.length > 0) {
        console.log(errorMsg);
        document.getElementById("username").value = '';
        document.getElementById("email").value = '';
        document.getElementById("response").innerText = errorMsg.join('\n');
    }

    fetch(apiURL + '/users/', {
        method: POST,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            // name: name
            username: userName,
            email: userEmail
        })
    })
    .then(response => response.text())
    .then(data => {
        if (isValidJSON) {
            const parsedJSON = JSON.parse(data);
            document.getElementById("response").innerText = JSON.stringify(data, null, '\t');
        } else {
            document.getElementById("response").innerText = data;
        }
    })
    .catch(error => {
        console.log(error);
        document.getElementById("response").innerText = error;
    })
    .finally(() => {
        document.getElementById("username").value = '';
        document.getElementById("email").value = '';
    })
}