document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display GitHub repositories
    fetch('https://api.github.com/users/PinkLemo/repos')
        .then(response => response.json())
        .then(repos => {
            const gallery = document.getElementById('project-gallery');
            repos.forEach(repo => {
                const project = document.createElement('div');
                project.classList.add('project');
                project.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description}</p>
                    <a href="${repo.html_url}" target="_blank">View Repository</a>
                `;
                gallery.appendChild(project);
            });
        });

    // Form validation and submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(form);
        // Get the sender's email address
        const senderEmail = document.getElementById('email').value;
        // Add the sender's email and target email to the form data
        formData.append('email', senderEmail);
        formData.append('targetEmail', 'tashmiti1@gmail.com');
        
        // Send form data to the server
        fetch('/submit-form', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Message sent successfully!');
                form.reset();
            } else {
                alert('Failed to send message.');
            }
        });
    });
});
