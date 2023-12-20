// loads DOM content
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // fetches posts from server
        const response = await fetch('api/posts');
        const posts = await response.json();

        for (const post of posts) {
            displayPost(post);
            await fetchAndDisplayComments(post.id);
        }
    } catch (error) {
        console.error("Error fetching posts!", error);
    }
});

// function for displaying posts
const displayPost = (post) => {
    const postContainer = document.getElementById('posts-container');
    const postElement = document.createElement('div');

    // creates HTML for the post
    postElement.innerHTML = `
    <h1>${post.title}</h1>
    <p>${post.body}</p>
    <p>${post.username}</p>
    `;
    postContainer.appendChild(postElement);
}

// function for comment display
const fetchAndDisplayComments = async (postId) => {
    try {
        // fetches comments for specific post
        const response = await fetch(`/api/comments/${postId}`);
        const comments = await response.json();

        const commentsContainer = document.getElementById(`comments-container-${postId}`);

        // displays comments
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.innerHTML = `<p>${comment.comment_text}</p>`;
            commentsContainer.appendChild(commentElement);
        });
    } catch (error) {
        console.error(`Error fetching comments for this post ${postId}`, error);
    }
};

// function for adding a comment
const addComment = async (event, postId) => {
    try {
        event.preventDefault();
        const commentText = document.getElementById(`commentText-${postId}`).value;

        // sends POST request to server
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: JSON.stringify({
                comment_text: commentText,
                project_id: postId,
            }),
        });

        // retrieves and displays new comments
        const comment = await response.json();

        const commentContainer = document.getElementById(`comments-container-${postId}`);
        const commentElement = document.createElement('div');
        commentElement.innerHTML = `<p>${comment.comment_text}</p>`;
        commentContainer.appendChild(commentElement);

        // clears input field after adding comment
        document.getElementById(`commentText-${postId}`).value = '';
    } catch (error) {
        console.error('Error adding comment.', error);
    }
};

