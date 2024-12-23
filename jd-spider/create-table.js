import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function main() {
    const db = await open({
        filename: 'data.db',
        driver: sqlite3.Database
    });

     await db.exec(`
    CREATE TABLE "job" (
        "id"	INTEGER,
        "name"	TEXT,
        "area"	TEXT,
        "salary"	TEXT,
        "link"	TEXT,
        "company"	TEXT,
        "desc"	TEXT,
        PRIMARY KEY("id" AUTOINCREMENT)
    );    
    `);
} 

main();
