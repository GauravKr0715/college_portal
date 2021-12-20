const { adminLoginSchema,
    adminRegisterSchema } = require('./schemas/adminSchema');
  
  const adminRegisterValidation = (body) => {
    return adminRegisterSchema.validate(body);
  }
  
  const adminLoginValidation = (body) => {
    return adminLoginSchema.validate(body);
  }
  
  module.exports = {
    adminRegisterValidation,
    adminLoginValidation
  }