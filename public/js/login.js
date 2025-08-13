document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            

            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            

            console.log('Login attempt with:', { email, password });
            

            const submitButton = loginForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Logging in...';
            submitButton.disabled = true;
            

            setTimeout(() => {

                submitButton.textContent = originalText;
                submitButton.disabled = false;
                

                alert('Login successful! Redirecting to dashboard...');
                window.location.href = '/dashboard';
            }, 1000);
        });
    }
});