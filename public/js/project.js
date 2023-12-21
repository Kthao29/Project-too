const posts = document.getElementsByClassName("post-preview");

const goToPost = async (event) => {

    const postID = event.target.getAttribute("data-id");

    if (postID) {
        document.location.replace(`/project/${postID}`);
    } else if (!event.target.getAttribute("data-id")) {
        const parentID = event.target.parentNode.getAttribute("data-id");
        document.location.replace(`/project/${parentID}`);
    } else {
        alert('Post Redirect Failed');
    }
}

for (var i = 0; i < posts.length; i++) {
    posts[i].addEventListener('click', goToPost, false);
}