const express = require('express');
const app = express();
const session = require('express-session');
const slug = require('slug');
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`running on port ${port}`);
});

const User = require('./models/User');
const Article = require('./models/Article');
const Tag = require('./models/Tag');

//Registration
app.post('/api/users', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const bio = req.body.bio;
    const image = req.body.image;
    const password = req.body.password;
    User.create({ username: username, email: email, bio: bio, image: image, password: password })
        .then(() => {
            console.log('post /addUser');
            res.end('add successful');
        })
        .catch(err => console.log(err))
});
//Authentication
app.post('/api/users/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({
        where: {
            username: username,
            password: password
        }
    }).then((result) => {
        if (result !== null) {
            console.log('login successful');
            // console.log(result);
            req.session.user_login_okie = result;
            res.json(result);

        } else {
            res.end('wrong username or password')
        }

    }).catch(err => console.log(err))
});
//Get Current User
app.get('/api/user', (req, res) => {
    let userSession = req.session.user_login_okie;
    res.json(userSession);
});
//Update User
app.put('/api/user', (req, res) => {
    let userSession = req.session.user_login_okie;
    let username = req.body.username;
    let email = req.body.email;
    let bio = req.body.bio;
    let image = req.body.image;
    let password = req.body.password;
    User.update({ username: username, email: email, bio: bio, image: image, password: password }, { where: { id: userSession.id } })
        .then(() => {
            console.log('update successful');
            return User.findOne({ where: { id: userSession.id } });
        }).then((result) => {
            req.session.user_login_okie = result;
            res.json(result);
        })
        .catch(err => console.log(err))

});
// List Articles
app.get('/api/articles', (req, res) => {
    // const query = {};
    // let limit = 20;
    // let offset = 0;

    // if (typeof req.query.limit !== 'undefined') {
    //     limit = req.query.limit;
    // }

    // if (typeof req.query.offset !== 'undefined') {
    //     offset = req.query.offset;
    // }
    // if (typeof req.query.tag !== 'undefined') {
    //     query.tagList = { $in: [req.query.tag] };
    // }
    // console.log(query);


});
//Feed Articles
app.get('/api/articles/feed', (req, res) => {

});
//Get Article
app.get('/api/articles/:slug', (req, res) => {
    let slugTitle = req.params.slug;
    Article.findOne({ where: { slug: slugTitle } })
        .then((result) => {
            res.json(result);
        })
});
//Create Article
app.post('/api/articles', (req, res) => {
        let userSession = req.session.user_login_okie;
        let title = req.body.title;
        let description = req.body.description;
        let body = req.body.body;
        let tagList = req.body.tagList;
        let author = userSession;
        let slugTitle = `${slug(title)}-${(Math.random() * Math.pow(36, 6) | 0).toString(36)}`;
        Article.create({ slug: slugTitle, title: title, description: description, body: body, tagList: tagList, author: author })
            .then(() => {
                // console.log('post /addUser');
                res.end('add successful');
            })
            .catch(err => console.log(err))
    })
    //Update Article
app.put('/api/articles/:slug', (req, res) => {
    let userSession = req.session.user_login_okie;
    let title = req.body.title;
    let description = req.body.description;
    let body = req.body.body;
    let slugTitle = req.params.slug;
    // let slugTitle2 = req.params.slug;
    let slugTitle2 = `${slug(title)}-${(Math.random() * Math.pow(36, 6) | 0).toString(36)}`;

    Article.update({ slug: slugTitle2, title: title, description: description, body: body }, { where: { slug: slugTitle } })
        .then(() => {
            console.log('update successful');
            return Article.findOne({ where: { slug: slugTitle } });
        }).then((result) => {
            res.json(result);
        })
        .catch(err => console.log(err))

})