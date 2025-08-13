document.addEventListener('DOMContentLoaded', function() {

    const enrollButton = document.getElementById('enrollButton');
    
    if (enrollButton) {
        enrollButton.addEventListener('click', function() {
            const courseId = this.dataset.courseId;
            

            const originalText = this.textContent;
            this.textContent = 'Enrolling...';
            this.disabled = true;
            

            console.log('Enrolling in course:', courseId);
            

            setTimeout(() => {

                this.textContent = 'Enrolled';
                this.disabled = true;
                this.classList.add('enrolled');
                

                alert('Successfully enrolled in the course!');


            }, 1000);
        });
    }
    

    const lessonForm = document.getElementById('lessonForm');
    
    if (lessonForm) {
        lessonForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const lessonTitle = document.getElementById('lessonTitle').value;
            const lessonContent = document.getElementById('lessonContent').value;
            
            if (!lessonTitle) {
                alert('Please enter a lesson title');
                return;
            }
            

            const submitButton = lessonForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Creating...';
            submitButton.disabled = true;
            

            console.log('Creating lesson:', { lessonTitle, lessonContent });
            

            setTimeout(() => {

                submitButton.textContent = originalText;
                submitButton.disabled = false;
                

                alert(`Lesson "${lessonTitle}" created successfully!`);
                

                lessonForm.reset();
                

            }, 1000);
        });
    }
});