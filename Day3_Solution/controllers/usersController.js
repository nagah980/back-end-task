const userService = require("../services/usersService");

const createUser = async (req, res, next) => {
    const { name, email, password, age } = req.body;
    if (!name || !email || !password || !age) {
        return res.status(400).json({
            message: "Please fill all the required fields"
        })
    }

    const user = await userService.createUser(req.body);

    res.status(201).json({
        message: "User Created Successfully",
        data: user
    })
}

const getUserById = async (req, res, next) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }

    res.status(200).json({
        message: "User Fetched Successfully",
        data: user
    })
}

const getAllUsers = async (req, res, next) => {
    const data = await userService.getAllUsers(req.query);
    res.status(200).json({
        message: "Users Fetched Successfully",
        data
    })
}

const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await userService.deleteUser(id);

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }

    // status code 204 => no content
    res.status(200).json({
        message: "User Deleted Successfully",
    })
}

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await userService.updateUser(id, req.body);

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }

    res.status(200).json({
        message: "User Updated Successfully",
        data: user
    })
}

const countUsers = async (req, res, next) => {
    const count = await userService.countUsers();
    res.status(200).json({
        message: "Users Count Fetched Successfully",
        data: { count }
    })
}

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    deleteUser,
    updateUser,
    countUsers
}
