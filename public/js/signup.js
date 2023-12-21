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
            body: JSON.stringify({ username: username, email: email, password: password }),
            headers: { 'Content-Type': 'application/json' },
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


    