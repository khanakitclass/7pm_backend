const express = require("express");
const { CustomerController } = require("../../../controller");


const router = express.Router();

router.get(
    "/list-customers",
    CustomerController.getAllCustomers
);

router.post(
  "/add-customer",
  CustomerController.insertCustomer
);

module.exports = router