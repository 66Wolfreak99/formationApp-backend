const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
    project_id: {type: String, required: true},
    name: {type: String, required: true},
    description: { type: String, required: true },
    created_at: { type: Object, required: true },
    isComplete: {type: Boolean}
});
const postSchema = mongoose.Schema({
    title: {type: String, required:true},
    description: { type: String, required: true },
    userId: { type: String, required: true },
    created_by: { type: String, required: true },
    created_at: { type: String, required: true },
    tasks: [taskSchema],
});
module.exports = mongoose.model('Post', postSchema);