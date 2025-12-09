const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());

// Lidhja me MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",         // përdoruesi i MySQL
  password: "root1234", // fjalëkalimi që zgjodhët
  database: "taskmaster"
});

// Testo lidhjen
db.connect(err => {
  if (err) {
    console.log("Gabim në lidhje: ", err);
  } else {
    console.log("Lidhja me MySQL u krye me sukses!");
  }
});

// Test endpoint
app.get("/", (req, res) => {
  res.send("Backend po funksionon si duhet!");
});

// Merr të gjitha detyrat
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Nis serverin
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveri po punon ➝ http://localhost:${PORT}`);
});
