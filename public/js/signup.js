const signupFormHandler = async (event) => {
    event.preventDefault();

    // users input
    const username = document.querySelector('.username-signup').value;
    const email = document.querySelector('.email-signup').value;
    const password = document.querySelector('.password-signup').value;
    const file = fileInput.files[0];

    console.log([username, email, password]);

    // sends POST request to server
    if (username && email && password) {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);

        fetch('/api/users/', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
        console.log('User successfully created', data);
        document.location.replace(`/`);
        })
        .catch(error => {
            console.error('Error creating user: ', error);
        });
        } else {
            alert(`Unsuccessful sign up.${errorMessage}`);
        }
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
