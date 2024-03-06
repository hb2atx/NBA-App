const { Client } = require("pg");


let DB_URI;

if (process.env.NODE_ENV === "test"){
    DB_URI = "overpaid_test";
} else {
    DB_URI = "overpaid_hmkk";
}

let db = new Client({
    host: "dpg-cnksjgicn0vc73d8n34g-a",
    database: DB_URI,
    port: 5432,
    user: 'overpaid_hmkk_user',
    password: '4BLpJtufqxhWE25oHdjbcizH5Ao46rNT',
});

db.connect();

module.exports = db;