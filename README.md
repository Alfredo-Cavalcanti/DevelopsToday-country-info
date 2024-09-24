# Country Info App

A web application to view information about countries, including a list of countries, details of each country, flag, and population.

## Prerequisites

- Node.js (version 14 or higher)
- npm (or yarn)
- NestJS CLI (optional but recommended)


## Installation

1. Clone the repository:
   ```bash
   git clone <repository URL>

2. Navigate to the backend folder:
    cd country-info-backend

3. Install NestJS globally (if you haven't already):
    npm install -g @nestjs/cli

4. Install the backend dependencies:
    npm install

5. Create a .env file in the backend folder with the necessary environment variables and place the APIs. 
Use the .env.example file as a reference. (Not publishing the used APIs for security reasons)

6. Navigate to the frontend folder:
    cd country-info-frontend

7. Install the frontend dependencies:
    npm install

8. Individual dependence if needed (backend):
    npm install express axios dotenv

9. Individual dependence if needed (frontend):
    npm install axios chart.js react-chartjs-2


## Environment Variables

The application uses environment variables to configure various settings. Ensure that the `.env` file is correctly configured as per the example provided in `.env.example`.

The application loads environment variables using the `dotenv` package in the `main.js` file.

## Running the application

1. At the backend root folder, start the backend:
  cd country-info-backend - 
  npm start

2. In a new terminal, start the frontend at the frontend root folder:
  cd country-info-frontend - 
  npm start

3. Access the application in your browser:
  http://localhost:3001 - 
  (http://localhost:3000 should be running the backend)
