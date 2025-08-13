document.addEventListener('DOMContentLoaded', function() {

    const unenrollForms = document.querySelectorAll('form[action^="/api/enrollments/"]');
    
    unenrollForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!confirm('Are you sure you want to unenroll from this course?')) {
                e.preventDefault();
            }
        });
    });
    

    const progressButtons = document.querySelectorAll('.update-progress-btn');
    
    progressButtons.forEach(button => {
        button.addEventListener('click', function() {
            const enrollmentId = this.dataset.enrollmentId;
            const newProgress = prompt('Enter new progress (0-100):');
            
            if (newProgress !== null && !isNaN(newProgress)) {
                const progress = Math.max(0, Math.min(100, parseInt(newProgress)));
                

                fetch(`/api/enrollments/${enrollmentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ progress })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.progress !== undefined) {

                        const progressBar = document.querySelector(`.progress-bar[data-enrollment-id="${enrollmentId}"]`);
                        if (progressBar) {
                            progressBar.querySelector('.progress-fill').style.width = `${data.progress}%`;
                        }
                        

                        const progressText = document.querySelector(`.progress-text[data-enrollment-id="${enrollmentId}"]`);
                        if (progressText) {
                            progressText.textContent = `${data.progress}%`;
                        }
                        
                        alert('Progress updated successfully!');
                    } else {
                        alert('Error updating progress');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error updating progress');
                });
            }
        });
    });
    

    const completeLessonButtons = document.querySelectorAll('.complete-lesson-btn');
    
    completeLessonButtons.forEach(button => {
        button.addEventListener('click', function() {
            const enrollmentId = this.dataset.enrollmentId;
            const lessonId = this.dataset.lessonId;
            

            fetch(`/api/enrollments/${enrollmentId}/lessons/${lessonId}/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.progress !== undefined) {
                    const progressBar = document.querySelector(`.progress-bar[data-enrollment-id="${enrollmentId}"]`);
                    if (progressBar) {
                        progressBar.querySelector('.progress-fill').style.width = `${data.progress}%`;
                    }
                    

                    const progressText = document.querySelector(`.progress-text[data-enrollment-id="${enrollmentId}"]`);
                    if (progressText) {
                        progressText.textContent = `${data.progress}%`;
                    }


                    this.textContent = 'Completed!';
                    this.disabled = true;
                    
                    alert('Lesson marked as complete!');
                } else {
                    alert('Error marking lesson as complete');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error marking lesson as complete');
            });
        });
    });
});