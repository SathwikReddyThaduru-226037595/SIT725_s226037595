1. Overview

CityEvents 4.2P is a web application built using Node.js, Express, MongoDB, and vanilla HTML/CSS/JS.
The app displays a list of events stored in a database and renders them on a clean UI.
This task demonstrates connecting a backend server to a real database instead of using hardcoded data.

2. Folder Structure
4.2P/
│── models/
│     └── Event.js        # Mongoose schema for events
│── public/
│     ├── index.html      # Frontend UI
│     ├── css/styles.css  # Styling
│     └── js/app.js       # Fetches data from backend
│     └── images/...      # Event images
│── seed.js               # Seeds MongoDB with sample data
│── server.js             # Express server + API routes
│── package.json          # Dependencies & scripts
│── .env                  # MongoDB connection string

3. Technologies Used

Node.js + Express → Backend server
MongoDB + Mongoose → Database
HTML + CSS + JS → Frontend client
dotenv → Environment variables
nodemon → Auto-restart during development

4. Setup Instructions
1️⃣ Install dependencies
npm install

2️⃣ Create .env file
MONGO_URI=mongodb://127.0.0.1:27017/cityeventsDB

3️⃣ Seed the database
node seed.js

You should see:
Connected to MongoDB
Database seeded successfully!
4️⃣ Start the application
Development mode:
npm run dev


Normal start:
npm start

Open:
👉 http://localhost:3000

5. API Endpoints
Method	Endpoint	Description
GET	/api/events	Returns all events
GET	/api/events/:id	Returns a single event by MongoDB ID

These endpoints are consumed by public/js/app.js.

6. What This Project Demonstrates

✔ Connecting Express to MongoDB
✔ Creating a Mongoose schema
✔ Serving static frontend files
✔ Fetching data from an API
✔ Rendering data on the web page
✔ Using environment variables
✔ Using nodemon for easier development
