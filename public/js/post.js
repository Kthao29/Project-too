const postButton = document.querySelector('#postButton');
const editButton = document.querySelector('#editButton'); 
const deleteButton = document.querySelector('#deleteButton');

// event listener for post button
postButton.addEventListener('click', () => {
    handlePostButtonClick();
});

// function for post button click
const handlePostButtonClick = async () => {
    try {
        // retrieves post data 
        const postTitle = document.getElementById('postTitleInput').value;
        const postBody = document.getElementById('postBodyInput').value;

        // sends a POST request
        const response = await fetch('api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: postTitle,
                body: postBody,
            }),
        });

        // retrieves and logs post
        const data = await response.json();
        console.log("New post has been created!", data);
    } catch (error) {
        console.error("There has been an error creating post.", error);
    }
};

// event listener for edit button
editButton.addEventListener('click', () => {
    handleEditButtonClick(postId);
});

// function for edit button click
const handleEditButtonClick = async () => {
    try {
        // retrieves post data
        const updatedTitle = document.getElementById('editTitleInput').value;
        const updatedBody = document.getElementById('editBodyInput').value;

        // sends a PUT request
        const response = await fetch(`api/postController/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: updatedTitle,
                body: updatedBody,
            }),
        });

        // retrieves and logs post update
        const data = await response.json();
        console.log("Your post has been updated!", data);
    } catch (error) {
        console.error("Error updating post! Edit not saved.", error);
    }
};

// event listener for delete button
deleteButton.addEventListener('click', () => {
    handleDeleteButtonClick();
});

// function for delete button click
const handleDeleteButtonClick = async (postId) => {
    try {
        // sends a DELETE request to remove a specific post
        const response = await fetch(`api/posts/${postId}`, {
            method: 'DELETE',
        });

        // handles and logs the results
        const data = await response.json();
        console.log("Your post has been deleted!", data);

        // removes the deleted post from the user interface
        removePostFromUI(postId);

    } catch (error) {
        console.error("Error! Your post has not been deleted.", error);
    }
};

// function to remove deleted post from the user interface
const removePostFromUI = (postId) => {
    const postElement = document.getElementById(`post-${postId}`);
    if (postElement) {
        postElement.remove();
    }
};
