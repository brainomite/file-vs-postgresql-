const { Pool, Client } = require("pg");
const Chance = require("chance");

const chance = new Chance()
// pools will use environment variables
// for connection information
// const pool = new Pool()

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: null
// })
const connectionString = "postgresql://test:test@127.0.0.1:5432/root";

client = new Client({ connectionString });
client.connect();
client.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  client.end();
});

const runSeed = async () => {
  for (let idx = 0; idx < 5000; idx++) {
    const string = chance.string({ length: 100, symbols: false });
    await client.query(
      `INSERT INTO test VALUES (${idx}, "${string}")`
    );
    fs.writeFile(`./data/${idx}.txt`, string, function (err) {
      if (err) return console.log(err);
      console.log(idx + " was written to disk");
    });
  }
};


runSeed();
