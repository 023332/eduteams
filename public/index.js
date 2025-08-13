
document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.querySelector('form[action="/api/auth/login"]');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                e.preventDefault();
                alert('Please fill in all fields');
                return false;
            }
            
           
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                return false;
            }
        });
    }
    

    const registerForm = document.querySelector('form[action="/api/auth/register"]');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            
            if (!name || !email || !password || !role) {
                e.preventDefault();
                alert('Please fill in all fields');
                return false;
            }
            

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                return false;
            }
            

            if (password.length < 6) {
                e.preventDefault();
                alert('Password must be at least 6 characters long');
                return false;
            }
        });
    }
    

    const teamForm = document.querySelector('form[action="/api/teams"]');
    if (teamForm) {
        teamForm.addEventListener('submit', function(e) {
            const name = document.querySelector('input[name="name"]').value;
            
            if (!name) {
                e.preventDefault();
                alert('Please enter a team name');
                return false;
            }
        });
    }
    

    const courseForm = document.querySelector('form[action="/api/courses"]');
    if (courseForm) {
        courseForm.addEventListener('submit', function(e) {
            const title = document.querySelector('input[name="title"]').value;
            const teamId = document.querySelector('select[name="teamId"]').value;
            
            if (!title || !teamId) {
                e.preventDefault();
                alert('Please fill in all fields');
                return false;
            }
        });
    }
    

    const lessonForm = document.querySelector('form[action="/api/lessons"]');
    if (lessonForm) {
        lessonForm.addEventListener('submit', function(e) {
            const title = document.querySelector('input[name="title"]').value;
            const courseId = document.querySelector('select[name="courseId"]').value;
            
            if (!title || !courseId) {
                e.preventDefault();
                alert('Please fill in all required fields');
                return false;
            }
        });
    }
    

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const maxSize = 5 * 1024 * 1024; // 5MB in bytes
                if (file.size > maxSize) {
                    alert('File size exceeds 5MB limit');
                    e.target.value = '';
                    return;
                }
                
                const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
                if (!allowedTypes.includes(file.type)) {
                    alert('Only PDF, Word documents, and text files are allowed');
                    e.target.value = '';
                    return;
                }
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});


function togglePasswordVisibility(inputId, buttonId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = document.getElementById(buttonId);
    
    if (passwordInput && toggleButton) {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        toggleButton.textContent = type === 'password' ? 'Show' : 'Hide';
    }
}