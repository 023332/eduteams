document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('main form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            const errorMessage = document.getElementById('error-message');
            

            errorMessage.style.display = 'none';
            

            if (!name || !email || !password || !role) {
                showError('Please fill in all fields');
                return;
            }
            

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Please enter a valid email address');
                return;
            }
            

            if (password.length < 6) {
                showError('Password must be at least 6 characters long');
                return;
            }


            const submitButton = registerForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Registering...';
            submitButton.disabled = true;
            

            fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, role })
            })
            .then(response => response.json())
            .then(data => {
                if (response.ok) {
                    showError('Registration successful! Redirecting to login...', 'success');
                    setTimeout(() => {
                        window.location.href = '/auth/login';
                    }, 1500);
                } else {
                    if (data.message) {
                        showError('Registration failed: ' + data.message);
                    } else {
                        showError('Registration failed. Please try again.');
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showError('An error occurred. Please try again.');
            })
            .finally(() => {
                if (!document.querySelector('#error-message').textContent.includes('successful')) {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }
            });
        });
    }
    
    function showError(message, type = 'error') {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        errorMessage.style.color = type === 'success' ? 'green' : 'red';
    }
});