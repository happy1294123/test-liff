CREATE TABLE tickets (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	has_sell TINYINT
)

INSERT INTO tickets (name, has_sell)
VALUES ("週六入場卷", 0) 
