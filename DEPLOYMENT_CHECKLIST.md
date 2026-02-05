# ✅ Deployment Checklist for C:\Repo\croatiacleveland

## 📥 Step 1: Download & Extract

- [ ] Download project backup from: https://www.genspark.ai/api/files/s/MfjYdwyi
- [ ] Extract to: `C:\Repo\croatiacleveland`
- [ ] Verify all files extracted successfully

## 🔧 Step 2: Initial Setup

### Install Dependencies
```powershell
cd C:\Repo\croatiacleveland
npm install
```

- [ ] npm install completed without errors
- [ ] `node_modules` folder created

### Set Up Database
```powershell
npm run db:migrate:local
npm run db:seed
```

- [ ] Migrations applied successfully
- [ ] Sample data seeded
- [ ] `.wrangler` folder created

### Build Project
```powershell
npm run build
```

- [ ] Build completed without errors
- [ ] `dist` folder created
- [ ] `dist/_worker.js` exists

## 🧪 Step 3: Local Testing

### Start Development Server
```powershell
npm run dev:sandbox
```

- [ ] Server starts without errors
- [ ] Server running on http://localhost:3000

### Test Pages
Open in browser and verify:

- [ ] Homepage: http://localhost:3000
- [ ] Teams: http://localhost:3000/teams
- [ ] Croatia Park: http://localhost:3000/croatia-park
- [ ] **Public Forum**: http://localhost:3000/forum
- [ ] **Members Forum**: http://localhost:3000/forum/members

### Test APIs
```powershell
curl http://localhost:3000/api/news
curl http://localhost:3000/api/teams
curl http://localhost:3000/api/games
curl http://localhost:3000/api/forum/categories?type=public
curl http://localhost:3000/api/forum/categories?type=members
```

- [ ] All API endpoints return data
- [ ] No error responses

## 🐙 Step 4: GitHub Integration

### Initialize Git
```powershell
git init
git config user.name "Your Name"
git config user.email "your@email.com"
```

- [ ] Git initialized
- [ ] User configured

### Create .gitignore (already exists, verify)
- [ ] `node_modules/` in .gitignore
- [ ] `.env` in .gitignore
- [ ] `.wrangler/` in .gitignore
- [ ] `dist/.wrangler` in .gitignore

### Connect to GitHub
```powershell
git remote add origin https://github.com/YOUR_USERNAME/croatiacleveland.git
```

- [ ] GitHub repository created
- [ ] Remote added successfully
- [ ] Remote verified with `git remote -v`

### Push to GitHub

**Option A - New Repository:**
```powershell
git add .
git commit -m "Initial commit: Croatia Cleveland FC website"
git branch -M main
git push -u origin main
```

**Option B - Existing Repository:**
```powershell
git add .
git commit -m "Add complete website with forums"
git push origin main --force
```

- [ ] Code pushed to GitHub successfully
- [ ] All files visible on GitHub

## ☁️ Step 5: Cloudflare Setup

### Install Wrangler (if needed)
```powershell
npm install -g wrangler
```

- [ ] Wrangler installed globally

### Login to Cloudflare
```powershell
npx wrangler login
```

- [ ] Authenticated with Cloudflare
- [ ] Browser authentication completed

### Create Production Database
```powershell
npx wrangler d1 create croatia-cleveland-db
```

- [ ] Database created
- [ ] Database ID noted
- [ ] `wrangler.jsonc` updated with database ID

### Apply Migrations to Production
```powershell
npm run db:migrate:prod
```

- [ ] Migrations applied to production database
- [ ] No errors reported

### Create Pages Project
```powershell
npx wrangler pages project create croatia-cleveland-fc --production-branch main
```

- [ ] Pages project created
- [ ] Project name noted

## 🚀 Step 6: Deploy to Production

### Deploy Application
```powershell
npm run deploy:prod
```

- [ ] Build completed successfully
- [ ] Deployment completed
- [ ] Deployment URL received

### Test Production Deployment
Visit your Cloudflare Pages URL (e.g., https://croatia-cleveland-fc.pages.dev)

- [ ] Homepage loads
- [ ] Navigation works
- [ ] API endpoints work
- [ ] Forums accessible
- [ ] Database connected

## 🌐 Step 7: Custom Domain Setup

### Add Domain to Cloudflare Pages
```powershell
npx wrangler pages domain add croatiacleveland1957.com --project-name croatia-cleveland-fc
```

- [ ] Domain added
- [ ] DNS instructions received

### Configure DNS
In your domain registrar (e.g., GoDaddy, Namecheap):

- [ ] Add CNAME record pointing to Cloudflare Pages
- [ ] Wait for DNS propagation (can take 24-48 hours)
- [ ] Verify domain works: https://croatiacleveland1957.com

## 🔐 Step 8: Security & Secrets

### Set Environment Variables (if needed)
```powershell
# For Stripe integration (when ready)
npx wrangler pages secret put STRIPE_SECRET_KEY --project-name croatia-cleveland-fc

# For JWT secret (production)
npx wrangler pages secret put JWT_SECRET --project-name croatia-cleveland-fc
```

- [ ] Stripe secret configured (if applicable)
- [ ] JWT secret configured
- [ ] Other secrets configured as needed

## 📧 Step 9: Email & Notifications (Optional)

### SendGrid or Mailgun Setup
- [ ] Email service account created
- [ ] API keys obtained
- [ ] Email templates created
- [ ] Test email sending

## 🧑‍💼 Step 10: Admin Setup

### Create Admin User
Using Wrangler D1:
```powershell
npx wrangler d1 execute croatia-cleveland-db --command="INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES ('admin@croatiacleveland1957.com', 'HASH_HERE', 'Admin', 'User', 'admin')"
```

- [ ] Admin user created
- [ ] Password hash generated (use bcrypt)
- [ ] Admin can login

## 📊 Step 11: Monitoring & Analytics

### Cloudflare Analytics
- [ ] Enable Cloudflare Web Analytics
- [ ] Review analytics dashboard

### Error Tracking (Optional)
- [ ] Set up Sentry or similar
- [ ] Configure error reporting

## 🎯 Step 12: Final Verification

### All Features Working
- [ ] Homepage displays correctly
- [ ] News banner scrolling
- [ ] Game schedules showing
- [ ] Croatia Park progress visible
- [ ] Volunteer form working
- [ ] Donation modal working
- [ ] **Public forum accessible**
- [ ] **Members forum requires login**
- [ ] **Members forum checks membership status**
- [ ] All API endpoints responsive

### Performance Check
- [ ] Page load time < 3 seconds
- [ ] Mobile responsive
- [ ] No console errors
- [ ] SSL certificate active
- [ ] HTTPS working

### Security Check
- [ ] No sensitive data exposed
- [ ] API keys not in client code
- [ ] CORS configured properly
- [ ] JWT authentication working
- [ ] Member-only areas protected

## 📝 Step 13: Documentation

- [ ] README.md reviewed
- [ ] WINDOWS_SETUP.md available
- [ ] GITHUB_MERGE_GUIDE.md available
- [ ] FORUM_SUMMARY.md reviewed
- [ ] PROJECT_SUMMARY.md reviewed
- [ ] Deployment notes documented

## 👥 Step 14: Team Onboarding (if applicable)

- [ ] Share GitHub repository access
- [ ] Provide Cloudflare account access
- [ ] Share documentation links
- [ ] Conduct code walkthrough
- [ ] Set up development environments

## 🎉 Step 15: Launch!

- [ ] Announce on social media
- [ ] Email members about new website
- [ ] Update old website with redirect
- [ ] Monitor for issues
- [ ] Celebrate! 🎊

## 📞 Support Resources

- **GitHub Repository:** https://github.com/YOUR_USERNAME/croatiacleveland
- **Cloudflare Dashboard:** https://dash.cloudflare.com/
- **Domain:** https://croatiacleveland1957.com
- **Documentation:** See all .md files in project root

## 🐛 Troubleshooting

### Common Issues

**Build Fails:**
```powershell
Remove-Item dist -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item node_modules -Recurse -Force
npm install
npm run build
```

**Database Not Working:**
```powershell
npm run db:reset
```

**Port Already in Use:**
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Git Push Fails:**
- Check authentication (Personal Access Token)
- Verify remote URL: `git remote -v`
- Try: `git push origin main --force` (be careful!)

## ✅ Completion

Once all items are checked:

- ✅ Project downloaded and set up locally
- ✅ Database configured and seeded
- ✅ Code pushed to GitHub
- ✅ Deployed to Cloudflare Pages
- ✅ Custom domain configured
- ✅ All features tested and working
- ✅ **Forums accessible and functional**
- ✅ **Membership verification working**

**Congratulations! Croatia Cleveland FC website is live!** 🇭🇷⚽🎉

---

**Time Estimate:**
- Steps 1-3: 30 minutes
- Steps 4-5: 30 minutes
- Steps 6-7: 1 hour
- Steps 8-15: 1-2 hours
- **Total: 3-4 hours**

**Need Help?**
- Review documentation files
- Check Cloudflare Workers docs
- Review GitHub guides
- Consult PROJECT_SUMMARY.md for technical details
