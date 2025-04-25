const Categories = require("../model/category.model");
const fs = require("fs");
const uploadFileCloudinary = require("../utils/cloudinary")

const listCategories = async (req, res) => {
    try {
        const categories = await Categories.find();

        if (!categories) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "Error in getting list of categories"
            });
        }

        return res.status(200).json({
            success: true,
            data: categories,
            message: "Categories get successfully."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Internal server error " + error.message
        });
    }
}

const getCategory = async (req, res) => {
    try {
        const category = await Categories.findById(req.params.id);

        if (!category) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "Error in getting of category"
            });
        }

        return res.status(200).json({
            success: true,
            data: category,
            message: "Category get successfully."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Internal server error " + error.message
        });
    }
}

const addCategory = async (req, res) => {
    try {
        console.log(req.body, req.file);

        const uploadC = await uploadFileCloudinary(req.file.path, "category");

        console.log("sdcasdc", uploadC);
        
        const category = await Categories.create({ ...req.body, cat_img: uploadC.url });



        if (!category) {
            return res.status(400)
                .json({
                    success: false,
                    data: [],
                    message: "Error in create category."
                })
        }

        return res.status(201)
            .json({
                success: true,
                data: category,
                message: "Category created successfully."
            });
    } catch (error) {
        return res.status(500)
            .json({
                success: false,
                data: [],
                message: "Error in internal server: " + error.message
            });
    }
}

const updateCategory = async (req, res) => {
    try {
        console.log(req.params, req.body, req.file);

        if (req.file) {
            const categoryObj = await Categories.findById(req.params.id);

            console.log(categoryObj);

            fs.unlinkSync(categoryObj.cat_img, (error) => {
                return res.status(400).json({
                    success: false,
                    data: null,
                    message: "Error in delete old category image: " + error
                });
            })



            const category = await Categories.findByIdAndUpdate(
                req.params.id,
                { ...req.body, cat_img: req.file.path },
                { new: true, runValidators: true }
            );

            if (!category) {
                return res.status(400).json({
                    success: false,
                    data: null,
                    message: "Error in update category"
                });
            }

            return res.status(200).json({
                success: true,
                data: category,
                message: "Category update successfully."
            })
        } else {
            const category = await Categories.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            console.log(category);

            if (!category) {
                return res.status(400).json({
                    success: false,
                    data: null,
                    message: "Error in update category"
                });
            }

            return res.status(200).json({
                success: true,
                data: category,
                message: "Category update successfully."
            })
        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Internal server error " + error.message
        });
    }
}

const deleteCategory = async (req, res) => {
    try {
        console.log(req.params.id, "cccc");

        const category = await Categories.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(400).json({
                success: false,
                data: null,
                message: "Error in delete category"
            });
        }


        fs.unlinkSync(category.cat_img, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    data: null,
                    message: "Error delete category image: " + err.message
                });
            }
        })

        return res.status(200).json({
            success: true,
            data: category,
            message: "Category delete successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            data: null,
            message: "Internal server error " + error.message
        });
    }
}

const countCategory = async (req, res) => {
    try {
        const result = await Categories.aggregate(
            [
                {
                    $count: 'No of Categories'
                }
            ]
        );

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Category count not found",
                data: []
            });
        }

        res.status(200).json({
            success: true,
            message: "Category count found",
            data: result
        });
        
    } catch (error) {
        
    }
}

module.exports = {
    listCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    countCategory
}


//give subcategory data with category name  id, sub_name, cat_name

//give cat_name, sub_name, product_name, product_id     product collection

//how many products in each category
// cat_name, count, cat_id