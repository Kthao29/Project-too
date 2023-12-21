// function to handle post edit form submission
const editFormHandler = async (event) => {
    event.preventDefault();

    const idEl = document.getElementById("contains-id");
    const postID = idEl.getAttribute("data-id");

    // retrieving post title and text data 
    const updatedTitle = document.getElementById('postTitleInput').value;
    const updatedBody = document.getElementById('postBodyInput').value;

    console.log(postID + " // " + updatedTitle + " // " + updatedBody);

    if (updatedTitle && updatedBody) {
        // sends PUT request 
        try {
            // sends a PUT request
            const response = await fetch(`/api/projects/${postID}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: updatedTitle,
                    body: updatedBody,
                }),
            });
    
            // retrieves and logs post update
            const data = await response.json();
            console.log("Your post has been updated!", data);
            document.location.replace(`/mylab`);
        } catch (error) {
            console.error("Error updating post! Edit not saved.", error);

        }
    }
};

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);

//handles file input/updates rendered file name
const fileInput = document.querySelector('#fileUpload input[type=file]');

fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
    const fileName = document.querySelector('#fileUpload .file-name');
    fileName.textContent = fileInput.files[0].name;
    }
    console.log(fileInput.files[0]);
}
