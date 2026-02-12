Node.js and MongoDB CRUD App
A functional CRUD application built with Node.js, Express, and MongoDB. This project demonstrates how to handle basic database operations (Create, Read, Update, Delete) with a RESTful API.


Tech Stack

Backend: Node.js, Express.js

Database: MongoDB

Environment Management: Dotenv



Features

Create: Add new users to the database.

Read: Fetch and display a list of all users.

Update: Modify existing user details using their Unique ID.

Delete: Remove users from the database.

Search: Real-time search bar to find specific people in the list quickly.

UX UI: Interactive loading spinner to indicate data fetching states.


Setup and Installation
1. Follow these steps to get the project running locally:

2. Clone the repository:
   git clone https://github.com/YOUR_USERNAME/your-repo-name.git

3. Enter the project directory:
   cd your-repo-name

4. Install dependencies:
npm install

5. Environment Configuration:
Create a file named .env in the root directory and add the following variables (replace the placeholders with your own database details):
PORT=3000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_database_name

7. Run the app:
Make sure your MongoDB service is running, then start the server:
node server.js

The app will be live at http://localhost:3000.


API Endpoints

POST /api/users - Create a new user

GET /api/users - Get all users

PUT /api/users/:id - Update a user by ID

DELETE /api/users/:id - Delete a user by ID

Developed by Orion