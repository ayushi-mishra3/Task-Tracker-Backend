const express = require("express");

const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    toggleTaskStatus
} = require("../controllers/taskController");

const router = express.Router();

router.route("/")
    .post(createTask)
    .get(getTasks);

router.route("/:id")
    .put(updateTask)
    .delete(deleteTask);

router.patch("/:id/status", toggleTaskStatus);

module.exports = router;