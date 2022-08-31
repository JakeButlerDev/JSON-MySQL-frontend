// FOR ALL JS USED IN users.html

// GET all comments in SQL db
const getAllComments = () => {
    const apiURL = "http://localhost:4500/api/comments/sql/all";
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            document.getElementById("responseAll").innerText = JSON.stringify(data, null, '\t');
        })
        .catch(error => console.log(error));
}

// GET one comment from SQL db
const getComment = () => {
    let id = document.getElementById("inputId").value;
    const apiURL = `http://localhost:4500/api/comments/sql/id/${id}`;
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        document.getElementById("responseOne").innerText = JSON.stringify(data, null, '\t');
    })
    .catch(error => console.log(error));
}