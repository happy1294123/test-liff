const DB = require('better-sqlite3');
var db = new DB('database.db');

contextBridge.exposeInMainWorld("sqlite", {
  getTickets: () => db.prepare("SELECT * FROM tickets").all(),
  // addUser: (name, username) => db.prepare("INSERT INTO users (name, username) VALUES (?, ?)").run(name, username),
});

const createTable = () => {
	const sql = `
			CREATE TABLE tickets (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT NOT NULL,
				has_sell TINYINT
			)
	`
	db.prepare(sql).run();
}

// const updateTicket = () => {
// 	const sql = `
// 	UPDATE tickets set has_sell = 1 where id = 1
// 	`
// 	db.prepare(sql).run();
// }

const tickets = () => {
	db.prepare('SELECT * FROM tickets').all()
}

createTable()

module.export = tickets




