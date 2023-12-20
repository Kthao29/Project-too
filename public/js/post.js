const postButton = document.querySelector('#postButton');

// function for post button click
const handlePostButtonClick = async () => {

    // retrieves post data 
    const postTitle = document.getElementById('postTitleInput').value;
    const postBody = document.getElementById('postBodyInput').value;

    if (postTitle && postBody) {
        try {
           // sends a POST request
            const response = await fetch('/api/projects/', {
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

            newProjectID = data.id;

            if (newProjectID) {
                document.location.replace(`/project/${newProjectID}`);
            }

        } catch (error) {
            console.error("There has been an error creating post.", error);
        }
    } else {
        alert("Could not post. Please make sure you have a title and description.")
    }
};

// event listener for post button
postButton.addEventListener('click', (event) => {
    event.preventDefault();
    handlePostButtonClick();
});

