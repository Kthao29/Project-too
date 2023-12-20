// function to handle post edit form submission
const editFormHandler = async (event) => {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // retrieving post title and text data 
    const postTitle = document.querySelector('input[name="post-title"]').value;
    const postText = document.querySelector('textarea[name="post-text"]').value;

    // sends PUT request 
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            postTitle,
            postText
        }),
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    // checks response status
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);