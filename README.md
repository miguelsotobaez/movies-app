# Movies App

A modern web application for managing movie studios and their movies. Built with React, Vite, Node.js, and Material UI.

## Prerequisites

- Docker and Docker Compose
- Node.js 22 (only if running without Docker)

## Quick Start with Docker

The easiest way to run the application is using Docker Compose:

```bash
# Clone the repository
git clone <your-repo-url>
cd movies-app

# Start both frontend and backend services
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:5173
- API: http://localhost:3000

## Manual Setup (without Docker)

### API Setup

```bash
# Navigate to the API directory
cd api

# Install dependencies
npm install

# Start the development server
npm run dev
```

The API will be running on http://localhost:3000

### Frontend Setup

```bash
# Navigate to the frontend directory
cd movies-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be running on http://localhost:5173

## Project Structure

```
.
├── api/                # Backend API
│   ├── src/           # Source files
│   ├── constants/     # Constants and configurations
│   └── Dockerfile     # API container configuration
├── movies-app/        # Frontend React application
│   ├── src/          # Source files
│   ├── components/   # React components
│   ├── services/     # API services
│   └── Dockerfile    # Frontend container configuration
└── docker-compose.yml # Docker services orchestration
```

## Development

- The application uses hot-reload in both frontend and backend for development
- Docker volumes are configured for real-time code updates
- API calls are centralized in the frontend's services directory

## Features

- Movie studio management
- Movie transfers between studios
- Modern Material UI interface
- Centralized API service layer
- Containerized development environment

## Technologies

- Frontend:
  - React with Vite
  - Material UI (latest version)
  - Modern styled-components approach
- Backend:
  - Node.js 22
  - Express
  - Custom logging middleware
- Infrastructure:
  - Docker
  - Docker Compose

# The challenge

This is a technical test app for this challenge you will need to fix the following issues:
The movies-app it the react front end application
The api folder contains a small express api

1. Several images from the app are not loading properly
2. Fix the TODO list in order for the react application
3. Add the required unit testing for your fixes
4. Move to the backend challenge and complete the TODO list
5. Add to the front end a new feature to sell movies to another studio
6. Add a log (plain text file) with the issues that you faced during the test and how you solved them
7. (Optional) fix any vulnerabilities you find

## How you will do it?
1. You need to fork the repo.
2. You need to complete all the items listed before and push the changes to a new branch. That branch must be named ``[NameSurname]`` 
3. Create a PR from your forked branch against this master.


