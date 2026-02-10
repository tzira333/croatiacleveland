// Members Forum JavaScript
let currentUser = null;
let categories = [];

// Check membership status
async function checkMembershipAccess() {
    const token = localStorage.getItem('croatia_token');
    const user = localStorage.getItem('croatia_user');
    
    if (!token || !user) {
        showAccessDenied();
        return false;
    }
    
    currentUser = JSON.parse(user);
    
    // Check if user has active membership
    if (currentUser.membershipStatus !== 'active') {
        showAccessDenied();
        return false;
    }
    
    // User has access
    showForumContent();
    return true;
}

function showAccessDenied() {
    document.getElementById('accessCheck').classList.add('hidden');
    document.getElementById('accessDenied').classList.remove('hidden');
}

function showForumContent() {
    document.getElementById('accessCheck').classList.add('hidden');
    document.getElementById('forumContent').classList.remove('hidden');
    loadCategories();
}

// Load forum categories
async function loadCategories() {
    try {
        const response = await axios.get('/api/forum/categories?type=members');
        categories = response.data;
        
        const container = document.getElementById('forumCategories');
        
        if (categories.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-center">No forum categories available.</p>';
            return;
        }
        
        container.innerHTML = categories.map(category => `
            <div class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div class="p-6 cursor-pointer" onclick="viewCategory(${category.id})">
                    <div class="flex justify-between items-center">
                        <div class="flex-1">
                            <h3 class="text-xl font-bold text-green-700 mb-2">
                                <i class="fas fa-folder-lock text-green-600 mr-2"></i>
                                ${category.name}
                            </h3>
                            <p class="text-gray-600">${category.description || ''}</p>
                        </div>
                        <i class="fas fa-chevron-right text-gray-400 text-2xl"></i>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Populate category dropdown
        const select = document.getElementById('topicCategory');
        select.innerHTML = '<option value="">Select a category...</option>' + 
            categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
        
    } catch (error) {
        console.error('Error loading categories:', error);
        document.getElementById('forumCategories').innerHTML = '<p class="text-red-600 text-center">Error loading forum categories</p>';
    }
}

// View category topics
function viewCategory(categoryId) {
    window.location.href = `/forum/category/${categoryId}`;
}

// Show new topic modal
document.getElementById('newTopicBtn')?.addEventListener('click', function() {
    document.getElementById('newTopicModal').classList.remove('hidden');
});

// Close new topic modal
function closeNewTopicModal() {
    document.getElementById('newTopicModal').classList.add('hidden');
    document.getElementById('newTopicForm').reset();
}

// Handle new topic form submission
document.getElementById('newTopicForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const token = localStorage.getItem('croatia_token');
    if (!token) {
        alert('Session expired. Please login again.');
        window.location.href = '/login';
        return;
    }
    
    const data = {
        category_id: parseInt(document.getElementById('topicCategory').value),
        title: document.getElementById('topicTitle').value,
        content: document.getElementById('topicContent').value
    };
    
    try {
        const response = await axios.post('/api/forum/topics', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.data.success) {
            alert('Topic created successfully!');
            closeNewTopicModal();
            window.location.href = `/forum/topic/${response.data.topicId}`;
        }
    } catch (error) {
        console.error('Error creating topic:', error);
        if (error.response && error.response.status === 403) {
            alert('Active membership required to post in this forum.');
        } else if (error.response && error.response.status === 401) {
            alert('Session expired. Please login again.');
            window.location.href = '/login';
        } else {
            alert('Error creating topic. Please try again.');
        }
    }
});

// Initialize - check access first
checkMembershipAccess();
