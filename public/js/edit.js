const projectID = document.querySelector('#contains-id').getAttribute('data-id');

const updatePost = async (event) => {
    
    event.preventDefault();

    // retrieves post data 
    const postTitle = document.getElementById('postTitleInput');
    const postBody = document.getElementById('postBodyInput');

    console.log(fileInput.files[0]);
    const file = fileInput.files[0];

    if (postTitle && postBody) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', postTitle.value);
        formData.append('body', postBody.value);
        
        fetch(`/api/projects/${projectID}`, {
            method: 'PUT',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
        console.log('Project successfully updated', data);
        document.location.replace(`/project/${projectID}`);
        })
        .catch(error => {
            console.error('Error posting project: ', error);
        });
    } else {
        console.error('No file selected');
    }
}

// event listener for update submit
const form = document.querySelector('.update-post-form');
form.addEventListener('submit', updatePost);

//handles file input/updates rendered file name
const fileInput = document.querySelector('#fileUpload input[type=file]');

fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
    const fileName = document.querySelector('#fileUpload .file-name');
    fileName.textContent = fileInput.files[0].name;
    }
}

