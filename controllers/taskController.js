const Task = require("../models/Task");

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;

        // Validation
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        const task = await Task.create({
            title,
            description,
            status,
            dueDate
        });

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get all tasks
const getTasks = async (req, res) => {
    try {
        const { status, sort } = req.query;

        let query = {};

        if (status) {
            query.status = status;
        }

        let tasksQuery = Task.find(query);

        if (sort === "dueDate") {
            tasksQuery = tasksQuery.sort({ dueDate: 1 });
        } else if (sort === "createdAt") {
            tasksQuery = tasksQuery.sort({ createdAt: -1 });
        } else {
            tasksQuery = tasksQuery.sort({ createdAt: -1 });
        }

        const tasks = await tasksQuery;

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// Update Task
const updateTask = async (req, res) => {

    try {

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Delete Task
const deleteTask = async (req, res) => {

    try {

        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {

            return res.status(404).json({
                success: false,
                message: "Task not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Toggle Task Status
const toggleTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        task.status =
            task.status === "Pending" ? "Completed" : "Pending";

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task status updated",
            task
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    toggleTaskStatus
};