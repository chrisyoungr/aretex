# leverage-fitness-app API Package

## Overview
The `leverage-fitness-app` API package serves as the backend for the fitness application. It is responsible for handling requests, managing data, and providing endpoints for the web application.

## Setup Instructions
To set up the API package, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/leverage-fitness-app.git
   cd leverage-fitness-app/packages/api
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then, run the following command to install the required dependencies:
   ```bash
   npm install
   ```

3. **Run the API**
   To start the API server, use the following command:
   ```bash
   npm start
   ```

## Usage Examples
Once the API server is running, you can access the following endpoints:

- **GET /api/health**
  - Description: Check the health status of the API.
  - Response: Returns a simple JSON object indicating the server status.

- **POST /api/users**
  - Description: Create a new user.
  - Request Body: JSON object containing user details.
  - Response: Returns the created user object.

## Contributing
If you would like to contribute to the API package, please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.