// event listener for delete button
const deleteBtn = document.getElementsByClassName("deleteBtn")

// function for delete button click
const handleDeleteButtonClick = async (event) => {

    const postID = event.target.getAttribute("data-id");

    try {
        // sends a DELETE request to remove a specific post
        const response = await fetch(`api/projects/${postID}`, {
            method: 'DELETE',
        });

        // handles and logs the results
        const data = await response.json();
        console.log("Your post has been deleted!", data);

        // refreshes to update interface
        location.reload();

    } catch (error) {
        console.error("Error! Your post has not been deleted.", error);
    }
};

for (var i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', handleDeleteButtonClick, false);
};