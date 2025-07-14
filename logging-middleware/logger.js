// logger.js
const axios = require("axios");

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzdW1pdGdvc3dhbWk5OTE2QGdtYWlsLmNvbSIsImV4cCI6MTc1MjQ3NjI3MSwiaWF0IjoxNzUyNDc1MzcxLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNjZmMWI3NGUtMjc0Yy00YjA2LTkxMjYtZjEzNmQ0N2I3MDA3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic3VtaXQgZ29zd2FtaSIsInN1YiI6ImUzNDU1MzE1LWM1NjktNDQ3NS05NzA4LWJmN2RmOWM2ZjM2YiJ9LCJlbWFpbCI6InN1bWl0Z29zd2FtaTk5MTZAZ21haWwuY29tIiwibmFtZSI6InN1bWl0IGdvc3dhbWkiLCJyb2xsTm8iOiIxMjIxOTIyNSIsImFjY2Vzc0NvZGUiOiJDWnlwUUsiLCJjbGllbnRJRCI6ImUzNDU1MzE1LWM1NjktNDQ3NS05NzA4LWJmN2RmOWM2ZjM2YiIsImNsaWVudFNlY3JldCI6InVFZW1meUJrdHZYdUdLYkQifQ.jrNkp-p64bA89yZSwh9Ax2UQjxicDhDb2yNxaaKzMPk"; 




function setLoggerToken(t) {
  token = t;
}

async function Log(stack, level, pkg, message) {
  try {
    const res = await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Logged:", res.data);
  } catch (err) {
    console.error("Log Error: try to put new token again , expired", err.message);
  }
}

module.exports = { Log, setLoggerToken };
