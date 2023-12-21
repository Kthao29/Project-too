const signupFormHandler = async (event) => {
    event.preventDefault();

    // users input
    const username = document.querySelector('.username-signup').value;
    const email = document.querySelector('.email-signup').value;
    const password = document.querySelector('.password-signup').value;

    console.log([username, email, password]);

    // sends POST request to server
    if (username && email && password) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ 
                username: username, 
                email: email, 
                password: password }),
        });
        // checks response status
        if (response.ok) {
            alert('Success! Account has been created. You will now be redirected to the dashboard.');
            document.location.replace('/');
        } else {
            alert(`Unsuccessful sign up.${errorMessage}`);
        }
    };
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);

//handles file input/updates rendered file name
const fileInput = document.querySelector('#fileUpload input[type=file]');

fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
    const fileName = document.querySelector('#fileUpload .file-name');
    fileName.textContent = fileInput.files[0].name;
    }
    console.log(fileInput.files[0]);
}
