document.addEventListener('DOMContentLoaded', function() {

    const teamForm = document.getElementById('teamForm');
    
    if (teamForm) {
        teamForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const teamName = document.getElementById('teamName').value;
            
            if (!teamName) {
                alert('Please enter a team name');
                return;
            }
            

            const submitButton = teamForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Creating...';
            submitButton.disabled = true;
            

            console.log('Creating team:', teamName);
            

            setTimeout(() => {

                submitButton.textContent = originalText;
                submitButton.disabled = false;
                

                alert(`Team "${teamName}" created successfully!`);
                

                teamForm.reset();
                

            }, 1000);
        });
    }
    

    const courseForm = document.getElementById('courseForm');
    
    if (courseForm) {
        courseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const courseTitle = document.getElementById('courseTitle').value;
            const teamId = document.getElementById('teamId').value;
            
            if (!courseTitle || !teamId) {
                alert('Please fill in all fields');
                return;
            }
            

            const submitButton = courseForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Creating...';
            submitButton.disabled = true;
            

            console.log('Creating course:', { courseTitle, teamId });
            

            setTimeout(() => {

                submitButton.textContent = originalText;
                submitButton.disabled = false;
                

                alert(`Course "${courseTitle}" created successfully!`);
                

                courseForm.reset();
                

            }, 1000);
        });
    }
});