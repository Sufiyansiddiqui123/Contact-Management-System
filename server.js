const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Database setup
const db = new sqlite3.Database("./database/contacts.db", (err) => {
    if (err) {
        console.error("Error opening database:", err);
    } else {
        console.log("Connected to SQLite database.");
        db.run(`
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL
            )
        `);
    }
});

// API routes

// Get all contacts
app.get("/contacts", (req, res) => {
    db.all("SELECT * FROM contacts", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Add a new contact
app.post("/contacts", (req, res) => {
    const { name, email, phone } = req.body;
    db.run(
        `INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)`,
        [name, email, phone],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID, name, email, phone });
            }
        }
    );
});

// Delete a contact
app.delete("/contacts/:id", (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM contacts WHERE id = ?`, id, (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: "Contact deleted successfully" });
        }
    });
});


// Update an existing contact
app.put("/contacts/:id", (req, res) => {
    const { id } = req.params; // Get the contact ID from the URL
    const { name, email, phone } = req.body; // Get the updated details from the request body

    // Validate input
    if (!name || !email || !phone) {
        return res.status(400).json({ error: "All fields (name, email, phone) are required." });
    }

    // Update the contact in the database
    db.run(
        `UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?`,
        [name, email, phone, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else if (this.changes === 0) {
                res.status(404).json({ error: "Contact not found." });
            } else {
                res.json({ id, name, email, phone }); // Return the updated contact
            }
        }
    );
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
