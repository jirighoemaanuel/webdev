import bodyParser from 'body-parser';
import express from 'express';
import { dirname } from 'path';

import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/check', (req, res) => {
  const data = req.body;
  console.log(data.password);
  if (data.password == 'ILoveProgramming') {
    res.sendFile(__dirname + '/public/secret.html');
  } else {
    res.sendFile(__dirname + '/public/index.html');
  }
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
