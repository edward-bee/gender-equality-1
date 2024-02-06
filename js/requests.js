document.addEventListener('DOMContentLoaded', function() {
    // Your JavaScript code here
    // Add event listeners after the DOM is fully loaded
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        
        if (checkEmptyFields(email, password)) {
            showMessage('Please fill out all fields.');
            return;
        }
        
        // Send registration data to the server (simulated for this example)
        const userData = {
            email: email,
            password: password
        };

        // Store user data in local storage
        localStorage.setItem('userData', JSON.stringify(userData));

        showMessage('Registration successful. You can now login.');
        document.getElementById('registrationForm').style.display = 'none !important';
    });

    // Login Form Event Listener
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const loginemail = document.getElementById('loginemail').value.trim();
        const loginPassword = document.getElementById('loginPassword').value.trim();
        
        if (checkEmptyFields(loginemail, loginPassword)) {
            showMessage('Please fill out all fields.');
            return;
        }
        
        // Retrieve user data from local storage
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (!userData || userData.email !== loginemail || userData.password !== loginPassword) {
            showMessage('Invalid email or password.');
        } else {
            showMessage('Login successful.');
            // Hide the registration form after successful login
            document.getElementById('registrationForm').classList.add('display-none');
        }
    });

    // Function to display messages
    function showMessage(message) {

        document.getElementById('message').innerText = message;
        document.getElementById('message').innerText = message;
    }

    // Function to check if form fields are empty
    function checkEmptyFields(...fields) {
        return fields.some(field => field.trim() === '');
    }

});

