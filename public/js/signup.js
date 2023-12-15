const signupFormHandler = async (event) => {
    event.preventDefault();

    // users input
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // sends POST request to server
    const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ username: username, email: email, password: password }),
        headers: { 'Content-Type': 'application/json' },
    });
    // checks response status
    if (response.ok) {
        alert('Success! Account has been created. You will now be redirected to the dashboard.');
        document.location.replace('/dashboard');
    } else {
        alert(`Unsuccessful sign up.${errorMessage}`);
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);