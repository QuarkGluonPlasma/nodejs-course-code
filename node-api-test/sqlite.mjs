import { DatabaseSync } from 'node:sqlite';
const database = new DatabaseSync('data.db');

database.exec(`
  CREATE TABLE student(
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INT
  ) STRICT
`);

const insert = database.prepare('INSERT INTO student (id, name, age) VALUES (?, ?, ?)');
insert.run(1, '张三', 20);
insert.run(2, '李四', 21);
insert.run(3, '王五', 22);

const query = database.prepare('SELECT * FROM student ORDER BY id');
console.log(query.all());
