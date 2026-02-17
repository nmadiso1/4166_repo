import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../services/postService.js";

export function getAllPostsHandler(req, res) {
    const { title = '',
        sortBy = 'id',
        order = 'asc',
        offset = 0,
        limit = 5
    } = req.query;

    const options = {
        title,
        sortBy,
        order,
        offset: parseInt(offset),
        limit: parseInt(limit),
    };

    let posts = getAllPosts(options);
    res.status(200).json(posts);
}

export function getPostByIdHandler(req, res) {

    const id = parseInt(req.params.id);
    const post = getPostById(id);

    return res.status(200).json(post);
}

export function createPostHandler(req, res) {
    const { title, content } = req.body;
    const newPost = createPost({ title, content });
    res.status(201).json(newPost);
}

export function updatePostHandler(req, res) {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    const updatedPost = updatePost(id, { title, content });
    res.status(200).json(updatedPost);


}

export function deletePostHandler(req, res) {
    const id = parseInt(req.params.id);
    deletePost(id);
    res.status(204).send();
}
