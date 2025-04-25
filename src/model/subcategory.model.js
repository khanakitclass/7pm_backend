const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
    { 
        category_id: {
            type: mongoose.Types.ObjectId,
            ref: "Categories",
            required: true
        },
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        }, 
        description: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Subcategories = mongoose.model('Subcategories', subcategorySchema);
module.exports = Subcategories;
