/**
 * @module routes/api/comments
 * @description Express router for handling comment-related API endpoints.
 */

 /**
    * GET /
    * @summary Retrieve all comments.
    * @route GET /
    * @returns {Array<Object>} 200 - An array of comment objects
    * @returns {Error} 500 - Internal server error
    */

 /**
    * DELETE /:id
    * @summary Delete a comment by its ID.
    * @route DELETE /:id
    * @param {string} id.path.required - The ID of the comment to delete
    * @returns {Object} 200 - Success message
    * @returns {Error} 404 - Comment not found
    * @returns {Error} 500 - Internal server error
    */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;
router.get("/",(req, res) => {
    Comment.find({})
        .then(comments => {
        res.status(200).json(comments);
        })
        .catch(err => {
        console.error("Error fetching comments:", err);
        res.status(500).json({ error: "Internal server error" });
        });
});

// add another endpoint to delete a comment
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    Comment.findByIdAndDelete(id)
        .then(deletedComment => {
            if (!deletedComment) {
                return res.status(404).json({ error: "Comment not found" });
            }
            res.status(200).json({ message: "Comment deleted successfully" });
        })
        .catch(err => {
            console.error("Error deleting comment:", err);
            res.status(500).json({ error: "Internal server error" });
        });
});
router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find({});
        res.status(200).json(comments);
    } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        console.error("Error deleting comment:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});