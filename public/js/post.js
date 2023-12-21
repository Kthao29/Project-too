const postButton = document.querySelector('#postButton');

// function for post button click
// const handlePostButtonClick = async (event) => {

//     event.preventDefault();

//     // retrieves post data 
//     const postTitle = document.getElementById('postTitleInput').value;
//     const postBody = document.getElementById('postBodyInput').value;

//     if (postTitle && postBody) {
//         try {
//            // sends a POST request
//             const response = await fetch('/api/projects/', {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     title: postTitle,
//                     body: postBody,
//                 }),
//             });
    
//             // retrieves and logs post
//             const data = await response.json();
//             console.log("New post has been created!", data);

//             newProjectID = data.id;

//             if (newProjectID) {
//                 document.location.replace(`/project/${newProjectID}`);
//             }

//         } catch (error) {
//             console.error("There has been an error creating post.", error);
//         }
//     } else {
//         alert("Could not post. Please make sure you have a title and description.")
//     }
// };

const submitPost = async (event) => {
    
    event.preventDefault();

    // retrieves post data 
    const postTitle = document.getElementById('postTitleInput');
    const postBody = document.getElementById('postBodyInput');

    console.log(fileInput.files[0]);
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', postTitle.value);
        formData.append('body', postBody.value);

        fetch('/api/projects/', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {

            console.log('Project successfully posted', data);

            newProjectID = data[0].id;
            if (newProjectID) {
                document.location.replace(`/project/${newProjectID}`);
            }
        })
        .catch(error => {
            console.error('Error posting project: ', error);
        });
    } else {
        console.error('No file selected');
    }
}

// event listener for post submit
document.querySelector('.new-post-form').addEventListener('submit', submitPost);

//handles file input/updates rendered file name
const fileInput = document.querySelector('#fileUpload input[type=file]');

fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
    const fileName = document.querySelector('#fileUpload .file-name');
    fileName.textContent = fileInput.files[0].name;
    }
}