import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
let name = 0;
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post('/submit', (req, res) => {
  const data = req.body;
  name = data.fName + data.lName;
  res.render('index.ejs', { nameLength: name.length });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
