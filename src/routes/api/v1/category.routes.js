const express = require("express");
const { CategoryController } = require("../../../controller");
const upload = require("../../../middleware/upload");
const auth = require("../../../middleware/auth");
const validate = require("../../../middleware/validate");
const { CategroyValidation } = require("../../../validation");

const router = express.Router();

// http://localhost:8000/api/v1/category/get-categories
router.get(
    "/list-categories",
    // auth(["admin", "employee", "user"]),
    CategoryController.listCategories
);

router.get(
    "/get-category/:id",
    CategoryController.getCategory
);

router.get(
    "/count-category",
    auth(["admin", "employee", "user"]),
    CategoryController.countCategory
);

router.post(
    "/add-category",
    auth(["admin", "employee", "user"]),
    upload.single("cat_img"),
    validate(CategroyValidation.addCategory),
    CategoryController.addCategory
);

router.put(
    "/update-category/:id",
    validate(CategroyValidation.updateCategory),
    upload.single("cat_img"),
    CategoryController.updateCategory
);

router.delete(
    "/delete-category/:id",
    validate(CategroyValidation.deleteCategory),
    CategoryController.deleteCategory
);

module.exports = router;