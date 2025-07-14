// logging-middleware/auth.js
const axios = require('axios');

async function getToken() {
  try {
    const res = await axios.post("http://20.244.56.144/evaluation-service/auth", {
      email: "sumitgoswami9916@gmail.com",
      name: "sumit goswami",
      rollNo: "12219225",
      accessCode: "CZypQK",
      clientID: "e3455315-c569-4475-9708-bf7df9c6f36b",
      clientSecret: "uEemfyBktvXuGKbD"
    });

    console.log(" Token:", res.data["access_token"]);
  } catch (err) {
    console.error(" Error:", err.response?.data || err.message);
  }
}

getToken();
