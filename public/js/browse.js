
//EventListener for when the "browse" link is clicked
document.addEventListener('DOMContentLoaded', () => {
    const browseLink = document.querySelector('.browse-categories');
  

    browseLink.addEventListener('click', () => {
      // Redirect to the categories page
      window.location.href = '/categories';
    });
  });