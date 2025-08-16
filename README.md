# Digital Metrics - Marketing & Development Agency

A modern, full-featured agency website built with React, TypeScript, and Tailwind CSS. Features integrated marketing services, portfolio showcase, and a complete CRM admin panel.

## 🚀 Features

- **Modern Design** - Beautiful, responsive design with smooth animations
- **Service Pages** - Dedicated pages for SEO, PPC, Social Media, Web Development, etc.
- **Portfolio Showcase** - Interactive portfolio with case studies
- **Contact Forms** - Multiple contact forms with Firebase integration
- **Admin CRM Panel** - Complete admin dashboard for managing leads and users
- **Authentication** - Role-based access control (Administrator, CRM Manager, Sales)
- **Firebase Integration** - Real-time database, authentication, and analytics

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router DOM
- **Backend**: Firebase (Firestore, Auth, Analytics)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Deployment**: Netlify

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd digital-metrics
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your Firebase credentials (optional)
   # The app will run in demo mode without Firebase
   ```

## 🔥 Firebase Setup (Optional)

The app works in demo mode without Firebase, but for full functionality:

1. **Create a Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database
   - Enable Authentication (Email/Password)

2. **Get Firebase Config**
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click "Web app" and copy the config

3. **Update Environment Variables**
   ```bash
   # Replace values in .env file
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-actual-project-id
   # ... etc
   ```

## 🚀 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Serve built files locally
npm run serve
```

## 🔄 Azure DevOps Pipeline

The project includes an Azure DevOps pipeline configuration (`azure-pipelines.yml`) for automated deployment:

### **Pipeline Features:**
- ✅ **Automated builds** on code changes
- ✅ **FTP deployment** to Hostinger hosting
- ✅ **Environment variables** integration
- ✅ **Build artifacts** management

### **Setup Instructions:**
1. **Create Azure DevOps project**
2. **Add pipeline** using `azure-pipelines.yml`
3. **Set up environment** named "Production"
4. **Add secret variable** `ftpPassword` in pipeline variables
5. **Configure triggers** as needed

### **Pipeline Variables:**
- `ftpHost`: FTP server URL
- `ftpUser`: FTP username
- `ftpPassword`: FTP password (secret variable)
- `buildOutputDir`: Build output directory (dist)

## 🔐 Admin Panel

The app includes a complete CRM admin panel with role-based access:

### Demo Users (when Firebase is configured):
- **Administrator**: admin@digitalmetrics.com / admin123
- **CRM Manager**: manager@digitalmetrics.com / manager123
- **Sales**: sales@digitalmetrics.com / sales123

### Features:
- Lead management
- Contact form submissions
- User management
- Newsletter subscriptions
- Client feedback management
- Role-based permissions

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── AdminPanel.tsx   # CRM admin dashboard
│   ├── AuthProvider.tsx # Authentication context
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Landing page hero
│   └── ...
├── pages/              # Page components
│   ├── AboutPage.tsx   # About page
│   ├── PortfolioPage.tsx # Portfolio showcase
│   ├── SEOPage.tsx     # Service pages
│   └── ...
├── services/           # API services
│   └── firebaseService.ts # Firebase operations
├── config/             # Configuration
│   └── firebase.ts     # Firebase config
├── data/               # Static data
│   └── servicesData.ts # Service information
└── utils/              # Utility functions
```

## 🎨 Customization

### Colors & Branding
- Update `tailwind.config.js` for color scheme
- Modify logo in `Header.tsx` and `Footer.tsx`
- Update company information in components

### Services
- Edit `src/data/servicesData.ts` to modify services
- Add new service pages in `src/pages/`
- Update navigation in `Header.tsx`

### Content
- Update hero content in `Hero.tsx`
- Modify about page content in `AboutPage.tsx`
- Update portfolio projects in `PortfolioPage.tsx`

## 🚀 Deployment

### Netlify (Recommended)
```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the 'dist' folder to Netlify
```

### Other Platforms
The built files in the `dist` folder can be deployed to any static hosting service:
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | No* |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | No* |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | No* |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | No* |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | No* |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | No* |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase analytics measurement ID | No* |

*App runs in demo mode without Firebase configuration

## 🐛 Troubleshooting

### App shows "Loading..." indefinitely
- Check if Firebase credentials are correct
- App will timeout after 3 seconds and continue in demo mode
- Clear browser cache and reload

### Build fails
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run lint`
- Verify environment variables are properly formatted

### Firebase errors
- Verify Firebase project is properly configured
- Check Firestore security rules
- Ensure Authentication is enabled

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the Firebase documentation

---

Built with ❤️ using React, TypeScript, and modern web technologies.