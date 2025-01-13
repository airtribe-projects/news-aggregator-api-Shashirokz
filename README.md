# New Aggregation & Preferences API

## Project Overview

This is a RESTful API built with **Node.js** and **Express** that allows users to register with a name, email, password, and their preferences. The API includes endpoint handling for user management and news article retrieval. Additionally, the server leverages MongoDB for database management, and `dotenv` is used for environment variable handling.

---

## Features

- User Registration with detailed preferences.
- Middleware for logging requests.
- Structured and modular routing for scalability.
- Database connection using MongoDB.
- Error handling for production readiness.

---

## Installation Instructions

To set up this project locally, follow the steps below:

1. Clone this repository via Git:
   ```bash
   git clone https://github.com/airtribe-projects/news-aggregator-api-Shashirokz.git
   ```
2. Navigate into the project directory:
   ```bash
   cd news-aggregator-api-Shashirokz
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```
5. Start the server in development mode:
   ```bash
   npm run dev
   ```
6. The server will run on `http://localhost:3000`.

---

## API Endpoints Documentation

### Base URL
`http://localhost:3000/apis/v1`

### **1. User Registration**

**Endpoint**: `POST /users/register`

**Description**: Registers a new user with their basic information and preferences.

#### Request Body:
```json
{
  "name": "Shashi",
  "email": "shashi@gmail.com",
  "password": "U2hhc2hp",
  "preferences": "general"
}
```

#### Response:
- **201 Created**
   ```json
   {
     "message": "User registered successfully"
   }
   ```
- **400 Bad Request**
   ```json
   {
     "message": "All fields are required"
   }
   ```

---
### **2. Login User**

**Endpoint**: `POST /users/login`

#### Request Body:
```json
{
   "email": "s.k.s@gmail.com",
   "password": "U2hhc2hp"
}
```
#### Response:
```json
JSON response with authentication token
```
---
### **3. Get News Articles**
**Endpoint**: `GET /news`

---
### **4. Get favorites news articles**
**Endpoint**: `GET /news/favorites`
---
### **5. Get read news articles**
**Endpoint**: `GET /news/read`
---
### **6. Get news articles by search keyword**
**Endpoint**: `GET /news/search/{keyword}`
---
### **7. set favorites news articles**
**Endpoint**: `POST /news/{newsId}/favorite`
---
### **8. set read news articles**
**Endpoint**: `POST /news/{newsId}/read`
---
### **9. get users news articles preference**
**Endpoint**: `GET /users/preference`
---
### **10. set users news articles preference**
*Endpoint*: `PUT /users/preference`
---

### **Error Handling**
All API requests will return appropriate HTTP status codes based on the result:
```json
200 OK – Request was successful
201 Created – Resource was created
400 Bad Request – Invalid request data
401 Unauthorized – Missing or invalid authentication token
404 Not Found – Resource not found
500 Internal Server Error – Unexpected error
```
## Development

During development, use `npm run dev` to start the server with **nodemon** for live reloading.

---

## Dependencies

- `express` - Web framework.
- `mongoose` - MongoDB object modeling.
- `dotenv` - Environment variable management.
- `express-validator` - Request validation.
- `jsonwebtoken` - JWT-based authentication.
- `bcrypt` - Password hashing and encryption.
- `nodemon` - Development helper.

---

## Author

- **Shashi**

Feel free to contribute and submit pull requests to enhance this project!
