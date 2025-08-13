document.addEventListener('DOMContentLoaded', function() {

    const fileInput = document.getElementById('fileInput');
    
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
    

    const completeButtons = document.querySelectorAll('.complete-lesson');
    
    completeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lessonId = this.dataset.lessonId;
            

            const originalText = this.textContent;
            this.textContent = 'Completing...';
            this.disabled = true;
            

            console.log('Completing lesson:', lessonId);
            

            setTimeout(() => {

                this.textContent = 'Completed';
                this.disabled = true;
                this.classList.add('completed');
                

                alert('Lesson marked as completed!');


            }, 1000);
        });
    });
});