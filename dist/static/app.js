// Global state
let currentUser = null;

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadNews();
    loadUpcomingGames();
    loadRecentResults();
    loadCroatiaPark();
    checkAuth();
});

// Load scrolling news banner
async function loadNews() {
    try {
        const response = await axios.get('/api/news');
        const news = response.data;
        
        if (news.length > 0) {
            const banner = document.getElementById('newsBanner');
            const newsText = news.map(item => `⚽ ${item.title}`).join('   •   ');
            banner.textContent = newsText + '   •   ' + newsText; // Duplicate for smooth scrolling
        }
    } catch (error) {
        console.error('Error loading news:', error);
    }
}

// Load upcoming games
async function loadUpcomingGames() {
    try {
        const response = await axios.get('/api/games');
        const games = response.data.slice(0, 5);
        
        const container = document.getElementById('upcomingGames');
        
        if (games.length === 0) {
            container.innerHTML = '<p class="text-gray-500">No upcoming games scheduled.</p>';
            return;
        }
        
        container.innerHTML = games.map(game => `
            <div class="border-b py-4 last:border-b-0">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="font-bold text-lg">${game.team_name}</p>
                        <p class="text-gray-600">vs ${game.opponent}</p>
                        <p class="text-sm text-gray-500">
                            <i class="fas fa-calendar mr-1"></i>${new Date(game.game_date).toLocaleDateString()}
                            <i class="fas fa-clock ml-3 mr-1"></i>${new Date(game.game_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                    </div>
                    <div class="text-right">
                        <span class="inline-block px-3 py-1 rounded-full text-sm ${game.home_away === 'home' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}">
                            ${game.home_away === 'home' ? 'HOME' : 'AWAY'}
                        </span>
                        <p class="text-sm text-gray-600 mt-1">${game.location}</p>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Calculate days to next game
        if (games.length > 0) {
            const nextGame = new Date(games[0].game_date);
            const today = new Date();
            const daysUntil = Math.ceil((nextGame - today) / (1000 * 60 * 60 * 24));
            document.getElementById('nextGameDays').textContent = daysUntil;
        }
    } catch (error) {
        console.error('Error loading games:', error);
        document.getElementById('upcomingGames').innerHTML = '<p class="text-red-500">Error loading games</p>';
    }
}

// Load recent results
async function loadRecentResults() {
    try {
        const response = await axios.get('/api/games/results');
        const results = response.data.slice(0, 5);
        
        const container = document.getElementById('recentResults');
        
        if (results.length === 0) {
            container.innerHTML = '<p class="text-gray-500">No recent results.</p>';
            return;
        }
        
        container.innerHTML = results.map(game => {
            const homeWin = game.home_away === 'home' && game.score_home > game.score_away;
            const awayWin = game.home_away === 'away' && game.score_away > game.score_home;
            const win = homeWin || awayWin;
            
            return `
                <div class="border-b py-4 last:border-b-0">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-bold text-lg">${game.team_name}</p>
                            <p class="text-gray-600">vs ${game.opponent}</p>
                            <p class="text-sm text-gray-500">${new Date(game.game_date).toLocaleDateString()}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-2xl font-bold ${win ? 'text-green-600' : 'text-red-600'}">
                                ${game.home_away === 'home' ? game.score_home : game.score_away} - 
                                ${game.home_away === 'home' ? game.score_away : game.score_home}
                            </p>
                            <span class="inline-block px-3 py-1 rounded-full text-sm ${win ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                ${win ? 'WIN' : 'LOSS'}
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading results:', error);
        document.getElementById('recentResults').innerHTML = '<p class="text-red-500">Error loading results</p>';
    }
}

// Load Croatia Park progress
async function loadCroatiaPark() {
    try {
        const response = await axios.get('/api/croatia-park');
        const updates = response.data;
        
        const container = document.getElementById('croatiaParkProgress');
        
        if (updates.length === 0) {
            container.innerHTML = '<p class="text-gray-500">No updates available.</p>';
            return;
        }
        
        const latest = updates[0];
        
        container.innerHTML = `
            <div class="mb-4">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-semibold text-gray-700">Project Progress</span>
                    <span class="text-sm font-semibold text-blue-600">${latest.progress_percentage}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-4">
                    <div class="bg-blue-600 h-4 rounded-full transition-all duration-500" style="width: ${latest.progress_percentage}%"></div>
                </div>
            </div>
            <div class="border-t pt-4">
                <h4 class="font-bold text-lg mb-2">${latest.title}</h4>
                <p class="text-gray-600 mb-2">${latest.content}</p>
                <p class="text-sm text-gray-500">${new Date(latest.created_at).toLocaleDateString()}</p>
            </div>
            <div class="mt-4">
                <a href="/croatia-park" class="text-blue-600 hover:text-blue-800 font-semibold">
                    View all updates & volunteer <i class="fas fa-arrow-right ml-1"></i>
                </a>
            </div>
        `;
    } catch (error) {
        console.error('Error loading Croatia Park:', error);
        document.getElementById('croatiaParkProgress').innerHTML = '<p class="text-red-500">Error loading updates</p>';
    }
}

// Check authentication
function checkAuth() {
    const token = localStorage.getItem('croatia_token');
    if (token) {
        // TODO: Verify token and set currentUser
        currentUser = JSON.parse(localStorage.getItem('croatia_user'));
    }
}

// Donate button handler
document.getElementById('donateBtn')?.addEventListener('click', function() {
    showDonationModal();
});

// Donation modal
function showDonationModal() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 class="text-2xl font-bold mb-4">Support Croatia Cleveland</h3>
            <p class="text-gray-600 mb-6">Your donation helps support our teams, facilities, and community programs.</p>
            
            <form id="donationForm">
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Amount</label>
                    <div class="grid grid-cols-3 gap-2 mb-2">
                        <button type="button" onclick="setDonationAmount(25)" class="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">$25</button>
                        <button type="button" onclick="setDonationAmount(50)" class="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">$50</button>
                        <button type="button" onclick="setDonationAmount(100)" class="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">$100</button>
                    </div>
                    <input type="number" id="donationAmount" min="5" step="1" placeholder="Custom amount" class="w-full border rounded-lg px-4 py-2">
                </div>
                
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Name</label>
                    <input type="text" id="donorName" required class="w-full border rounded-lg px-4 py-2">
                </div>
                
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Email</label>
                    <input type="email" id="donorEmail" required class="w-full border rounded-lg px-4 py-2">
                </div>
                
                <div class="mb-6">
                    <label class="block text-gray-700 font-bold mb-2">Message (Optional)</label>
                    <textarea id="donationMessage" rows="3" class="w-full border rounded-lg px-4 py-2"></textarea>
                </div>
                
                <div class="flex space-x-3">
                    <button type="submit" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">
                        Donate Now
                    </button>
                    <button type="button" onclick="closeDonationModal()" class="px-6 py-3 border rounded-lg hover:bg-gray-50">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.id = 'donationModal';
    
    document.getElementById('donationForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const amount = document.getElementById('donationAmount').value;
        const name = document.getElementById('donorName').value;
        const email = document.getElementById('donorEmail').value;
        const message = document.getElementById('donationMessage').value;
        
        if (!amount || amount < 5) {
            alert('Please enter a donation amount of at least $5');
            return;
        }
        
        try {
            const response = await axios.post('/api/donate', {
                donor_name: name,
                donor_email: email,
                amount: parseFloat(amount),
                message: message
            });
            
            if (response.data.success) {
                alert('Thank you for your donation! You will receive a confirmation email shortly.');
                closeDonationModal();
            }
        } catch (error) {
            console.error('Donation error:', error);
            alert('Error processing donation. Please try again.');
        }
    });
}

function setDonationAmount(amount) {
    document.getElementById('donationAmount').value = amount;
}

function closeDonationModal() {
    const modal = document.getElementById('donationModal');
    if (modal) {
        modal.remove();
    }
}

// CSS for scrolling animation
const style = document.createElement('style');
style.textContent = `
    @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
    .animate-scroll {
        animation: scroll 30s linear infinite;
        display: inline-block;
    }
`;
document.head.appendChild(style);
