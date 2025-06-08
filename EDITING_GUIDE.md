# Portfolio Website Editing Guide

This guide will help you easily update your portfolio content without touching any code!

## Quick Start

All your content is stored in JSON files in the `src/data/` folder:
- `about.json` - Your personal information and bio
- `projects.json` - All your projects

## Editing Your About Information

Open `src/data/about.json` and update the following fields:

```json
{
  "name": "Your Full Name",
  "title": "Your Job Title",
  "bio": "Your description/bio",
  "location": "City, Country",
  "email": "your.email@example.com",
  "github": "https://github.com/yourusername",
  "linkedin": "https://linkedin.com/in/yourusername",
  "skills": ["Skill1", "Skill2", "Skill3"],
  "experience": "X+ years",
  "profileImage": "/images/profile.jpg"
}
```

## Adding a New Project

1. Open `src/data/projects.json`
2. Copy an existing project object
3. Update all the fields with your project information
4. Add your project images to the `public/images/projects/` folder

### Project Structure:
```json
{
  "id": "unique-project-id",
  "title": "Project Name",
  "description": "Short description for the card",
  "longDescription": "Detailed description for project page",
  "icon": "/images/projects/your-icon.png",
  "images": ["/images/projects/screenshot1.jpg"],
  "technologies": ["Tech1", "Tech2"],
  "category": "Frontend/Backend/Full Stack",
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://your-demo.com",
  "featured": true,
  "keyFeatures": ["Feature 1", "Feature 2"]
}
```

## Adding Images

1. Create folders in `public/images/`:
   - `public/images/profile.jpg` (your profile photo)
   - `public/images/projects/` (project screenshots and icons)

2. Reference images in JSON using paths like:
   - `/images/profile.jpg`
   - `/images/projects/project-name-screenshot.jpg`

## Categories and Filtering

Projects can be categorized as:
- "Frontend" - Front-end projects
- "Backend" - Back-end/API projects
- "Full Stack" - Full-stack applications
- "Mobile" - Mobile applications
- Or create your own categories

## Featured Projects

Set `"featured": true` in your most important projects to highlight them.

## Tips

1. **Keep descriptions concise** - Short descriptions for cards, detailed ones for project pages
2. **Use high-quality images** - Screenshots should be clear and show your work well
3. **Update regularly** - Add new projects as you complete them
4. **Test locally** - Run `bun run dev` to see changes before deploying

## Need Help?

If you need to add new features or modify the design, you'll need to edit the React components in the `src/` folder. The data files handle all content changes!
