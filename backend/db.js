const { Client } = require("pg");


let DB_URI;

if (process.env.NODE_ENV === "test"){
    DB_URI = "overpaid_test";
} else {
    DB_URI = "overpaid_hmkk";
}

let db = new Client({
    connectionString: "postgres://isexgqdv:TWgtQeXjJiecaYkYUMNraT8Nm0SlUXuh@bubble.db.elephantsql.com/isexgqdv"
});

db.connect();

module.exports = db;