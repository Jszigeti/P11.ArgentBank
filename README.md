# PROJECT 11 - ARGENT BANK

Banking application created with React, Redux and MongoDB

Objectives:

- implement the frontend of a banking app with React ;
- use Redux as state manager ;
- create endpoints to consult accounts and transactions and edit transactions categories/notes

## Getting Started

### Prerequisites

Argent Bank uses the following tech stack:

- [Node.js v20](https://nodejs.org/en/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

Please make sure you have the both packages. You can verify this by using the following commands in your terminal:

```bash
# Check Node.js version
node --version

# Check Mongo version
mongosh --version
```

### Instructions

1. Fork this repo
1. Clone the repo onto your computer
1. Open a terminal window in the cloned project
1. Run the following commands:

```bash
# Install all dependencies for frontend and backend (open a terminal in the project folder)
npm i

# Start local dev server
npm run dev:server

# Populate database with two users
npm run populate-db

# Launch the app (it must be done in a second terminal)
npm start
```

Your server should now be running at http://locahost:3001 and you will now have two users in your MongoDB database!

## Populated Database Data

Once you run the `populate-db` script, you should have two users in your database:

### Tony Stark

- First Name: `Tony`
- Last Name: `Stark`
- Email: `tony@stark.com`
- Password: `password123`

### Steve Rogers

- First Name: `Steve`,
- Last Name: `Rogers`,
- Email: `steve@rogers.com`,
- Password: `password456`

## API Documentation

To learn more about how the API works, once you have started your local environment, you can visit: http://localhost:3001/api-docs

## Access the app

### Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
