const postBtn = document.querySelector('#postBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const replyBtn = document.querySelector('#replyBtn');

const projectIdEl = document.querySelector('#projectID');
const projectID = projectIdEl.getAttribute('data-postID');

const newCommentForm = document.querySelector('.newCommentForm');

// // function for adding a comment
// const addComment = async (event) => {
//     try {

//         const commentBody = document.getElementById("commentBody").value;

//         console.log(commentBody, projectID);

//         // sends POST request to server
//         const response = await fetch('/api/comments/', {
//             method: 'POST',
//             body: JSON.stringify({
//                 comment_text: commentBody,
//                 project_id: projectID,
//             }),
//         });

//         // retrieves and logs post
//         const data = await response.json();
//         console.log("New post has been created!", data);

//         // refreshes page after posting comment
//         location.reload();
//     } catch (error) {
//         console.error('Error adding comment.', error);
//     }
// };

const submitButton = document.querySelector('#postBtn');

const addComment = async (event) => {

    // retrieves post data 
    const commentBody = document.getElementById("commentBody");

    console.log(fileInput.files[0]);
    const file = fileInput.files[0];

    if (commentBody) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('comment_text', commentBody.value);
        formData.append('project_id', projectID);

        fetch('/api/comments/', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {

            console.log('Comment successfully posted', data);
            location.reload();
        })
        .catch(error => {
            console.error('Error posting project: ', error);
        });
    } else {
        console.error('Could not post comment');
    }
}

const toggleCommentForm = async (event) => {
    if (newCommentForm.style.display === 'none') {
        newCommentForm.style.display = 'block';
      } else {
        const commentBody = document.getElementById("commentBody");
        commentBody.value = "";
        newCommentForm.style.display = 'none';
      }
}

//handles file input/updates rendered file name
const fileInput = document.querySelector('#fileUpload input[type=file]');

fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
    const fileName = document.querySelector('#fileUpload .file-name');
    fileName.textContent = fileInput.files[0].name;
    }
}

newCommentForm.style.display = 'none';

// event listener for submit button
postBtn.addEventListener('click', (event) => {
    addComment();
});

// event listener for submit button
replyBtn.addEventListener('click', (event) => {
    toggleCommentForm();
});

cancelBtn.addEventListener('click', (event) => {
    toggleCommentForm();
});
