# 🔐 Backend Security with Express.js

Securing a backend application involves a stateless authentication mechanism like **JWT**, mitigating common vulnerabilities like **CORS** and **XSS**, and strictly managing sensitive data using **environment variables**.

---

## 📑 Index
1. [🎟️ JWT Authentication Flow](#🎟️-jwt-authentication-flow)  
2. [🛡️ Common Vulnerabilities & Mitigation](#🛡️-common-vulnerabilities-and-mitigation)  
   - [🌍 CORS](#🌍-cross-origin-resource-sharing-cors)  
   - [⚔️ XSS](#⚔️-cross-site-scripting-xss)  
3. [🤫 Environment Variables](#🤫-environment-variables-protect-your-secrets)  
4. [📌 Summary](#📌-summary-cheat-sheet)

---

## 🎟️ JWT Authentication Flow

JSON Web Tokens (JWT) are the standard for creating a stateless authentication system, meaning the server doesn't need to store session information.  
The entire authentication process is self-contained within the token.

**Analogy:** Think of a JWT as a secure event wristband. You show your ID once (login), get a wristband (JWT), and for the rest of the event, security (middleware) just has to glance at your wristband.

**Flow:**
1. **User Login** → Sends credentials to `/api/login`.  
2. **Server Generates & Signs JWT** → With header, payload, and signature (using secret key).  
3. **Server Sends JWT to Client** → Usually in JSON response.  
4. **Client Stores JWT** → e.g., in `localStorage` or an `HttpOnly` cookie.  
   - Each protected request includes it in the header:  
     ```
     Authorization: Bearer <your_jwt_here>
     ```
5. **Server Verifies JWT** → Middleware checks validity.  
   - ✅ Valid → Attaches payload to `req.user`.  
   - ❌ Invalid/Expired → Responds with `401 Unauthorized`.

---

## 🛡️ Common Vulnerabilities and Mitigation

Even with authentication, APIs are exposed to **web-based attacks**. Here’s how to mitigate the most common ones:

### 🌍 Cross-Origin Resource Sharing (CORS)

Browsers restrict requests across different domains by default.

- **Mitigation:** Use `cors` middleware.  
  ```js
  const cors = require('cors');
  app.use(cors({ origin: 'https://your-frontend-domain.com' }));
  
  ```
### ⚔️ Cross-Site Scripting (XSS)

XSS injects malicious scripts into user content.

**Mitigation:**

Sanitize all user inputs.

Use helmet middleware to set security headers.
```js
const helmet = require('helmet');
app.use(helmet());
```

## 🤫 Environment Variables: Protect Your Secrets

Never hard-code secrets (DB URLs, API keys, JWT secrets).

**✅ Best Practice**

Use .env file + dotenv library.

Add .env to .gitignore.
```js
# .env
DATABASE_URL="your_connection_string"
JWT_SECRET="a_very_strong_and_long_secret_phrase"

// app.js
require('dotenv').config();
const secret = process.env.JWT_SECRET;
```

This keeps secrets out of source code and allows separate configs for dev, staging, and production.

## 📌 Summary (Cheat Sheet)

| Security Area    | Best Practice                                    |
| ---------------- | ------------------------------------------------ |
| **Auth**         | Use JWT for stateless auth, verify in middleware |
| **CORS**         | Configure `cors()` to allow trusted origins only |
| **XSS**          | Sanitize inputs + use `helmet` for CSP headers   |
| **Secrets Mgmt** | Store in `.env`, never commit sensitive data     |


