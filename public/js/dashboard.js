// event listener for delete & edit buttons
const deleteBtn = document.getElementsByClassName("deleteBtn");
const editBtn = document.getElementsByClassName("editBtn");

// function for delete button click
const handleDeleteBtnClick = async (event) => {

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

const handleEditBtnClick = async (event) => {

    const postID = event.target.getAttribute("data-id");

    if (postID) {
        document.location.replace(`/edit/${postID}`);
    } else {
        alert('Post Redirect Failed');
    }
}

//Add event listener for each delete btn element present
for (var i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', handleDeleteBtnClick, false);
};

//Add event listener for each edit btn element present
for (var i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener('click', handleEditBtnClick, false);
};