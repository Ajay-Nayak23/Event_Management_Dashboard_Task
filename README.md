# ⚡ Frontend - EventHub

This is the **frontend** for the EventHub web app, built using **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It provides a modern, fast, and responsive UI for event creation, registration, and user authentication.

---

## 🚀 Tech Stack

- **React** – Frontend library
- **TypeScript** – Typed JavaScript
- **Vite** – Lightning-fast bundler and dev server
- **Tailwind CSS** – Utility-first CSS framework
- **Component-Based Design** – Modular and reusable components

---
Here is the deployment link: https://idyllic-frangipane-be5388.netlify.app/


## 📁 Project Structure
    
    frontend/
    ├── src/
    │ ├── components/ # Reusable UI components
    │ ├── App.tsx # Main App component
    │ ├── main.tsx # Entry point
    │ └── index.css # Global styles
    ├── dist/ # Production build output
    ├── index.html # HTML entry point
    ├── package.json # NPM dependencies and scripts
    ├── tailwind.config.js # Tailwind configuration
    ├── vite.config.ts # Vite build configuration
    └── tsconfig.json # TypeScript configuration
    backend/



## 🛠️ Getting Started

### 1. Clone the repository
      git clone https://github.com/your-username/project-bolt-frontend.git
      cd project-bolt-frontend

2. Install dependencies

       npm install
   
3. Run the app locally
 
        npm run dev
App will be running at: http://localhost:5173

 
 
 📦 Build for Production
 
      npm run build
This will create an optimized build in the dist/ directory.

To preview the production build locally:
        
      npm run preview


🚀 Deployment
You can deploy the contents of the dist/ folder using:
🔹 Netlify
Publish directory: dist
Build command: npm run build


🧩 Key Components
LandingPage.tsx – Landing view for new users

Dashboard.tsx – Displays events or user-specific data

EventForm.tsx – Create/edit events

EventCard.tsx – Shows individual event

AuthModal.tsx – Handles user login/register

RegistrationModal.tsx – Register for events

    
    
