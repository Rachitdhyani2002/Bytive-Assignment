//Import Statement
import mongoose from 'mongoose';

//Task Schema
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
});

//Task Model
const TaskModel = mongoose.model('Task', taskSchema);

//Export Statement
export default TaskModel;
