const express = require("express");

const router = express.Router();

router.get(
    "/get-products",
    (req, res) => {
        res.send("GET Products");
    }
);

router.post(
    "/add-product",
    (req, res) => {
        console.log(req.body);
        
        res.send("POST Request");
    }
);

router.put(
    "/update-product",
    (req, res) => {
        console.log(req.body, req.params);
        
        res.send("PUT Request");
    }
)

router.put(
    "/update-product/:pid",
    (req, res) => {
        console.log(req.body, req.params);
        
        res.send("PUT Request");
    }
)

router.delete(
    "/delete-products/:pid",
    (req, res) => {
        console.log(req.body, req.params);
        
        res.send("DELETE Request");
    }
);

module.exports = router;