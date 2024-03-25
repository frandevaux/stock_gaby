const Pool = require("pg").Pool;

const pool = new Pool({
  user: "franciscodevaux",
  host: "localhost",
  database: "stock_gaby",
  port: 5432,
});

module.exports = pool;
