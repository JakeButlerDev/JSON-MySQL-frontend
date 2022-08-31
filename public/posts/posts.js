// FOR ALL JS USED IN posts.html

// GET all posts in SQL db
const getAllPosts = () => {
    const apiURL = "http://localhost:4500/api/posts/sql/all";
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            document.getElementById("responseAll").innerText = JSON.stringify(data, null, '\t');
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
        document.getElementById("responseOne").innerText = JSON.stringify(data, null, '\t');
    })
    .catch(error => console.log(error));
}