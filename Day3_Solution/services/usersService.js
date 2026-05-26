const User = require("../models/userModel");

const createUser = async ({ name, email, password, age, bio }) => {
    try {
        const user = await User.create({ name, email, password, age, bio });
        return user;
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw error;
    }
}

const getAllUsers = async (query) => {
    try {
        const { page = 1, limit = 10, search } = query;
        /**
         * 1 page => first 10  | skip 0 limit 10 | (1-1)*10 = 0
         * 2 page => next 10 skip 10 limit 10 | (2-1)*10 = 10
         * 3 page => next 10 skip 20 limit 10 | (3-1)*10 = 20
         */
        const skip = (page - 1) * limit;

        const filter = search ? { name: { $regex: search, $options: "i" } } : {};

        const users = await User.find(filter).skip(skip).limit(limit);
        const totalCount = await User.countDocuments(filter);

        const pagination = {
            page: Number(page),
            limit: Number(limit),
            totalCount,
            totalPages: Math.ceil(totalCount / limit)
        }
        return { users, pagination };
    } catch (error) {
        throw error;
    }
}

const deleteUser = async (id) => {
    try {
        // if user exist, return user then delete it, if it doesn't exist will return null
        const user = await User.findOneAndDelete({ _id: id });
        return user;
    } catch (error) {
        throw error;
    }
}

const updateUser = async (id, data) => {
    try {
        const update = {
            name: data.name,
            password: data.password,
            age: data.age,
            bio: data.bio
        }
        const user = await User.findByIdAndUpdate(id, update, { new: true });
        return user;
    } catch (error) {
        throw error;
    }
}

const countUsers = async () => {
    try {
        const count = await User.countDocuments();
        return count;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    deleteUser,
    updateUser,
    countUsers
}
