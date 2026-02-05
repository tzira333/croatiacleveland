# 🪟 Windows Development Setup Guide

## Project Location
**Windows Path:** `C:\Repo\croatiacleveland`

## Prerequisites

### Required Software
1. **Node.js** (v18 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **Git for Windows**
   - Download: https://git-scm.com/download/win
   - Verify: `git --version`

4. **Wrangler CLI** (Cloudflare)
   - Will be installed with npm dependencies
   - Verify after install: `npx wrangler --version`

5. **Code Editor** (Recommended)
   - Visual Studio Code: https://code.visualstudio.com/

## Initial Setup

### Step 1: Create Project Directory

Open PowerShell or Command Prompt as Administrator:

```powershell
# Create the directory
mkdir C:\Repo
cd C:\Repo

# Download and extract the project backup
# Use the backup link: https://www.genspark.ai/api/files/s/MfjYdwyi
# Extract to C:\Repo\croatiacleveland
```

**OR if cloning from GitHub:**

```powershell
cd C:\Repo
git clone https://github.com/YOUR_USERNAME/croatiacleveland.git
cd croatiacleveland
```

### Step 2: Install Dependencies

```powershell
cd C:\Repo\croatiacleveland
npm install
```

This will install:
- Hono framework
- Cloudflare Workers dependencies
- Vite (build tool)
- Wrangler (Cloudflare CLI)
- TypeScript
- All other dependencies

### Step 3: Set Up Database

```powershell
# Apply database migrations locally
npm run db:migrate:local

# Seed with sample data
npm run db:seed
```

### Step 4: Build the Project

```powershell
npm run build
```

This creates the `dist/` folder with compiled code.

## Development Workflow

### Option 1: Using Wrangler (Recommended)

```powershell
# Start development server
npm run dev:sandbox
```

This runs: `wrangler pages dev dist --d1=croatia-cleveland-db --local --ip 0.0.0.0 --port 3000`

Access at: http://localhost:3000

### Option 2: Using Vite

```powershell
npm run dev
```

Access at: http://localhost:5173 (Vite dev server)

**Note:** Vite is faster but doesn't include D1 database. Use wrangler for full testing.

## Common Development Commands

```powershell
# Build project
npm run build

# Start development server with database
npm run dev:sandbox

# Run database migrations
npm run db:migrate:local

# Seed database with sample data
npm run db:seed

# Reset database completely
npm run db:reset

# Test database console
npm run db:console:local

# Deploy to Cloudflare Pages
npm run deploy:prod
```

## Database Management

### View Database (Local)

The local database is stored at:
```
C:\Repo\croatiacleveland\.wrangler\state\v3\d1\
```

### Run SQL Commands

```powershell
# Open database console
npm run db:console:local

# Then enter SQL commands:
# SELECT * FROM users;
# SELECT * FROM forum_categories;
# etc.
```

### Create New Migration

1. Create file in `migrations/` folder:
   ```
   migrations/0003_your_migration_name.sql
   ```

2. Apply migration:
   ```powershell
   npm run db:migrate:local
   ```

## GitHub Integration

### First Time Setup

```powershell
cd C:\Repo\croatiacleveland

# Initialize git if not already done
git init

# Configure git
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/croatiacleveland.git

# Check remote
git remote -v
```

### Daily Git Workflow

```powershell
# Check status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

### Merge to Existing GitHub Project

If the GitHub repository already exists:

```powershell
cd C:\Repo\croatiacleveland

# Add remote (if not already added)
git remote add origin https://github.com/YOUR_USERNAME/croatiacleveland.git

# Fetch existing code
git fetch origin

# If you want to merge with existing code
git merge origin/main --allow-unrelated-histories

# Or if you want to replace everything
git push origin main --force

# Normal push for updates
git push origin main
```

## File Structure

```
C:\Repo\croatiacleveland\
├── src\
│   └── index.tsx              # Main application
├── public\
│   └── static\
│       ├── app.js             # Frontend JavaScript
│       ├── styles.css         # Custom CSS
│       ├── forum.js           # Public forum JS
│       └── forum-members.js   # Members forum JS
├── migrations\
│   ├── 0001_initial_schema.sql      # Initial database
│   └── 0002_add_forum_tables.sql    # Forum tables
├── dist\                      # Built files (generated)
├── .wrangler\                # Local Wrangler data (generated)
├── node_modules\             # Dependencies (generated)
├── package.json              # Dependencies and scripts
├── wrangler.jsonc            # Cloudflare configuration
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── ecosystem.config.cjs      # PM2 config (for Linux/Mac)
├── seed.sql                  # Sample data
├── .gitignore               # Git ignore rules
├── README.md                # Main documentation
├── FORUM_SUMMARY.md         # Forum documentation
└── PROJECT_SUMMARY.md       # Complete project guide
```

## Windows-Specific Notes

### Path Differences

The project uses cross-platform paths, but note:
- Windows: `C:\Repo\croatiacleveland\`
- Linux/Mac: `/home/user/webapp/`

### PowerShell vs CMD

Both work, but PowerShell is recommended:
- Better error messages
- Supports modern syntax
- Better npm integration

### Line Endings

Git may change line endings. Configure:

```powershell
git config --global core.autocrlf true
```

This converts LF to CRLF on Windows automatically.

### Node.js on Windows

If you get ENOENT errors:
```powershell
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
Remove-Item node_modules -Recurse -Force
npm install
```

## Cloudflare Setup

### Create Account

1. Go to https://dash.cloudflare.com/
2. Sign up for free account
3. Note your Account ID and API Token

### Configure Wrangler

```powershell
# Login to Cloudflare
npx wrangler login
```

This opens browser for authentication.

### Create Production Database

```powershell
# Create D1 database on Cloudflare
npx wrangler d1 create croatia-cleveland-db

# Copy the database_id from output
# Update wrangler.jsonc with the ID
```

### Deploy to Production

```powershell
# Apply migrations to production database
npm run db:migrate:prod

# Deploy to Cloudflare Pages
npm run deploy:prod
```

## Troubleshooting

### Port 3000 Already in Use

```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (use PID from above)
taskkill /PID <PID> /F
```

### Build Errors

```powershell
# Clear everything and rebuild
Remove-Item dist -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item .wrangler -Recurse -Force -ErrorAction SilentlyContinue
npm run build
```

### Database Issues

```powershell
# Reset local database
npm run db:reset
```

### Module Not Found

```powershell
# Reinstall dependencies
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json -Force
npm install
```

## VS Code Extensions (Recommended)

Install these extensions for better development:

1. **ESLint** - JavaScript linting
2. **Prettier** - Code formatting
3. **Tailwind CSS IntelliSense** - CSS autocomplete
4. **SQLite Viewer** - View local database
5. **GitLens** - Enhanced Git integration
6. **Thunder Client** - API testing (alternative to Postman)

## Environment Variables (For Production)

Create `.dev.vars` file in project root:

```env
# .dev.vars (local development only)
STRIPE_SECRET_KEY=sk_test_your_key_here
JWT_SECRET=your-secret-key-here
```

**Note:** `.dev.vars` is in `.gitignore` - never commit secrets!

For production, use Wrangler secrets:

```powershell
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name croatia-cleveland-fc
```

## Testing

```powershell
# Test homepage
curl http://localhost:3000

# Test API
curl http://localhost:3000/api/news
curl http://localhost:3000/api/teams
curl http://localhost:3000/api/forum/categories?type=public

# Test forum pages
# Open in browser:
# http://localhost:3000/forum
# http://localhost:3000/forum/members
```

## Domain Setup (Production)

Once deployed to Cloudflare Pages:

```powershell
# Add custom domain
npx wrangler pages domain add croatiacleveland1957.com --project-name croatia-cleveland-fc

# Follow DNS configuration instructions from Cloudflare
```

## Quick Reference

**Start Development:**
```powershell
cd C:\Repo\croatiacleveland
npm run build
npm run dev:sandbox
```

**Open in Browser:**
- http://localhost:3000

**Common Issues:**
- Port in use? Kill process or change port
- Build errors? Clear dist/ and rebuild
- Database errors? Run `npm run db:reset`

## Support

For issues or questions:
1. Check README.md
2. Check PROJECT_SUMMARY.md
3. Check FORUM_SUMMARY.md
4. Review error messages carefully
5. Check Cloudflare Workers documentation

## Next Steps

1. ✅ Download project to `C:\Repo\croatiacleveland`
2. ✅ Install dependencies: `npm install`
3. ✅ Set up database: `npm run db:migrate:local`
4. ✅ Build project: `npm run build`
5. ✅ Start dev server: `npm run dev:sandbox`
6. ✅ Configure GitHub remote
7. ✅ Push to GitHub: `git push origin main`
8. ✅ Deploy to Cloudflare Pages when ready

---

**Windows development is fully supported!** All commands work on Windows with PowerShell or Command Prompt. 🪟✅
