import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
const db_password = process.env.DB_PASSWORD;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let items = [
  { id: 1, title: 'Buy milk' },
  { id: 2, title: 'Finish homework' },
];

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'permalist',
  password: db_password,
  port: 5432,
});

db.connect();

async function getTitles() {
  const result = await db.query('SELECT * FROM item');
  return result.rows;
}

app.get('/', async (req, res) => {
  items = await getTitles();
  res.render('index.ejs', {
    listTitle: 'Today',
    listItems: items,
  });
});

app.post('/add', async (req, res) => {
  const item = req.body.newItem;
  try {
    const result = await db.query(
      'INSERT INTO item (title) VALUES ($1) RETURNING *',
      [item]
    );
    console.log(result.rows);
  } catch (error) {
    console.log(error);
  }
  res.redirect('/');
});

app.post('/edit', async (req, res) => {
  const data = req.body;
  const itemID = data.updatedItemId;
  const itemTitle = data.updatedItemTitle;

  try {
    await db.query('UPDATE item SET title = $1 WHERE id = $2', [
      itemTitle,
      itemID,
    ]);
  } catch (error) {
    console.log(error);
  }
  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const itemId = req.body.deleteItemId;
  try {
    db.query('DELETE FROM item WHERE id = $1', [itemId]);
  } catch (error) {
    console.log(error);
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
