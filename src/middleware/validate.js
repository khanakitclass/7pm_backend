const Joi = require("joi");
const pick = require("../helper/pick");

const validate = (schema) => async (req, res, next) => {
  try {
    // console.log(schema, req, Object.keys(schema));

    const object = pick(req, Object.keys(schema));

    console.log(object);

    const { value, error } = await Joi
      .compile(schema)
      .prefs({
        abortEarly: false
      })
      .validate(object);


    console.log(value, error);

    if (error) {
      const errMsgs = error.details.map((v) => v.message).join(",");

      console.log(errMsgs);

      return res.status(400).json({
        success: false,
        message: "Validation Error: " + errMsgs
      });
    }

    Object.assign(req, value);

    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message
    });
  }
}

module.exports = validate