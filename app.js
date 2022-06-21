const express = require('express')
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOveride = require('method-override');
uuid();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOveride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
})

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newcomment = req.body.comment;
    const findcomment = comments.find(c => c.id === id);
    findcomment.comment = newcomment;
    res.redirect('/comments');
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundcomment = comments.find(c => c.id !== id);
    comments = comments.filter(foundcomment);
    res.redirect('/comments');
})
app.listen(5000, () => {
    console.log("On port 5000");
})