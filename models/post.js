const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
    name: {type: String, required: true},
    isFinished: {type: Boolean}
});
const postSchema = mongoose.Schema({
    title: {type: String, required:true},
    description: { type: String, required: true },
    tasks: [taskSchema],
});
module.exports = mongoose.model('Post', postSchema);