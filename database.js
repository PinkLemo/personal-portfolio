const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Create a 'messages' table in the database
db.serialize(() => {
    db.run('CREATE TABLE messages (name TEXT, email TEXT, message TEXT)');
});

// Function to save a message to the database
function saveMessage(name, email, message, callback) {
    const stmt = db.prepare('INSERT INTO messages VALUES (?, ?, ?)');
    stmt.run(name, email, message, callback);
    stmt.finalize();
}

module.exports = { saveMessage };
