const joi = require('joi');

const studentRegisterSchema = joi.object({
  roll_no: joi.string()
    .pattern(/^[0-9]+$/)
    .min(11)
    .max(11)
    .required(),

  full_name: joi.string()
    .min(3)
    .max(30)
    .required(),

  email: joi.string()
    .email({ minDomainSegments: 2 }),

  mobile: joi.string()
    .pattern(new RegExp('^[0-9]*$')),

  course: joi.string()
    .required(),

  yop: joi.string()
    .required()

});

const studentLoginSchema = joi.object({
  roll_no: joi.string()
    .pattern(/^[0-9]+$/)
    .min(11)
    .max(11)
    .required(),

  password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});

module.exports = {
  studentLoginSchema,
  studentRegisterSchema
};
