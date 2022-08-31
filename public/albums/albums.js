// FOR ALL JS USED IN albums.html

// GET all albums in SQL db
const getAllAlbums = () => {
    const apiURL = "http://localhost:4500/api/albums/sql/all";
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        document.getElementById("responseAll").innerText = JSON.stringify(data, null, '\t');
    })
    .catch(error=> console.log(error));
}

// GET one album in SQL db
const getAlbum = () => {
    let id = document.getElementById("inputId").value;
    const apiURL = `http://localhost:4500/api/albums/sql/id/${id}`;
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        document.getElementById("responseOne").innerText = JSON.stringify(data, null, '\t');
    })
    .catch(error => console.log(error));
}