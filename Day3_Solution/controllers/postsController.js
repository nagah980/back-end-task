const postsService = require("../services/postsService");

const createPost = async (req, res, next) => {
    try {
        const post = await postsService.createPost(req.body);
        res.status(201).json({
            message: "Post Created Successfully",
            data: post
        })
    } catch (error) {
        next(error);
    }
}

const getAllPosts = async (req, res, next) => {
    try {
        const data = await postsService.getAllPosts(req.query);
        res.status(200).json({
            message: "Posts Fetched Successfully",
            data
        })
    } catch (error) {
        next(error);
    }
}

const getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await postsService.getPostById(id);

        if (!post) {
            return res.status(404).json({
                message: "Post Not Found"
            })
        }

        res.status(200).json({
            message: "Post Fetched Successfully",
            data: post
        })
    } catch (error) {
        next(error);
    }
}

const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await postsService.updatePost(id, req.body);

        if (!post) {
            return res.status(404).json({
                message: "Post Not Found"
            })
        }

        res.status(200).json({
            message: "Post Updated Successfully",
            data: post
        })
    } catch (error) {
        next(error);
    }
}

const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await postsService.deletePost(id);

        if (!post) {
            return res.status(404).json({
                message: "Post Not Found"
            })
        }

        res.status(200).json({
            message: "Post Deleted Successfully",
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}
