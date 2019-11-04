document.addEventListener('DOMContentLoaded', () => {
    // loadUsers();
    // const addUserform = document.querySelector('#addUserForm');
    // addUserform.addEventListener('submit', addUserFormSubmitted);
    loadPosts()
    const createANewPost = document.querySelector('#createANewPost');
    createANewPost.addEventListener('submit', createNewPost);

    const displayFromAUser = document.querySelector('#displayAllPostFromGivenUser');
    displayFromAUser.addEventListener('submit', displayUserPost);
 
});



async function loadPosts() {
    const  allPost = document.querySelector("#allPostList");
    allPost.innerHTML = "" ;
    const response = await axios.get(`http://localhost:3000/posts/all`)
    response.data.payload.forEach((posts) =>{
        let listPost = document.createElement('li')
        listPost.innerText = ` ${posts.poster_id}, ${posts.body}`;
        allPost.appendChild(listPost)
    })
}

async function  displayUserPost (event) {
    event.preventDefault();  
    let userId = document.querySelector('#id').value;  
    const response = await axios.get(`http://localhost:3000/posts/${userId}`)
    const  userPost= document.querySelector("#postByAUser");
    userPost.innerHTML = "" 
    console.log(response.data.payload)
    response.data.payload.forEach((posts) =>{
        let listPost = document.createElement('li')
        listPost.innerText = `${posts.body}`;
        userPost.appendChild(listPost)
    })
}

async function createNewPost(event) {
    event.preventDefault();
    const poster_id = document.querySelector('#postIdAll').value
    const body  = document.querySelector('#postBodyAll').value
    let response = await axios.post(`http://localhost:3000/posts/register`, {poster_id, body})
    loadPosts()

}

// async function loadUsers() {
//     const usersList = document.querySelector('#usersList');
//     usersList.innerHTML = "";
//     const response = await axios.get(`http://localhost:3000/users`);
//     response.data.payload.forEach((user) => {
//         let listItem = document.createElement("li");
//         listItem.innerText = `${user.firstname} ${user.lastname}, age ${user.age}`;
//         usersList.appendChild(listItem);
//     });
// }


// async function addUserFormSubmitted(event) {
//     event.preventDefault();    
//     const firstname = document.querySelector('#firstNameInput').value;
//     const lastname = document.querySelector('#lastNameInput').value;
//     const age = document.querySelector('#ageInput').value;
//     let response = await axios.post(`http://localhost:3000/users/register`, {firstname, lastname, age });
//     loadUsers();
// }

