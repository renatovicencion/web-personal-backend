const post = require("../models/post");
const Post = require("../models/post");

function addPost(req, res) {
    const body = req.body;

    const post = new Post(body);

    post.save((err, postStored) => {
        if (err) {
            res.status(500).send({ code: 500, message: "Error del servidor." });
        } else {
            if (!postStored) {
                res.status(400).send({ code: 400, message: "No se ha podido crear el post." })
            } else {
                res.status(200).send({ code: 200, message: "Post creado con éxito." })
            }
        }
    });
}

function getPosts(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const options = {
        page: page,
        limit: parseInt(limit),
        sort: { date: "desc" }
    };

    Post.paginate({}, options, (err, posts) => {
        if (err) {
            res.status(500).send({ code: 500, message: "Error del servidor." });
        } else {
            if (!posts) {
                res.status(404).send({ code: 404, message: "No se ha encontrado ningún post." });
            } else {
                res.status(200).send({ code: 200, posts: posts });
            }
        }
    });
}

function updatePost(req, res) {
    const postData = req.body;
    const { id } = req.params;

    Post.findByIdAndUpdate(id, postData, (err, postUpdate) => {
        if (err) {
            res.status(500).send({ code: 500, message: "Error del servidor." });
        } else {
            if (!postUpdate) {
                res.status(404).send({ code: 404, message: "No se ha encontrado ningún post. "});
            } else {
                res.status(200).send({ code: 200, message: "Post actualizado con éxito."});
            }
        }
    });
}

function deletePost(req, res) {
    const { id } = req.params;

    Post.findByIdAndRemove(id, (err, postDeleted) => {
        if (err) {
            res.status(500).send({ code: 500, message: "Error del servidor." });
        } else {
            if (!postDeleted) {
                res.status(404).send({ code: 404, message: "Post no encontrado." });
            } else {
                res.status(200).send({ code: 200, message: "Post eliminado con éxito." });
            }
        }
    })
}

function getPost(req, res) {
    const { url } = req.params;

    Post.findOne({ url: url }, (err, postStored) => {
        if (err) {
            res.status(500).send({ code: 500, message: "Error del servidor." });
        } else {
            if (!postStored) {
                res.status(404).send({ code: 404, message: "No se ha encontrado el post." });
            } else {
                res.status(200).send({ code: 200, post: postStored });
            }
        }
    });
}

module.exports = {
    addPost,
    getPosts,
    updatePost,
    deletePost,
    getPost
};