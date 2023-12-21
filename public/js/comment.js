const postBtn = document.querySelector('#postBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const replyBtn = document.querySelector('#replyBtn');

const projectIdEl = document.querySelector('#projectID');
const projectID = projectIdEl.getAttribute('data-postID');

const newCommentForm = document.querySelector('.newCommentForm');

// function for adding a comment
const addComment = async (event) => {
    try {

        const commentBody = document.getElementById("commentBody").value;

        console.log(commentBody, projectID);

        // sends POST request to server
        const response = await fetch('/api/comments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comment_text: commentBody,
                project_id: projectID,
            }),
        });

        // retrieves and logs post
        const data = await response.json();
        console.log("New post has been created!", data);

        // refreshes page after posting comment
        location.reload();
    } catch (error) {
        console.error('Error adding comment.', error);
    }
};

const toggleCommentForm = async (event) => {
    if (newCommentForm.style.display === 'none') {
        newCommentForm.style.display = 'block';
      } else {
        const commentBody = document.getElementById("commentBody");
        commentBody.value = "";
        newCommentForm.style.display = 'none';
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