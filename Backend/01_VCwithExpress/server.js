const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/api/user", (req, res) => {
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ];

  res.json(users);
});

app.listen(PORT, () => {
  console.log(`server is running successfully on port ${PORT}`);
});