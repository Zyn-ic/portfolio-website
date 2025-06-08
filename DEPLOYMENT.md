# Deployment Guide - GitHub Pages

This guide will help you deploy your portfolio website to GitHub Pages for free hosting.

## Quick Deployment

### Option 1: Using GitHub Actions (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"

3. **Create GitHub Actions Workflow**:
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy Next.js site to Pages

   on:
     push:
       branches: ["main"]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: "pages"
     cancel-in-progress: false

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: "18"
         - name: Setup Bun
           uses: oven-sh/setup-bun@v1
         - name: Install dependencies
           run: bun install
         - name: Build with Next.js
           run: bun run build
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./out

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

4. **Build Script**: Add to `package.json`:
   ```json
   {
     "scripts": {
       "build": "next build"
     }
   }
   ```

### Option 2: Manual Deployment

1. **Build the site**:
   ```bash
   bun run build
   ```

2. **Deploy the `out` folder**:
   - Go to repository Settings > Pages
   - Select "Deploy from a branch"
   - Choose a branch to store your built files
   - Upload the contents of the `out` folder

## Custom Domain (Optional)

1. **Add CNAME file** to `public/` folder:
   ```
   yourdomain.com
   ```

2. **Configure DNS**:
   - Add a CNAME record pointing to `yourusername.github.io`
   - Or add A records pointing to GitHub's IPs

3. **Enable in GitHub**:
   - Go to Settings > Pages
   - Add your custom domain
   - Enable "Enforce HTTPS"

## Repository Setup

### If using a user/organization site (username.github.io):
- Repository name must be `username.github.io`
- Site will be available at `https://username.github.io`

### If using a project site:
- Repository can have any name
- Site will be available at `https://username.github.io/repository-name`
- Update `next.config.js` if needed:
   ```javascript
   const nextConfig = {
     // ... other config
     basePath: '/repository-name',
     assetPrefix: '/repository-name'
   };
   ```

## Troubleshooting

### Build Errors
- Check that all dependencies are installed: `bun install`
- Verify your JSON files are valid
- Check the build locally: `bun run build`

### 404 Errors
- Ensure `next.config.js` has correct `basePath` for project sites
- Check that `output: 'export'` is configured
- Verify the `out` folder was deployed correctly

### Images Not Loading
- Check image paths in JSON files
- Ensure images are in the `public/images/` folder
- Verify case sensitivity in file names

## Environment Variables

For different environments, you can use:

```bash
# Development
bun run dev

# Production build
NODE_ENV=production bun run build

# With custom base path
BASE_PATH=/your-repo-name bun run build
```

## Updating Your Site

1. **Edit Content**: Update JSON files in `src/data/`
2. **Add Images**: Upload to `public/images/`
3. **Commit Changes**:
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push origin main
   ```
4. **Auto-Deploy**: GitHub Actions will automatically rebuild and deploy

Your portfolio will be live at `https://yourusername.github.io` (or your custom domain) within a few minutes!
