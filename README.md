# Hackathon Voting Platform

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

A full-stack web application developed to handle real-time voting, result tracking, and candidate creation during a hackathon event. 

## ✨ Features
- **Voting Interface:** Clean front-end interface allowing authenticated users to cast their votes securely.
- **Real-Time Results:** Displays live updates of the voting results fetching the latest analytics from the backend.
- **Custom Candidate Creation:** Allows the creation of new teams/candidates natively from the browser.
- **Secure Backend:** Powered by Node.js and heavily utilizing Supabase for secure, low-latency database management and real-time subscriptons.

## 🛠️ Built With
- **Frontend:** Vanilla JS, HTML, Core CSS.
- **Backend:** Node.js server.
- **Database:** Supabase (PostgreSQL).

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A Supabase Project

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/2k33cse992574/hackathon.git
   cd hackathon
   ```
2. **Backend Setup:**
   Navigate into the `backend` directory and install the packages:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file based on `.env.example` in the `backend` folder and add your Supabase credentials:
   ```bash
   cp .env.example .env
   # Ensure you set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
   ```
3. **Run the server:**
   ```bash
   npm start
   ```
4. **Access the Frontend:**
   You can serve the HTML files in the `frontend` directory using any local web server (e.g., Live Server in VS Code) and visit `vote.html`, `results.html`, or `create.html`.

## 📝 License
This project is open-source.
