const Joi = require('joi');
const joi = require('joi');

const adminRegisterSchema = joi.object({
  uni_id: joi.string()
    .required(),

  full_name: joi.string()
    .min(3)
    .max(30)
    .required(),

  email: joi.string()
    .email({ minDomainSegments: 2 }),

  mobile: joi.string()
    .pattern(new RegExp('^[0-9]*$'))
    .required(),

    yoj: joi.string()
    .required(),

  role: joi.string()
    .required(),

 

});

const adminLoginSchema = joi.object({
  uni_id: joi.string()
    .pattern(/^[0-9]+$/)
    .min(11)
    .max(11)
    .required(),

  password: joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});

module.exports = {
  adminLoginSchema,
  adminRegisterSchema
};
