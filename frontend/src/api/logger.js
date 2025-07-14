import axios from "axios";

const token = "PASTE_YOUR_VALID_TOKEN_HERE";

export const Log = async (stack, level, pkg, message) => {
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
    console.log(" Log sent:", res.data.logID);
  } catch (err) {
    console.error(" Log error:", err.message);
  }
};
