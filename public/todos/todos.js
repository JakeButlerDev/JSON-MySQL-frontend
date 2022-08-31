// FOR ALL JS USED IN todos.html

//GET all todos in SQL db
const getAllTodos = () => {
    const apiURL = "http://localhost:4500/api/todos/sql/all";
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            document.getElementById("responseAll").innerText = JSON.stringify(data, null, '\t');
        })
        .catch(error => console.log(error));
}

// GET one todo in SQL db
const getTodo = () => {
    let id = document.getElementById("inputId").value;
    const apiURL = `http://localhost:4500/api/todos/sql/id/${id}`;
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        document.getElementById("responseOne").innerText = JSON.stringify(data, null, '\t');
    })
    .catch(error => console.log(error));
}