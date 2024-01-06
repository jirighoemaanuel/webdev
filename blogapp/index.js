import express from 'express';
import bodyParser from 'body-parser';
// import methodOverride from 'method-override';
const app = express();
const port = 3000;
let blogs = [
  {
    id: 0,
    author: 'John',
    title: 'Intro to Tech',
    body: 'oenflkvnfvknvpkfnkvnkvnkvnkvnvknvskvnslkvnsk',
  },
  {
    id: 1,
    author: 'John',
    title: 'Intro to Tech2',
    body: 'oenflkvnfvknvpkfnkvnkvnkvnkvnvknvskvnslkvnsk',
  },
  {
    id: 2,
    author: 'John',
    title: 'Intro to Tech3',
    body: 'oenflkvnfvknvpkfnkvnkvnkvnkvnvknvskvnslkvnsk',
  },
  {
    id: 3,
    author: 'John',
    title: 'Intro to Tech4',
    body: 'oenflkvnfvknvpkfnkvnkvnkvnkvnvknvskvnslkvnsk',
  },
];
// app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs', { blogs: blogs });
});

// Route for individual blog post page
app.get('/post/:id', (req, res) => {
  const id = req.params.id;
  const post = blogs.find((post) => post.id === parseInt(id));

  if (!post) {
    res.status(404).send('Post not found');
    return;
  }

  res.render('post.ejs', { post: post });
});

app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  const post = blogs.find((post) => post.id === parseInt(id));

  if (!post) {
    res.status(404).send('Post not found');
    return;
  }
  res.render('edit.ejs', { post: post });
});

app.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const post = blogs.find((post) => post.id === parseInt(id));

  if (!post) {
    res.status(404).send('Post not found');
    return;
  }

  // Update the post with data from the request body
  post.title = req.body.title;
  post.body = req.body.body;

  blogs[id] = {
    id: parseInt(id),
    author: post.author,
    title: post.title,
    body: post.body,
  };

  res.redirect(`/`); // Redirect to home
});

app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  const indexToDelete = blogs.findIndex((post) => post.id === parseInt(id));

  if (indexToDelete === -1) {
    res.status(404).send('Post not found');
    return;
  }

  blogs.splice(indexToDelete, 1);
  res.redirect('/');
});

app.get('/createPost', (req, res) => {
  res.render('createPost.ejs');
});

app.post('/createPost', (req, res) => {
  const data = req.body;

  const data_length = blogs.length;
  const id = data_length;
  const post = {
    id: id,
    author: data.author,
    title: data.title,
    body: data.body,
  };
  blogs.push(post);
  res.redirect('/');
});

app.get('/about', (req, res) => {
  res.render('about.ejs', { blogs: blogs });
});
app.get('/contact', (req, res) => {
  res.render('contact.ejs', { blogs: blogs });
});
app.get('/post', (req, res) => {
  res.render('post.ejs', { blogs: blogs });
});

app.listen(port, () => {
  console.log(`Server running at port:${port}`);
});
