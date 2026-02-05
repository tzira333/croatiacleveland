# 🐙 GitHub Integration Guide

## Overview

This guide explains how to merge the Croatia Cleveland FC website code into your existing GitHub project.

## Project Information

- **Local Path:** `C:\Repo\croatiacleveland`
- **Domain:** croatiacleveland1957.com
- **GitHub:** https://github.com/YOUR_USERNAME/croatiacleveland

## Prerequisites

✅ Git installed on Windows
✅ GitHub account created
✅ Source code downloaded to `C:\Repo\croatiacleveland`

## Scenario 1: New GitHub Repository

If you're creating a brand new repository:

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `croatiacleveland`
3. Description: "Croatia Cleveland FC - Official Website"
4. **Important:** Do NOT initialize with README, .gitignore, or license
5. Click "Create repository"

### Step 2: Push Local Code to GitHub

Open PowerShell in `C:\Repo\croatiacleveland`:

```powershell
cd C:\Repo\croatiacleveland

# Initialize git (if not already done)
git init

# Configure git user
git config user.name "Your Name"
git config user.email "your@email.com"

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Croatia Cleveland FC website with forums"

# Rename branch to main (if needed)
git branch -M main

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/croatiacleveland.git

# Push to GitHub
git push -u origin main
```

### Step 3: Verify on GitHub

Go to your repository URL and verify all files are there.

## Scenario 2: Existing GitHub Repository (Empty or With Code)

If you already have a GitHub repository for this project:

### Option A: Replace Everything (Clean Slate)

Use this if you want to completely replace existing code:

```powershell
cd C:\Repo\croatiacleveland

# Initialize git if needed
git init

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/croatiacleveland.git

# Stage all files
git add .

# Commit
git commit -m "Complete Croatia Cleveland FC website with forum system"

# Force push (replaces everything on GitHub)
git push origin main --force
```

⚠️ **Warning:** This will overwrite everything in the GitHub repository!

### Option B: Merge with Existing Code

Use this if you want to keep existing code and merge:

```powershell
cd C:\Repo\croatiacleveland

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/croatiacleveland.git

# Fetch existing code
git fetch origin

# Merge with existing code
git merge origin/main --allow-unrelated-histories

# Resolve any conflicts manually if they occur
# Then:
git add .
git commit -m "Merge new website code with existing repository"

# Push merged code
git push origin main
```

### Option C: Create New Branch

Use this to create a new branch for review before merging:

```powershell
cd C:\Repo\croatiacleveland

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/croatiacleveland.git

# Fetch existing code
git fetch origin

# Create new branch
git checkout -b feature/new-website

# Add and commit
git add .
git commit -m "Add complete Croatia Cleveland FC website"

# Push new branch
git push origin feature/new-website
```

Then create a Pull Request on GitHub to review and merge.

## GitHub Authentication

### Method 1: Personal Access Token (Recommended)

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `repo` (full control)
4. Copy the token

When pushing, use:
```
Username: YOUR_USERNAME
Password: [paste your token]
```

Or configure Git to remember:
```powershell
git config --global credential.helper wincred
```

### Method 2: SSH Key

1. Generate SSH key:
```powershell
ssh-keygen -t ed25519 -C "your@email.com"
```

2. Add to SSH agent:
```powershell
ssh-add C:\Users\YourUsername\.ssh\id_ed25519
```

3. Add public key to GitHub:
   - Copy contents of `C:\Users\YourUsername\.ssh\id_ed25519.pub`
   - GitHub → Settings → SSH and GPG keys → New SSH key

4. Use SSH URL:
```powershell
git remote add origin git@github.com:YOUR_USERNAME/croatiacleveland.git
```

## Repository Structure on GitHub

Once pushed, your repository will contain:

```
croatiacleveland/
├── .github/               # (optional) GitHub Actions workflows
├── src/                   # Source code
├── public/                # Static assets
├── migrations/            # Database migrations
├── dist/                  # Built files (should be in .gitignore)
├── node_modules/          # Dependencies (in .gitignore)
├── .wrangler/            # Wrangler cache (in .gitignore)
├── package.json          # Project dependencies
├── wrangler.jsonc        # Cloudflare configuration
├── README.md            # Main documentation
├── WINDOWS_SETUP.md     # Windows setup guide
├── FORUM_SUMMARY.md     # Forum documentation
├── PROJECT_SUMMARY.md   # Complete project guide
├── .gitignore           # Files to ignore
└── LICENSE              # (optional) License file
```

## Verify .gitignore

Ensure these are in `.gitignore` (they already are):

```
# Dependencies
node_modules/

# Build output
dist/.wrangler

# Environment variables
.env
.dev.vars

# Wrangler
.wrangler/

# PM2
.pm2/
pids/
logs/
*.log

# OS
.DS_Store
Thumbs.db

# Backups
*.backup
*.bak
*.tar.gz
*.zip
```

## Collaborative Development

### Clone Repository (Other Developers)

```powershell
# Clone to local machine
git clone https://github.com/YOUR_USERNAME/croatiacleveland.git C:\Repo\croatiacleveland

cd C:\Repo\croatiacleveland

# Install dependencies
npm install

# Set up database
npm run db:migrate:local
npm run db:seed

# Start development
npm run build
npm run dev:sandbox
```

### Daily Workflow

```powershell
# Pull latest changes
git pull origin main

# Make changes to code
# ...

# Check what changed
git status

# Add changes
git add .

# Commit
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

### Branch Strategy (Recommended)

For team development:

```powershell
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes
# ...

# Commit changes
git add .
git commit -m "Add feature: description"

# Push branch
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# After review and approval, merge to main
```

## GitHub Issues & Project Management

### Track Tasks with Issues

Create issues for:
- Stripe payment integration
- Admin console development
- Member portal development
- Bug fixes
- Feature requests

### Use Labels

- `enhancement` - New features
- `bug` - Bug fixes
- `documentation` - Documentation updates
- `priority-high` - Urgent items
- `help-wanted` - Need assistance

### Milestones

Create milestones for:
- v1.0 - Initial launch
- v1.1 - Payment integration
- v1.2 - Admin console
- v2.0 - Mobile app

## Continuous Deployment (Optional)

### GitHub Actions for Auto-Deploy

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build project
        run: npm run build
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=croatia-cleveland-fc
```

Add secrets in GitHub:
- Repository → Settings → Secrets → Actions
- Add: `CLOUDFLARE_API_TOKEN`
- Add: `CLOUDFLARE_ACCOUNT_ID`

## Protection Rules (Recommended)

Enable branch protection for `main`:

1. Repository → Settings → Branches
2. Add rule for `main` branch
3. Enable:
   - Require pull request reviews
   - Require status checks to pass
   - Require branches to be up to date

## Common Git Commands

```powershell
# Check current branch
git branch

# Switch branch
git checkout branch-name

# Create and switch to new branch
git checkout -b new-branch

# See commit history
git log --oneline

# See changes
git diff

# Undo changes (before commit)
git checkout -- filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Pull specific branch
git pull origin branch-name

# Push specific branch
git push origin branch-name

# Delete branch locally
git branch -d branch-name

# Delete branch on GitHub
git push origin --delete branch-name
```

## Troubleshooting

### Authentication Failed

```powershell
# Clear credentials
git config --global --unset credential.helper

# Try again with new credentials
git push origin main
```

### Merge Conflicts

```powershell
# Pull latest changes
git pull origin main

# Fix conflicts in files manually
# Look for:
# <<<<<<< HEAD
# your changes
# =======
# their changes
# >>>>>>> branch-name

# After fixing:
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

### Large Files Error

If you accidentally try to commit large files:

```powershell
# Remove from staging
git rm --cached large-file.zip

# Add to .gitignore
echo "*.zip" >> .gitignore

# Commit
git add .gitignore
git commit -m "Add large files to gitignore"
```

## Repository Settings

### Recommended Settings

1. **General**
   - Allow merge commits
   - Allow squash merging
   - Automatically delete head branches

2. **Collaborators**
   - Add team members with appropriate permissions

3. **Pages** (if using GitHub Pages)
   - Source: None (we use Cloudflare Pages)

4. **Webhooks** (optional)
   - Add webhooks for Discord/Slack notifications

## Quick Reference

**Initial Setup:**
```powershell
cd C:\Repo\croatiacleveland
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/croatiacleveland.git
git push -u origin main
```

**Daily Development:**
```powershell
git pull origin main    # Get latest
# Make changes...
git add .               # Stage changes
git commit -m "Message" # Commit
git push origin main    # Push to GitHub
```

**Check Status:**
```powershell
git status              # See what changed
git log --oneline       # See commit history
git remote -v           # See remote URLs
```

## Resources

- **Git Documentation:** https://git-scm.com/doc
- **GitHub Guides:** https://guides.github.com/
- **Git Cheat Sheet:** https://education.github.com/git-cheat-sheet-education.pdf
- **Atlassian Git Tutorial:** https://www.atlassian.com/git/tutorials

---

**Your code is ready to be pushed to GitHub!** Follow the scenarios above based on your needs. 🚀
