import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { jwt, sign, verify } from 'hono/jwt'

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// JWT middleware for protected routes
const jwtMiddleware = jwt({
  secret: 'croatia-cleveland-secret-key-2024', // In production, use environment variable
  alg: 'HS256'
})

// ==================== PUBLIC API ROUTES ====================

// Get active news for scrolling banner
app.get('/api/news', async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT * FROM news WHERE active = 1 ORDER BY priority DESC, created_at DESC LIMIT 10
  `).all()
  return c.json(results)
})

// Get teams
app.get('/api/teams', async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT * FROM teams WHERE active = 1 ORDER BY name
  `).all()
  return c.json(results)
})

// Get games schedule
app.get('/api/games', async (c) => {
  const teamId = c.req.query('team_id')
  let query = `
    SELECT g.*, t.name as team_name 
    FROM games g 
    JOIN teams t ON g.team_id = t.id 
    WHERE g.game_date >= date('now')
  `
  if (teamId) {
    query += ` AND g.team_id = ${teamId}`
  }
  query += ` ORDER BY g.game_date ASC`
  
  const { results } = await c.env.DB.prepare(query).all()
  return c.json(results)
})

// Get past games with scores
app.get('/api/games/results', async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT g.*, t.name as team_name 
    FROM games g 
    JOIN teams t ON g.team_id = t.id 
    WHERE g.status = 'completed' 
    ORDER BY g.game_date DESC 
    LIMIT 20
  `).all()
  return c.json(results)
})

// Get events
app.get('/api/events', async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT * FROM events 
    WHERE active = 1 AND event_date >= date('now')
    ORDER BY event_date ASC
  `).all()
  return c.json(results)
})

// Get products
app.get('/api/products', async (c) => {
  const category = c.req.query('category')
  let query = 'SELECT * FROM products WHERE active = 1'
  if (category) {
    query += ` AND category = '${category}'`
  }
  query += ' ORDER BY name'
  
  const { results } = await c.env.DB.prepare(query).all()
  return c.json(results)
})

// Get Croatia Park updates
app.get('/api/croatia-park', async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT * FROM croatia_park_updates ORDER BY created_at DESC
  `).all()
  return c.json(results)
})

// Submit volunteer application
app.post('/api/volunteers', async (c) => {
  const { name, email, phone, availability, skills } = await c.req.json()
  
  const result = await c.env.DB.prepare(`
    INSERT INTO volunteers (name, email, phone, availability, skills)
    VALUES (?, ?, ?, ?, ?)
  `).bind(name, email, phone, availability, skills).run()
  
  return c.json({ success: true, id: result.meta.last_row_id })
})

// Process donation (placeholder - integrate with Stripe)
app.post('/api/donate', async (c) => {
  const { donor_name, donor_email, amount, message } = await c.req.json()
  
  // TODO: Integrate with Stripe payment processing
  const stripe_payment_id = 'test_' + Date.now()
  
  const result = await c.env.DB.prepare(`
    INSERT INTO donations (donor_name, donor_email, amount, message, stripe_payment_id)
    VALUES (?, ?, ?, ?, ?)
  `).bind(donor_name, donor_email, amount, message, stripe_payment_id).run()
  
  return c.json({ success: true, id: result.meta.last_row_id })
})

// Get media gallery
app.get('/api/media', async (c) => {
  const category = c.req.query('category')
  const type = c.req.query('type')
  
  let query = 'SELECT * FROM media WHERE 1=1'
  if (category) query += ` AND category = '${category}'`
  if (type) query += ` AND media_type = '${type}'`
  query += ' ORDER BY created_at DESC'
  
  const { results } = await c.env.DB.prepare(query).all()
  return c.json(results)
})

// ==================== FORUM API ROUTES ====================

// Get forum categories (filtered by type)
app.get('/api/forum/categories', async (c) => {
  const type = c.req.query('type') // 'public' or 'members'
  
  let query = 'SELECT * FROM forum_categories WHERE active = 1'
  if (type) {
    query += ` AND category_type = '${type}'`
  }
  query += ' ORDER BY sort_order, name'
  
  const { results } = await c.env.DB.prepare(query).all()
  return c.json(results)
})

// Get topics in a category
app.get('/api/forum/categories/:categoryId/topics', async (c) => {
  const categoryId = c.req.param('categoryId')
  
  const { results } = await c.env.DB.prepare(`
    SELECT 
      t.*,
      u.first_name || ' ' || u.last_name as author_name,
      u.email as author_email
    FROM forum_topics t
    JOIN users u ON t.user_id = u.id
    WHERE t.category_id = ?
    ORDER BY t.pinned DESC, t.last_reply_at DESC, t.created_at DESC
  `).bind(categoryId).all()
  
  return c.json(results)
})

// Get single topic with posts
app.get('/api/forum/topics/:topicId', async (c) => {
  const topicId = c.req.param('topicId')
  
  // Get topic details
  const topic = await c.env.DB.prepare(`
    SELECT 
      t.*,
      u.first_name || ' ' || u.last_name as author_name,
      u.email as author_email,
      fc.name as category_name,
      fc.category_type
    FROM forum_topics t
    JOIN users u ON t.user_id = u.id
    JOIN forum_categories fc ON t.category_id = fc.id
    WHERE t.id = ?
  `).bind(topicId).first()
  
  if (!topic) {
    return c.json({ error: 'Topic not found' }, 404)
  }
  
  // Increment view count
  await c.env.DB.prepare(`
    UPDATE forum_topics SET views = views + 1 WHERE id = ?
  `).bind(topicId).run()
  
  // Get posts/replies
  const { results: posts } = await c.env.DB.prepare(`
    SELECT 
      p.*,
      u.first_name || ' ' || u.last_name as author_name,
      u.email as author_email
    FROM forum_posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.topic_id = ?
    ORDER BY p.created_at ASC
  `).bind(topicId).all()
  
  return c.json({ topic, posts })
})

// Create new topic (requires authentication)
app.post('/api/forum/topics', async (c) => {
  try {
    // Simple auth check - get token from header
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ error: 'Authentication required' }, 401)
    }
    
    const token = authHeader.replace('Bearer ', '')
    const payload = await verify(token, 'croatia-cleveland-secret-key-2024', 'HS256')
    
    const { category_id, title, content } = await c.req.json()
    
    // Verify category exists and user has access
    const category = await c.env.DB.prepare(`
      SELECT category_type FROM forum_categories WHERE id = ? AND active = 1
    `).bind(category_id).first()
    
    if (!category) {
      return c.json({ error: 'Invalid category' }, 400)
    }
    
    // If members-only category, check membership status
    if (category.category_type === 'members') {
      const user = await c.env.DB.prepare(`
        SELECT membership_status FROM users WHERE id = ?
      `).bind(payload.userId).first()
      
      if (!user || user.membership_status !== 'active') {
        return c.json({ error: 'Active membership required' }, 403)
      }
    }
    
    // Create topic
    const result = await c.env.DB.prepare(`
      INSERT INTO forum_topics (category_id, user_id, title, content, last_reply_at)
      VALUES (?, ?, ?, ?, datetime('now'))
    `).bind(category_id, payload.userId, title, content).run()
    
    return c.json({ success: true, topicId: result.meta.last_row_id })
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401)
  }
})

// Create reply to topic (requires authentication)
app.post('/api/forum/topics/:topicId/replies', async (c) => {
  try {
    const authHeader = c.req.header('Authorization')
    if (!authHeader) {
      return c.json({ error: 'Authentication required' }, 401)
    }
    
    const token = authHeader.replace('Bearer ', '')
    const payload = await verify(token, 'croatia-cleveland-secret-key-2024', 'HS256')
    
    const topicId = c.req.param('topicId')
    const { content } = await c.req.json()
    
    // Verify topic exists and is not locked
    const topic = await c.env.DB.prepare(`
      SELECT t.locked, fc.category_type 
      FROM forum_topics t
      JOIN forum_categories fc ON t.category_id = fc.id
      WHERE t.id = ?
    `).bind(topicId).first()
    
    if (!topic) {
      return c.json({ error: 'Topic not found' }, 404)
    }
    
    if (topic.locked) {
      return c.json({ error: 'Topic is locked' }, 403)
    }
    
    // Check membership for members-only forums
    if (topic.category_type === 'members') {
      const user = await c.env.DB.prepare(`
        SELECT membership_status FROM users WHERE id = ?
      `).bind(payload.userId).first()
      
      if (!user || user.membership_status !== 'active') {
        return c.json({ error: 'Active membership required' }, 403)
      }
    }
    
    // Create reply
    const result = await c.env.DB.prepare(`
      INSERT INTO forum_posts (topic_id, user_id, content)
      VALUES (?, ?, ?)
    `).bind(topicId, payload.userId, content).run()
    
    // Update topic reply count and last reply time
    await c.env.DB.prepare(`
      UPDATE forum_topics 
      SET reply_count = reply_count + 1, 
          last_reply_at = datetime('now'),
          updated_at = datetime('now')
      WHERE id = ?
    `).bind(topicId).run()
    
    return c.json({ success: true, postId: result.meta.last_row_id })
  } catch (error) {
    return c.json({ error: 'Invalid token' }, 401)
  }
})

// ==================== AUTHENTICATION ====================

// User login
app.post('/api/auth/login', async (c) => {
  const { email, password } = await c.req.json()
  
  const user = await c.env.DB.prepare(`
    SELECT id, email, first_name, last_name, role, membership_status
    FROM users WHERE email = ?
  `).bind(email).first()
  
  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }
  
  // TODO: Implement proper password hashing verification (bcrypt)
  // For now, simplified authentication
  
  const token = await sign({
    userId: user.id,
    email: user.email,
    role: user.role
  }, 'croatia-cleveland-secret-key-2024', 'HS256')
  
  return c.json({ 
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      membershipStatus: user.membership_status
    }
  })
})

// ==================== PROTECTED ROUTES (MEMBERS ONLY) ====================

app.use('/api/members/*', jwtMiddleware)

// Get member info
app.get('/api/members/profile', async (c) => {
  const payload = c.get('jwtPayload')
  
  const user = await c.env.DB.prepare(`
    SELECT id, email, first_name, last_name, phone, role, membership_status, membership_expiry
    FROM users WHERE id = ?
  `).bind(payload.userId).first()
  
  return c.json(user)
})

// Get member's membership history
app.get('/api/members/memberships', async (c) => {
  const payload = c.get('jwtPayload')
  
  const { results } = await c.env.DB.prepare(`
    SELECT * FROM memberships WHERE user_id = ? ORDER BY created_at DESC
  `).bind(payload.userId).all()
  
  return c.json(results)
})

// ==================== PROTECTED ROUTES (BOARD ONLY) ====================

app.use('/api/board/*', jwtMiddleware)

// Get board meeting minutes
app.get('/api/board/minutes', async (c) => {
  const payload = c.get('jwtPayload')
  
  if (payload.role !== 'board' && payload.role !== 'admin') {
    return c.json({ error: 'Access denied' }, 403)
  }
  
  const { results } = await c.env.DB.prepare(`
    SELECT * FROM meeting_minutes ORDER BY meeting_date DESC
  `).all()
  
  return c.json(results)
})

// ==================== ADMIN ROUTES ====================

app.use('/api/admin/*', jwtMiddleware)

// Admin middleware to check role
const adminOnly = async (c: any, next: any) => {
  const payload = c.get('jwtPayload')
  if (payload.role !== 'admin') {
    return c.json({ error: 'Admin access required' }, 403)
  }
  await next()
}

app.use('/api/admin/*', adminOnly)

// Create/update news
app.post('/api/admin/news', async (c) => {
  const { title, content, category, priority } = await c.req.json()
  
  const result = await c.env.DB.prepare(`
    INSERT INTO news (title, content, category, priority, active)
    VALUES (?, ?, ?, ?, 1)
  `).bind(title, content, category, priority || 0).run()
  
  return c.json({ success: true, id: result.meta.last_row_id })
})

// Create game
app.post('/api/admin/games', async (c) => {
  const { team_id, opponent, game_date, location, home_away } = await c.req.json()
  
  const result = await c.env.DB.prepare(`
    INSERT INTO games (team_id, opponent, game_date, location, home_away, status)
    VALUES (?, ?, ?, ?, ?, 'scheduled')
  `).bind(team_id, opponent, game_date, location, home_away).run()
  
  return c.json({ success: true, id: result.meta.last_row_id })
})

// Update game score
app.put('/api/admin/games/:id/score', async (c) => {
  const id = c.req.param('id')
  const { score_home, score_away } = await c.req.json()
  
  await c.env.DB.prepare(`
    UPDATE games SET score_home = ?, score_away = ?, status = 'completed'
    WHERE id = ?
  `).bind(score_home, score_away, id).run()
  
  return c.json({ success: true })
})

// Create event
app.post('/api/admin/events', async (c) => {
  const { title, description, event_date, location, ticket_price, max_tickets } = await c.req.json()
  
  const result = await c.env.DB.prepare(`
    INSERT INTO events (title, description, event_date, location, ticket_price, max_tickets)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(title, description, event_date, location, ticket_price, max_tickets).run()
  
  return c.json({ success: true, id: result.meta.last_row_id })
})

// Create product
app.post('/api/admin/products', async (c) => {
  const { name, description, price, category, stock_quantity } = await c.req.json()
  
  const result = await c.env.DB.prepare(`
    INSERT INTO products (name, description, price, category, stock_quantity)
    VALUES (?, ?, ?, ?, ?)
  `).bind(name, description, price, category, stock_quantity).run()
  
  return c.json({ success: true, id: result.meta.last_row_id })
})

// Create Croatia Park update
app.post('/api/admin/croatia-park', async (c) => {
  const { title, content, progress_percentage } = await c.req.json()
  
  const result = await c.env.DB.prepare(`
    INSERT INTO croatia_park_updates (title, content, progress_percentage)
    VALUES (?, ?, ?)
  `).bind(title, content, progress_percentage).run()
  
  return c.json({ success: true, id: result.meta.last_row_id })
})

// Add meeting minutes
app.post('/api/admin/minutes', async (c) => {
  const { meeting_date, title, content } = await c.req.json()
  
  const result = await c.env.DB.prepare(`
    INSERT INTO meeting_minutes (meeting_date, title, content)
    VALUES (?, ?, ?)
  `).bind(meeting_date, title, content).run()
  
  return c.json({ success: true, id: result.meta.last_row_id })
})

// ==================== FRONTEND ROUTES ====================

// Main homepage
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Croatia Cleveland - American Croatian National Soccer Club</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-red-700 text-white shadow-lg">
            <div class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <img src="/static/logo.png" alt="Croatia Cleveland Logo" class="h-12 w-12" onerror="this.style.display='none'">
                        <div>
                            <h1 class="text-2xl font-bold">Croatia Cleveland</h1>
                            <p class="text-sm">American Croatian National Soccer Club</p>
                        </div>
                    </div>
                    <div class="hidden md:flex space-x-6">
                        <a href="/" class="hover:text-blue-200">Home</a>
                        <a href="/teams" class="hover:text-blue-200">Teams</a>
                        <a href="/schedule" class="hover:text-blue-200">Schedule</a>
                        <a href="/events" class="hover:text-blue-200">Events</a>
                        <a href="/shop" class="hover:text-blue-200">Shop</a>
                        <a href="/croatia-park" class="hover:text-blue-200">Croatia Park</a>
                        <a href="/forum" class="hover:text-blue-200">Forum</a>
                        <a href="/members" class="hover:text-blue-200">Members</a>
                        <a href="/board" class="hover:text-blue-200">Board</a>
                        <a href="/admin" class="hover:text-blue-200">Admin</a>
                    </div>
                    <button id="donateBtn" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold">
                        <i class="fas fa-heart mr-2"></i>Donate
                    </button>
                </div>
            </div>
        </nav>

        <!-- Scrolling News Banner -->
        <div class="bg-blue-800 text-white py-2 overflow-hidden">
            <div id="newsBanner" class="whitespace-nowrap animate-scroll">
                Loading news...
            </div>
        </div>

        <!-- Main Content -->
        <div id="mainContent" class="container mx-auto px-4 py-8">
            <!-- Hero Section -->
            <div class="bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg p-12 mb-8 text-center">
                <h2 class="text-4xl font-bold mb-4">Welcome to Croatia Cleveland</h2>
                <p class="text-xl mb-6">Proudly representing Croatian heritage and excellence in soccer since 1956</p>
                <div class="flex justify-center space-x-4">
                    <button onclick="window.location.href='/membership'" class="bg-white text-blue-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100">
                        Become a Member
                    </button>
                    <button onclick="window.location.href='/schedule'" class="bg-blue-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-800">
                        View Schedule
                    </button>
                </div>
            </div>

            <!-- Quick Stats -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-white p-6 rounded-lg shadow text-center">
                    <i class="fas fa-users text-4xl text-red-600 mb-2"></i>
                    <h3 class="text-2xl font-bold">500+</h3>
                    <p class="text-gray-600">Active Members</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow text-center">
                    <i class="fas fa-trophy text-4xl text-blue-600 mb-2"></i>
                    <h3 class="text-2xl font-bold">15</h3>
                    <p class="text-gray-600">Championships</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow text-center">
                    <i class="fas fa-futbol text-4xl text-red-600 mb-2"></i>
                    <h3 class="text-2xl font-bold">4</h3>
                    <p class="text-gray-600">Active Teams</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow text-center">
                    <i class="fas fa-calendar text-4xl text-blue-600 mb-2"></i>
                    <h3 class="text-2xl font-bold" id="nextGameDays">--</h3>
                    <p class="text-gray-600">Days to Next Game</p>
                </div>
            </div>

            <!-- Upcoming Games -->
            <div class="bg-white rounded-lg shadow p-6 mb-8">
                <h3 class="text-2xl font-bold mb-4 flex items-center">
                    <i class="fas fa-calendar-alt text-red-600 mr-2"></i>
                    Upcoming Games
                </h3>
                <div id="upcomingGames">Loading...</div>
            </div>

            <!-- Recent Results -->
            <div class="bg-white rounded-lg shadow p-6 mb-8">
                <h3 class="text-2xl font-bold mb-4 flex items-center">
                    <i class="fas fa-list text-blue-600 mr-2"></i>
                    Recent Results
                </h3>
                <div id="recentResults">Loading...</div>
            </div>

            <!-- Croatia Park Progress -->
            <div class="bg-white rounded-lg shadow p-6 mb-8">
                <h3 class="text-2xl font-bold mb-4 flex items-center">
                    <i class="fas fa-hard-hat text-red-600 mr-2"></i>
                    Croatia Park Project
                </h3>
                <div id="croatiaParkProgress">Loading...</div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-8 mt-12">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h4 class="text-lg font-bold mb-4">About Us</h4>
                        <p class="text-gray-400">American Croatian National Soccer Club "Croatia" Cleveland - Preserving Croatian heritage through soccer since 1956.</p>
                    </div>
                    <div>
                        <h4 class="text-lg font-bold mb-4">Location</h4>
                        <p class="text-gray-400">
                            <i class="fas fa-map-marker-alt mr-2"></i>
                            American Croatian Lodge<br>
                            LakeShore Blvd, Eastlake, OH
                        </p>
                    </div>
                    <div>
                        <h4 class="text-lg font-bold mb-4">Contact</h4>
                        <p class="text-gray-400">
                            <i class="fas fa-envelope mr-2"></i>
                            info@croatiacleveland.com<br>
                            <i class="fas fa-phone mr-2"></i>
                            (216) 555-0100
                        </p>
                    </div>
                </div>
                <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2026 Croatia Cleveland. All rights reserved.</p>
                </div>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/app.js"></script>
    </body>
    </html>
  `)
})

// Teams page
app.get('/teams', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Our Teams - Croatia Cleveland</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <nav class="bg-red-700 text-white shadow-lg">
            <div class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <h1 class="text-2xl font-bold">Croatia Cleveland</h1>
                    </div>
                    <a href="/" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                        <i class="fas fa-home mr-2"></i>Home
                    </a>
                </div>
            </div>
        </nav>

        <div class="container mx-auto px-4 py-8">
            <h2 class="text-4xl font-bold mb-8 text-center">Our Teams</h2>
            
            <div id="teamsContainer" class="space-y-6">
                <p class="text-center text-gray-600">Loading teams...</p>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
            async function loadTeams() {
                try {
                    const response = await axios.get('/api/teams');
                    const teams = response.data;
                    
                    const container = document.getElementById('teamsContainer');
                    container.innerHTML = teams.map(team => \`
                        <div class="bg-white rounded-lg shadow-lg p-8">
                            <div class="flex items-center justify-between mb-4">
                                <div>
                                    <h3 class="text-3xl font-bold text-red-700">\${team.name}</h3>
                                    <p class="text-gray-600 text-lg">\${team.division || 'Division TBA'}</p>
                                </div>
                                <i class="fas fa-futbol text-6xl text-blue-600"></i>
                            </div>
                            <p class="text-gray-700 mb-4">\${team.description || 'Team information coming soon.'}</p>
                            <button onclick="window.location.href='/schedule?team_id=\${team.id}'" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                <i class="fas fa-calendar mr-2"></i>View Schedule
                            </button>
                        </div>
                    \`).join('');
                } catch (error) {
                    console.error('Error loading teams:', error);
                    document.getElementById('teamsContainer').innerHTML = '<p class="text-red-600 text-center">Error loading teams</p>';
                }
            }
            
            loadTeams();
        </script>
    </body>
    </html>
  `)
})

// Croatia Park page
app.get('/croatia-park', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Croatia Park Project - Croatia Cleveland</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="/static/styles.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
        <nav class="bg-red-700 text-white shadow-lg">
            <div class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <h1 class="text-2xl font-bold">Croatia Cleveland</h1>
                    </div>
                    <a href="/" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                        <i class="fas fa-home mr-2"></i>Home
                    </a>
                </div>
            </div>
        </nav>

        <div class="container mx-auto px-4 py-8">
            <div class="bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg p-12 mb-8 text-center">
                <h2 class="text-4xl font-bold mb-4">
                    <i class="fas fa-hard-hat mr-3"></i>Croatia Park Project
                </h2>
                <p class="text-xl">New Soccer Field Facility - Eastlake, Ohio</p>
                <p class="mt-2">Behind Croatia Cleveland Stadium Field at American Croatian Lodge</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div class="bg-white rounded-lg shadow p-8">
                    <h3 class="text-2xl font-bold mb-4">Project Updates</h3>
                    <div id="updatesContainer">
                        <p class="text-gray-600">Loading updates...</p>
                    </div>
                </div>

                <div class="bg-white rounded-lg shadow p-8">
                    <h3 class="text-2xl font-bold mb-4">
                        <i class="fas fa-hands-helping text-red-600 mr-2"></i>
                        Volunteer for Croatia Park
                    </h3>
                    <p class="text-gray-600 mb-6">Join our community in building the future of Croatia Cleveland soccer!</p>
                    
                    <form id="volunteerForm" class="space-y-4">
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">Name *</label>
                            <input type="text" id="volunteerName" required class="w-full border rounded-lg px-4 py-2">
                        </div>
                        
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">Email *</label>
                            <input type="email" id="volunteerEmail" required class="w-full border rounded-lg px-4 py-2">
                        </div>
                        
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">Phone</label>
                            <input type="tel" id="volunteerPhone" class="w-full border rounded-lg px-4 py-2">
                        </div>
                        
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">Availability</label>
                            <textarea id="volunteerAvailability" rows="3" placeholder="e.g., Weekends, Evenings" class="w-full border rounded-lg px-4 py-2"></textarea>
                        </div>
                        
                        <div>
                            <label class="block text-gray-700 font-bold mb-2">Skills</label>
                            <textarea id="volunteerSkills" rows="3" placeholder="e.g., Construction, Landscaping, Fundraising" class="w-full border rounded-lg px-4 py-2"></textarea>
                        </div>
                        
                        <button type="submit" class="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">
                            <i class="fas fa-check mr-2"></i>Submit Volunteer Application
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script>
            // Load updates
            async function loadUpdates() {
                try {
                    const response = await axios.get('/api/croatia-park');
                    const updates = response.data;
                    
                    const container = document.getElementById('updatesContainer');
                    
                    if (updates.length === 0) {
                        container.innerHTML = '<p class="text-gray-500">No updates available.</p>';
                        return;
                    }
                    
                    container.innerHTML = updates.map(update => \`
                        <div class="border-b pb-4 mb-4 last:border-b-0">
                            <div class="mb-3">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-sm font-semibold text-gray-700">Progress</span>
                                    <span class="text-sm font-semibold text-blue-600">\${update.progress_percentage}%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-3">
                                    <div class="bg-blue-600 h-3 rounded-full" style="width: \${update.progress_percentage}%"></div>
                                </div>
                            </div>
                            <h4 class="font-bold text-lg mb-2">\${update.title}</h4>
                            <p class="text-gray-600 mb-2">\${update.content}</p>
                            <p class="text-sm text-gray-500">\${new Date(update.created_at).toLocaleDateString()}</p>
                        </div>
                    \`).join('');
                } catch (error) {
                    console.error('Error loading updates:', error);
                    document.getElementById('updatesContainer').innerHTML = '<p class="text-red-600">Error loading updates</p>';
                }
            }
            
            // Handle volunteer form submission
            document.getElementById('volunteerForm').addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const data = {
                    name: document.getElementById('volunteerName').value,
                    email: document.getElementById('volunteerEmail').value,
                    phone: document.getElementById('volunteerPhone').value,
                    availability: document.getElementById('volunteerAvailability').value,
                    skills: document.getElementById('volunteerSkills').value
                };
                
                try {
                    const response = await axios.post('/api/volunteers', data);
                    
                    if (response.data.success) {
                        alert('Thank you for volunteering! We will contact you soon.');
                        this.reset();
                    }
                } catch (error) {
                    console.error('Error submitting volunteer form:', error);
                    alert('Error submitting form. Please try again.');
                }
            });
            
            loadUpdates();
        </script>
    </body>
    </html>
  `)
})

// Public Forum page
app.get('/forum', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Public Forum - Croatia Cleveland</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/styles.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <nav class="bg-red-700 text-white shadow-lg">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <h1 class="text-2xl font-bold">Croatia Cleveland</h1>
                    <span class="text-sm opacity-75">Public Forum</span>
                </div>
                <div class="flex space-x-4">
                    <a href="/" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                        <i class="fas fa-home mr-2"></i>Home
                    </a>
                    <a href="/forum/members" class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg">
                        <i class="fas fa-lock mr-2"></i>Members Forum
                    </a>
                </div>
            </div>
        </div>
    </nav>
    <div class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-3xl font-bold mb-2">
                        <i class="fas fa-comments text-red-600 mr-2"></i>Public Forum
                    </h2>
                    <p class="text-gray-600">Connect with the Croatia Cleveland community</p>
                </div>
                <button id="newTopicBtn" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-bold">
                    <i class="fas fa-plus mr-2"></i>New Topic
                </button>
            </div>
        </div>
        <div id="forumCategories" class="space-y-4">
            <p class="text-center text-gray-600">Loading forum categories...</p>
        </div>
    </div>
    <div id="newTopicModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 class="text-2xl font-bold mb-4">Create New Topic</h3>
            <form id="newTopicForm">
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Category *</label>
                    <select id="topicCategory" required class="w-full border rounded-lg px-4 py-2">
                        <option value="">Select a category...</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Topic Title *</label>
                    <input type="text" id="topicTitle" required maxlength="200" class="w-full border rounded-lg px-4 py-2" placeholder="Enter topic title">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 font-bold mb-2">Message *</label>
                    <textarea id="topicContent" required rows="8" class="w-full border rounded-lg px-4 py-2" placeholder="What's on your mind?"></textarea>
                </div>
                <div class="flex space-x-3">
                    <button type="submit" class="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700">
                        <i class="fas fa-paper-plane mr-2"></i>Post Topic
                    </button>
                    <button type="button" onclick="closeNewTopicModal()" class="px-6 py-3 border rounded-lg hover:bg-gray-50">Cancel</button>
                </div>
            </form>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="/static/forum.js"></script>
</body>
</html>`)
})

// Members Forum page
app.get('/forum/members', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Members Forum - Croatia Cleveland</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/styles.css" rel="stylesheet">
</head>
<body class="bg-gray-50">
    <nav class="bg-green-700 text-white shadow-lg">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <h1 class="text-2xl font-bold">Croatia Cleveland</h1>
                    <span class="text-sm opacity-75"><i class="fas fa-lock mr-1"></i>Members Forum</span>
                </div>
                <div class="flex space-x-4">
                    <a href="/" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                        <i class="fas fa-home mr-2"></i>Home
                    </a>
                    <a href="/forum" class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg">
                        <i class="fas fa-comments mr-2"></i>Public Forum
                    </a>
                </div>
            </div>
        </div>
    </nav>
    <div id="accessCheck" class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow p-8 text-center">
            <i class="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
            <p class="text-gray-600">Verifying membership status...</p>
        </div>
    </div>
    <div id="forumContent" class="hidden container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow p-6 mb-6">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-3xl font-bold mb-2">
                        <i class="fas fa-lock text-green-600 mr-2"></i>Members Only Forum
                    </h2>
                    <p class="text-gray-600">Private discussions for active members in good standing</p>
                    <p class="text-sm text-green-600 mt-2">
                        <i class="fas fa-check-circle mr-1"></i>Your membership is active
                    </p>
                </div>
                <button id="newTopicBtn" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-bold">
                    <i class="fas fa-plus mr-2"></i>New Topic
                </button>
            </div>
        </div>
        <div id="forumCategories" class="space-y-4">
            <p class="text-center text-gray-600">Loading forum categories...</p>
        </div>
    </div>
    <div id="accessDenied" class="hidden container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow p-8 text-center">
            <i class="fas fa-lock text-6xl text-red-600 mb-4"></i>
            <h2 class="text-2xl font-bold mb-4">Members Only Area</h2>
            <p class="text-gray-600 mb-6">This forum is restricted to active members with paid membership in good standing.</p>
            <div class="max-w-md mx-auto space-y-4">
                <div class="text-left bg-blue-50 p-4 rounded-lg">
                    <h3 class="font-bold mb-2">Not a member yet?</h3>
                    <p class="text-sm text-gray-700 mb-3">Join Croatia Cleveland FC!</p>
                    <button onclick="window.location.href='/membership'" class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        <i class="fas fa-user-plus mr-2"></i>Become a Member
                    </button>
                </div>
                <div class="text-left bg-green-50 p-4 rounded-lg">
                    <h3 class="font-bold mb-2">Already a member?</h3>
                    <p class="text-sm text-gray-700 mb-3">Please login to access the members forum.</p>
                    <button onclick="window.location.href='/login'" class="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        <i class="fas fa-sign-in-alt mr-2"></i>Login
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div id="newTopicModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 class="text-2xl font-bold mb-4">Create New Topic</h3>
            <form id="newTopicForm">
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Category *</label>
                    <select id="topicCategory" required class="w-full border rounded-lg px-4 py-2">
                        <option value="">Select a category...</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 font-bold mb-2">Topic Title *</label>
                    <input type="text" id="topicTitle" required maxlength="200" class="w-full border rounded-lg px-4 py-2" placeholder="Enter topic title">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 font-bold mb-2">Message *</label>
                    <textarea id="topicContent" required rows="8" class="w-full border rounded-lg px-4 py-2" placeholder="What's on your mind?"></textarea>
                </div>
                <div class="flex space-x-3">
                    <button type="submit" class="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700">
                        <i class="fas fa-paper-plane mr-2"></i>Post Topic
                    </button>
                    <button type="button" onclick="closeNewTopicModal()" class="px-6 py-3 border rounded-lg hover:bg-gray-50">Cancel</button>
                </div>
            </form>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <script src="/static/forum-members.js"></script>
</body>
</html>`)
})

export default app
