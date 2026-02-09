# Croatia Cleveland - American Croatian National Soccer Club Website

**Official Domain:** croatiacleveland1957.com

A full-stack web application for the American Croatian National Soccer Club "Croatia" Cleveland, featuring membership management, event ticketing, donations, merchandise store, and community forums.

## 🌐 Live URLs

- **Production**: (To be deployed to Cloudflare Pages)

## ✅ Completed Features

### Public Website
- ✅ Responsive homepage with club information
- ✅ Scrolling news banner with latest updates
- ✅ Team schedules and game results display
- ✅ Upcoming games calendar
- ✅ Recent results with win/loss tracking
- ✅ Croatia Park project progress tracker
- ✅ Donation system with modal interface
- ✅ Event listings
- ✅ Product/merchandise display
- ✅ **Public Forum** - Open community discussions
- ✅ **Members Forum** - Private forum for active members only

### Backend API
- ✅ RESTful API with Hono framework
- ✅ Cloudflare D1 database integration
- ✅ JWT-based authentication system
- ✅ Role-based access control (member, board, admin)
- ✅ News management endpoints
- ✅ Game schedule management
- ✅ Event management
- ✅ Product catalog management
- ✅ Donation processing endpoints
- ✅ Volunteer registration
- ✅ Croatia Park updates management

### Database Schema
- ✅ Users (members, board, admins)
- ✅ Memberships with payment tracking
- ✅ Products for merchandise store
- ✅ Orders and order items
- ✅ Donations
- ✅ Teams (Majors, Reserves, Oluja, Lučko)
- ✅ Game schedules
- ✅ Events and event tickets
- ✅ News updates
- ✅ Media gallery (photos/videos)
- ✅ Board meeting minutes
- ✅ Croatia Park project updates
- ✅ Volunteers
- ✅ **Forum categories** (public and members-only)
- ✅ **Forum topics** with view counts and pinning
- ✅ **Forum posts** with edit tracking

## 🚧 In Progress / To Do

### High Priority (Must Have)
- ⏳ **Stripe payment integration** - Real payment processing for donations, memberships, tickets, products
- ⏳ **Full authentication pages** - Complete login/register UI with password hashing (bcrypt)
- ⏳ **Password-protected Members section** - Member-only content area with profile management
- ⏳ **Password-protected Board section** - Board meeting minutes access for board members
- ⏳ **Admin management console** - Full CRUD interface for managing all content
- ⏳ **Production deployment** - Deploy to Cloudflare Pages with custom domain

### Medium Priority (Should Have)
- ⏳ **Cloudflare R2 integration** - Media storage for photos/videos
- ⏳ **Additional pages** - Schedule calendar view, Events listing, Shop with cart
- ⏳ **Product shopping cart** - Add to cart, checkout flow with Stripe
- ⏳ **Event ticketing system** - Complete ticket purchase and management
- ⏳ **Membership portal** - Self-service membership renewal and management
- ⏳ **Media gallery** - Photo/video uploads and display with R2 storage
- ⏳ **Email notifications** - SendGrid/Mailgun for transaction emails

### Low Priority (Nice to Have)
- ⏳ **Mobile app** - PWA or native mobile app
- ⏳ **Social media integration** - Auto-post updates to social platforms
- ⏳ **Analytics dashboard** - Track website usage and conversions
- ⏳ **Multi-language support** - English and Croatian language options
- ⏳ **Fan zone** - Forums, fan photos, supporter merchandise

## 📊 API Endpoints

### Public Endpoints
- `GET /api/news` - Get active news updates
- `GET /api/teams` - Get all teams
- `GET /api/games` - Get upcoming games (filter by team_id)
- `GET /api/games/results` - Get past game results
- `GET /api/events` - Get upcoming events
- `GET /api/products` - Get products (filter by category)
- `GET /api/croatia-park` - Get Croatia Park updates
- `GET /api/media` - Get media gallery (filter by category/type)
- `POST /api/volunteers` - Submit volunteer application
- `POST /api/donate` - Process donation
- `POST /api/auth/login` - User login

### Protected Endpoints (Member Access)
- `GET /api/members/profile` - Get member profile
- `GET /api/members/memberships` - Get membership history

### Protected Endpoints (Board Access)
- `GET /api/board/minutes` - Get board meeting minutes

### Admin Endpoints (Admin Only)
- `POST /api/admin/news` - Create news update
- `POST /api/admin/games` - Create game schedule
- `PUT /api/admin/games/:id/score` - Update game score
- `POST /api/admin/events` - Create event
- `POST /api/admin/products` - Create product
- `POST /api/admin/croatia-park` - Create Croatia Park update
- `POST /api/admin/minutes` - Add board meeting minutes

## 🗄️ Database Tables

1. **users** - Member accounts with roles
2. **memberships** - Membership records and payment tracking
3. **products** - Merchandise catalog
4. **orders** / **order_items** - Product orders
5. **donations** - Donation records
6. **teams** - Soccer teams (Majors, Reserves, Oluja, Lučko, etc.)
7. **games** - Game schedules and results
8. **events** - Club events
9. **event_tickets** - Event ticket purchases
10. **news** - News updates for banner
11. **media** - Photo/video gallery
12. **meeting_minutes** - Executive board meeting minutes
13. **croatia_park_updates** - Croatia Park project updates
14. **volunteers** - Volunteer registrations

## 🛠️ Technology Stack

- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript
- **Backend**: Hono (TypeScript) on Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (planned for media)
- **Authentication**: JWT with role-based access
- **Deployment**: Cloudflare Pages
- **Development**: Vite, Wrangler, PM2

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm
- Wrangler CLI
- Git

### Installation

**Windows (C:\Repo\croatiacleveland):**
```powershell
cd C:\Repo\croatiacleveland
npm install
npm run db:migrate:local
npm run db:seed
npm run build
npm run dev:sandbox
```

**Linux/Mac:**
```bash
cd /home/user/webapp
npm install
npm run db:migrate:local
npm run db:seed
npm run build
npm run dev:sandbox
```

See [WINDOWS_SETUP.md](WINDOWS_SETUP.md) for detailed Windows instructions.
See [GITHUB_MERGE_GUIDE.md](GITHUB_MERGE_GUIDE.md) for GitHub integration.

### Development Commands

```bash
npm run dev              # Vite dev server (local)
npm run dev:sandbox      # Wrangler Pages dev (with D1)
npm run build            # Build for production
npm run deploy:prod      # Deploy to Cloudflare Pages
npm run db:migrate:local # Apply migrations locally
npm run db:migrate:prod  # Apply migrations to production
npm run db:seed          # Seed database with sample data
npm run db:reset         # Reset local database
npm run clean-port       # Kill process on port 3000
```

### Using PM2 in Development

```bash
# Start with PM2
cd /home/user/webapp && pm2 start ecosystem.config.cjs

# Check status
pm2 list

# View logs
pm2 logs croatia-cleveland-fc --nostream

# Restart
pm2 restart croatia-cleveland-fc

# Stop
pm2 delete croatia-cleveland-fc
```

## 📝 Sample Data

The database is seeded with sample data including:
- 4 teams (Majors, Reserves, Oluja, Lučko)
- 3 news updates
- 4 products
- 2 upcoming events
- 3 scheduled games
- 1 Croatia Park update
- 1 admin user (admin@croatiacleveland.com)

## 🔐 Authentication

### User Roles
- **member** - Regular club members
- **board** - Board members (access to meeting minutes)
- **admin** - Full administrative access

### JWT Configuration
- Algorithm: HS256
- Secret: `croatia-cleveland-secret-key-2024` (change in production!)

## 🎨 Design Features

- Croatian flag colors (red, white, blue) throughout
- Responsive design with Tailwind CSS
- Font Awesome icons
- Smooth animations and transitions
- Scrolling news banner
- Modal dialogs for donations
- Progress bars for Croatia Park project

## 📍 Club Information

**American Croatian National Soccer Club "Croatia" Cleveland**
- Location: American Croatian Lodge, LakeShore Blvd, Eastlake, OH
- Stadium: Croatia Cleveland Stadium Field
- New Facility: Croatia Park (under construction in Eastlake, OH)
- Teams: Majors (1st Division), Reserves, Oluja, Lučko, + Youth teams

## 🔄 Next Steps

1. **Integrate Stripe** for real payment processing
2. **Build admin console** with full CRUD operations
3. **Create additional pages** (Teams, Schedule, Events, Shop, Croatia Park)
4. **Implement R2 storage** for media uploads
5. **Add shopping cart** functionality
6. **Build membership portal** with renewal system
7. **Create event ticketing** purchase flow
8. **Add email notifications** (SendGrid/Mailgun)
9. **Deploy to production** on Cloudflare Pages
10. **Set up custom domain** (e.g., croatiacleveland.com)

## 📦 Deployment

### Cloudflare Pages Deployment

```bash
# Create D1 database on Cloudflare
npx wrangler d1 create croatia-cleveland-db

# Update wrangler.jsonc with database_id

# Apply migrations to production
npm run db:migrate:prod

# Deploy to Cloudflare Pages
npm run deploy:prod
```

## 📄 License

Copyright © 2026 Croatia Cleveland. All rights reserved.

## 🤝 Support

For questions or support:
- Email: info@croatiacleveland.com
- Phone: (216) 555-0100

---

**Built with ❤️ for the Croatia Cleveland soccer community**
