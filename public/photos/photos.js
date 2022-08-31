// FOR ALL JS USED IN photos.html

// GET all photos in SQL db
const getAllPhotos = () => {
    const apiURL = "http://localhost:4500/api/photos/sql/all";
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            document.getElementById("responseAll").innerText = JSON.stringify(data, null, '\t');
        })
        .catch(error => console.log(error));
}

// GET one photo in SQL db
const getPhoto = () => {
    let id = document.getElementById("inputId").value;
    const apiURL = `http://localhost:4500/api/photos/sql/id/${id}`;
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        document.getElementById("responseOne").innerText = JSON.stringify(data, null, '\t');
    })
    .catch(error => console.log(error));
}