import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title.'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title cannot be more than 40 characters.']
    },
    description: {
        type: String,
        required: [true, 'Please add a description.'],
        maxlength: [200, 'Title cannot be more than 200 characters.']
    }

}, { timestamps: true })

module.exports = mongoose.models.Note || mongoose.model('Note', noteSchema);