const express = require("express");

const router = express.Router();

router.get(
    "/get-subcategories",
    (req, res) => {
        res.send("GET Subcategories")
    }
);

module.exports = router