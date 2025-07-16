# URL Shortener Microservice – Afford Medical Technologies Internship Assignment

This project was developed as part of a **live internship placement assignment** for **Afford Medical Technologies**.
It includes a fully functional **URL Shortener Microservice** with a complete **React frontend**, and a reusable **Logging Middleware**.

> ✅ Note: This was a time-bound evaluation task (3 hours), and all API calls to the official test server are now expired.

---

## 🧩 Project Structure


---

## 🛠️ Technologies Used

| Layer        | Stack                        |
|--------------|-------------------------------|
| Backend      | Node.js, Express, MongoDB     |
| Frontend     | React (Vite), Vanilla CSS     |
| Middleware   | Custom Axios-based Logger     |
| Tools        | Git, Postman, MongoDB Compass |

---

## 🔐 Logging Middleware

A reusable logging utility was created to send logs to a secure evaluation server during the live test. It captured:

- ✅ Request-level info
- ⚠️ Warnings and errors in handlers, routes, DB
- 📦 Logs were structured with `stack`, `level`, `package`, `message`

> Post-evaluation, the logging server is no longer active. In current version, logs are mocked using `console.log()` for demonstration.

---

## 🧪 Features Implemented

### ✅ Backend Microservice (`/backend`)
- **Short URL Creation** with:
  - Custom or auto-generated shortcode
  - Expiry (default: 30 min)
- **Redirection** to original URL
- **Analytics Endpoint**:
  - Click count
  - Referrer, timestamp, and user location
- **MongoDB** persistence
- **Error Handling** with descriptive HTTP responses

### ✅ Frontend Web App (`/frontend`)
- **URL Shortening UI** (up to 5 at once)
- Form with client-side validation
- Result display with expiry time
- **Statistics Page**:
  - List of created short URLs
  - Click data visualization
- **Material UI compliant layout using Vanilla CSS**

---

## 📸 Screenshots

| Feature | Screenshot |
|--------|-------------|
| URL Creation | *[Insert Image]* |
| Stats View | *[Insert Image]* |
| Redirection in Action | *[Insert Image]* |

---

## 🚀 Local Setup (Optional)

```bash
git clone https://github.com/<your-username>/12219225.git
cd 12219225

# Start Backend
cd backend
npm install
node app.js

# Start Frontend
cd ../frontend
npm install
npm run dev
