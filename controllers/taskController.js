//Import Statement
import TaskModel from '../database/models/taskModel.js'

//Create New Task
export const createTask = async (req, res) => {
    try {

        //Destructuring Data From Client Response
        const { title, description } = req.body;

        //Request Validation
        if (!title || !description) {
            return res.status(400).send({ success: false, message: "Title and description are required" })
        }

        //Creating A New Task
        const newTask = await new TaskModel({ title, description }).save();

        //Sending Ok Response If Everything Goes Well
        res.status(200).send({ success: true, message: "Task successfully created" })

    }
    catch (err) {
        res.status(500).send({ success: false, message: "Failed to create task", error: err.message })
    }

}



//Fetch Created Tasks
export const getTasks = async (req, res) => {
    try {

        //Finding All Tasks
        const tasks = await TaskModel.find();

        //If No Tasks Present
        if (tasks.length === 0) {
            return res.status(200).send({ success: false, message: "No task found. Please! create first" })
        }

        //Sending Ok Response If Everything Goes Well
        res.status(200).send({ success: true, message: "Successfully fetched all tasks", tasks })
    }
    catch (err) {
        res.status(500).send({ success: false, message: "Failed to fetch task" })
    }
}


// Fetch Task by ID
export const getTaskById = async (req, res) => {
    try {
        //Getting From Url Params  
        const { id } = req.params;

        // Find Task By ID
        const task = await TaskModel.findById(id);

        //If Task Not Found
        if (!task) {
            return res.status(404).send({ success: false, message: "Sorry! Task not found" });
        }

        // Send Success Response
        res.status(200).send({ success: true, message: "Task fetched successfully", task });

    } catch (err) {
        res.status(500).send({ success: false, message: "Failed to fetch task", error: err.message, });
    }
};


// Update Task Status
export const updateTaskStatus = async (req, res) => {
    try {
        //Destructuring 
        const { id } = req.params;
        const { status } = req.body;

        // Validate Status
        const validStatuses = ['pending', 'in-progress', 'completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).send({ success: false, message: "Invalid status. Valid options are: 'pending', 'in-progress', 'completed'." });
        }

        // Find and Update Task
        const updatedTask = await TaskModel.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedTask) {
            return res.status(404).send({ success: false, message: "Task not found" });
        }

        // Send Success Response
        res.status(200).send({
            success: true, message: "Your Task status updated successfully", task: updatedTask,
        });
    } catch (err) {
        res.status(500).send({
            success: false, message: "Sorry! Failed to update task status", error: err.message,
        });
    }
};



// Delete Task
export const deleteTask = async (req, res) => {
    try {

        //Destructuring Client Request
        const { id } = req.params;

        // Find and Delete Task
        const deletedTask = await TaskModel.findByIdAndDelete(id);

        //If Task Not Found
        if (!deletedTask) {
            return res.status(404).send({ success: false, message: "Task not found" });
        }

        // Send Success Response
        res.status(200).send({ success: true, message: "Task deleted successfully", task: deletedTask });


    } catch (err) {
        res.status(500).send({ success: false, message: "Sorry! Failed to delete task", error: err.message, });
    }
};


