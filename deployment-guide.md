# Azure DevOps Pipeline Deployment Guide

## 🚀 Setup Instructions

### 1. Azure DevOps Pipeline Variables
Add these variables in your Azure DevOps pipeline:

#### **Library Variables (Recommended)**
Create a variable group called `firebase-config`:
```
VITE_FIREBASE_API_KEY: AIzaSyBuaIVPvLbhvEOi1R8BzuAgOncdFmJLwfc
VITE_FIREBASE_AUTH_DOMAIN: digital-metrics-452c9.firebaseapp.com
VITE_FIREBASE_PROJECT_ID: digital-metrics-452c9
VITE_FIREBASE_STORAGE_BUCKET: digital-metrics-452c9.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID: 193752642919
VITE_FIREBASE_APP_ID: 1:193752642919:web:6df25c423ef8fc088aabc2
VITE_FIREBASE_MEASUREMENT_ID: G-YS43YG0MWB
```

#### **FTP Configuration Variables**
```
FTP_SERVICE_CONNECTION: your-ftp-service-connection-name
FTP_REMOTE_DIRECTORY: /public_html (or your server's web directory)
```

### 2. FTP Service Connection
1. Go to **Project Settings** > **Service Connections**
2. Create **New Service Connection** > **Generic**
3. Configure:
   - **Server URL**: your-ftp-server.com
   - **Username**: your-ftp-username
   - **Password**: your-ftp-password
   - **Service Connection Name**: your-ftp-service-connection-name

### 3. Pipeline Files
Choose one of these pipeline files:

#### **Option A: Multi-Stage Pipeline** (`azure-pipelines.yml`)
- ✅ Separate build and deploy stages
- ✅ Artifact management
- ✅ Environment approvals
- ✅ Better for production

#### **Option B: Simple Pipeline** (`azure-pipelines-simple.yml`)
- ✅ Single stage
- ✅ Direct deployment
- ✅ Faster execution
- ✅ Better for development

### 4. Repository Setup
1. Add your chosen pipeline file to repository root
2. In Azure DevOps, go to **Pipelines** > **New Pipeline**
3. Select your repository
4. Choose **Existing Azure Pipelines YAML file**
5. Select your pipeline file

## 🔧 Pipeline Features

### **Build Process:**
- ✅ Node.js 18.x installation
- ✅ Dependency installation with `npm ci`
- ✅ Linting (optional, continues on error)
- ✅ Production build with environment variables
- ✅ Artifact publishing

### **Deployment Process:**
- ✅ FTP upload with clean deployment
- ✅ Preserves file structure
- ✅ Environment-based deployment
- ✅ Build artifact download

### **Security:**
- ✅ Environment variables from Azure DevOps
- ✅ Secure FTP credentials
- ✅ No sensitive data in code

## 📁 Server Directory Structure
After deployment, your server should have:
```
/public_html/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── vendor-[hash].js
└── vite.svg
```

## 🐛 Troubleshooting

### **Build Fails:**
- Check Node.js version compatibility
- Verify all environment variables are set
- Check for TypeScript errors

### **FTP Upload Fails:**
- Verify FTP service connection
- Check server permissions
- Ensure remote directory exists
- Test FTP credentials manually

### **App Doesn't Load:**
- Check server directory structure
- Verify index.html is in root
- Check browser console for errors
- Ensure Firebase config is correct

## 🚀 Deployment Commands

### **Manual Local Build:**
```bash
npm install
npm run build
# Upload dist/ folder contents to your server
```

### **Test Build Locally:**
```bash
npm run build
npm run preview
# Visit http://localhost:4173
```

## 📞 Support
- Check Azure DevOps pipeline logs
- Verify FTP connection settings
- Test Firebase configuration
- Review server error logs