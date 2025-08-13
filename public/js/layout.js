document.addEventListener('DOMContentLoaded', function() {

    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    

    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    

    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const passwordInput = document.getElementById(targetId);
            
            if (passwordInput) {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.textContent = type === 'password' ? 'Show' : 'Hide';
            }
        });
    });
    

    const rtlToggle = document.getElementById('rtlToggle');
    
    if (rtlToggle) {
        rtlToggle.addEventListener('click', function() {
            document.body.classList.toggle('rtl');
            const isRTL = document.body.classList.contains('rtl');
            

            localStorage.setItem('rtl', isRTL);
            

            this.textContent = isRTL ? 'LTR' : 'RTL';


            updateDirectionality(isRTL);
        });
        

        const savedRTL = localStorage.getItem('rtl') === 'true';
        if (savedRTL) {
            document.body.classList.add('rtl');
            rtlToggle.textContent = 'LTR';
            updateDirectionality(true);
        }
    }
});


function updateDirectionality(isRTL) {
    const style = document.createElement('style');
    style.id = 'directionality-styles';
    

    const existingStyle = document.getElementById('directionality-styles');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    if (isRTL) {
        style.textContent = `
            body.rtl {
                direction: rtl;
                text-align: right;
            }
            
            body.rtl .container {
                margin-left: auto;
                margin-right: auto;
            }
            
            body.rtl header nav ul {
                justify-content: flex-end;
            }
            
            body.rtl .cta-buttons {
                justify-content: center;
            }
            
            body.rtl .feature-grid {
                direction: rtl;
            }
        `;
    } else {
        style.textContent = `
            body {
                direction: ltr;
                text-align: left;
            }
        `;
    }
    
    document.head.appendChild(style);
}