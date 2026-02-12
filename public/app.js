const form = document.getElementById('userForm');
const userList = document.getElementById('userList');
const loader = document.getElementById('loader');
const searchBar = document.getElementById('searchBar')
const deleteModal = document.getElementById('deleteModal')
const deleteUserName = document.getElementById('deleteUserName')
const confirmDeleteBtn = document.getElementById('confirmDelete');
const cancelDeleteBtn = document.getElementById('cancelDelete');
let userToDelete = null; // Store the user temporarily
let allUsers = [];


//toggle spinner
function toggleLoading(show){
    loader.className = show ? "" : "hidden";
}

//fetch users form the server
async function fetchUsers() {
    toggleLoading(true);
    try{
        const res = await fetch('/api/users');
        const users = await res.json();
        allUsers = users;
        renderUsers(allUsers);
    }
    finally{
        toggleLoading(false);
    }
}

//Render users to screen
function renderUsers(usersToDisplay){
    userList.innerHTML = '';
    usersToDisplay.forEach(user =>{
        const li = document.createElement('li')
        li.innerHTML = `
        <div>
             <strong>${user.name}</strong><br>
             <small>${user.email}</small>
        </div>
        <button class = "edit-btn">Edit</button>
        <button class = "delete-btn">Delete</button>
        `;

        li.querySelector('.edit-btn').onclick = () => fillFormForEdit(user);
        li.querySelector('.delete-btn').onclick = () => deleteUser(user);
        userList.appendChild(li);
    })
}

//Search Login
searchBar.addEventListener('input', e =>{
    const term = e.target.value.toLowerCase();
    const filtered = allUsers.filter(u => u.name.toLowerCase().includes(term));
    renderUsers(filtered);
})

//New Update
let editId = null;
function fillFormForEdit(user){
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('submitBtn').textContent = "Update User";
    editId = user._id;
}



//Add and Edit user
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `/api/users/${editId}` : '/api/users';

    toggleLoading(true);
    await fetch(url, {
        method: method,
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({name, email})
    })

    //Reset State
    editId = null
    document.getElementById('submitBtn').textContent = "Add User";
    form.reset();
    fetchUsers();


});

//Delete Users
async function deleteUser(user) {
    userToDelete = user;
    deleteUserName.textContent = user.name;
    deleteModal.classList.remove("hidden");
}

confirmDeleteBtn.onclick = async ()=> {
    if (userToDelete){
        deleteModal.classList.add('hidden'); // Hide modal immediately
        toggleLoading(true);
    }
    await fetch(`/api/users/${userToDelete._id}`, {method: "DELETE"});
    userToDelete = null;
    fetchUsers();
}

cancelDeleteBtn.onclick = () =>{
    deleteModal.classList.add('hidden');
    userToDelete = null;
}


//Intial fetch
fetchUsers();