document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
});

document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (title && content) {
        const post = {
            id: Date.now(),
            title: title,
            content: content
        };
        
        addPostToLocalStorage(post);
        displayPost(post);
        
        // Clear input fields
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
    }
});

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(post => {
        displayPost(post);
    });
}

function addPostToLocalStorage(post) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
}

function displayPost(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.setAttribute('data-id', post.id);

    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;
    postDiv.appendChild(postTitle);

    const postContent = document.createElement('p');
    postContent.textContent = post.content;
    postDiv.appendChild(postContent);

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('post-actions');
    postDiv.appendChild(actionsDiv);

    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editPost(post.id);
    actionsDiv.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deletePost(post.id);
    actionsDiv.appendChild(deleteButton);

    document.getElementById('blogPosts').appendChild(postDiv);
}

function deletePost(postId) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = posts.filter(post => post.id !== postId);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    
    // Remove the post from the UI
    const postDiv = document.querySelector(`[data-id="${postId}"]`);
    postDiv.remove();
}

function editPost(postId) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(post => post.id === postId);

    if (post) {
        // Pre-fill the form with post data for editing
        document.getElementById('title').value = post.title;
        document.getElementById('content').value = post.content;

        // Remove the post from the UI and Local Storage
        deletePost(postId);
    }
}
