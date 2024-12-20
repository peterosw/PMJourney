// Function to load content for a specific step
async function loadStepContent(stepNumber) {
    try {
        const response = await fetch(`content/step${stepNumber}.json`);
        const data = await response.json();
        updateStepContent(stepNumber, data);
    } catch (error) {
        console.error(`Error loading content for step ${stepNumber}:`, error);
    }
}

// Function to update the DOM with step content
function updateStepContent(stepNumber, data) {
    const section = document.querySelector(`#step${stepNumber}`);
    if (!section) return;

    // Update title and description
    const title = section.querySelector('h2');
    const description = section.querySelector('.step-description');
    
    title.innerHTML = `<i class="${data.icon}"></i> Step ${stepNumber}: ${data.title}`;
    description.textContent = data.description;

    // Update resources table
    const tbody = section.querySelector('tbody');
    tbody.innerHTML = data.resources.map(resource => `
        <tr>
            <td>${resource.name}</td>
            <td>${resource.description}</td>
            <td><a href="${resource.link}" class="resource-link">
                <i class="fas fa-external-link-alt"></i> ${resource.linkText}
            </a></td>
        </tr>
    `).join('');
}

// Load all steps when the page loads
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 1; i <= 8; i++) {
        loadStepContent(i);
    }
});
