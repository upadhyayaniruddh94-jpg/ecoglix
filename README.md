# EcoLogix ESG & Carbon Compliance Dashboard

A enterprise-grade ESG and Carbon Footprint Compliance Dashboard built for mid-sized logistics, supply chain, and fleet management companies.

## Features
- **Scope 1, 2, & 3 Emissions Tracking:** Clear visibility into direct fleet fuel, facility power, and supply chain emissions.
- **Interactive Analytics:** Carbon intensity velocity charts and route breakdowns using Recharts.
- **Fleet Inventory Management:** Real-time fuel efficiency, vehicle type filters, and safety scores.
- **Audit Report Generator:** One-click compliance report simulation (GHG Protocol & ISO 14064 ready).

## Setup & Deployment Instructions

### Local Development
1. Extract the zip folder.
2. Open terminal in the directory and run:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Deploying to GitHub & Cloud Platforms (Vercel, Netlify, Render, Streamlit)
1. Initialize Git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ecologix-esg-dashboard.git
   git push -u origin main
   ```
2. Connect your GitHub repository to your preferred deployment platform (e.g., Vercel / Netlify / Render) for auto-deployment.
