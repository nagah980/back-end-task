const { Router } = require("express");
const postsController = require("../controllers/postsController");

const router = Router();

router.post("/", postsController.createPost);
router.get("/", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.patch("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);

module.exports = router;
