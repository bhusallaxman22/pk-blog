const router = require("express").Router()
const auth = require("../config/auth")
const db = require("../db")
const sanitizer = require("express-sanitizer")
// @route GET blogs/
// @desc Get all Blogs
// @access Public
router.get('/', function (req, res) {
    db.blogs.find({}, function (err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.send(blogs);
        }
    });
});
// @route GET blogs/
// @desc Get all Blogs
// @access Public
router.get('/api', function (req, res) {
    db.blogs.find({}, function (err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.send(blogs);
        }
    });
});

// @route Post blogs/
// @desc Post a new Blog
// @access Private
router.post('/', function (req, res) {
    const token = req.header("x-auth-token");
    const id = auth(token);
    if (!id) {
        return res.status(401).send("Not Authorised");
    }
    const { title, body, author, uid, image } = req.body;
    var newBlog = {
        title: title,
        body: body,
        image: image,
        author: author,
        uid: uid
    }
    db.blogs.create(newBlog, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/#/');
            console.log(newlyCreated);
        }
    });
}
);

// @route GET blogs/:id
// @desc get a blog's info
// @access Public
router.get('/:id', function (req, res) {
    db.blogs.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.send(foundBlog)
            // res.render('show', { blog: foundBlog, auth: authentication });
        }
    });
});


// @route PUT blogs/:id
// @desc edit a blog's info
// @access Private
router.put('/:id', function (req, res) {
    req.body.body = req.sanitize(req.body.body);
    const token = req.header('x-auth-token');
    const id = auth(token);
    if (!id) {
        return res.status(401).send("Not Authorised");
    }
    const { title, body, image, author } = req.body;
    db.blogs.findByIdAndUpdate(req.body.id, { title, body, image, author }, function (err, updatedBlog) {
        if (err) {
            console.log(err);
        } else {
            res.sendStatus(200);
        }
    }
    );
}
);

// @route POST blogs/:id
// @desc get a blog's info
// @access Private
router.post('/:id', function (req, res) {
    const token = req.header('x-auth-token');
    const id = auth(token);
    if (!id) {
        return res.status(401).send("Not Authorised");
    }
    console.log("Hello", req.body.id);
    db.blogs.deleteOne({ _id: req.body.id, uid: id }, function (err) {
        if (err) {
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs');
        }
    });
});

module.exports = router;