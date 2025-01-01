//Import Statements
import express from 'express';
import {createTask,getTasks,getTaskById,updateTaskStatus,deleteTask} from '../controllers/taskController.js'

//Router Object
const router = express.Router();

// Routes

// 1. Create a new task
router.post('/tasks', createTask);

// 2. Fetch all tasks
router.get('/tasks', getTasks);

// 3. Fetch a task by ID
router.get('/tasks/:id', getTaskById);

// 4. Update task status by ID
router.put('/tasks/:id', updateTaskStatus);

// 5. Delete a task by ID
router.delete('/tasks/:id', deleteTask);

//Export Statement
export default router;
