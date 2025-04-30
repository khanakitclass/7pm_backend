const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    { 
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
        },
        // cat_img: {
        //     type: String,
        //     required: true
        // }
        cat_img: {
            type: {
                public_id: String,
                url: String
            }
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Categories = mongoose.model('Categories', categorySchema);
module.exports = Categories;
