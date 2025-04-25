const pool = require("../db/mysqlDB")

const getAllCustomers = async (req, res) => {
  try {
    console.log("getAllCustomersgetAllCustomersgetAllCustomers", pool);
    
    const [rows, fields] = await pool.query('SELECT * FROM `customer`');

    console.log("rowsrowsrows", rows);
    console.log("fieldsfields", fields);
  

    res.status(200).json({
      data: rows,
      message: "All Customer data fetched",
      error: null
    })
    

  } catch (error) {
    res.status(400).json({
      data: [],
      message: "Error in fetched customer data",
      error: error
    })
  }
}

const insertCustomer = async (req, res) => {
  try {
    const {cname, city, rating, snum} = req.body;

    const [data] = await pool.query(
      "INSERT INTO customer (cname, city, rating, snum) VALUES (?, ?, ?, ?)",
      [cname, city, rating, snum]
    );

    console.log("Inserted ID:", data.insertId); 
    res.status(201).json({
      data: {...req.body, id: data.insertId},
      message: "Customer data inserted.",
      error: null
    })
  } catch (error) {
    res.status(500).json({
      data: [],
      message: "Error in customer data insert.",
      error: error
    })
  }
}

module.exports = {
  getAllCustomers,
  insertCustomer
}