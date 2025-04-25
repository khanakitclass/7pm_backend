const express = require("express");

const router = express.Router();

const categoryRoutes = require("./category.routes");
const subcategoryRoutes = require("./subcategory.routes");
const productRoutes = require("./product.routes");
const customerRoutes = require("./customer.routes");
const usersRoutes = require("./users.routes");

// http://localhost:8000/api/v1/category
router.use("/category", categoryRoutes);
router.use("/subcategory", subcategoryRoutes);
router.use("/product", productRoutes);
router.use("/users", usersRoutes);

module.exports = router;