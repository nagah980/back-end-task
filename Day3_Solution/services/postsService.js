const Post = require("../models/postModel");

const createPost = async (data) => {
    try {
        const post = await Post.create(data);
        return post;
    } catch (error) {
        throw error;
    }
}

const getAllPosts = async (query) => {
    try {
        const { page = 1, limit = 10, search } = query;
        const skip = (page - 1) * limit;

        const filter = search ? { title: { $regex: search, $options: "i" } } : {};

        const posts = await Post.find(filter).skip(skip).limit(limit);
        const totalCount = await Post.countDocuments(filter);

        const pagination = {
            page: Number(page),
            limit: Number(limit),
            totalCount,
            totalPages: Math.ceil(totalCount / limit)
        }
        return { posts, pagination };
    } catch (error) {
        throw error;
    }
}

const getPostById = async (id) => {
    try {
        const post = await Post.findById(id);
        return post;
    } catch (error) {
        throw error;
    }
}

const updatePost = async (id, data) => {
    try {
        const post = await Post.findByIdAndUpdate(id, data, { new: true });
        return post;
    } catch (error) {
        throw error;
    }
}

const deletePost = async (id) => {
    try {
        const post = await Post.findOneAndDelete({ _id: id });
        return post;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}
