# Portfolio Website

A modern, responsive portfolio website built with Next.js and designed for easy content management and GitHub Pages deployment.

## ✨ Features

- **Dark Grey Theme**: Professional dark color scheme using shadcn/ui
- **Easy Content Management**: Update content by editing JSON files - no code required
- **Responsive Design**: Looks great on desktop, tablet, and mobile
- **Project Filtering**: Filter projects by category (Frontend, Backend, Full Stack, etc.)
- **Fast Performance**: Static site generation for lightning-fast loading
- **GitHub Pages Ready**: Pre-configured for easy GitHub Pages deployment
- **Accessibility**: Built with accessibility best practices

## 🚀 Quick Start

1. **Edit Your Information**:
   - Update `src/data/about.json` with your personal details
   - Update `src/data/projects.json` with your projects

2. **Add Your Images**:
   - Add your profile photo as `public/images/profile.jpg`
   - Add project images to `public/images/projects/`

3. **Preview Locally**:
   ```bash
   bun install
   bun run dev
   ```
   Open http://localhost:3000 to see your portfolio

4. **Deploy to GitHub Pages**:
   - Follow the guide in `DEPLOYMENT.md`
   - Push to GitHub and enable GitHub Pages

## 📁 Project Structure

```
portfolio-website/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Main portfolio page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/ui/         # UI components (shadcn/ui)
│   └── data/                  # Content files (EDIT THESE!)
│       ├── about.json         # Your personal information
│       └── projects.json      # Your projects data
├── public/
│   └── images/                # Your images go here
│       ├── profile.jpg        # Your profile photo
│       └── projects/          # Project screenshots and icons
├── EDITING_GUIDE.md           # How to edit content
├── DEPLOYMENT.md              # How to deploy to GitHub Pages
└── README.md                  # This file
```

## 🎨 Customization

### Content
- **Personal Info**: Edit `src/data/about.json`
- **Projects**: Edit `src/data/projects.json`
- **Images**: Add to `public/images/` folder

### Styling
- **Colors**: Update CSS variables in `src/app/globals.css`
- **Components**: Modify components in `src/app/page.tsx`
- **Layout**: Adjust spacing and layout in the component files

### Adding Features
- **New Sections**: Add sections to `src/app/page.tsx`
- **Project Details**: Create individual project pages
- **Contact Form**: Add a contact form component
- **Blog**: Add a blog section with MDX

## 📖 Documentation

- **[Editing Guide](EDITING_GUIDE.md)**: How to update content without touching code
- **[Deployment Guide](DEPLOYMENT.md)**: How to deploy to GitHub Pages
- **[Images Guide](public/images/README.md)**: How to add and manage images

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Language**: TypeScript
- **Package Manager**: Bun
- **Deployment**: GitHub Pages (static export)
- **Icons**: Lucide React

## 📱 Responsive Design

The portfolio is fully responsive and works on:
- 📱 Mobile phones (320px+)
- 📲 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1280px+)

## 🎯 SEO & Performance

- Static site generation for fast loading
- Optimized images with placeholder fallbacks
- Semantic HTML structure
- Meta tags ready for customization
- Accessible navigation and components

## 🤝 Contributing

This is a template for your personal portfolio. Feel free to:
- Fork and customize for your own use
- Submit issues for bugs or improvements
- Share your customizations with the community

## 📄 License

This project is open source and available under the MIT License.

---

## Need Help?

- Check the [Editing Guide](EDITING_GUIDE.md) for content updates
- Check the [Deployment Guide](DEPLOYMENT.md) for hosting setup
- Open an issue if you encounter problems
- The code is designed to be beginner-friendly!

**Happy portfolio building! 🚀**
