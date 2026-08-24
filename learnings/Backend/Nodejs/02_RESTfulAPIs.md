# Express.js REST API Fundamentals

Express.js builds **robust and maintainable RESTful APIs** by using:  
- A pipeline of **middleware** functions to process requests,  
- Modular **routing** to organize endpoints, and  
- A centralized **error-handling** strategy to manage exceptions gracefully.  

---

## 📑 Index

1. [🧩 Middleware: The Heart of Express](#🧩-middleware-the-heart-of-express)  
2. [🛣️ Routing: Keeping Your Code Organized](#🛣️-routing-keeping-your-code-organized)  
3. [🛡️Error Handling: A Centralized Safety Net](#🛡️-error-handling-a-centralized-safety-net)  
4. [📊 Summary Table](#📊-summary-table)  

---

## 🧩 Middleware: The Heart of Express

Middleware functions are the **core building block** of an Express application.  
Think of them as an **assembly line** for HTTP requests.  

- Each middleware is a station that performs a specific task.  
- After finishing, it either sends a response or calls `next()` to pass control to the next station.  

This **chain-of-responsibility pattern** is perfect for cross-cutting concerns, since you can build applications from small, reusable pieces.

### Example Request Pipeline
1. **Logging** – Log request details (method, URL, timestamp).  
2. **Body Parsing** – `express.json()` parses incoming JSON payloads.  
3. **Authentication** – Custom middleware checks for a valid token (JWT).  
4. **Validation** – Validate `req.body` or `req.params`.  
5. **Route Handler** – The business logic that sends the final response.  

✅ This keeps route handlers **clean** and focused only on core logic.

---

## 🛣️ Routing: Keeping Your Code Organized

As applications grow, defining all routes in one file is unmanageable.  
Express provides the `express.Router` class to create **modular, mini-apps**.  

This allows grouping routes (e.g., `userRoutes.js`, `productRoutes.js`) for better structure.  

### Example: `routes/userRoutes.js`
```javascript
const express = require('express');
const router = express.Router();

// Middleware specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// Define user routes
router.get('/', (req, res) => {
  res.send('Get all users');
});

router.post('/', (req, res) => {
  res.send('Create a user');
});

module.exports = router;
```

Example: app.js
```javascript
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Mount user routes at /api/users
app.use('/api/users', userRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
```

✅ This keeps your codebase modular, readable, and maintainable.

## 🛡️ Error Handling: A Centralized Safety Net

A robust API needs consistent error handling.
Instead of scattering try...catch everywhere, Express allows a centralized error middleware.

Key Features

Signature → Must include 4 params: (err, req, res, next).

Placement → Must be defined last (after all routes & middleware).

Behavior → Handles any error passed via next(err) or thrown in routes.

Example: Centralized Error Handler

```javascript
// Error-handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack); // Debugging log

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
});
```

✅ This ensures:

Errors are caught in one place.

Clients receive consistent JSON responses.

Sensitive stack traces are hidden in production.

## 📊 Summary Table
Concept	Purpose	Analogy	Example Middleware
Middleware	Pipeline for request processing	Assembly line for requests	express.json(), logger
Router	Organizes endpoints into modular files	Mini-application inside a bigger app	userRoutes.js
Error Handler	Centralized way to manage API errors	Safety net at the end of pipeline	(err, req, res, next)

✅ With middleware, modular routing, and centralized error handling, Express.js applications stay scalable, clean, and production-ready.


---
