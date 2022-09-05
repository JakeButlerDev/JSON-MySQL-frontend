// FOR ALL JS USED IN todos.html

// const { application } = require("express");

//GET all todos in SQL db
// Currently not in use
// const getAllTodos = () => {
//     const apiURL = "http://localhost:4500/api/todos/sql/all";
//     fetch(apiURL)
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById("responseAll").innerText = JSON.stringify(data, null, '\t');
//         })
//         .catch(error => console.log(error));
// }

// GET one todo in SQL db
// Currently not in use
// const getTodo = () => {
//     let id = document.getElementById("inputId").value;
//     const apiURL = `http://localhost:4500/api/todos/sql/id/${id}`;
//     fetch(apiURL)
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById("responseOne").innerText = JSON.stringify(data, null, '\t');
//     })
//     .catch(error => console.log(error));
// }

const clearResponseText = () => {
    document.getElementById("response").innerText = '';
}

const isValidJSON = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

const clearInputs = () => {
    document.getElementById("todoId").value = ''
    document.getElementById("deletedId").value = '';
    document.getElementById("completed").value = '';
    document.getElementById("title").value = '';
    document.getElementById("userId").value = '';
    // document.getElementsByTagName("input").value = '';
    // document.getElementsByName("input").value = '';
}

const requestTodoId = (method) => {
    const apiURL = "http://localhost:4500/api";

    if (!['GET', 'DELETE'].includes(method)) {
        alert('Invalid method for requestTodoId()');
        return;
    }

    if (method == 'DELETE') var todoId = parseInt(document.getElementById("deletedId").value);
     else var todoId = parseInt(document.getElementById("todoId").value);

     fetch(`${apiURL}/todos/sql/id/${todoId}`, {method: method})
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
        document.getElementById("todoId").value = '';
        // document.getElementById("response").innerText = '';
    })
}

const reqAllTodos = (method) => {
    const apiURL = "http://localhost:4500/api";

    if (!['GET', 'POST', 'DELETE'].includes(method)) {
        alert('Invalid method for reqAllTodos()');
    }

    fetch(`${apiURL}/todos/sql/all`, {method: method})
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

const postNewTodo = () => {
    const apiURL = "http://localhost:4500/api";

    const userId = document.getElementById("userId").value;
    const title = document.getElementById("title").value;
    const completed = document.getElementById("completedDropdown").value;

    let errorMsg = []
    if (userId === '') errorMsg.push('Please enter a valid User ID.')
    if (title === '') errorMsg.push('Please enter a valid title.')
    if (completed.toUpperCase() != 'Y' || completed.toUpperCase() != 'N') alert('Please enter Y or N.')
    // Go back into IntelliJ, change completed back to boolean and make drop down menu for T/F, restricting user input OR make checkbox, not a bad option

    if (errorMsg.length > 0) {
        console.log(errorMsg);
        clearInputs();
        document.getElementById("response").innerText = errorMsg.join('\n');
    }

    const updateBody = {
        userId: userId,
        title: title,
        completed: completed
    }

    fetch(`${apiURL}/todos/`, {
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

const updateTodo = () => {
    const apiURL = "http://localhost:4500/api";

    const todoId = parseInt(document.getElementById("todoId").value);
    const userId = document.getElementById("userId").value;
    const title = document.getElementById("title").value;
    const completed = document.getElementById("completed").value;

    let errorMsg = [];
    if (isNaN(todoId)) errorMsg.push('Please enter a valid todo ID. Must be a number.');
    else if (todoId < 1) errorMsg.push('Please enter a valid todo ID. Must be greater than 0.');

    if (errorMsg.length > 0) {
        console.log(errorMsg);
        document.getElementById("todoId").value = '';
        document.getElementById("userId").value = '';
        document.getElementById("title").value = '';
        document.getElementById("completed").value = '';
        document.getElementById("response").innerText = errorMsg.join('\n');
    }

    const updateBody = {
        id: todoId,
        userId: userId,
        title: title,
        completed: completed
    }

    fetch(`${apiURL}/todos/sql/id/${todoId}`, {
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