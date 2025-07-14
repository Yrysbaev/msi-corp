// Admin Panel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the login page
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        handleLoginPage();
    }

    // Check if we're on the admin dashboard
    const adminContainer = document.querySelector('.admin-container');
    if (adminContainer) {
        handleAdminDashboard();
    }
});

// Login Page Functionality
function handleLoginPage() {
    console.log('handleLoginPage loaded');
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Show loading state
        const submitBtn = loginForm.querySelector('.login-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Signing In...';
        submitBtn.disabled = true;

        // Simulate login request
        fetch('/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirect to admin dashboard
                window.location.href = '/admin';
            } else {
                showError(data.message || 'Invalid credentials');
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            showError('An error occurred. Please try again.');
        })
        .finally(() => {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 5000);
    }
}

// Admin Dashboard Functionality
function handleAdminDashboard() {
    // Navigation functionality
    setupNavigation();
    
    // Dashboard interactions
    setupDashboardInteractions();
    
    // Form submissions
    setupFormSubmissions();
    
    // Quick actions
    setupQuickActions();
    
    // File uploads
    setupFileUploads();
    
    // Settings forms
    setupSettingsForms();
    
    // Content management
    setupContentManagement();
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('pageTitle');
    const pageDescription = document.getElementById('pageDescription');

    const sectionData = {
        dashboard: {
            title: 'Dashboard',
            description: 'Welcome to your admin dashboard'
        },
        content: {
            title: 'Content Management',
            description: 'Manage your website\'s main content sections'
        },
        services: {
            title: 'Services Management',
            description: 'Add, edit, and manage your services'
        },
        portfolio: {
            title: 'Portfolio Management',
            description: 'Manage your portfolio projects'
        },
        settings: {
            title: 'Settings',
            description: 'Manage your admin account and site settings'
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            
            // Update active navigation
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(targetSection).classList.add('active');
            
            // Update page title and description
            if (sectionData[targetSection]) {
                pageTitle.textContent = sectionData[targetSection].title;
                pageDescription.textContent = sectionData[targetSection].description;
            }
        });
    });
}

// Dashboard Interactions
function setupDashboardInteractions() {
    // Stat cards hover effects
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Service items interactions
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        const editBtn = item.querySelector('.edit-btn');
        const deleteBtn = item.querySelector('.delete-btn');
        
        if (editBtn) {
            editBtn.addEventListener('click', function() {
                const serviceName = item.querySelector('h3').textContent;
                showEditServiceModal(serviceName);
            });
        }
        
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function() {
                const serviceName = item.querySelector('h3').textContent;
                showDeleteConfirmation(serviceName, item);
            });
        }
    });

    // Portfolio items interactions
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const editBtn = item.querySelector('.edit-btn');
        const deleteBtn = item.querySelector('.delete-btn');
        
        if (editBtn) {
            editBtn.addEventListener('click', function() {
                const projectName = item.querySelector('h3').textContent;
                showEditPortfolioModal(projectName);
            });
        }
        
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function() {
                const projectName = item.querySelector('h3').textContent;
                showDeleteConfirmation(projectName, item);
            });
        }
    });
}

// Form Submissions
function setupFormSubmissions() {
    // Settings forms
    const settingsForms = document.querySelectorAll('.settings-form');
    settingsForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.save-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Saving...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                showSuccessMessage('Settings saved successfully!');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    });
}

// Quick Actions
function setupQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent;
            
            switch(action) {
                case 'Add New Service':
                    showAddServiceModal();
                    break;
                case 'Upload Portfolio Item':
                    showAddPortfolioModal();
                    break;
                case 'View Messages':
                    showMessagesModal();
                    break;
                case 'Update Content':
                    showContentUpdateModal();
                    break;
            }
        });
    });

    // Add buttons
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.closest('.content-section').id;
            
            switch(section) {
                case 'services':
                    showAddServiceModal();
                    break;
                case 'portfolio':
                    showAddPortfolioModal();
                    break;
            }
        });
    });
}

// Modal Functions
function showEditServiceModal(serviceName) {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalOverlay = document.getElementById('modalOverlay');
    
    // Find the service item to get its data
    const serviceItems = document.querySelectorAll('.service-item');
    let serviceData = null;
    let serviceId = null;
    
    serviceItems.forEach(item => {
        const title = item.querySelector('h3');
        if (title.textContent.includes(serviceName)) {
            serviceId = item.dataset.id;
            serviceData = {
                name: title.textContent.replace(/^[^\s]*\s/, ''), // Remove emoji
                description: item.querySelector('p').textContent,
                icon: title.textContent.match(/^[^\s]*/)[0] // Get emoji
            };
        }
    });
    
    if (!serviceData) {
        showError('Service not found');
        return;
    }
    
    modalTitle.textContent = 'Edit Service';
    
    modalBody.innerHTML = `
        <form class="modal-form" id="editServiceForm" data-service-id="${serviceId}">
            <div class="form-group">
                <label for="serviceName">Service Name</label>
                <input type="text" id="serviceName" name="serviceName" value="${serviceData.name}" required>
            </div>
            <div class="form-group">
                <label for="serviceDescription">Description</label>
                <textarea id="serviceDescription" name="serviceDescription" placeholder="Enter service description..." required>${serviceData.description}</textarea>
            </div>
            <div class="form-group">
                <label for="serviceIcon">Icon (Emoji)</label>
                <input type="text" id="serviceIcon" name="serviceIcon" value="${serviceData.icon}" placeholder="Enter emoji icon">
            </div>
            <div class="modal-actions">
                <button type="button" class="modal-btn modal-btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="modal-btn modal-btn-primary">Save Changes</button>
            </div>
        </form>
    `;
    
    modalOverlay.style.display = 'flex';
    
    // Handle form submission
    document.getElementById('editServiceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const serviceData = {
            name: formData.get('serviceName'),
            description: formData.get('serviceDescription'),
            icon: formData.get('serviceIcon')
        };
        
        // Simulate API call
        saveServiceChanges(serviceData);
    });
}

function showEditPortfolioModal(projectName) {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalOverlay = document.getElementById('modalOverlay');
    
    modalTitle.textContent = 'Edit Portfolio Project';
    
    modalBody.innerHTML = `
        <form class="modal-form" id="editPortfolioForm">
            <div class="form-group">
                <label for="projectName">Project Name</label>
                <input type="text" id="projectName" name="projectName" value="${projectName}" required>
            </div>
            <div class="form-group">
                <label for="projectCategory">Category</label>
                <select id="projectCategory" name="projectCategory" required>
                    <option value="Web Development">Web Development</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Photography">Photography</option>
                </select>
            </div>
            <div class="form-group">
                <label for="projectDescription">Description</label>
                <textarea id="projectDescription" name="projectDescription" placeholder="Enter project description..." required>A professional project showcasing our expertise</textarea>
            </div>
            <div class="form-group">
                <label for="projectImage">Project Image</label>
                <div class="file-upload">
                    <input type="file" id="projectImage" name="image" accept="image/*">
                    <label for="projectImage" class="file-upload-label">
                        <span class="file-upload-icon">📁</span>
                        Click to upload image or drag and drop
                    </label>
                </div>
                <small style="color: rgba(255,255,255,0.6);">Leave empty to keep current image</small>
            </div>
            <div class="form-group">
                <label for="projectUrl">Project URL (Optional)</label>
                <input type="url" id="projectUrl" name="projectUrl" placeholder="https://example.com">
            </div>
            <div class="modal-actions">
                <button type="button" class="modal-btn modal-btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="modal-btn modal-btn-primary">Save Changes</button>
            </div>
        </form>
    `;
    
    modalOverlay.style.display = 'flex';
    
    // Handle form submission
    document.getElementById('editPortfolioForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        
        // Make real API call with FormData for file upload
        fetch('/api/admin/portfolio/1', { // You'll need to pass the actual project ID
            method: 'PUT',
            body: formData // Send as FormData for file upload
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccessMessage(`Project "${formData.get('projectName')}" updated successfully!`);
                closeModal();
                // Refresh the portfolio display
                location.reload();
            } else {
                showError(data.message || 'Failed to update project');
            }
        })
        .catch(error => {
            console.error('Error updating project:', error);
            showError('An error occurred while updating the project');
        });
    });
}

function showAddServiceModal() {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalOverlay = document.getElementById('modalOverlay');
    
    modalTitle.textContent = 'Add New Service';
    
    modalBody.innerHTML = `
        <form class="modal-form" id="addServiceForm">
            <div class="form-group">
                <label for="newServiceName">Service Name</label>
                <input type="text" id="newServiceName" name="serviceName" placeholder="Enter service name..." required>
            </div>
            <div class="form-group">
                <label for="newServiceDescription">Description</label>
                <textarea id="newServiceDescription" name="serviceDescription" placeholder="Enter service description..." required></textarea>
            </div>
            <div class="form-group">
                <label for="newServiceIcon">Icon (Emoji)</label>
                <input type="text" id="newServiceIcon" name="serviceIcon" placeholder="🛠️" value="🛠️">
            </div>
            <div class="modal-actions">
                <button type="button" class="modal-btn modal-btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="modal-btn modal-btn-primary">Add Service</button>
            </div>
        </form>
    `;
    
    modalOverlay.style.display = 'flex';
    
    // Handle form submission
    document.getElementById('addServiceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const serviceData = {
            name: formData.get('serviceName'),
            description: formData.get('serviceDescription'),
            icon: formData.get('serviceIcon')
        };
        
        // Simulate API call
        addNewService(serviceData);
    });
}

function showAddPortfolioModal() {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalOverlay = document.getElementById('modalOverlay');
    
    modalTitle.textContent = 'Add New Portfolio Project';
    
    modalBody.innerHTML = `
        <form class="modal-form" id="addPortfolioForm">
            <div class="form-group">
                <label for="newProjectName">Project Name</label>
                <input type="text" id="newProjectName" name="name" placeholder="Enter project name..." required>
            </div>
            <div class="form-group">
                <label for="newProjectCategory">Category</label>
                <select id="newProjectCategory" name="category" required>
                    <option value="">Select category...</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Photography">Photography</option>
                </select>
            </div>
            <div class="form-group">
                <label for="newProjectDescription">Description</label>
                <textarea id="newProjectDescription" name="description" placeholder="Enter project description..." required></textarea>
            </div>
            <div class="form-group">
                <label for="newProjectImage">Project Image</label>
                <div class="file-upload">
                    <input type="file" id="newProjectImage" name="image" accept="image/*" required>
                    <label for="newProjectImage" class="file-upload-label">
                        <span class="file-upload-icon">📁</span>
                        Click to upload image or drag and drop
                    </label>
                </div>
                <small style="color: rgba(255,255,255,0.6);">Maximum file size: 5MB. Supported formats: JPG, PNG, GIF</small>
            </div>
            <div class="form-group">
                <label for="newProjectUrl">Project URL (Optional)</label>
                <input type="url" id="newProjectUrl" name="url" placeholder="https://example.com">
            </div>
            <div class="modal-actions">
                <button type="button" class="modal-btn modal-btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="modal-btn modal-btn-primary">Add Project</button>
            </div>
        </form>
    `;
    
    modalOverlay.style.display = 'flex';
    
    // Handle form submission
    document.getElementById('addPortfolioForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        
        // Make real API call with FormData for file upload
        fetch('/api/admin/portfolio', {
            method: 'POST',
            body: formData // Send as FormData for file upload
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccessMessage(`Project "${formData.get('name')}" added successfully!`);
                closeModal();
                // Refresh the portfolio display
                location.reload();
            } else {
                showError(data.message || 'Failed to add project');
            }
        })
        .catch(error => {
            console.error('Error adding project:', error);
            showError('An error occurred while adding the project');
        });
    });
}

function showContentUpdateModal() {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalOverlay = document.getElementById('modalOverlay');
    
    modalTitle.textContent = 'Update Website Content';
    
    modalBody.innerHTML = `
        <form class="modal-form" id="contentUpdateForm">
            <div class="form-group">
                <label for="contentSection">Select Section</label>
                <select id="contentSection" name="contentSection" required>
                    <option value="">Choose section to edit...</option>
                    <option value="hero">Hero Section</option>
                    <option value="about">About Section</option>
                    <option value="contact">Contact Information</option>
                </select>
            </div>
            <div class="form-group">
                <label for="heroTitle">Hero Title</label>
                <input type="text" id="heroTitle" name="heroTitle" placeholder="Enter hero title..." value="We Create. We Capture. We Customize.">
            </div>
            <div class="form-group">
                <label for="heroSubtitle">Hero Subtitle</label>
                <input type="text" id="heroSubtitle" name="heroSubtitle" placeholder="Enter hero subtitle..." value="Visionary works that connect, express, and inspire.">
            </div>
            <div class="form-group">
                <label for="aboutText">About Text</label>
                <textarea id="aboutText" name="aboutText" placeholder="Enter about section text..." rows="4">MSI Corporation is a multi-service creative company dedicated to bringing ideas to life. From custom merchandise to capturing unforgettable moments, we combine creativity with professionalism to deliver exceptional results that resonate.</textarea>
            </div>
            <div class="form-group">
                <label for="contactEmail">Contact Email</label>
                <input type="email" id="contactEmail" name="contactEmail" placeholder="Enter contact email..." value="info@msicorp.com">
            </div>
            <div class="form-group">
                <label for="contactPhone">Contact Phone</label>
                <input type="tel" id="contactPhone" name="contactPhone" placeholder="Enter contact phone..." value="+1 (555) 123-4567">
            </div>
            <div class="modal-actions">
                <button type="button" class="modal-btn modal-btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="modal-btn modal-btn-primary">Update Content</button>
            </div>
        </form>
    `;
    
    modalOverlay.style.display = 'flex';
    
    // Handle form submission
    document.getElementById('contentUpdateForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const contentData = {
            section: formData.get('contentSection'),
            heroTitle: formData.get('heroTitle'),
            heroSubtitle: formData.get('heroSubtitle'),
            aboutText: formData.get('aboutText'),
            contactEmail: formData.get('contactEmail'),
            contactPhone: formData.get('contactPhone')
        };
        
        // Simulate API call
        updateWebsiteContent(contentData);
    });
}

function showMessagesModal() {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalOverlay = document.getElementById('modalOverlay');
    
    modalTitle.textContent = 'Contact Messages';
    
    modalBody.innerHTML = `
        <div class="messages-container">
            <div class="message-item">
                <div class="message-header">
                    <h4>John Doe</h4>
                    <span class="message-date">2024-01-15</span>
                </div>
                <p class="message-email">john@example.com</p>
                <p class="message-content">I'm interested in your web development services for my new business website.</p>
                <div class="message-actions">
                    <button class="modal-btn modal-btn-primary">Reply</button>
                    <button class="modal-btn modal-btn-danger">Delete</button>
                </div>
            </div>
            <div class="message-item">
                <div class="message-header">
                    <h4>Jane Smith</h4>
                    <span class="message-date">2024-01-14</span>
                </div>
                <p class="message-email">jane@example.com</p>
                <p class="message-content">Looking for graphic design services for our company branding.</p>
                <div class="message-actions">
                    <button class="modal-btn modal-btn-primary">Reply</button>
                    <button class="modal-btn modal-btn-danger">Delete</button>
                </div>
            </div>
        </div>
        <div class="modal-actions">
            <button type="button" class="modal-btn modal-btn-secondary" onclick="closeModal()">Close</button>
        </div>
    `;
    
    modalOverlay.style.display = 'flex';
}

// Close modal function
function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.style.display = 'none';
}

// API simulation functions
function saveServiceChanges(serviceData) {
    // Find the service ID from the current service being edited
    const serviceItems = document.querySelectorAll('.service-item');
    let serviceId = null;
    
    // Get the service ID from the modal form (we'll store it there)
    const modalBody = document.getElementById('modalBody');
    const form = modalBody.querySelector('form');
    serviceId = form.dataset.serviceId;
    
    if (!serviceId) {
        showError('Service ID not found');
        return;
    }
    
    // Make real API call
    fetch(`/api/admin/services/${serviceId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccessMessage(`Service "${serviceData.name}" updated successfully!`);
            closeModal();
            
            // Update the UI
            const serviceItem = document.querySelector(`[data-id="${serviceId}"]`);
            if (serviceItem) {
                serviceItem.querySelector('h3').textContent = `${serviceData.icon} ${serviceData.name}`;
                serviceItem.querySelector('p').textContent = serviceData.description;
            }
        } else {
            showError('Failed to update service');
        }
    })
    .catch(error => {
        console.error('Error updating service:', error);
        showError('An error occurred while updating the service');
    });
}

function savePortfolioChanges(projectData) {
    // Find the project ID from the current project being edited
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let projectId = null;
    
    portfolioItems.forEach(item => {
        const title = item.querySelector('h3');
        if (title.textContent === projectData.name) {
            projectId = item.dataset.id || 1; // Fallback to 1 for demo
        }
    });
    
    // Make real API call
    fetch(`/api/admin/portfolio/${projectId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccessMessage(`Project "${projectData.name}" updated successfully!`);
            closeModal();
            
            // Update the UI
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            portfolioItems.forEach(item => {
                const title = item.querySelector('h3');
                if (title.textContent === projectData.name) {
                    title.textContent = projectData.name;
                    item.querySelector('p').textContent = projectData.category;
                }
            });
        } else {
            showError('Failed to update project');
        }
    })
    .catch(error => {
        console.error('Error updating project:', error);
        showError('An error occurred while updating the project');
    });
}

function addNewService(serviceData) {
    // Make real API call
    fetch('/api/admin/services', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccessMessage(`Service "${serviceData.name}" added successfully!`);
            closeModal();
            
            // Add to UI
            const servicesList = document.querySelector('.services-list');
            const newService = document.createElement('div');
            newService.className = 'service-item';
            newService.dataset.id = data.service.id;
            newService.innerHTML = `
                <div class="service-info">
                    <h3>${data.service.icon} ${data.service.name}</h3>
                    <p>${data.service.description}</p>
                </div>
                <div class="service-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            servicesList.appendChild(newService);
            
            // Update stats
            const statsCards = document.querySelectorAll('.stat-card');
            const servicesStat = statsCards[0].querySelector('.stat-number');
            servicesStat.textContent = parseInt(servicesStat.textContent) + 1;
            
            // Add event listeners to new buttons
            setupServiceItemEvents(newService);
        } else {
            showError('Failed to add service');
        }
    })
    .catch(error => {
        console.error('Error adding service:', error);
        showError('An error occurred while adding the service');
    });
}

function addNewPortfolio(projectData) {
    // Make real API call
    fetch('/api/admin/portfolio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccessMessage(`Project "${projectData.name}" added successfully!`);
            closeModal();
            
            // Add to UI
            const portfolioGrid = document.querySelector('.portfolio-grid');
            const newProject = document.createElement('div');
            newProject.className = 'portfolio-item';
            newProject.dataset.id = data.project.id;
            newProject.innerHTML = `
                <div class="portfolio-image">
                    <img src="${data.project.image}" alt="${data.project.name}">
                </div>
                <div class="portfolio-info">
                    <h3>${data.project.name}</h3>
                    <p>${data.project.category}</p>
                </div>
                <div class="portfolio-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            portfolioGrid.appendChild(newProject);
            
            // Update stats
            const statsCards = document.querySelectorAll('.stat-card');
            const portfolioStat = statsCards[1].querySelector('.stat-number');
            portfolioStat.textContent = parseInt(portfolioStat.textContent) + 1;
            
            // Add event listeners to new buttons
            setupPortfolioItemEvents(newProject);
        } else {
            showError('Failed to add project');
        }
    })
    .catch(error => {
        console.error('Error adding project:', error);
        showError('An error occurred while adding the project');
    });
}

function updateWebsiteContent(contentData) {
    // Make real API call
    fetch('/api/admin/content', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccessMessage('Website content updated successfully!');
            closeModal();
            
            // Show a note that the homepage will reflect changes
            setTimeout(() => {
                showSuccessMessage('Changes will be visible on the homepage when you refresh it!');
            }, 2000);
        } else {
            showError('Failed to update website content');
        }
    })
    .catch(error => {
        console.error('Error updating content:', error);
        showError('An error occurred while updating the content');
    });
}

// Helper function to setup event listeners for new service items
function setupServiceItemEvents(serviceItem) {
    const editBtn = serviceItem.querySelector('.edit-btn');
    const deleteBtn = serviceItem.querySelector('.delete-btn');
    
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            const serviceName = serviceItem.querySelector('h3').textContent.replace(/^[^\s]*\s/, ''); // Remove emoji
            showEditServiceModal(serviceName);
        });
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            const serviceName = serviceItem.querySelector('h3').textContent.replace(/^[^\s]*\s/, '');
            showDeleteConfirmation(serviceName, serviceItem);
        });
    }
}

// Helper function to setup event listeners for new portfolio items
function setupPortfolioItemEvents(portfolioItem) {
    const editBtn = portfolioItem.querySelector('.edit-btn');
    const deleteBtn = portfolioItem.querySelector('.delete-btn');
    
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            const projectName = portfolioItem.querySelector('h3').textContent;
            showEditPortfolioModal(projectName);
        });
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            const projectName = portfolioItem.querySelector('h3').textContent;
            showDeleteConfirmation(projectName, portfolioItem);
        });
    }
}

// Update the delete confirmation to use real API
function showDeleteConfirmation(itemName, itemElement) {
    if (confirm(`Are you sure you want to delete "${itemName}"?`)) {
        const itemId = itemElement.dataset.id;
        const itemType = itemElement.classList.contains('service-item') ? 'services' : 'portfolio';
        
        if (!itemId) {
            showError('Item ID not found');
            return;
        }
        
        // Make real API call
        fetch(`/api/admin/${itemType}/${itemId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Animate removal
                itemElement.style.opacity = '0.5';
                itemElement.style.transform = 'translateX(-100%)';
                
                setTimeout(() => {
                    itemElement.remove();
                    showSuccessMessage(`${itemName} deleted successfully!`);
                    
                    // Update stats
                    const statsCards = document.querySelectorAll('.stat-card');
                    if (itemType === 'services') {
                        const servicesStat = statsCards[0].querySelector('.stat-number');
                        servicesStat.textContent = parseInt(servicesStat.textContent) - 1;
                    } else {
                        const portfolioStat = statsCards[1].querySelector('.stat-number');
                        portfolioStat.textContent = parseInt(portfolioStat.textContent) - 1;
                    }
                }, 300);
            } else {
                showError('Failed to delete item');
            }
        })
        .catch(error => {
            console.error('Error deleting item:', error);
            showError('An error occurred while deleting the item');
        });
    }
}

// Utility Functions
function showSuccessMessage(message) {
    // Create success message element
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = message;
    successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 255, 0, 0.1);
        border: 1px solid rgba(0, 255, 0, 0.3);
        color: #4CAF50;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(successMsg);
    
    // Remove after 3 seconds
    setTimeout(() => {
        successMsg.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            successMsg.remove();
        }, 300);
    }, 3000);
}

function showError(message) {
    // Create error message element
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.textContent = message;
    errorMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 0, 0, 0.1);
        border: 1px solid rgba(255, 0, 0, 0.3);
        color: #ff6b6b;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(errorMsg);
    
    // Remove after 5 seconds
    setTimeout(() => {
        errorMsg.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            errorMsg.remove();
        }, 300);
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// File upload functionality
function setupFileUploads() {
    // Handle file input changes for preview
    document.addEventListener('change', function(e) {
        if (e.target.type === 'file' && e.target.accept.includes('image/*')) {
            const file = e.target.files[0];
            if (file) {
                showFilePreview(e.target, file);
            }
        }
    });
}

function showFilePreview(input, file) {
    // Remove existing preview
    const existingPreview = input.parentNode.querySelector('.file-preview');
    if (existingPreview) {
        existingPreview.remove();
    }
    
    // Create preview container
    const preview = document.createElement('div');
    preview.className = 'file-preview';
    
    // Check file size
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        preview.innerHTML = `
            <div style="color: #ff6b6b; font-size: 12px;">
                ⚠️ File too large. Maximum size is 5MB.
            </div>
        `;
        input.parentNode.appendChild(preview);
        preview.style.display = 'block';
        return;
    }
    
    // Create file info
    const fileInfo = `
        <div class="file-info">
            📁 ${file.name}<br>
            📏 ${(file.size / 1024 / 1024).toFixed(2)} MB
        </div>
    `;
    
    // Create image preview if it's an image
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                ${fileInfo}
            `;
            input.parentNode.appendChild(preview);
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = fileInfo;
        input.parentNode.appendChild(preview);
        preview.style.display = 'block';
    }
}

function showFileManagementModal() {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalOverlay = document.getElementById('modalOverlay');
    
    modalTitle.textContent = 'File Management';
    
    modalBody.innerHTML = `
        <div class="file-management">
            <div class="form-group">
                <label for="currentFileName">Current File Name</label>
                <input type="text" id="currentFileName" placeholder="Enter current file name (without extension)">
            </div>
            <div class="form-group">
                <label for="newFileName">New File Name</label>
                <input type="text" id="newFileName" placeholder="Enter new file name (without extension)">
            </div>
            <div class="form-group">
                <label for="fileExtension">File Extension</label>
                <select id="fileExtension">
                    <option value=".jpg">.jpg</option>
                    <option value=".jpeg">.jpeg</option>
                    <option value=".png">.png</option>
                    <option value=".gif">.gif</option>
                    <option value=".webp">.webp</option>
                </select>
            </div>
            <div class="modal-actions">
                <button type="button" class="modal-btn modal-btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="button" class="modal-btn modal-btn-primary" onclick="renameFile()">Rename File</button>
            </div>
        </div>
    `;
    
    modalOverlay.style.display = 'flex';
}

function renameFile() {
    const currentFileName = document.getElementById('currentFileName').value;
    const newFileName = document.getElementById('newFileName').value;
    const fileExtension = document.getElementById('fileExtension').value;
    
    if (!currentFileName || !newFileName) {
        showError('Please enter both current and new file names');
        return;
    }
    
    const currentFile = currentFileName + fileExtension;
    const newFile = newFileName + fileExtension;
    
    // Make API call to rename file
    fetch('/api/admin/files/rename', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            currentFileName: currentFile,
            newFileName: newFile
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccessMessage(`File renamed successfully from "${currentFile}" to "${newFile}"`);
            closeModal();
        } else {
            showError(data.message || 'Failed to rename file');
        }
    })
    .catch(error => {
        console.error('Error renaming file:', error);
        showError('An error occurred while renaming the file');
    });
}

function showFileListModal() {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalOverlay = document.getElementById('modalOverlay');
    
    modalTitle.textContent = 'Uploaded Files';
    
    // Show loading state
    modalBody.innerHTML = '<div style="text-align: center; padding: 40px;">Loading files...</div>';
    modalOverlay.style.display = 'flex';
    
    // Fetch files from server
    fetch('/api/admin/files')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                if (data.files.length === 0) {
                    modalBody.innerHTML = `
                        <div style="text-align: center; padding: 40px; color: rgba(255,255,255,0.7);">
                            No files uploaded yet.
                        </div>
                        <div class="modal-actions">
                            <button type="button" class="modal-btn modal-btn-secondary" onclick="closeModal()">Close</button>
                        </div>
                    `;
                } else {
                    const filesHtml = data.files.map(file => `
                        <div class="file-item">
                            <div class="file-preview">
                                <img src="${file.url}" alt="${file.name}" style="max-width: 100px; max-height: 60px; object-fit: cover; border-radius: 4px;">
                            </div>
                            <div class="file-info">
                                <div class="file-name">${file.name}</div>
                                <div class="file-size">${(file.size / 1024 / 1024).toFixed(2)} MB</div>
                            </div>
                            <div class="file-actions">
                                <button class="edit-btn" onclick="editFileName('${file.name}')">Rename</button>
                                <button class="delete-btn" onclick="deleteFile('${file.name}')">Delete</button>
                            </div>
                        </div>
                    `).join('');
                    
                    modalBody.innerHTML = `
                        <div class="file-list">
                            ${filesHtml}
                        </div>
                        <div class="modal-actions">
                            <button type="button" class="modal-btn modal-btn-secondary" onclick="closeModal()">Close</button>
                        </div>
                    `;
                }
            } else {
                modalBody.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: #ff6b6b;">
                        Error loading files: ${data.message}
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="modal-btn modal-btn-secondary" onclick="closeModal()">Close</button>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Error loading files:', error);
            modalBody.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #ff6b6b;">
                    Error loading files. Please try again.
                </div>
                <div class="modal-actions">
                    <button type="button" class="modal-btn modal-btn-secondary" onclick="closeModal()">Close</button>
                </div>
            `;
        });
}

function editFileName(fileName) {
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
    const extension = fileName.substring(fileName.lastIndexOf('.'));
    
    document.getElementById('currentFileName').value = nameWithoutExt;
    document.getElementById('newFileName').value = nameWithoutExt;
    document.getElementById('fileExtension').value = extension;
    
    showFileManagementModal();
}

function deleteFile(fileName) {
    if (confirm(`Are you sure you want to delete "${fileName}"? This action cannot be undone.`)) {
        fetch('/api/admin/files/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccessMessage(`File "${fileName}" deleted successfully`);
                showFileListModal(); // Refresh the file list
            } else {
                showError(data.message || 'Failed to delete file');
            }
        })
        .catch(error => {
            console.error('Error deleting file:', error);
            showError('An error occurred while deleting the file');
        });
    }
}

// Settings Forms
function setupSettingsForms() {
    // Admin password update form
    const passwordForm = document.querySelector('.settings-card:nth-child(1) .settings-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newPassword = this.querySelector('input[type="password"]').value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
            
            if (!newPassword || !confirmPassword) {
                showError('Please fill in both password fields');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showError('Passwords do not match');
                return;
            }
            
            if (newPassword.length < 6) {
                showError('Password must be at least 6 characters long');
                return;
            }
            
            // Simulate password update (in real app, this would call an API)
            showSuccessMessage('Password updated successfully!');
            this.reset();
        });
    }
    
    // Site settings form
    const siteSettingsForm = document.querySelector('.settings-card:nth-child(2) .settings-form');
    if (siteSettingsForm) {
        siteSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const siteTitle = this.querySelector('input[type="text"]').value;
            const contactEmail = this.querySelector('input[type="email"]').value;
            const phoneNumber = this.querySelector('input[type="tel"]').value;
            
            if (!siteTitle || !contactEmail || !phoneNumber) {
                showError('Please fill in all fields');
                return;
            }
            
            // Update website content
            fetch('/api/admin/content', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contactEmail: contactEmail,
                    contactPhone: phoneNumber
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showSuccessMessage('Site settings updated successfully!');
                } else {
                    showError('Failed to update site settings');
                }
            })
            .catch(error => {
                console.error('Error updating site settings:', error);
                showError('An error occurred while updating settings');
            });
        });
    }
}

// Content Management
function setupContentManagement() {
    // Content edit buttons
    const contentEditButtons = document.querySelectorAll('#content .edit-btn');
    contentEditButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.content-card');
            const section = card.querySelector('h3').textContent;
            
            switch(section) {
                case 'Hero Section':
                    showHeroEditModal();
                    break;
                case 'About Section':
                    showAboutEditModal();
                    break;
                case 'Contact Information':
                    showContactEditModal();
                    break;
            }
        });
    });
}

function showHeroEditModal() {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalOverlay = document.getElementById('modalOverlay');
    
    modalTitle.textContent = 'Edit Hero Section';
    
    modalBody.innerHTML = `
        <form class="modal-form" id="heroEditForm">
            <div class="form-group">
                <label for="heroTitle">Hero Title</label>
                <input type="text" id="heroTitle" name="heroTitle" value="We Create. We Capture. We Customize." required>
            </div>
            <div class="form-group">
                <label for="heroSubtitle">Hero Subtitle</label>
                <input type="text" id="heroSubtitle" name="heroSubtitle" value="Visionary works that connect, express, and inspire." required>
            </div>
            <div class="modal-actions">
                <button type="button" class="modal-btn modal-btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="modal-btn modal-btn-primary">Save Changes</button>
            </div>
        </form>
    `;
    
    modalOverlay.style.display = 'flex';
    
    // Handle form submission
    document.getElementById('heroEditForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        
        fetch('/api/admin/content', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                heroTitle: formData.get('heroTitle'),
                heroSubtitle: formData.get('heroSubtitle')
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccessMessage('Hero section updated successfully!');
                closeModal();
                // Refresh the page to see changes
                setTimeout(() => location.reload(), 1000);
            } else {
                showError('Failed to update hero section');
            }
        })
        .catch(error => {
            console.error('Error updating hero section:', error);
            showError('An error occurred while updating the hero section');
        });
    });
}

function showAboutEditModal() {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalOverlay = document.getElementById('modalOverlay');
    
    modalTitle.textContent = 'Edit About Section';
    
    modalBody.innerHTML = `
        <form class="modal-form" id="aboutEditForm">
            <div class="form-group">
                <label for="aboutText">About Text</label>
                <textarea id="aboutText" name="aboutText" rows="4" required>MSI Corporation is a multi-service creative company dedicated to bringing ideas to life. From custom merchandise to capturing unforgettable moments, we combine creativity with professionalism to deliver exceptional results that resonate.</textarea>
            </div>
            <div class="modal-actions">
                <button type="button" class="modal-btn modal-btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="modal-btn modal-btn-primary">Save Changes</button>
            </div>
        </form>
    `;
    
    modalOverlay.style.display = 'flex';
    
    // Handle form submission
    document.getElementById('aboutEditForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        
        fetch('/api/admin/content', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                aboutText: formData.get('aboutText')
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccessMessage('About section updated successfully!');
                closeModal();
                // Refresh the page to see changes
                setTimeout(() => location.reload(), 1000);
            } else {
                showError('Failed to update about section');
            }
        })
        .catch(error => {
            console.error('Error updating about section:', error);
            showError('An error occurred while updating the about section');
        });
    });
}

function showContactEditModal() {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalOverlay = document.getElementById('modalOverlay');
    
    modalTitle.textContent = 'Edit Contact Information';
    
    modalBody.innerHTML = `
        <form class="modal-form" id="contactEditForm">
            <div class="form-group">
                <label for="contactEmail">Contact Email</label>
                <input type="email" id="contactEmail" name="contactEmail" value="info@msicorp.com" required>
            </div>
            <div class="form-group">
                <label for="contactPhone">Phone Number</label>
                <input type="tel" id="contactPhone" name="contactPhone" value="+1 (555) 123-4567" required>
            </div>
            <div class="modal-actions">
                <button type="button" class="modal-btn modal-btn-secondary" onclick="closeModal()">Cancel</button>
                <button type="submit" class="modal-btn modal-btn-primary">Save Changes</button>
            </div>
        </form>
    `;
    
    modalOverlay.style.display = 'flex';
    
    // Handle form submission
    document.getElementById('contactEditForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        
        fetch('/api/admin/content', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contactEmail: formData.get('contactEmail'),
                contactPhone: formData.get('contactPhone')
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccessMessage('Contact information updated successfully!');
                closeModal();
                // Refresh the page to see changes
                setTimeout(() => location.reload(), 1000);
            } else {
                showError('Failed to update contact information');
            }
        })
        .catch(error => {
            console.error('Error updating contact information:', error);
            showError('An error occurred while updating contact information');
        });
    });
} 